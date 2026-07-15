"use client"

import { useActionState } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { addProjectImageAction, deleteProjectImageAction } from "../../../../lib/actions/project-images"

const initialState = { error: null }

export default function ProjectGallery({ projectId, images }) {
  const [state, formAction, isPending] = useActionState(addProjectImageAction.bind(null, projectId), initialState)

  return (
    <section className="space-y-5 max-w-3xl">
      <h2 className="font-heading font-semibold text-navy">Galerie</h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative rounded-xl overflow-hidden border border-gray-200 h-32">
            <Image src={image.url} alt={image.alt ?? ""} fill className="object-cover" />
            <form action={deleteProjectImageAction.bind(null, projectId, image.id)} className="absolute top-1 right-1">
              <button type="submit" className="p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-white" title="Supprimer">
                <Trash2 size={14} />
              </button>
            </form>
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
