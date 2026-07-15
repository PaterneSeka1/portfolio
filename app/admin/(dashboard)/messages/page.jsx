import Link from "next/link"
import { Archive, ArchiveRestore } from "lucide-react"
import { getAllMessages } from "../../../../lib/db/messages"
import { setMessageStatusAction } from "../../../../lib/actions/messages"

export const dynamic = "force-dynamic"

const statusLabels = { new: "Nouveau", read: "Lu", archived: "Archivé" }
const statusClasses = {
  new: "bg-accent/10 text-accent",
  read: "bg-gray-light text-navy/60",
  archived: "bg-gray-100 text-navy/40",
}

export default async function AdminMessagesPage() {
  const messages = await getAllMessages()

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
              <form action={setMessageStatusAction.bind(null, item.id, item.status === "archived" ? "read" : "archived")}>
                <button type="submit" className="p-2 rounded-lg text-navy/60 hover:bg-gray-light" title={item.status === "archived" ? "Désarchiver" : "Archiver"}>
                  {item.status === "archived" ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                </button>
              </form>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="p-4 text-sm text-navy/50">Aucun message pour le moment.</p>}
      </div>
    </div>
  )
}
