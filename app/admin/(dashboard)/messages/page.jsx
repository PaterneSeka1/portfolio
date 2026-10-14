import { getAllMessages } from "../../../../lib/db/messages"
import { PageHeader } from "../../_ui/primitives"
import MessagesList from "./MessagesList"

export const dynamic = "force-dynamic"
export const metadata = { title: "Messages — Administration" }

export default async function AdminMessagesPage({ searchParams }) {
  const [messages, query] = await Promise.all([getAllMessages(), searchParams])
  return (
    <>
      <PageHeader title="Messages" description="Demandes envoyées depuis le formulaire de contact du site." />
      <MessagesList
        messages={messages.map((m) => ({
          id: m.id,
          name: m.name,
          company: m.company,
          email: m.email,
          projectType: m.projectType,
          excerpt: m.message.slice(0, 140),
          status: m.status,
          createdAt: m.createdAt.toISOString(),
        }))}
        initialFilter={typeof query.filtre === "string" ? query.filtre : "boite"}
      />
    </>
  )
}
