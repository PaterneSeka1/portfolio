import { requireAdmin } from "../../../../lib/auth/current-user"
import { PageHeader } from "../../_ui/primitives"
import SettingsPanels from "./SettingsPanels"

export const dynamic = "force-dynamic"
export const metadata = { title: "Paramètres — Administration" }

export default async function AdminSettingsPage() {
  const session = await requireAdmin()
  return (
    <>
      <PageHeader title="Paramètres" description="Sauvegarde du contenu et informations du compte." />
      <SettingsPanels email={session.email} />
    </>
  )
}
