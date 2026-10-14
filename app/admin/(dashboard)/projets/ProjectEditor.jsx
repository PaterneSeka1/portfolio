"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { Eye, Save, Send } from "lucide-react"
import {
  Button,
  FormSection,
  Select,
  StatusBadge,
  TextArea,
  TextInput,
  Toggle,
  buttonClass,
  cx,
} from "../../_ui/primitives"
import TagInput from "../../_ui/TagInput"
import { saveProjectAction } from "../../../../lib/actions/projects"
import { PROJECT_CATEGORIES, PROJECT_VISIBILITIES, slugify } from "../../../../lib/validation/project"
import { CASE_STUDY_FIELDS, CASE_STUDY_SPEC, PROJECT_EN_SPEC, formatField, translationPairs } from "../../../../lib/admin/form-fields"
import AutoTranslate from "../../_ui/AutoTranslate"

const TRANSLATED = [...translationPairs(PROJECT_EN_SPEC), ...translationPairs(CASE_STUDY_SPEC, "cs_", "en_cs_")]

const SECTIONS = [
  { id: "general", label: "Général" },
  { id: "story", label: "Contexte & problème" },
  { id: "solution", label: "Solution" },
  { id: "role", label: "Mon rôle" },
  { id: "architecture", label: "Architecture" },
  { id: "outcome", label: "Résultat" },
  { id: "technologies", label: "Technologies" },
  { id: "media", label: "Captures" },
  { id: "visibility", label: "Visibilité" },
  { id: "seo", label: "SEO & appel à l'action" },
  { id: "english", label: "Version anglaise" },
]

const GROUP_TITLES = {
  story: { title: "Contexte & problème", description: "Le point de départ : pour qui, pourquoi, avec quelles contraintes." },
  solution: { title: "Solution", description: "Ce que la solution apporte, en langage compréhensible par un non-développeur." },
  role: { title: "Mon rôle", description: "Ce que vous avez fait personnellement, et avec qui." },
  architecture: { title: "Architecture", description: "Vue simplifiée et non sensible de l'organisation technique." },
  outcome: { title: "Résultat & décisions", description: "Les sections vides ne s'affichent pas sur le site." },
}

function CaseStudyGroup({ group, values, prefix = "cs_" }) {
  return CASE_STUDY_FIELDS.filter((field) => field.group === group).map((field) => {
    const name = `${prefix}${field.key}`
    const defaultValue = formatField(field.kind, values?.[field.key])
    return field.rows === 1 ? (
      <TextInput key={name} name={name} label={field.label} description={field.description} defaultValue={defaultValue} optional />
    ) : (
      <TextArea
        key={name}
        name={name}
        label={field.label}
        description={field.description}
        defaultValue={defaultValue}
        rows={field.rows}
        optional
        className={field.mono ? "font-mono text-sm" : undefined}
      />
    )
  })
}

function CharCount({ value, max }) {
  const over = value.length > max
  return (
    <span className={cx("text-xs", over ? "text-red-600" : "text-navy/45")}>
      {value.length} / {max}
    </span>
  )
}

export default function ProjectEditor({ project, suggestions, media, created }) {
  const router = useRouter()
  const isNew = !project
  const action = saveProjectAction.bind(null, project?.id ?? null)
  const [state, formAction, isPending] = useActionState(action, null)
  // Dirty = edited after the last successful save (derived, no effect needed).
  const [editedAt, setEditedAt] = useState(0)
  const [intent, setIntent] = useState(null)
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [slug, setSlug] = useState(project?.slug ?? "")
  const [seoTitle, setSeoTitle] = useState(project?.seoTitle ?? "")
  const [seoDescription, setSeoDescription] = useState(project?.seoDescription ?? "")
  const [activeSection, setActiveSection] = useState("general")
  const formRef = useRef(null)
  const errors = state?.fieldErrors ?? {}
  const cs = project?.caseStudy ?? {}
  const en = project?.en ?? {}
  const status = state?.status ?? project?.status ?? "draft"
  const dirty = editedAt > (state?.success ? state.at : 0)
  const markDirty = () => setEditedAt(Date.now())

  // Feedback after each save.
  useEffect(() => {
    if (!state?.at) return
    if (state.error) {
      toast.error(state.error)
      const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]')
      firstInvalid?.focus()
      firstInvalid?.scrollIntoView({ block: "center", behavior: "smooth" })
      return
    }
    if (state.intent === "preview") {
      window.location.assign(state.previewUrl)
      return
    }
    toast.success(state.message)
    router.refresh()
  }, [state, router])

  // Messages after the redirect that follows a creation.
  useEffect(() => {
    if (!created || !project) return
    if (created === "preview") {
      window.location.assign(`/work/${project.slug}?preview=1`)
      return
    }
    toast.success("Réalisation créée. Vous pouvez maintenant ajouter des captures.")
    router.replace(`/admin/projets/${project.id}`, { scroll: false })
  }, [created, project, router])

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", onBeforeUnload)
    return () => window.removeEventListener("beforeunload", onBeforeUnload)
  }, [dirty])

  // Highlight the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  // The clicked button sends its own name="intent" value with the form data.
  const submitWith = (value) => () => setIntent(value)

  return (
    <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8">
      <nav aria-label="Sections du formulaire" className="hidden lg:block">
        <ul className="sticky top-8 space-y-0.5 text-sm">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={activeSection === section.id ? "true" : undefined}
                className={cx(
                  "block rounded-md px-3 py-1.5 transition-colors",
                  activeSection === section.id ? "bg-white font-medium text-navy shadow-sm" : "text-navy/60 hover:text-navy"
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <form
        ref={formRef}
        action={formAction}
        onChange={markDirty}
        noValidate
        className="min-w-0 space-y-5 pb-28"
      >
        <FormSection id="general" title="Général" description="Ce que les visiteurs voient en premier sur la carte du projet.">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              name="title"
              label="Nom du projet"
              description="Ex. RH VEDEM."
              required
              defaultValue={project?.title ?? ""}
              error={errors.title}
              onChange={(event) => {
                if (!slugTouched) setSlug(slugify(event.target.value))
              }}
            />
            <TextInput
              name="slug"
              label="Slug (adresse de la page)"
              description={`/work/${slug || "…"}`}
              required
              value={slug}
              error={errors.slug}
              onChange={(event) => {
                setSlugTouched(true)
                setSlug(event.target.value)
              }}
            />
          </div>
          <TextArea
            name="summary"
            label="Description courte"
            description="Une à deux phrases orientées problème et solution, sans jargon technique."
            required
            rows={3}
            defaultValue={project?.summary ?? ""}
            error={errors.summary}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Select name="category" label="Type" options={PROJECT_CATEGORIES} defaultValue={project?.category ?? "business"} error={errors.category} />
            <Select name="visibility" label="Confidentialité" options={PROJECT_VISIBILITIES} defaultValue={project?.visibility ?? "private"} error={errors.visibility} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              name="publicUrl"
              type="url"
              inputMode="url"
              label="Site en ligne"
              description="Uniquement pour un projet public."
              optional
              placeholder="https://"
              defaultValue={project?.publicUrl ?? ""}
              error={errors.publicUrl}
            />
            <TextInput
              name="githubUrl"
              type="url"
              inputMode="url"
              label="Dépôt GitHub"
              description="Uniquement s'il est public : pas de lien vers un dépôt privé."
              optional
              placeholder="https://github.com/…"
              defaultValue={project?.githubUrl ?? ""}
              error={errors.githubUrl}
            />
          </div>
        </FormSection>

        {["story", "solution", "role", "architecture", "outcome"].map((group) => (
          <FormSection key={group} id={group} title={GROUP_TITLES[group].title} description={GROUP_TITLES[group].description}>
            <CaseStudyGroup group={group} values={cs} />
          </FormSection>
        ))}

        <FormSection
          id="technologies"
          title="Technologies"
          description="Affichées après le problème et la solution. Les suggestions viennent de la page Technologies."
        >
          <TagInput
            name="technologies"
            label="Technologies utilisées"
            description="Entrée ou virgule pour ajouter. N'indiquez que des technologies réellement utilisées."
            required
            defaultValue={project?.technologies ?? []}
            suggestions={suggestions}
            error={errors.technologies}
            onChange={markDirty}
            placeholder="Next.js, NestJS…"
          />
        </FormSection>

        <section id="media" className="scroll-mt-24">
          {media ?? (
            <FormSection id="media-placeholder" title="Captures" description="Captures d'écran anonymisées du projet.">
              <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-navy/60">
                Enregistrez d&apos;abord le brouillon pour pouvoir ajouter des captures.
              </p>
            </FormSection>
          )}
        </section>

        <FormSection id="visibility" title="Visibilité" description="Le statut se change avec les boutons en bas de page.">
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 text-sm text-navy/70">
            Statut actuel : <StatusBadge status={status} />
            {status === "archived" && <span>Retirée du site, conservée ici.</span>}
          </div>
          <Toggle
            name="featured"
            label="Mettre en avant"
            description="Affichée dans « Réalisations » sur l'accueil et en tête de la page Réalisations."
            defaultChecked={project?.featured ?? false}
          />
          <TextInput
            name="order"
            type="number"
            min={0}
            inputMode="numeric"
            label="Position d'affichage"
            description="0 = en premier. Vous pouvez aussi utiliser les flèches dans la liste des réalisations."
            defaultValue={project?.order ?? ""}
            error={errors.order}
            fieldClassName="max-w-48"
          />
        </FormSection>

        <FormSection id="seo" title="SEO & appel à l'action" description="Facultatif : des valeurs par défaut sont utilisées si ces champs sont vides.">
          <TextInput
            name="seoTitle"
            label="Titre SEO"
            description="Par défaut : nom du projet — titre métier."
            optional
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            error={errors.seoTitle}
          />
          <div className="-mt-3 text-right">
            <CharCount value={seoTitle} max={70} />
          </div>
          <TextArea
            name="seoDescription"
            label="Description SEO"
            description="Par défaut : la description courte."
            optional
            rows={2}
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            error={errors.seoDescription}
          />
          <div className="-mt-3 text-right">
            <CharCount value={seoDescription} max={170} />
          </div>
          <p className="text-xs text-navy/55">
            L&apos;image de partage (Open Graph) est la carte générée du portfolio, identique pour toutes les pages.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <CaseStudyGroup group="cta" values={cs} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextInput
              name="ctaLabel"
              label="Texte du bouton"
              description="Par défaut : « Discutons-en »."
              optional
              defaultValue={project?.ctaLabel ?? ""}
              error={errors.ctaLabel}
            />
            <TextInput
              name="ctaHref"
              label="Lien du bouton"
              description="Par défaut : le formulaire de contact avec ce projet cité."
              optional
              defaultValue={project?.ctaHref ?? ""}
              error={errors.ctaHref}
            />
          </div>
        </FormSection>

        <FormSection id="english" title="Version anglaise" description="Facultatif : chaque champ vide reprend le texte français sur /en.">
          <AutoTranslate pairs={TRANSLATED} />
          <details className="group" open={Boolean(project?.en)}>
            <summary className="cursor-pointer text-sm font-medium text-accent">
              {project?.en ? "Masquer / afficher les champs anglais" : "Ajouter une version anglaise"}
            </summary>
            <div className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput name="en_title" label="Name" optional defaultValue={en.title ?? ""} />
                <TextInput name="en_ctaLabel" label="Button label" optional defaultValue={en.ctaLabel ?? ""} />
              </div>
              <TextArea name="en_summary" label="Short description" optional rows={3} defaultValue={en.summary ?? ""} />
              <TextInput
                name="en_technologies"
                label="Technologies (comma separated)"
                description="Only if names differ in English (e.g. « Tâches planifiées » → « Scheduled jobs »)."
                optional
                defaultValue={formatField("csv", en.technologies)}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput name="en_seoTitle" label="SEO title" optional defaultValue={en.seoTitle ?? ""} />
                <TextInput name="en_seoDescription" label="SEO description" optional defaultValue={en.seoDescription ?? ""} />
              </div>
              {["story", "solution", "role", "architecture", "outcome", "cta"].map((group) => (
                <CaseStudyGroup key={group} group={group} values={en.caseStudy} prefix="en_cs_" />
              ))}
            </div>
          </details>
        </FormSection>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 sm:px-6 lg:px-10 [&>button]:flex-1 sm:[&>button]:flex-none">
            <div className="mr-auto hidden min-w-0 items-center gap-2 text-sm sm:flex">
              <StatusBadge status={status} />
              <span className={cx("hidden truncate sm:inline", dirty ? "text-amber-700" : "text-navy/50")} aria-live="polite">
                {dirty ? "Modifications non enregistrées" : isNew ? "Nouvelle réalisation" : "Tout est enregistré"}
              </span>
            </div>
            <span className="hidden sm:inline">
              <Link href="/admin/projets" className={buttonClass({ variant: "ghost" })}>
                Annuler
              </Link>
            </span>
            {status !== "published" && (
              <Button
                type="submit"
                variant="secondary"
                name="intent"
                value="draft"
                onClick={submitWith("draft")}
                pending={isPending && intent === "draft"}
                pendingLabel="Enregistrement…"
                disabled={isPending}
              >
                <Save size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Enregistrer le brouillon</span>
                <span className="sm:hidden">Brouillon</span>
              </Button>
            )}
            <Button
              type="submit"
              variant="secondary"
              name="intent"
                value="preview"
                onClick={submitWith("preview")}
              pending={isPending && intent === "preview"}
              disabled={isPending}
              title="Enregistre puis affiche la page telle qu'elle apparaîtra"
            >
              <Eye size={16} aria-hidden="true" />
              Aperçu
            </Button>
            {status === "published" ? (
              <Button type="submit" name="intent"
                value="save"
                onClick={submitWith("save")} pending={isPending && intent === "save"} pendingLabel="Enregistrement…" disabled={isPending}>
                <Save size={16} aria-hidden="true" />
                Enregistrer
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                name="intent"
                value="publish"
                onClick={submitWith("publish")}
                pending={isPending && intent === "publish"}
                pendingLabel="Publication…"
                disabled={isPending}
              >
                <Send size={16} aria-hidden="true" />
                Publier
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
