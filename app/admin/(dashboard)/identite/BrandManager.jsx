"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Image as ImageIcon, Palette, Type } from "lucide-react"
import Modal from "../_components/Modal"
import SectionCard from "../_components/SectionCard"
import InfoRow from "../_components/InfoRow"
import BrandForm from "./BrandForm"

function AssetPreview({ label, url }) {
  return (
    <div>
      <p className="text-xs text-navy/50 mb-2">{label}</p>
      {url ? (
        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-light">
          <Image src={url} alt="" fill sizes="64px" className="object-contain" />
        </div>
      ) : (
        <p className="text-sm text-navy/30">Aucun fichier</p>
      )}
    </div>
  )
}

function ColorSwatch({ label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-6 w-6 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: value }} />
      <div>
        <p className="text-xs text-navy/50">{label}</p>
        <p className="text-sm text-navy">{value}</p>
      </div>
    </div>
  )
}

export default function BrandManager({ brand }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    router.refresh()
  }, [router])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Identité</h1>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Pencil size={16} />
          Modifier
        </button>
      </div>

      <SectionCard icon={ImageIcon} title="Assets visuels">
        <div className="grid sm:grid-cols-3 gap-5">
          <AssetPreview label="Logo" url={brand?.logoUrl} />
          <AssetPreview label="Favicon" url={brand?.faviconUrl} />
          <AssetPreview label="Image Open Graph" url={brand?.ogImage} />
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard icon={Palette} title="Couleurs">
          <div className="grid sm:grid-cols-2 gap-5">
            <ColorSwatch label="Bleu marine" value={brand?.colorNavy ?? "#0D1B2A"} />
            <ColorSwatch label="Bleu institutionnel" value={brand?.colorInstitutional ?? "#133A7C"} />
            <ColorSwatch label="Bleu accent" value={brand?.colorAccent ?? "#2563EB"} />
            <ColorSwatch label="Gris clair" value={brand?.colorGrayLight ?? "#F1F3F6"} />
          </div>
        </SectionCard>

        <SectionCard icon={Type} title="Typographie">
          <dl className="grid sm:grid-cols-2 gap-5">
            <InfoRow label="Police des titres" value={brand?.fontHeading ?? "Sora"} />
            <InfoRow label="Police du texte" value={brand?.fontBody ?? "Inter"} />
          </dl>
        </SectionCard>
      </div>

      <Modal open={open} onClose={close} title="Modifier l'identité" maxWidth="max-w-2xl">
        <BrandForm brand={brand} onSuccess={close} />
      </Modal>
    </div>
  )
}
