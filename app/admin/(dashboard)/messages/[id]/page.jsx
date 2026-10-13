import { notFound } from "next/navigation"
import { getMessageById } from "../../../../../lib/db/messages"
import { formatDate, formatRelative } from "../../../../../lib/format-admin"
import { Card, PageHeader } from "../../../_ui/primitives"
import MessageToolbar from "./MessageToolbar"

export const dynamic = "force-dynamic"
export const metadata = { title: "Message — Administration" }

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-navy/50">{label}</dt>
      <dd className="mt-1 break-words text-sm text-navy">{children}</dd>
    </div>
  )
}

export default async function MessageDetailPage({ params }) {
  const { id } = await params
  const message = await getMessageById(id)
  if (!message) notFound()

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Messages", href: "/admin/messages" }, { label: message.name }]}
        title={message.name}
        description={`Reçu ${formatRelative(message.createdAt)} · ${formatDate(message.createdAt)}`}
        actions={<MessageToolbar id={message.id} name={message.name} email={message.email} status={message.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 sm:p-6 lg:col-span-2" aria-label="Message">
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-navy">{message.message}</p>
        </Card>
        <Card className="p-5 sm:p-6" aria-label="Coordonnées">
          <dl className="space-y-4">
            <Detail label="E-mail">
              <a href={`mailto:${message.email}`} className="text-accent hover:underline">
                {message.email}
              </a>
            </Detail>
            {message.company && <Detail label="Entreprise">{message.company}</Detail>}
            <Detail label="Type de projet">{message.projectType}</Detail>
            {message.phone && <Detail label="Téléphone">{message.phone}</Detail>}
            {message.timeline && <Detail label="Délai">{message.timeline}</Detail>}
            {message.budget && <Detail label="Budget">{message.budget}</Detail>}
          </dl>
        </Card>
      </div>
    </>
  )
}
