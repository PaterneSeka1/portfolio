"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { inputClass, labelClass, checkboxClass } from "../_components/formStyles"

const initialState = { error: null }

export default function ExperienceForm({ action, experience, onSuccess }) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success(experience ? "Expérience mise à jour." : "Expérience créée.")
      onSuccess?.(state)
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

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
        <input type="checkbox" name="published" defaultChecked={experience?.published ?? true} className={checkboxClass} />
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
