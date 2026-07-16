"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { Upload } from "lucide-react"
import { importDataAction } from "../../../../lib/actions/settings"

const initialState = { error: null }

export default function ImportForm() {
  const [state, formAction, isPending] = useActionState(importDataAction, initialState)

  useEffect(() => {
    if (state?.success) toast.success("Import réussi.")
    else if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <input type="file" name="file" accept="application/json" required className="text-sm" />
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-navy hover:border-accent transition-colors disabled:opacity-50"
      >
        <Upload size={16} />
        {isPending ? "Import en cours..." : "Importer"}
      </button>
      {state?.error && <p className="text-sm text-red-600 w-full">{state.error}</p>}
    </form>
  )
}
