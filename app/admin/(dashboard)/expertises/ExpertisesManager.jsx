"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, Eye, EyeOff, Trash2 } from "lucide-react"
import Modal from "../_components/Modal"
import ActionButton from "../_components/ActionButton"
import ExpertiseForm from "./ExpertiseForm"
import { createExpertiseAction, updateExpertiseAction, deleteExpertiseAction, toggleExpertiseVisibleAction } from "../../../../lib/actions/expertises"

export default function ExpertisesManager({ expertises }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const editId = searchParams.get("edit")
    if (editId && expertises.some((e) => e.id === editId)) {
      setModal({ mode: "edit", id: editId })
    } else if (searchParams.get("new") === "1") {
      setModal({ mode: "create" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => {
    setModal(null)
    if (searchParams.get("edit") || searchParams.get("new")) {
      router.replace("/admin/expertises")
    } else {
      router.refresh()
    }
  }, [router, searchParams])

  const editingExpertise = modal?.mode === "edit" ? expertises.find((e) => e.id === modal.id) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Expertises</h1>
        <button
          type="button"
          onClick={() => setModal({ mode: "create" })}
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
        {expertises.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => setModal({ mode: "edit", id: item.id })}
                className="font-medium text-navy hover:text-accent text-left truncate block"
              >
                {item.title}
              </button>
              <p className="text-xs text-navy/50">{item.technologies.join(", ")}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ActionButton
                action={() => toggleExpertiseVisibleAction(item.id, item.visible)}
                icon={item.visible ? Eye : EyeOff}
                label={item.visible ? "Masquer" : "Afficher"}
                className="p-2 rounded-lg text-navy/60 hover:bg-gray-light"
                successMessage={item.visible ? "Expertise masquée." : "Expertise affichée."}
                onSuccess={() => router.refresh()}
              />
              <ActionButton
                action={() => deleteExpertiseAction(item.id)}
                icon={Trash2}
                label="Supprimer"
                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                confirm={`Supprimer définitivement l'expertise « ${item.title} » ?`}
                successMessage="Expertise supprimée."
                onSuccess={() => router.refresh()}
              />
            </div>
          </div>
        ))}
        {expertises.length === 0 && <p className="p-4 text-sm text-navy/50">Aucune expertise pour le moment.</p>}
      </div>

      <Modal open={modal?.mode === "create"} onClose={close} title="Nouvelle expertise">
        <ExpertiseForm action={createExpertiseAction} onSuccess={close} />
      </Modal>

      <Modal open={modal?.mode === "edit" && !!editingExpertise} onClose={close} title="Modifier l'expertise">
        {editingExpertise && (
          <ExpertiseForm
            action={updateExpertiseAction.bind(null, editingExpertise.id)}
            expertise={editingExpertise}
            onSuccess={close}
          />
        )}
      </Modal>
    </div>
  )
}
