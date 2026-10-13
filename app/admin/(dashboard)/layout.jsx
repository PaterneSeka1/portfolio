import { requireAdmin } from "../../../lib/auth/current-user"
import { logoutAction } from "../../../lib/auth/actions"
import { countUnreadMessages } from "../../../lib/db/messages"
import AdminShell from "./AdminShell"

export default async function AdminLayout({ children }) {
  const [session, unread] = await Promise.all([requireAdmin(), countUnreadMessages()])

  return (
    <AdminShell email={session.email} unread={unread} logoutAction={logoutAction}>
      {children}
    </AdminShell>
  )
}
