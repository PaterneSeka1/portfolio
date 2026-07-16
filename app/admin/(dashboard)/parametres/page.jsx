import { getSiteSettings } from "../../../../lib/db/settings"
import SettingsManager from "./SettingsManager"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()

  return <SettingsManager settings={settings} />
}
