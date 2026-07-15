"use client"

import { useActionState } from "react"
import { uploadMediaAction } from "../../../../lib/actions/media"

const initialState = { error: null }

export default function MediaUploadForm() {
  const [state, formAction, isPending] = useActionState(uploadMediaAction, initialState)

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3 rounded-2xl border border-gray-200 bg-white p-5">
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Fichier</label>
        <input type="file" name="file" accept="image/*,application/pdf" required className="text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Texte alternatif</label>
        <input
          name="alt"
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent"
        />
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
