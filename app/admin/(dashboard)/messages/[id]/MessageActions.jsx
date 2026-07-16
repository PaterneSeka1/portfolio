"use client"

import { useRouter } from "next/navigation"
import { Archive, Trash2 } from "lucide-react"
import ActionButton from "../../_components/ActionButton"
import { setMessageStatusAction, deleteMessageAction } from "../../../../../lib/actions/messages"

export default function MessageActions({ id, status }) {
  const router = useRouter()

  return (
    <>
      <ActionButton
        action={() => setMessageStatusAction(id, status === "archived" ? "read" : "archived")}
        icon={Archive}
        label={status === "archived" ? "Désarchiver" : "Archiver"}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-navy hover:border-accent transition-colors"
        successMessage={status === "archived" ? "Message désarchivé." : "Message archivé."}
        onSuccess={() => router.refresh()}
      >
        {status === "archived" ? "Désarchiver" : "Archiver"}
      </ActionButton>

      <ActionButton
        action={() => deleteMessageAction(id)}
        icon={Trash2}
        label="Supprimer"
        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
        confirm="Supprimer définitivement ce message ?"
        successMessage="Message supprimé."
        onSuccess={() => router.push("/admin/messages")}
      >
        Supprimer
      </ActionButton>
    </>
  )
}
