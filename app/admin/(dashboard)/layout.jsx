import { requireAdmin } from "../../../lib/auth/current-user"
import { logoutAction } from "../../../lib/auth/actions"
import { getBrandSettings } from "../../../lib/db/brand"
import AdminShell from "./AdminShell"

export default async function AdminLayout({ children }) {
  const [session, brand] = await Promise.all([requireAdmin(), getBrandSettings()])

  return (
    <AdminShell email={session.email} logoUrl={brand?.logoUrl} logoutAction={logoutAction}>
      {children}
    </AdminShell>
  )
}
