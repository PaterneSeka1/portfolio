"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { inputClass, labelClass, checkboxClass } from "../_components/formStyles"
import { CASE_STUDY_FIELDS, formatField } from "../../../../lib/admin/form-fields"

const initialState = { error: null }

function CaseStudyFields({ prefix, values }) {
  return CASE_STUDY_FIELDS.map((field) => {
    const id = `${prefix}${field.key}`
    const defaultValue = formatField(field.kind, values?.[field.key])
    const className = `${inputClass} ${field.mono ? "font-mono text-sm" : ""}`
    return (
      <div key={id}>
        <label htmlFor={id} className={labelClass}>{field.label}</label>
        {field.rows === 1 ? (
          <input id={id} name={id} defaultValue={defaultValue} className={className} />
        ) : (
          <textarea id={id} name={id} defaultValue={defaultValue} rows={field.rows} className={className} />
        )}
      </div>
    )
  })
}

function EnField({ name, label, defaultValue, rows }) {
  const id = `en_${name}`
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      {rows ? (
        <textarea id={id} name={id} defaultValue={defaultValue ?? ""} rows={rows} className={inputClass} />
      ) : (
        <input id={id} name={id} defaultValue={defaultValue ?? ""} className={inputClass} />
      )}
    </div>
  )
}

export default function ProjectForm({ action, project, onSuccess }) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const cs = project?.caseStudy ?? {}
  const en = project?.en ?? {}

  useEffect(() => {
    if (state?.success) {
      toast.success(project ? "Projet mis à jour." : "Projet créé.")
      onSuccess?.(state)
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      <section className="space-y-5">
        <h2 className="font-heading font-semibold text-navy">Informations générales</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Titre</label>
            <input name="title" defaultValue={project?.title ?? ""} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input name="slug" defaultValue={project?.slug ?? ""} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Résumé</label>
          <textarea name="summary" defaultValue={project?.summary ?? ""} rows={3} className={inputClass} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Type</label>
            <select name="category" defaultValue={project?.category ?? "business"} className={inputClass}>
              <option value="business">Application métier</option>
              <option value="saas">Produit SaaS</option>
              <option value="website">Site web</option>
              <option value="ai">Intégration IA</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Confidentialité</label>
            <select name="visibility" defaultValue={project?.visibility ?? "private"} className={inputClass}>
              <option value="public">Public</option>
              <option value="private">Privé</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Technologies (séparées par des virgules)</label>
          <input name="technologies" defaultValue={project?.technologies?.join(", ") ?? ""} className={inputClass} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>URL publique (facultatif)</label>
            <input name="publicUrl" defaultValue={project?.publicUrl ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>URL GitHub (facultatif)</label>
            <input name="githubUrl" defaultValue={project?.githubUrl ?? ""} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Libellé du CTA</label>
            <input name="ctaLabel" defaultValue={project?.cta?.label ?? "Discutons-en"} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Lien du CTA</label>
            <input name="ctaHref" defaultValue={project?.cta?.href ?? ""} className={inputClass} required />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Ordre</label>
            <input type="number" name="order" defaultValue={project?.order ?? 0} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm text-navy pt-7">
            <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} className={checkboxClass} />
            Projet principal (mis en avant)
          </label>
          <label className="flex items-center gap-2 text-sm text-navy pt-7">
            <input type="checkbox" name="published" defaultChecked={project?.published ?? false} className={checkboxClass} />
            Publié
          </label>
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">SEO</h2>
        <div>
          <label className={labelClass}>Titre SEO (facultatif)</label>
          <input name="seoTitle" defaultValue={project?.seoTitle ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description SEO (facultatif)</label>
          <textarea name="seoDescription" defaultValue={project?.seoDescription ?? ""} rows={2} className={inputClass} />
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Étude de cas (français)</h2>
        <p className="text-sm text-navy/60">
          Les champs vides ne sont pas affichés. N&apos;indiquez que des informations exactes : pas de chiffres,
          de clients ni de résultats inventés, aucune donnée interne.
        </p>
        <CaseStudyFields prefix="cs_" values={cs} />
      </section>

      <details className="border-t border-gray-100 pt-6 group">
        <summary className="cursor-pointer font-heading font-semibold text-navy">Version anglaise (/en)</summary>
        <div className="space-y-5 mt-5">
          <p className="text-sm text-navy/60">
            Champs facultatifs : un champ vide reprend la version française.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            <EnField name="title" label="Title" defaultValue={en.title} />
            <EnField name="ctaLabel" label="CTA label" defaultValue={en.ctaLabel} />
          </div>
          <EnField name="summary" label="Summary" defaultValue={en.summary} rows={3} />
          <EnField name="technologies" label="Technologies (comma separated)" defaultValue={formatField("csv", en.technologies)} />
          <EnField name="seoTitle" label="SEO title" defaultValue={en.seoTitle} />
          <EnField name="seoDescription" label="SEO description" defaultValue={en.seoDescription} rows={2} />
          <h3 className="font-heading font-semibold text-navy pt-2">Case study</h3>
          <CaseStudyFields prefix="en_cs_" values={en.caseStudy} />
        </div>
      </details>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-navy text-white font-semibold px-6 py-2.5 hover:bg-institutional transition-colors disabled:opacity-50"
      >
        {isPending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  )
}
