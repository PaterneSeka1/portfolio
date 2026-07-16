import { getAllMessages } from "../../../../lib/db/messages"
import MessagesManager from "./MessagesManager"

export const dynamic = "force-dynamic"

export default async function AdminMessagesPage() {
  const messages = await getAllMessages()

  return <MessagesManager messages={messages} />
}
