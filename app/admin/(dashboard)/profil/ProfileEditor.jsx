"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FileText, Save, Upload } from "lucide-react"
import { Button, FormSection, TextArea, TextInput, Toggle, cx } from "../../_ui/primitives"
import { updateProfileAction } from "../../../../lib/actions/profile"
import { PROFILE_EN_SPEC, translationPairs } from "../../../../lib/admin/form-fields"
import AutoTranslate from "../../_ui/AutoTranslate"

const TRANSLATED = translationPairs(PROFILE_EN_SPEC)

const MAX = 4 * 1024 * 1024

function FilePicker({ name, label, accept, help, current, kind, error }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [localError, setLocalError] = useState(null)
  const shownError = localError ?? error

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-navy">{label}</p>
      <div className="flex items-center gap-4">
        {kind === "image" ? (
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            {(preview || current) && (
              // eslint-disable-next-line @next/next/no-img-element
              preview ? <img src={preview} alt="" className="h-full w-full object-cover object-top" /> : <Image src={current} alt="" fill sizes="80px" className="object-cover object-top" />
            )}
          </div>
        ) : (
          <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-navy/50">
            <FileText size={22} aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0 space-y-1.5">
          <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 text-sm font-semibold text-navy hover:bg-gray-50 focus-within:ring-2 focus-within:ring-accent/40">
            <Upload size={15} aria-hidden="true" />
            {file ? "Changer" : "Remplacer"}
            <input
              type="file"
              name={name}
              accept={accept}
              className="sr-only"
              aria-invalid={shownError ? "true" : undefined}
              onChange={(event) => {
                const selected = event.target.files?.[0]
                setLocalError(null)
                if (!selected) return
                if (selected.size > MAX) {
                  setLocalError("Fichier trop lourd : 4 Mo maximum.")
                  event.target.value = ""
                  return
                }
                setFile(selected)
                if (kind === "image") setPreview(URL.createObjectURL(selected))
              }}
            />
          </label>
          <p className="truncate text-xs text-navy/55">
            {file ? `Nouveau : ${file.name} (enregistrez pour l'appliquer)` : current ? (
              <a href={current} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                Fichier actuel
              </a>
            ) : (
              "Aucun fichier"
            )}
          </p>
          <p className="text-xs text-navy/45">{help}</p>
          {shownError && <p className="text-sm text-red-600">{shownError}</p>}
        </div>
      </div>
    </div>
  )
}

export default function ProfileEditor({ profile }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(updateProfileAction, null)
  const [editedAt, setEditedAt] = useState(0)
  const formRef = useRef(null)
  const errors = state?.fieldErrors ?? {}
  const en = profile.en ?? {}
  const dirty = editedAt > (state?.success ? state.at : 0)

  useEffect(() => {
    if (!state?.at) return
    if (state.error) {
      toast.error(state.error)
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    toast.success(state.message)
    router.refresh()
  }, [state, router])

  return (
    <form ref={formRef} action={formAction} onChange={() => setEditedAt(Date.now())} noValidate className="space-y-5 pb-24">
      <FormSection title="Accueil" description="Le bloc que les visiteurs voient en premier.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput name="name" label="Nom" required defaultValue={profile.name ?? ""} error={errors.name} />
          <TextInput name="title" label="Titre" description="Ex. Full-Stack Engineer." required defaultValue={profile.title ?? ""} error={errors.title} />
        </div>
        <TextInput
          name="tagline"
          label="Positionnement"
          description="Affiché sous le titre. Ex. « Applications métier et solutions digitales »."
          optional
          defaultValue={profile.tagline ?? ""}
          error={errors.tagline}
        />
        <TextArea
          name="promise"
          label="Accroche"
          description="Une phrase : ce que vous construisez et pour qui. Évitez « passionné par… »."
          required
          rows={2}
          defaultValue={profile.promise ?? ""}
          error={errors.promise}
        />
        <div className="grid gap-5 rounded-lg border border-gray-200 p-4 sm:grid-cols-2 sm:items-start">
          <Toggle name="available" label="Afficher la disponibilité" description="Pastille verte en haut de l'accueil." defaultChecked={profile.available ?? true} />
          <TextInput name="availabilityLabel" label="Texte de disponibilité" required defaultValue={profile.availabilityLabel ?? ""} error={errors.availabilityLabel} />
        </div>
      </FormSection>

      <FormSection title="Coordonnées & réseaux" description="Utilisées dans l'en-tête, le pied de page et la page Contact.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput name="email" type="email" label="E-mail public" required defaultValue={profile.email ?? ""} error={errors.email} />
          <TextInput name="phone" type="tel" label="Téléphone" optional description="Affiché sur la page Contact." defaultValue={profile.phone ?? ""} error={errors.phone} />
          <TextInput name="location" label="Localisation" required defaultValue={profile.location ?? ""} error={errors.location} />
          <TextInput name="whatsapp" type="url" label="Lien WhatsApp" optional defaultValue={profile.whatsapp ?? ""} error={errors.whatsapp} />
          <TextInput name="github" type="url" label="GitHub" optional defaultValue={profile.github ?? ""} error={errors.github} />
          <TextInput name="linkedin" type="url" label="LinkedIn" optional defaultValue={profile.linkedin ?? ""} error={errors.linkedin} />
        </div>
      </FormSection>

      <FormSection title="Photo & CV">
        <div className="grid gap-6 sm:grid-cols-2">
          <FilePicker
            name="heroPhotoFile"
            label="Photo de l'accueil"
            accept="image/png,image/jpeg,image/webp"
            help="PNG, JPEG ou WebP, 4 Mo max. Format portrait conseillé."
            current={profile.heroPhoto}
            kind="image"
            error={errors.heroPhotoFile}
          />
          <FilePicker name="cvFile" label="CV" accept="application/pdf" help="PDF, 4 Mo max." current={profile.cvUrl} kind="file" error={errors.cvFile} />
        </div>
      </FormSection>

      <FormSection title="Version anglaise" description="Facultatif : un champ vide reprend le texte français sur /en.">
        <AutoTranslate pairs={TRANSLATED} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput name="en_title" label="Title" optional defaultValue={en.title ?? ""} />
          <TextInput name="en_tagline" label="Tagline" optional defaultValue={en.tagline ?? ""} />
        </div>
        <TextArea name="en_promise" label="Promise" optional rows={2} defaultValue={en.promise ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput name="en_availabilityLabel" label="Availability label" optional defaultValue={en.availabilityLabel ?? ""} />
          <TextInput name="en_location" label="Location" optional defaultValue={en.location ?? ""} />
        </div>
      </FormSection>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-3 sm:px-6 lg:px-10">
          <span className={cx("mr-auto text-sm", dirty ? "text-amber-700" : "text-navy/50")} aria-live="polite">
            {dirty ? "Modifications non enregistrées" : "Tout est enregistré"}
          </span>
          <Button type="submit" pending={isPending} pendingLabel="Enregistrement…">
            <Save size={16} aria-hidden="true" />
            Enregistrer
          </Button>
        </div>
      </div>
    </form>
  )
}
