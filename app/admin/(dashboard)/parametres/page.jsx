import { getSiteSettings } from "../../../../lib/db/settings"
import SettingsForm from "./SettingsForm"
import ExportButton from "./ExportButton"
import ImportForm from "./ImportForm"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h1 className="font-heading text-2xl font-bold text-navy">Paramètres</h1>
        <SettingsForm settings={settings} />
      </div>

      <div className="space-y-4 max-w-2xl">
        <h2 className="font-heading font-semibold text-navy">Export / Import</h2>
        <p className="text-sm text-navy/60">
          Exportez l&apos;ensemble du contenu (profil, identité, paramètres, expertises, compétences,
          expériences et projets) au format JSON, ou restaurez-le depuis un export précédent.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ExportButton />
        </div>
        <ImportForm />
      </div>
    </div>
  )
}
