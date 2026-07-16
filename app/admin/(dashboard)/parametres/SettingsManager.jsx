"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Search, Mail, Server, Globe, Database } from "lucide-react"
import Modal from "../_components/Modal"
import SectionCard from "../_components/SectionCard"
import InfoRow from "../_components/InfoRow"
import SettingsForm from "./SettingsForm"
import ExportButton from "./ExportButton"
import ImportForm from "./ImportForm"

export default function SettingsManager({ settings }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    router.refresh()
  }, [router])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Paramètres</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Pencil size={16} />
          Modifier
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard icon={Search} title="SEO & Open Graph">
          <dl className="space-y-5">
            <InfoRow label="Titre SEO" value={settings?.seoTitle} />
            <InfoRow label="Description SEO" value={settings?.seoDescription} />
          </dl>
          {settings?.ogImage && (
            <div className="relative h-16 w-28 rounded-xl overflow-hidden border border-gray-200 bg-gray-light">
              <Image src={settings.ogImage} alt="" fill sizes="112px" className="object-cover" />
            </div>
          )}
        </SectionCard>

        <SectionCard icon={Mail} title="Contact">
          <dl className="grid sm:grid-cols-2 gap-5">
            <InfoRow label="Email de contact" value={settings?.contactEmail} />
            <InfoRow label="Téléphone de contact" value={settings?.contactPhone} />
          </dl>
        </SectionCard>

        <SectionCard icon={Server} title="SMTP & Analytics">
          <dl className="grid sm:grid-cols-2 gap-5">
            <InfoRow label="Hôte SMTP" value={settings?.smtpHost} />
            <InfoRow label="Utilisateur SMTP" value={settings?.smtpUser} />
            <InfoRow label="Identifiant Analytics" value={settings?.analyticsId} className="sm:col-span-2" />
          </dl>
        </SectionCard>

        <SectionCard icon={Globe} title="Domaine & maintenance">
          <dl className="grid sm:grid-cols-2 gap-5">
            <InfoRow label="Domaine" value={settings?.domain} />
            <InfoRow label="Mode maintenance" value={settings?.maintenanceMode ? "Activé" : "Désactivé"} />
          </dl>
        </SectionCard>
      </div>

      <SectionCard
        icon={Database}
        title="Export / Import"
        description="Exportez l'ensemble du contenu (profil, identité, paramètres, expertises, compétences, expériences et projets) au format JSON, ou restaurez-le depuis un export précédent."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ExportButton />
        </div>
        <ImportForm />
      </SectionCard>

      <Modal open={open} onClose={close} title="Modifier les paramètres" maxWidth="max-w-2xl">
        <SettingsForm settings={settings} onSuccess={close} />
      </Modal>
    </div>
  )
}
