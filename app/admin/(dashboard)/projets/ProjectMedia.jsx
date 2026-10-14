"use client"

import { useRef, useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ArrowDown, ArrowUp, ImagePlus, Star, Trash2, Upload } from "lucide-react"
import { Badge, Button, FormSection, IconButton, cx, inputBase } from "../../_ui/primitives"
import { useAction, useConfirm } from "../../_ui/overlays"
import {
  addProjectImageAction,
  deleteProjectImageAction,
  moveProjectImageAction,
  updateProjectImageAltAction,
} from "../../../../lib/actions/project-images"

const MAX_SIZE = 4 * 1024 * 1024
const TYPES = ["image/png", "image/jpeg", "image/webp"]

/**
 * Screenshots of a project. Rendered inside the project form, so it uses no
 * <form> of its own: fields have no name and uploads are sent manually.
 */
export default function ProjectMedia({ projectId, images }) {
  const router = useRouter()
  const { run } = useAction()
  const { ask, dialog } = useConfirm()
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [alt, setAlt] = useState("")
  const [error, setError] = useState(null)
  const [uploading, startUpload] = useTransition()

  const stop = (event) => event.stopPropagation()

  const choose = (event) => {
    event.stopPropagation()
    const selected = event.target.files?.[0]
    setError(null)
    if (!selected) return
    if (!TYPES.includes(selected.type)) {
      setError("Format non pris en charge : utilisez une image PNG, JPEG ou WebP.")
      event.target.value = ""
      return
    }
    if (selected.size > MAX_SIZE) {
      setError(`Image trop lourde (${(selected.size / 1024 / 1024).toFixed(1)} Mo) : 4 Mo maximum.`)
      event.target.value = ""
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setAlt("")
    if (fileRef.current) fileRef.current.value = ""
  }

  const upload = () => {
    if (!file) return
    if (alt.trim().length < 5) {
      setError("Décrivez l'image en quelques mots (5 caractères minimum) pour les lecteurs d'écran.")
      return
    }
    const data = new FormData()
    data.set("file", file)
    data.set("alt", alt)
    startUpload(async () => {
      let result
      try {
        result = await addProjectImageAction(projectId, null, data)
      } catch {
        setError("L'envoi a échoué (connexion ou serveur de stockage). Réessayez dans un instant.")
        return
      }
      if (result?.error) {
        setError(result.error)
        return
      }
      toast.success("Capture ajoutée.")
      reset()
      router.refresh()
    })
  }

  return (
    <FormSection
      id="media-section"
      title="Captures"
      description="La première image sert de couverture. Anonymisez noms, e-mails, montants et données personnelles avant l'envoi."
    >
      {images.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {images.map((image, index) => (
            <li key={image.id} className="overflow-hidden rounded-lg border border-gray-200">
              <div className="relative aspect-[16/10] bg-gray-100">
                <Image src={image.url} alt={image.alt ?? ""} fill sizes="(max-width: 640px) 90vw, 360px" className="object-cover object-top" />
                {index === 0 && (
                  <span className="absolute left-2 top-2">
                    <Badge tone="accent">Couverture</Badge>
                  </span>
                )}
              </div>
              <div className="space-y-2 p-3" onChange={stop}>
                <label htmlFor={`alt-${image.id}`} className="sr-only">
                  Texte alternatif
                </label>
                <input
                  id={`alt-${image.id}`}
                  defaultValue={image.alt ?? ""}
                  placeholder="Texte alternatif"
                  className={cx(inputBase, "py-2 text-sm")}
                  onBlur={(event) => {
                    const value = event.target.value.trim()
                    if (value === (image.alt ?? "")) return
                    run(() => updateProjectImageAltAction(projectId, image.id, value), { success: "Texte alternatif mis à jour." })
                  }}
                />
                <div className="flex items-center gap-0.5">
                  {index > 0 && (
                    <IconButton
                      icon={Star}
                      label="Utiliser comme couverture"
                      onClick={() => run(() => moveProjectImageAction(projectId, image.id, "cover"), { success: "Couverture mise à jour." })}
                    />
                  )}
                  <IconButton icon={ArrowUp} label="Déplacer avant" disabled={index === 0} onClick={() => run(() => moveProjectImageAction(projectId, image.id, "up"))} />
                  <IconButton
                    icon={ArrowDown}
                    label="Déplacer après"
                    disabled={index === images.length - 1}
                    onClick={() => run(() => moveProjectImageAction(projectId, image.id, "down"))}
                  />
                  <IconButton
                    icon={Trash2}
                    tone="danger"
                    label="Supprimer la capture"
                    className="ml-auto"
                    onClick={() =>
                      ask({
                        title: "Supprimer cette capture ?",
                        description: "Le fichier sera supprimé définitivement. Cette action est irréversible.",
                        onConfirm: () => run(() => deleteProjectImageAction(projectId, image.id), { success: "Capture supprimée." }),
                      })
                    }
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-navy/60">
          Aucune capture : le site affiche une maquette abstraite à la place. Ajoutez des captures réelles et anonymisées dès que possible.
        </p>
      )}

      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/60 p-4" onChange={stop}>
        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-navy">
          <ImagePlus size={16} aria-hidden="true" />
          Ajouter une capture
        </p>
        <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
          <label
            htmlFor="new-capture"
            className="relative flex aspect-[16/10] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-white text-center text-xs text-navy/55 hover:border-accent"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover object-top" />
            ) : (
              <span className="flex flex-col items-center gap-1 px-2">
                <Upload size={18} aria-hidden="true" />
                PNG, JPEG ou WebP — 4 Mo max.
              </span>
            )}
          </label>
          <div className="space-y-3">
            <input id="new-capture" ref={fileRef} type="file" accept={TYPES.join(",")} onChange={choose} className="sr-only" />
            <div>
              <label htmlFor="new-capture-alt" className="mb-1.5 block text-sm font-medium text-navy">
                Texte alternatif <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="new-capture-alt"
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
                placeholder="Ex. Tableau de bord des demandes de congés"
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "capture-error" : undefined}
                className={inputBase}
              />
            </div>
            {error && (
              <p id="capture-error" role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => fileRef.current?.click()}>
                {file ? "Changer d'image" : "Choisir une image"}
              </Button>
              <Button size="sm" onClick={upload} disabled={!file} pending={uploading} pendingLabel="Envoi en cours…">
                Ajouter la capture
              </Button>
              {file && (
                <Button variant="ghost" size="sm" onClick={reset}>
                  Annuler
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {dialog}
    </FormSection>
  )
}
