"use client"

import { useId, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"
import { Field, cx } from "./primitives"

/**
 * Chip input stored in a hidden comma-separated field. Suggestions come from
 * the technologies already declared in the admin, to avoid retyping them.
 */
export default function TagInput({ name, label, description, error, required, defaultValue = [], suggestions = [], onChange, placeholder }) {
  const [tags, setTags] = useState(defaultValue)
  const [draft, setDraft] = useState("")
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const listId = useId()
  const inputId = `${name}-input`

  const update = (next) => {
    setTags(next)
    onChange?.(next)
  }

  const add = (value) => {
    const clean = value.replace(/,/g, " ").trim()
    if (!clean || tags.some((tag) => tag.toLowerCase() === clean.toLowerCase())) return
    update([...tags, clean])
    setDraft("")
  }

  const matches = useMemo(() => {
    const term = draft.trim().toLowerCase()
    return suggestions
      .filter((s) => !tags.some((tag) => tag.toLowerCase() === s.name.toLowerCase()))
      .filter((s) => !term || s.name.toLowerCase().includes(term))
      .slice(0, 8)
  }, [draft, suggestions, tags])

  return (
    <Field id={inputId} label={label} description={description} error={error} required={required}>
      <input type="hidden" name={name} value={tags.join(", ")} />
      <div
        className={cx(
          "relative flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border bg-white px-2 py-1.5 shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25",
          error ? "border-red-500" : "border-gray-300"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-navy/[0.06] py-1 pl-2 pr-1 text-sm text-navy">
            {tag}
            <button
              type="button"
              onClick={() => update(tags.filter((t) => t !== tag))}
              aria-label={`Retirer ${tag}`}
              className="inline-flex h-6 w-6 items-center justify-center rounded text-navy/50 hover:bg-navy/10 hover:text-navy"
            >
              <X size={13} aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault()
              add(draft)
            } else if (event.key === "Backspace" && !draft && tags.length) {
              update(tags.slice(0, -1))
            } else if (event.key === "Escape") {
              setOpen(false)
            }
          }}
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={[description && `${inputId}-description`, error && `${inputId}-error`].filter(Boolean).join(" ") || undefined}
          placeholder={tags.length ? "" : placeholder}
          className="min-w-32 flex-1 border-0 bg-transparent px-1 py-1 text-[15px] text-navy placeholder:text-navy/35 focus:outline-none"
        />
        {open && matches.length > 0 && (
          <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {matches.map((s) => (
              <li key={`${s.category}-${s.name}`} role="option" aria-selected="false">
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => add(s.name)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <span className="text-navy">{s.name}</span>
                  <span className="text-xs text-navy/45">{s.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Field>
  )
}
