import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { getMessageById, markMessageRead } from "../../../../../lib/db/messages"
import MessageActions from "./MessageActions"

export const dynamic = "force-dynamic"

export default async function MessageDetailPage({ params }) {
  const { id } = await params
  let message = await getMessageById(id)
  if (!message) notFound()

  if (message.status === "new") {
    message = await markMessageRead(id)
  }

  const replySubject = encodeURIComponent(`Re: votre demande de contact`)
  const replyBody = encodeURIComponent(`Bonjour ${message.name},\n\n`)

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/messages" className="inline-flex items-center gap-2 text-sm text-navy/60 hover:text-accent">
        <ArrowLeft size={16} />
        Retour aux messages
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-navy">{message.name}</h1>
          <p className="text-sm text-navy/60">{message.email}{message.company ? ` · ${message.company}` : ""}</p>
        </div>

        <dl className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-navy/50">Type de projet</dt>
            <dd className="text-navy">{message.projectType}</dd>
          </div>
          <div>
            <dt className="text-navy/50">Délai</dt>
            <dd className="text-navy">{message.timeline}</dd>
          </div>
          {message.phone && (
            <div>
              <dt className="text-navy/50">Téléphone</dt>
              <dd className="text-navy">{message.phone}</dd>
            </div>
          )}
          {message.budget && (
            <div>
              <dt className="text-navy/50">Budget</dt>
              <dd className="text-navy">{message.budget}</dd>
            </div>
          )}
        </dl>

        <div>
          <dt className="text-sm text-navy/50 mb-1">Message</dt>
          <p className="text-navy whitespace-pre-wrap">{message.message}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`mailto:${message.email}?subject=${replySubject}&body=${replyBody}`}
            className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
          >
            <Mail size={16} />
            Répondre par email
          </a>

          <MessageActions id={id} status={message.status} />
        </div>
      </div>
    </div>
  )
}
