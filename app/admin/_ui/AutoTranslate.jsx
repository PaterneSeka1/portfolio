"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, Languages, Loader2, RefreshCw } from "lucide-react"
import { translateFrToEn } from "../../../lib/admin/translate"
import { cx } from "./primitives"

// Highlight for English fields filled by the machine, removed as soon as the admin edits them.
const AUTO_CLASSES = ["!bg-amber-50", "!border-amber-300"]

// Translations already fetched in this browser tab, keyed by French segment.
const cache = new Map()

function split(kind, value) {
  if (kind === "lines") return value.split("\n").map((v) => v.trim()).filter(Boolean)
  if (kind === "csv") return value.split(",").map((v) => v.trim()).filter(Boolean)
  return [value.trim()]
}

function join(kind, parts) {
  if (kind === "lines") return parts.join("\n")
  if (kind === "csv") return parts.join(", ")
  return parts[0]
}

/** Sets an uncontrolled field's value so that React's onChange (dirty state) still fires. */
function setFieldValue(element, value) {
  const proto = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  Object.getOwnPropertyDescriptor(proto, "value").set.call(element, value)
  element.dispatchEvent(new Event("input", { bubbles: true }))
}

/**
 * Pre-fills the English fields of the surrounding form from their French
 * counterparts, when the form opens and each time a field is left. Only empty
 * fields, or fields still holding an untouched machine translation, are
 * written: nothing typed by hand is ever overwritten. Saving the form is what
 * validates the suggestion.
 *
 * `pairs` is a list of { fr, en, kind } field names (see translationPairs()).
 */
export default function AutoTranslate({ pairs, className }) {
  const anchorRef = useRef(null)
  const pairsRef = useRef(pairs)
  const syncRef = useRef(null)
  const [status, setStatus] = useState({ state: "idle" })

  useEffect(() => {
    pairsRef.current = pairs
  })

  useEffect(() => {
    const form = anchorRef.current?.closest("form")
    if (!form) return
    const memory = {} // English field name -> { source, value } last written by this component
    let run = 0

    const read = (name) => {
      const element = form.elements.namedItem(name)
      return element && "value" in element ? element : null
    }

    async function sync() {
      const jobs = []
      for (const { fr, en, kind } of pairsRef.current) {
        const source = read(fr)?.value.trim() ?? ""
        const target = read(en)
        if (!source || !target) continue
        const known = memory[en]
        const current = target.value.trim()
        const untouched = !current || (known && current === known.value)
        if (!untouched || known?.source === source) continue
        jobs.push({ fr, en, kind, source, target, segments: split(kind, source) })
      }
      if (!jobs.length) return

      const id = ++run
      const missing = [...new Set(jobs.flatMap((job) => job.segments))].filter((segment) => !cache.has(segment))
      if (missing.length) {
        setStatus((prev) => ({ ...prev, pending: true }))
        let translations
        try {
          translations = await translateFrToEn(missing)
        } catch (error) {
          if (id === run) setStatus({ state: "error", message: error.message })
          return
        }
        if (id !== run) return
        missing.forEach((segment, index) => cache.set(segment, translations[index]))
      }

      let filled = 0
      for (const job of jobs) {
        // Skip fields changed while the request was running; the next sync picks them up.
        if (read(job.fr)?.value.trim() !== job.source) continue
        const current = job.target.value.trim()
        if (current && current !== memory[job.en]?.value) continue

        const translated = job.segments.map((segment) => cache.get(segment) ?? segment)
        // Identical text (names, technologies…) stays empty: the site falls back to French.
        const next = translated.every((text, index) => text === job.segments[index]) ? "" : join(job.kind, translated)
        if (job.target.value !== next) setFieldValue(job.target, next)
        memory[job.en] = { source: job.source, value: next }
        if (next) {
          filled += 1
          job.target.classList.add(...AUTO_CLASSES)
          const details = job.target.closest("details")
          if (details) details.open = true
        } else {
          job.target.classList.remove(...AUTO_CLASSES)
        }
      }
      setStatus((prev) => ({ state: filled || prev.state === "done" ? "done" : "idle" }))
    }
    syncRef.current = sync

    let debounce
    const schedule = (delay) => {
      clearTimeout(debounce)
      debounce = setTimeout(sync, delay)
    }
    const onInput = (event) => {
      if (event.isTrusted) event.target.classList?.remove(...AUTO_CLASSES)
    }
    const onFocusOut = () => schedule(400)
    form.addEventListener("input", onInput)
    form.addEventListener("focusout", onFocusOut)
    schedule(200)
    return () => {
      run += 1
      clearTimeout(debounce)
      form.removeEventListener("input", onInput)
      form.removeEventListener("focusout", onFocusOut)
    }
  }, [])

  const { state, pending, message } = status
  return (
    <div
      ref={anchorRef}
      aria-live="polite"
      className={cx(
        "flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm",
        state === "error" ? "bg-red-50 text-red-700" : state === "done" ? "bg-amber-50 text-amber-800" : "bg-navy/[0.04] text-navy/65",
        className
      )}
    >
      {pending ? (
        <Loader2 size={16} className="mt-0.5 shrink-0 animate-spin" aria-hidden="true" />
      ) : state === "error" ? (
        <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      ) : (
        <Languages size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      )}
      <p className="min-w-0 flex-1">
        {pending
          ? "Traduction automatique en cours…"
          : state === "error"
            ? message
            : state === "done"
              ? "Traduction automatique ajoutée : relisez les champs anglais surlignés, corrigez-les si besoin, puis enregistrez pour valider."
              : "Les champs anglais vides sont pré-remplis automatiquement à partir du français."}
      </p>
      {state === "error" && (
        <button
          type="button"
          onClick={() => {
            setStatus({ state: "idle" })
            syncRef.current?.()
          }}
          className="inline-flex shrink-0 items-center gap-1 font-medium underline-offset-2 hover:underline"
        >
          <RefreshCw size={14} aria-hidden="true" />
          Réessayer
        </button>
      )}
    </div>
  )
}
