"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { addProjectImageAction, deleteProjectImageAction } from "../../../../lib/actions/project-images"
import ActionButton from "../_components/ActionButton"

const initialState = { error: null }

export default function ProjectGallery({ projectId, images }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(addProjectImageAction.bind(null, projectId), initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success("Image ajoutée.")
      router.refresh()
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <section className="space-y-5">
      <h2 className="font-heading font-semibold text-navy">Galerie</h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative rounded-xl overflow-hidden border border-gray-200 h-32">
            <Image src={image.url} alt={image.alt ?? ""} fill className="object-cover" />
            <ActionButton
              action={() => deleteProjectImageAction(projectId, image.id)}
              icon={Trash2}
              label="Supprimer l'image"
              className="absolute top-1 right-1 p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-white"
              confirm="Supprimer cette image de la galerie ?"
              successMessage="Image supprimée."
              onSuccess={() => router.refresh()}
            />
          </div>
        ))}
        {images.length === 0 && <p className="text-sm text-navy/50 col-span-3">Aucune image pour le moment.</p>}
      </div>

      <form action={formAction} className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Image</label>
          <input type="file" name="file" accept="image/*" required className="text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Texte alternatif</label>
          <input
            name="alt"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-navy text-white text-sm font-semibold px-4 py-2 hover:bg-institutional transition-colors disabled:opacity-50"
        >
          {isPending ? "Envoi..." : "Ajouter"}
        </button>
      </form>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </section>
  )
}
