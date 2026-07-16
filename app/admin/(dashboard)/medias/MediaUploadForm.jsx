"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { uploadMediaAction } from "../../../../lib/actions/media"
import { inputClass, labelClass, fileInputClass } from "../_components/formStyles"

const initialState = { error: null }

export default function MediaUploadForm({ onSuccess }) {
  const [state, formAction, isPending] = useActionState(uploadMediaAction, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success("Média ajouté.")
      onSuccess?.()
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className={labelClass}>Fichier</label>
        <input type="file" name="file" accept="image/*,application/pdf" required className={fileInputClass} />
      </div>
      <div>
        <label className={labelClass}>Texte alternatif</label>
        <input name="alt" className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-navy text-white text-sm font-semibold px-4 py-2.5 hover:bg-institutional transition-colors disabled:opacity-50"
      >
        {isPending ? "Envoi..." : "Uploader"}
      </button>
      {state?.error && <p className="text-sm text-red-600 w-full">{state.error}</p>}
    </form>
  )
}
