"use client"

import { useCallback, useEffect, useId, useRef, useState, useTransition } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { MoreHorizontal, X } from "lucide-react"
import { Button, cx } from "./primitives"

/* ---------- Focus helpers ---------- */

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'

function useDialogBehaviour(open, onClose, panelRef, initialFocusRef) {
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusTarget = initialFocusRef?.current ?? panelRef.current?.querySelector(FOCUSABLE)
    focusTarget?.focus()

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== "Tab" || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open, onClose, panelRef, initialFocusRef])
}

/* ---------- Confirm dialog (destructive actions only) ---------- */

export function ConfirmDialog({ open, title, description, confirmLabel = "Supprimer", onConfirm, onCancel, pending }) {
  const panelRef = useRef(null)
  const cancelRef = useRef(null)
  const titleId = useId()
  const descId = useId()
  useDialogBehaviour(open, onCancel, panelRef, cancelRef)
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" onClick={onCancel} aria-hidden="true" />
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
      >
        <h2 id={titleId} className="font-heading text-lg font-semibold text-navy">
          {title}
        </h2>
        <p id={descId} className="mt-2 text-sm leading-relaxed text-navy/65">
          {description}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button ref={cancelRef} variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="danger" onClick={onConfirm} pending={pending}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ---------- Side sheet (short create / edit forms) ---------- */

export function Sheet({ open, onClose, title, description, children, footer }) {
  const panelRef = useRef(null)
  const titleId = useId()
  useDialogBehaviour(open, onClose, panelRef)
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl animate-[sheet-in_0.2s_ease-out]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} className="font-heading text-lg font-semibold text-navy">
              {title}
            </h2>
            {description && <p className="mt-0.5 text-sm text-navy/60">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panneau"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy/60 hover:bg-navy/5 hover:text-navy"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 sm:px-6">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

/* ---------- Dropdown menu ---------- */

export function DropdownMenu({ label = "Plus d'actions", items, align = "right" }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()
        const entries = [...(rootRef.current?.querySelectorAll('[role="menuitem"]') ?? [])]
        const index = entries.indexOf(document.activeElement)
        const next = event.key === "ArrowDown" ? (index + 1) % entries.length : (index - 1 + entries.length) % entries.length
        entries[next]?.focus()
      }
    }
    document.addEventListener("mousedown", onPointer)
    document.addEventListener("keydown", onKey)
    rootRef.current?.querySelector('[role="menuitem"]')?.focus()
    return () => {
      document.removeEventListener("mousedown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const visible = items.filter(Boolean)

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy/60 hover:bg-navy/5 hover:text-navy"
      >
        <MoreHorizontal size={18} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          className={cx(
            "absolute z-30 mt-1 min-w-52 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {visible.map((item) =>
            item.separator ? (
              <div key={item.key} role="separator" className="my-1 border-t border-gray-100" />
            ) : (
              <button
                key={item.key ?? item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  item.onSelect()
                }}
                className={cx(
                  "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm focus:bg-gray-50 focus:outline-none hover:bg-gray-50",
                  item.danger ? "text-red-600" : "text-navy"
                )}
              >
                {item.icon && <item.icon size={16} aria-hidden="true" className="shrink-0 opacity-70" />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

/* ---------- Server action runner with feedback ---------- */

/**
 * Runs a server action, shows a toast and refreshes the route.
 * The action may return { error } to report a handled failure.
 */
export function useAction() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [pendingKey, setPendingKey] = useState(null)

  const run = useCallback(
    (action, { success, error = "L'action n'a pas pu aboutir. Réessayez.", key, onDone, refresh = true } = {}) => {
      setPendingKey(key ?? null)
      startTransition(async () => {
        try {
          const result = await action()
          if (result?.error) {
            toast.error(result.error)
            return
          }
          if (success) toast.success(success)
          onDone?.(result)
          if (refresh) router.refresh()
        } catch (err) {
          // Next.js redirects are thrown errors: let them through.
          if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err
          toast.error(error)
        } finally {
          setPendingKey(null)
        }
      })
    },
    [router]
  )

  return { run, pending, pendingKey }
}

/** Confirm-then-run helper for destructive actions. */
export function useConfirm() {
  const [state, setState] = useState(null)
  const ask = useCallback((options) => setState(options), [])
  const close = useCallback(() => setState(null), [])
  const dialog = (
    <ConfirmDialog
      open={Boolean(state)}
      title={state?.title}
      description={state?.description}
      confirmLabel={state?.confirmLabel}
      onCancel={close}
      onConfirm={() => {
        state?.onConfirm()
        close()
      }}
    />
  )
  return { ask, dialog }
}
