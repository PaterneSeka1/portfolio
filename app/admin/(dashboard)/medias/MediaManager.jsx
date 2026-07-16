"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import Modal from "../_components/Modal"
import MediaUploadForm from "./MediaUploadForm"
import MediaGrid from "./MediaGrid"

export default function MediaManager({ items }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    router.refresh()
  }, [router])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Médias</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Plus size={16} />
          Ajouter un média
        </button>
      </div>

      <MediaGrid items={items} />

      <Modal open={open} onClose={close} title="Ajouter un média">
        <MediaUploadForm onSuccess={close} />
      </Modal>
    </div>
  )
}
