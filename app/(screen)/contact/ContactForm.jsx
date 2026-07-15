"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { contactSchema, projectTypes, timelines } from "../../../lib/validation/contact"

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-accent"
const labelClass = "block text-sm font-medium text-navy mb-1.5"

function FieldError({ message }) {
  if (!message) return null
  return <p className="text-sm text-red-600 mt-1">{message}</p>
}

export default function ContactForm({ referencedProject }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: referencedProject ? `Concernant le projet "${referencedProject.title}" : ` : "",
      website: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("request_failed")

      toast.success("Merci pour votre message, je reviens vers vous rapidement.")
      reset()
    } catch {
      toast.error("Une erreur est survenue. Merci de réessayer.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot anti-spam field, hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("website")}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Nom *</label>
          <input id="name" className={inputClass} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className={labelClass}>Entreprise</label>
          <input id="company" className={inputClass} {...register("company")} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Téléphone</label>
          <input id="phone" className={inputClass} {...register("phone")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="projectType" className={labelClass}>Type de projet *</label>
          <select id="projectType" className={inputClass} {...register("projectType")} defaultValue="">
            <option value="" disabled>Sélectionnez un type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <FieldError message={errors.projectType?.message} />
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>Délai *</label>
          <select id="timeline" className={inputClass} {...register("timeline")} defaultValue="">
            <option value="" disabled>Sélectionnez un délai</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError message={errors.timeline?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>Budget (facultatif)</label>
        <input id="budget" className={inputClass} placeholder="Ex. : à définir ensemble" {...register("budget")} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea id="message" rows={6} className={inputClass} {...register("message")} />
        <FieldError message={errors.message?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  )
}
