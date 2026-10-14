"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ExternalLink, Save } from "lucide-react"
import { Button, Card, CardHeader, FormSection, TextArea, TextInput, cx } from "../../_ui/primitives"
import { updateSeoAction } from "../../../../lib/actions/settings"

function Counter({ value, max, min = 0 }) {
  const bad = value.length > max || (value.length > 0 && value.length < min)
  return <span className={cx("text-xs", bad ? "text-red-600" : "text-navy/45")}>{value.length} / {max}</span>
}

export default function SeoEditor({ settings, defaults, english, siteUrl }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(updateSeoAction, null)
  const [title, setTitle] = useState(settings.seoTitle)
  const [description, setDescription] = useState(settings.seoDescription)
  const errors = state?.fieldErrors ?? {}
  const host = siteUrl.replace(/^https?:\/\//, "")

  useEffect(() => {
    if (!state?.at) return
    if (state.error) toast.error(state.error)
    else {
      toast.success(state.message)
      router.refresh()
    }
  }, [state, router])

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <form action={formAction} noValidate className="space-y-5">
        <FormSection title="Page d'accueil (français)" description="Laissez vide pour utiliser le texte par défaut, rédigé pour le positionnement actuel.">
          <TextInput
            name="seoTitle"
            label="Titre"
            optional
            value={title}
            placeholder={defaults.title}
            onChange={(event) => setTitle(event.target.value)}
            error={errors.seoTitle}
          />
          <div className="-mt-3 text-right">
            <Counter value={title} max={70} />
          </div>
          <TextArea
            name="seoDescription"
            label="Description"
            optional
            rows={3}
            value={description}
            placeholder={defaults.description}
            onChange={(event) => setDescription(event.target.value)}
            error={errors.seoDescription}
          />
          <div className="-mt-3 text-right">
            <Counter value={description} max={170} min={50} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" pending={isPending} pendingLabel="Enregistrement…">
              <Save size={16} aria-hidden="true" />
              Enregistrer
            </Button>
          </div>
        </FormSection>

        <Card aria-labelledby="seo-en">
          <CardHeader id="seo-en" title="Version anglaise (/en)" description="Texte fixe défini avec le contenu du site." />
          <dl className="space-y-3 px-5 py-4 text-sm sm:px-6">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-navy/50">Title</dt>
              <dd className="mt-0.5 text-navy">{english.title}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-navy/50">Description</dt>
              <dd className="mt-0.5 text-navy/80">{english.description}</dd>
            </div>
          </dl>
        </Card>

        <Card aria-labelledby="seo-tech">
          <CardHeader id="seo-tech" title="Fichiers techniques" description="Générés automatiquement à partir du contenu publié." />
          <ul className="space-y-2 px-5 py-4 text-sm sm:px-6">
            {[
              ["/sitemap.xml", "Plan du site (pages FR et EN, réalisations publiées)"],
              ["/robots.txt", "Instructions pour les moteurs (admin et API exclus)"],
            ].map(([path, label]) => (
              <li key={path}>
                <a href={path} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                  {path}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
                <span className="text-navy/55"> — {label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </form>

      <div className="space-y-5">
        <Card aria-labelledby="google-preview" className="overflow-hidden">
          <CardHeader id="google-preview" title="Aperçu dans Google" />
          <div className="px-5 py-4 sm:px-6">
            <p className="truncate text-xs text-navy/60">{host}</p>
            <p className="mt-1 line-clamp-1 text-lg leading-snug text-[#1a0dab]">{title || defaults.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-navy/70">{description || defaults.description}</p>
          </div>
        </Card>
        <Card aria-labelledby="og-preview" className="overflow-hidden">
          <CardHeader id="og-preview" title="Carte de partage" description="Image identique pour toutes les pages, en français et en anglais." />
          <div className="space-y-3 p-4">
            {["fr", "en"].map((locale) => (
              <figure key={locale}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/og/${locale}`} alt={`Carte de partage ${locale.toUpperCase()}`} className="w-full rounded-lg border border-gray-200" loading="lazy" />
                <figcaption className="mt-1 text-xs text-navy/50">{locale === "fr" ? "Français" : "Anglais"} · 1200 × 630</figcaption>
              </figure>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
