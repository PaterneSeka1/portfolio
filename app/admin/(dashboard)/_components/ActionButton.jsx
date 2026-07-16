"use client"

import { useState, useTransition } from "react"
import toast from "react-hot-toast"
import Modal from "./Modal"

const ERROR_FALLBACK = "Une erreur est survenue."

export default function ActionButton({
  action,
  icon: Icon,
  label,
  className = "p-2 rounded-lg text-navy/60 hover:bg-gray-light",
  successMessage,
  confirm,
  confirmLabel = "Supprimer",
  onSuccess,
  children,
}) {
  const [isPending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)

  const run = () => {
    setShowConfirm(false)
    startTransition(async () => {
      try {
        await action()
        if (successMessage) toast.success(successMessage)
        onSuccess?.()
      } catch {
        toast.error(ERROR_FALLBACK)
      }
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (confirm ? setShowConfirm(true) : run())}
        disabled={isPending}
        className={`${className} disabled:opacity-50`}
        title={label}
        aria-label={label}
      >
        <Icon size={16} />
        {children}
      </button>

      {confirm && (
        <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Confirmer" maxWidth="max-w-sm">
          <p className="text-sm text-navy/70 mb-6">{confirm}</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-navy hover:border-accent transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={run}
              className="rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              {confirmLabel}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
