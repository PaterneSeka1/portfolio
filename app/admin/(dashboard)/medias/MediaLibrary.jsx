"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Copy, FileText, ImageIcon, Images, Trash2, Upload } from "lucide-react"
import { Badge, Button, Card, CardHeader, EmptyState, IconButton, TextInput, cx, inputBase } from "../../_ui/primitives"
import { useAction, useConfirm } from "../../_ui/overlays"
import { deleteMediaAction, updateMediaAltAction, uploadMediaAction } from "../../../../lib/actions/media"
import { formatDate } from "../../../../lib/format-admin"

const MAX = 4 * 1024 * 1024
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"]

const formatSize = (bytes) => (!bytes ? "" : bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} Mo` : `${Math.round(bytes / 1024)} Ko`)

function UploadForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(uploadMediaAction, null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (!state?.at) return
    if (state.error) {
      toast.error(state.error)
      return
    }
    toast.success(state.message)
    formRef.current?.reset()
    router.refresh()
  }, [state, router])

  const isImage = file?.type?.startsWith("image/")

  return (
    <form
      ref={formRef}
      action={formAction}
      onReset={() => {
        setFile(null)
        setPreview(null)
      }}
      className="grid gap-4 px-5 py-5 sm:grid-cols-[180px_1fr] sm:px-6"
    >
      <label className="relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center text-xs text-navy/55 hover:border-accent focus-within:ring-2 focus-within:ring-accent/30">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : file ? (
          <>
            <FileText size={22} aria-hidden="true" />
            {file.name}
          </>
        ) : (
          <>
            <Upload size={20} aria-hidden="true" />
            Choisir un fichier
            <span className="text-navy/40">Images ou PDF, 4 Mo max.</span>
          </>
        )}
        <input
          type="file"
          name="file"
          accept={TYPES.join(",")}
          className="sr-only"
          onChange={(event) => {
            const selected = event.target.files?.[0]
            setError(null)
            setPreview(null)
            if (!selected) return setFile(null)
            if (!TYPES.includes(selected.type)) {
              setError("Format non pris en charge : PNG, JPEG, WebP, SVG ou PDF.")
              event.target.value = ""
              return setFile(null)
            }
            if (selected.size > MAX) {
              setError(`Fichier trop lourd (${formatSize(selected.size)}) : 4 Mo maximum.`)
              event.target.value = ""
              return setFile(null)
            }
            setFile(selected)
            if (selected.type.startsWith("image/")) setPreview(URL.createObjectURL(selected))
          }}
        />
      </label>
      <div className="space-y-3">
        <TextInput
          name="alt"
          label="Texte alternatif"
          description={isImage ? "Obligatoire pour une image : décrivez ce qu'elle montre." : "Pour un document : une courte description."}
          required={isImage}
          placeholder="Ex. Capture du tableau de bord RH"
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <Button type="submit" disabled={!file} pending={isPending} pendingLabel="Envoi en cours…">
          <Upload size={16} aria-hidden="true" />
          Ajouter à la médiathèque
        </Button>
      </div>
    </form>
  )
}

export default function MediaLibrary({ files, captures }) {
  const [tab, setTab] = useState("files")
  const { run } = useAction()
  const { ask, dialog } = useConfirm()

  const copy = async (url) => {
    const absolute = new URL(url, window.location.origin).href
    try {
      await navigator.clipboard.writeText(absolute)
      toast.success("Lien copié.")
    } catch {
      toast.error("Copie impossible : sélectionnez le lien manuellement.")
    }
  }

  return (
    <>
      <div role="tablist" aria-label="Type de médias" className="mb-4 flex gap-1">
        {[
          { key: "files", label: "Fichiers", count: files.length },
          { key: "captures", label: "Captures des réalisations", count: captures.length },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cx(
              "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium",
              tab === t.key ? "bg-navy text-white" : "text-navy/65 hover:bg-white hover:text-navy"
            )}
          >
            {t.label}
            <span className={cx("rounded-full px-1.5 text-xs", tab === t.key ? "bg-white/20" : "bg-navy/5")}>{t.count}</span>
          </button>
        ))}
      </div>

      {tab === "files" ? (
        <div className="space-y-6">
          <Card aria-labelledby="upload">
            <CardHeader id="upload" title="Ajouter un fichier" description="Le lien du fichier peut ensuite être copié et utilisé où vous le souhaitez." />
            <UploadForm />
          </Card>
          <Card>
            {files.length === 0 ? (
              <EmptyState icon={ImageIcon} title="Médiathèque vide" text="Les fichiers ajoutés ici apparaîtront dans cette liste, avec leur lien à copier." />
            ) : (
              <ul className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
                {files.map((item) => (
                  <li key={item.id} className="overflow-hidden rounded-lg border border-gray-200">
                    <div className="relative aspect-[4/3] bg-gray-100">
                      {item.type.startsWith("image/") ? (
                        <Image src={item.url} alt={item.alt ?? ""} fill sizes="(max-width: 640px) 90vw, 300px" className="object-cover" />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-1 text-navy/50">
                          <FileText size={28} aria-hidden="true" />
                          <span className="text-xs">PDF</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 p-3">
                      <label htmlFor={`media-alt-${item.id}`} className="sr-only">
                        Texte alternatif
                      </label>
                      <input
                        id={`media-alt-${item.id}`}
                        defaultValue={item.alt ?? ""}
                        placeholder="Texte alternatif"
                        className={cx(inputBase, "py-2 text-sm")}
                        onBlur={(event) => {
                          if (event.target.value.trim() === (item.alt ?? "")) return
                          run(() => updateMediaAltAction(item.id, event.target.value), { success: "Texte alternatif mis à jour." })
                        }}
                      />
                      <div className="flex items-center gap-1">
                        <span className="mr-auto text-xs text-navy/50">
                          {formatSize(item.size)} · {formatDate(item.createdAt)}
                        </span>
                        <IconButton icon={Copy} label="Copier le lien" onClick={() => copy(item.url)} />
                        <IconButton
                          icon={Trash2}
                          tone="danger"
                          label="Supprimer le fichier"
                          onClick={() =>
                            ask({
                              title: "Supprimer ce fichier ?",
                              description: "Il sera supprimé du stockage. Les pages qui utiliseraient son lien afficheront une image manquante. Cette action est irréversible.",
                              onConfirm: () => run(() => deleteMediaAction(item.id), { success: "Fichier supprimé." }),
                            })
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      ) : (
        <Card>
          {captures.length === 0 ? (
            <EmptyState
              icon={Images}
              title="Aucune capture"
              text="Ajoutez des captures anonymisées depuis la section « Captures » de chaque réalisation."
              action={<Link href="/admin/projets" className="text-sm font-semibold text-accent hover:underline">Ouvrir les réalisations</Link>}
            />
          ) : (
            <ul className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
              {captures.map((image) => (
                <li key={image.id}>
                  <Link href={`/admin/projets/${image.project.id}#media`} className="block overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300">
                    <div className="relative aspect-[16/10] bg-gray-100">
                      <Image src={image.url} alt={image.alt ?? ""} fill sizes="(max-width: 640px) 90vw, 300px" className="object-cover object-top" />
                    </div>
                    <div className="flex items-center justify-between gap-2 p-3 text-sm">
                      <span className="truncate font-medium text-navy">{image.project.title}</span>
                      {image.order === 0 && <Badge tone="accent">Couverture</Badge>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
      {dialog}
    </>
  )
}
