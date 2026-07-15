"use client"

import { useActionState, useEffect } from "react"
import { Download } from "lucide-react"
import { exportDataAction } from "../../../../lib/actions/settings"

async function exportWrapper() {
  return exportDataAction()
}

export default function ExportButton() {
  const [state, formAction, isPending] = useActionState(exportWrapper, null)

  useEffect(() => {
    if (!state) return
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `portfolio-export-${state.exportedAt.slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [state])

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-navy hover:border-accent transition-colors disabled:opacity-50"
      >
        <Download size={16} />
        {isPending ? "Export en cours..." : "Exporter (JSON)"}
      </button>
    </form>
  )
}
