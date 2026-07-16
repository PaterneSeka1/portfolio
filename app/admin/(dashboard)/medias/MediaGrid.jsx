"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import toast from "react-hot-toast"
import { Trash2, Copy } from "lucide-react"
import { deleteMediaAction } from "../../../../lib/actions/media"
import ActionButton from "../_components/ActionButton"

export default function MediaGrid({ items }) {
  const router = useRouter()

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url)
    toast.success("URL copiée.")
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
              <ActionButton
                action={() => deleteMediaAction(item.id)}
                icon={Trash2}
                label="Supprimer"
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                confirm="Supprimer définitivement ce média ?"
                successMessage="Média supprimé."
                onSuccess={() => router.refresh()}
              />
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-navy/50 col-span-full">Aucun média pour le moment.</p>}
    </div>
  )
}
