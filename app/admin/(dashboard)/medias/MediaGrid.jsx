"use client"

import Image from "next/image"
import { Trash2, Copy } from "lucide-react"
import { deleteMediaAction } from "../../../../lib/actions/media"

export default function MediaGrid({ items }) {
  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url)
  }

  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="relative h-32 bg-gray-light">
            {item.type.startsWith("image/") ? (
              <Image src={item.url} alt={item.alt ?? ""} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-navy/50">Fichier</div>
            )}
          </div>
          <div className="p-3 space-y-2">
            <p className="text-xs text-navy/60 truncate">{item.alt || item.url}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyUrl(item.url)}
                className="p-1.5 rounded-lg text-navy/60 hover:bg-gray-light"
                title="Copier l'URL"
              >
                <Copy size={14} />
              </button>
              <form action={deleteMediaAction.bind(null, item.id)}>
                <button type="submit" className="p-1.5 rounded-lg text-red-600 hover:bg-red-50" title="Supprimer">
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-navy/50 col-span-full">Aucun média pour le moment.</p>}
    </div>
  )
}
