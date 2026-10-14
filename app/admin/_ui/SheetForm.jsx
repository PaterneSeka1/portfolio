"use client"

import { useActionState, useEffect, useId, useRef } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "./primitives"
import { Sheet } from "./overlays"

/**
 * Side panel holding a server-action form. Handles field errors, toasts,
 * closing and refreshing after a successful save.
 */
export default function SheetForm({ open, onClose, title, description, action, submitLabel = "Enregistrer", children }) {
  const router = useRouter()
  const formId = useId()
  const formRef = useRef(null)
  const [state, formAction, isPending] = useActionState(action, null)

  useEffect(() => {
    if (!state?.at) return
    if (state.error) {
      toast.error(state.error)
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    toast.success(state.message ?? "Enregistré.")
    onClose()
    router.refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" form={formId} pending={isPending} pendingLabel="Enregistrement…">
            {submitLabel}
          </Button>
        </div>
      }
    >
      <form id={formId} ref={formRef} action={formAction} noValidate className="space-y-5">
        {typeof children === "function" ? children(state?.fieldErrors ?? {}) : children}
      </form>
    </Sheet>
  )
}
