"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react"
import { createContactSchema, projectTypeKeys } from "../../../lib/validation/contact"
import { trackEvent } from "../../../lib/analytics"

const inputClass =
  "w-full rounded-control border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/35 transition-surface hover:border-white/25 focus:border-accent-light focus:outline-none focus:ring-2 focus:ring-accent-light/40 aria-[invalid=true]:border-red-400"
const labelClass = "mb-2 block text-sm font-medium text-white/85"

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-300">
      {message}
    </p>
  )
}

export default function ContactForm({ locale, labels, projectTypes, validation, project }) {
  const schema = useMemo(() => createContactSchema(validation), [validation])
  // Result of the last submission, announced in a live region below the button.
  const [status, setStatus] = useState("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      projectType: project?.category === "ai" ? "ai" : project ? "business" : "",
      message: "",
      website: "",
      locale,
      project: project?.slug ?? "",
    },
  })

  const onSubmit = async (data) => {
    setStatus("idle")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("request_failed")
      setStatus("success")
      trackEvent("contact_submit", { projectType: data.projectType, project: data.project || undefined })
      reset({ ...data, name: "", company: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  const fieldProps = (name) => ({
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-busy={isSubmitting}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("locale")} />
      <input type="hidden" {...register("project")} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {labels.name}{" "}
            <span aria-hidden="true" className="text-accent-light">
              *
            </span>
          </label>
          <input
            id="name"
            autoComplete="name"
            required
            className={inputClass}
            {...fieldProps("name")}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {labels.company} <span className="text-white/50">({labels.optional})</span>
          </label>
          <input id="company" autoComplete="organization" className={inputClass} {...register("company")} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            {labels.email}{" "}
            <span aria-hidden="true" className="text-accent-light">
              *
            </span>
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className={inputClass}
            {...fieldProps("email")}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="projectType" className={labelClass}>
            {labels.projectType}{" "}
            <span aria-hidden="true" className="text-accent-light">
              *
            </span>
          </label>
          <select
            id="projectType"
            required
            className={`${inputClass} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff99' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            {...fieldProps("projectType")}
            {...register("projectType")}
          >
            <option value="" disabled className="bg-ink">
              {labels.projectTypePlaceholder}
            </option>
            {projectTypeKeys.map((key) => (
              <option key={key} value={key} className="bg-ink">
                {projectTypes[key]}
              </option>
            ))}
          </select>
          <FieldError id="projectType-error" message={errors.projectType?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {labels.message}{" "}
          <span aria-hidden="true" className="text-accent-light">
            *
          </span>
        </label>
        <textarea
          id="message"
          rows={6}
          required
          placeholder={labels.messagePlaceholder}
          className={inputClass}
          {...fieldProps("message")}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-accent px-6 py-3 font-semibold text-white shadow-[0_10px_30px_-12px_rgb(37_99_235/0.7)] transition-surface hover:bg-[#1d4fd8] active:translate-y-px disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? (
            <LoaderCircle size={18} aria-hidden="true" className="animate-spin" />
          ) : (
            <ArrowRight size={18} aria-hidden="true" className="arrow-nudge" />
          )}
          {isSubmitting ? labels.submitting : labels.submit}
        </button>
      </div>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="flex items-start gap-3 rounded-card border border-success/30 bg-success/10 p-4 text-[15px] text-white/90">
            <CheckCircle2 size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
            {labels.success}
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-3 rounded-card border border-red-400/30 bg-red-400/10 p-4 text-[15px] text-white/90">
            <AlertCircle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-red-300" />
            {labels.error}
          </p>
        )}
      </div>
    </form>
  )
}
