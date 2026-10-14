"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Archive, ArchiveRestore, Inbox, Mail, MailOpen, Search } from "lucide-react"
import { Badge, Card, EmptyState, IconButton, cx, inputBase } from "../../_ui/primitives"
import { useAction } from "../../_ui/overlays"
import { setMessageStatusAction } from "../../../../lib/actions/messages"
import { formatRelative } from "../../../../lib/format-admin"

const FILTERS = [
  { key: "boite", label: "Boîte de réception", test: (m) => m.status !== "archived" },
  { key: "nouveaux", label: "Non lus", test: (m) => m.status === "new" },
  { key: "archives", label: "Archivés", test: (m) => m.status === "archived" },
  { key: "tous", label: "Tous", test: () => true },
]

export const MESSAGE_STATUS = {
  new: { label: "Non lu", tone: "info" },
  read: { label: "Lu", tone: "neutral" },
  archived: { label: "Archivé", tone: "neutral" },
}

function Actions({ message, run }) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      {message.status === "new" ? (
        <IconButton icon={MailOpen} label={`Marquer le message de ${message.name} comme lu`} onClick={() => run(() => setMessageStatusAction(message.id, "read"), { success: "Marqué comme lu." })} />
      ) : (
        <IconButton icon={Mail} label={`Marquer le message de ${message.name} comme non lu`} onClick={() => run(() => setMessageStatusAction(message.id, "new"), { success: "Marqué comme non lu." })} />
      )}
      {message.status === "archived" ? (
        <IconButton icon={ArchiveRestore} label={`Désarchiver le message de ${message.name}`} onClick={() => run(() => setMessageStatusAction(message.id, "read"), { success: "Message replacé dans la boîte de réception." })} />
      ) : (
        <IconButton icon={Archive} label={`Archiver le message de ${message.name}`} onClick={() => run(() => setMessageStatusAction(message.id, "archived"), { success: "Message archivé." })} />
      )}
    </div>
  )
}

export default function MessagesList({ messages, initialFilter }) {
  const [filter, setFilter] = useState(FILTERS.some((f) => f.key === initialFilter) ? initialFilter : "boite")
  const [query, setQuery] = useState("")
  const { run, pending } = useAction()

  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f.key, messages.filter(f.test).length])), [messages])
  const term = query.trim().toLowerCase()
  const visible = messages.filter(
    (m) =>
      FILTERS.find((f) => f.key === filter).test(m) &&
      (!term || `${m.name} ${m.company ?? ""} ${m.email} ${m.projectType} ${m.excerpt}`.toLowerCase().includes(term))
  )

  if (messages.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={Inbox}
          title="Aucun message pour l'instant"
          text="Les demandes envoyées depuis la page Contact du site apparaîtront ici, avec une notification par e-mail si l'envoi SMTP est configuré."
        />
      </Card>
    )
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filtrer les messages" className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cx(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
                filter === f.key ? "bg-navy text-white" : "text-navy/65 hover:bg-white hover:text-navy"
              )}
            >
              {f.label}
              <span className={cx("rounded-full px-1.5 text-xs", filter === f.key ? "bg-white/20" : "bg-navy/5")}>{counts[f.key]}</span>
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
          <label htmlFor="message-search" className="sr-only">
            Rechercher un message
          </label>
          <input
            id="message-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nom, entreprise, e-mail…"
            className={cx(inputBase, "h-10 py-2 pl-9")}
          />
        </div>
      </div>

      <Card className={cx("transition-opacity", pending && "opacity-70")} aria-busy={pending}>
        {visible.length === 0 ? (
          <EmptyState
            icon={filter === "nouveaux" ? MailOpen : Search}
            title={term ? "Aucun résultat" : filter === "nouveaux" ? "Tout est lu" : "Aucun message ici"}
            text={term ? `Aucun message ne correspond à « ${query} ».` : "Les autres messages sont dans les autres onglets."}
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {visible.map((message) => {
              const unread = message.status === "new"
              return (
                <li key={message.id} className={cx("flex items-start gap-2 px-4 py-3 sm:px-5", unread && "bg-blue-50/40")}>
                  <span aria-hidden="true" className={cx("mt-2 h-2 w-2 shrink-0 rounded-full", unread ? "bg-accent" : "bg-transparent")} />
                  <Link href={`/admin/messages/${message.id}`} className="min-w-0 flex-1 rounded-md">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className={cx("text-[15px] text-navy", unread ? "font-semibold" : "font-medium")}>{message.name}</span>
                      {message.company && <span className="text-sm text-navy/55">{message.company}</span>}
                      <span className="ml-auto text-xs text-navy/50">{formatRelative(message.createdAt)}</span>
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge tone="neutral">{message.projectType}</Badge>
                      {message.status === "archived" && <Badge tone="neutral">Archivé</Badge>}
                      <span className="truncate text-xs text-navy/50">{message.email}</span>
                    </span>
                    <span className="mt-1.5 line-clamp-2 block text-sm text-navy/65">{message.excerpt}</span>
                    {unread && <span className="sr-only">(non lu)</span>}
                  </Link>
                  <Actions message={message} run={run} />
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </>
  )
}
