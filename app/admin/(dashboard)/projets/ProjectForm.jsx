"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { inputClass, labelClass, checkboxClass } from "../_components/formStyles"

const initialState = { error: null }

function arr(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export default function ProjectForm({ action, project, onSuccess }) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const cs = project?.caseStudy ?? {}

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
            <input name="ctaLabel" defaultValue={project?.cta?.label ?? "Demander une démonstration"} className={inputClass} required />
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
            Projet vedette
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
        <h2 className="font-heading font-semibold text-navy">Étude de cas</h2>

        <div>
          <label className={labelClass}>Contexte</label>
          <textarea name="context" defaultValue={cs.context ?? ""} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Problème</label>
          <textarea name="problem" defaultValue={cs.problem ?? ""} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Objectifs (un par ligne)</label>
          <textarea name="objectives" defaultValue={arr(cs.objectives)} rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Utilisateurs et rôles (un par ligne)</label>
          <textarea name="users" defaultValue={arr(cs.users)} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Fonctionnalités (une par ligne)</label>
          <textarea name="features" defaultValue={arr(cs.features)} rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Architecture</label>
          <textarea name="architecture" defaultValue={cs.architecture ?? ""} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Stack (séparée par des virgules)</label>
          <input name="stack" defaultValue={cs.stack?.join(", ") ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Défis (un par ligne)</label>
          <textarea name="challenges" defaultValue={arr(cs.challenges)} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Solutions (une par ligne)</label>
          <textarea name="solutions" defaultValue={arr(cs.solutions)} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Résultats (un par ligne)</label>
          <textarea name="results" defaultValue={arr(cs.results)} rows={2} className={inputClass} />
        </div>
      </section>

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
