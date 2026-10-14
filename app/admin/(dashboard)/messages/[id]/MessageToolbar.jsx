"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Archive, ArchiveRestore, Mail, Reply, Trash2 } from "lucide-react"
import { Button, ButtonLink } from "../../../_ui/primitives"
import { useAction, useConfirm } from "../../../_ui/overlays"
import { deleteMessageAction, setMessageStatusAction } from "../../../../../lib/actions/messages"

export default function MessageToolbar({ id, name, email, status }) {
  const router = useRouter()
  const { run, pending, pendingKey } = useAction()
  const { ask, dialog } = useConfirm()
  const subject = encodeURIComponent("Re: votre demande de contact")
  const body = encodeURIComponent(`Bonjour ${name},\n\n`)

  // Opening an unread message marks it as read (once, without re-rendering the page).
  const markedRef = useRef(false)
  useEffect(() => {
    if (status !== "new" || markedRef.current) return
    markedRef.current = true
    setMessageStatusAction(id, "read").catch(() => {})
  }, [id, status])

  return (
    <>
      <ButtonLink href={`mailto:${email}?subject=${subject}&body=${body}`} variant="primary">
        <Reply size={16} aria-hidden="true" />
        Répondre
      </ButtonLink>
      <Button
        variant="secondary"
        pending={pending && pendingKey === "unread"}
        onClick={() =>
          run(() => setMessageStatusAction(id, "new"), {
            key: "unread",
            success: "Message marqué comme non lu.",
            // No refresh here: re-rendering this page would mark it as read again.
            refresh: false,
            onDone: () => router.push("/admin/messages"),
          })
        }
      >
        <Mail size={16} aria-hidden="true" />
        Marquer non lu
      </Button>
      {status === "archived" ? (
        <Button variant="secondary" pending={pending && pendingKey === "archive"} onClick={() => run(() => setMessageStatusAction(id, "read"), { key: "archive", success: "Message replacé dans la boîte de réception." })}>
          <ArchiveRestore size={16} aria-hidden="true" />
          Désarchiver
        </Button>
      ) : (
        <Button
          variant="secondary"
          pending={pending && pendingKey === "archive"}
          onClick={() => run(() => setMessageStatusAction(id, "archived"), { key: "archive", success: "Message archivé.", refresh: false, onDone: () => router.push("/admin/messages") })}
        >
          <Archive size={16} aria-hidden="true" />
          Archiver
        </Button>
      )}
      <Button
        variant="dangerGhost"
        onClick={() =>
          ask({
            title: "Supprimer ce message ?",
            description: `Le message de ${name} sera supprimé définitivement. Cette action est irréversible.`,
            onConfirm: () => run(() => deleteMessageAction(id), { success: "Message supprimé.", refresh: false, onDone: () => router.push("/admin/messages") }),
          })
        }
      >
        <Trash2 size={16} aria-hidden="true" />
        Supprimer
      </Button>
      {dialog}
    </>
  )
}
