"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Archive, ArchiveRestore } from "lucide-react"
import ActionButton from "../_components/ActionButton"
import { setMessageStatusAction } from "../../../../lib/actions/messages"

const statusLabels = { new: "Nouveau", read: "Lu", archived: "Archivé" }
const statusClasses = {
  new: "bg-accent/10 text-accent",
  read: "bg-gray-light text-navy/60",
  archived: "bg-gray-100 text-navy/40",
}

export default function MessagesManager({ messages }) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Messages</h1>

      <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
        {messages.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link href={`/admin/messages/${item.id}`} className="font-medium text-navy hover:text-accent truncate">
                  {item.name}
                </Link>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusClasses[item.status]}`}>
                  {statusLabels[item.status]}
                </span>
              </div>
              <p className="text-xs text-navy/50 truncate">{item.email} · {item.projectType}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ActionButton
                action={() => setMessageStatusAction(item.id, item.status === "archived" ? "read" : "archived")}
                icon={item.status === "archived" ? ArchiveRestore : Archive}
                label={item.status === "archived" ? "Désarchiver" : "Archiver"}
                className="p-2 rounded-lg text-navy/60 hover:bg-gray-light"
                successMessage={item.status === "archived" ? "Message désarchivé." : "Message archivé."}
                onSuccess={() => router.refresh()}
              />
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="p-4 text-sm text-navy/50">Aucun message pour le moment.</p>}
      </div>
    </div>
  )
}
