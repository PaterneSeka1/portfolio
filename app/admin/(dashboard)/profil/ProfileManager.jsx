"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, User, Link2, Image as ImageIcon, FileText } from "lucide-react"
import Modal from "../_components/Modal"
import SectionCard from "../_components/SectionCard"
import InfoRow from "../_components/InfoRow"
import ProfileForm from "./ProfileForm"

export default function ProfileManager({ profile }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    router.refresh()
  }, [router])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Profil</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Pencil size={16} />
          Modifier
        </button>
      </div>

      <SectionCard icon={User} title="Informations générales">
        <dl className="grid sm:grid-cols-2 gap-5">
          <InfoRow label="Nom" value={profile.name} />
          <InfoRow label="Titre" value={profile.title} />
          <InfoRow label="Accroche / promesse" value={profile.promise} className="sm:col-span-2" />
          <InfoRow label="Localisation" value={profile.location} />
          <InfoRow label="Libellé de disponibilité" value={profile.availabilityLabel} />
          <InfoRow label="Disponibilité" value={profile.available ? "Disponible" : "Indisponible"} />
        </dl>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard icon={Link2} title="Contact & réseaux">
          <dl className="grid sm:grid-cols-2 gap-5">
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Téléphone" value={profile.phone} />
            <InfoRow label="WhatsApp" value={profile.whatsapp} />
            <InfoRow label="GitHub" value={profile.github} />
            <InfoRow label="LinkedIn" value={profile.linkedin} className="sm:col-span-2" />
          </dl>
        </SectionCard>

        <SectionCard icon={ImageIcon} title="Médias">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs text-navy/50 mb-2">Photo du hero</p>
              {profile.heroPhoto ? (
                <div className="relative h-24 w-24 rounded-xl overflow-hidden border border-gray-200">
                  <Image src={profile.heroPhoto} alt="" fill sizes="96px" className="object-cover" />
                </div>
              ) : (
                <p className="text-sm text-navy/30">Aucune photo</p>
              )}
            </div>
            <div>
              <p className="text-xs text-navy/50 mb-2">CV (PDF)</p>
              {profile.cvUrl ? (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-institutional hover:text-accent"
                >
                  <FileText size={14} />
                  Voir le CV
                </a>
              ) : (
                <p className="text-sm text-navy/30">Aucun CV</p>
              )}
            </div>
          </div>
        </SectionCard>
      </div>

      <Modal open={open} onClose={close} title="Modifier le profil" maxWidth="max-w-3xl">
        <ProfileForm profile={profile} onSuccess={close} />
      </Modal>
    </div>
  )
}
