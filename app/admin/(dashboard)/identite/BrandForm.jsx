"use client"

import { useActionState } from "react"
import { updateBrandAction } from "../../../../lib/actions/brand"

const inputClass =
  "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent"
const labelClass = "block text-sm font-medium text-navy mb-1.5"

const initialState = { error: null, success: false }

export default function BrandForm({ brand }) {
  const [state, formAction, isPending] = useActionState(updateBrandAction, initialState)

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Logo</label>
          {brand?.logoUrl && <p className="text-xs text-navy/50 mb-1">Actuel : {brand.logoUrl}</p>}
          <input type="file" name="logoFile" accept="image/*,image/svg+xml" className="text-sm" />
        </div>
        <div>
          <label className={labelClass}>Favicon</label>
          {brand?.faviconUrl && <p className="text-xs text-navy/50 mb-1">Actuel : {brand.faviconUrl}</p>}
          <input type="file" name="faviconFile" accept="image/*" className="text-sm" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Image Open Graph</label>
        {brand?.ogImage && <p className="text-xs text-navy/50 mb-1">Actuelle : {brand.ogImage}</p>}
        <input type="file" name="ogImageFile" accept="image/*" className="text-sm" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Bleu marine</label>
          <input name="colorNavy" type="text" defaultValue={brand?.colorNavy ?? "#0D1B2A"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Bleu institutionnel</label>
          <input name="colorInstitutional" type="text" defaultValue={brand?.colorInstitutional ?? "#133A7C"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Bleu accent</label>
          <input name="colorAccent" type="text" defaultValue={brand?.colorAccent ?? "#2563EB"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Gris clair</label>
          <input name="colorGrayLight" type="text" defaultValue={brand?.colorGrayLight ?? "#F1F3F6"} className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Police des titres</label>
          <input name="fontHeading" defaultValue={brand?.fontHeading ?? "Sora"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Police du texte</label>
          <input name="fontBody" defaultValue={brand?.fontBody ?? "Inter"} className={inputClass} />
        </div>
      </div>

      <p className="text-xs text-navy/50">
        Le logo est déjà répercuté sur le site. Les couleurs et polices suivent la charte graphique
        imposée ; leur modification ici est conservée mais n&apos;est pas encore répercutée sur le thème
        compilé du site (prévu à une itération ultérieure).
      </p>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Identité mise à jour.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-navy text-white font-semibold px-6 py-2.5 hover:bg-institutional transition-colors disabled:opacity-50"
      >
        {isPending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  )
}
