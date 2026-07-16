"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { ICONS } from "../../../../lib/validation/expertise"

const inputClass =
  "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent"
const labelClass = "block text-sm font-medium text-navy mb-1.5"

const initialState = { error: null }

export default function ExpertiseForm({ action, expertise, onSuccess }) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success(expertise ? "Expertise mise à jour." : "Expertise créée.")
      onSuccess?.(state)
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      <div>
        <label className={labelClass}>Titre</label>
        <input name="title" defaultValue={expertise?.title ?? ""} className={inputClass} required />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" defaultValue={expertise?.description ?? ""} rows={3} className={inputClass} required />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Icône</label>
          <select name="icon" defaultValue={expertise?.icon ?? ICONS[0]} className={inputClass}>
            {ICONS.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Ordre</label>
          <input type="number" name="order" defaultValue={expertise?.order ?? 0} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Technologies (séparées par des virgules)</label>
        <input
          name="technologies"
          defaultValue={expertise?.technologies?.join(", ") ?? ""}
          className={inputClass}
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-navy">
        <input type="checkbox" name="visible" defaultChecked={expertise?.visible ?? true} className="h-4 w-4" />
        Visible sur le site
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
