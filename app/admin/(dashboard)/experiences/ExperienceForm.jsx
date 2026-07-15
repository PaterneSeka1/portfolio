"use client"

import { useActionState } from "react"

const inputClass =
  "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent"
const labelClass = "block text-sm font-medium text-navy mb-1.5"

const initialState = { error: null }

export default function ExperienceForm({ action, experience }) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Entreprise</label>
          <input name="company" defaultValue={experience?.company ?? ""} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Poste</label>
          <input name="role" defaultValue={experience?.role ?? ""} className={inputClass} required />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Période (facultatif)</label>
          <input name="period" defaultValue={experience?.period ?? ""} placeholder="Ex. : 2023 – aujourd'hui" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Ordre</label>
          <input type="number" name="order" defaultValue={experience?.order ?? 0} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Missions (une par ligne)</label>
        <textarea
          name="missions"
          defaultValue={experience?.missions?.join("\n") ?? ""}
          rows={4}
          className={inputClass}
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-navy">
        <input type="checkbox" name="published" defaultChecked={experience?.published ?? true} className="h-4 w-4" />
        Publié sur le site
      </label>

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
