"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { updateBrandAction } from "../../../../lib/actions/brand"
import { inputClass, labelClass, fileInputClass } from "../_components/formStyles"

const initialState = { error: null, success: false }

function ColorField({ name, label, defaultValue }) {
  return (
    <div>
      <label className={`${labelClass} flex items-center gap-2`}>
        <span
          className="inline-block h-3.5 w-3.5 rounded-full border border-gray-300 shrink-0"
          style={{ backgroundColor: defaultValue }}
        />
        {label}
      </label>
      <input name={name} type="text" defaultValue={defaultValue} className={inputClass} />
    </div>
  )
}

export default function BrandForm({ brand, onSuccess }) {
  const [state, formAction, isPending] = useActionState(updateBrandAction, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success("Identité mise à jour.")
      onSuccess?.(state)
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-5">
        <h2 className="font-heading font-semibold text-navy">Assets visuels</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Logo</label>
            {brand?.logoUrl && <p className="text-xs text-navy/50 mb-1.5">Actuel : {brand.logoUrl}</p>}
            <input type="file" name="logoFile" accept="image/*,image/svg+xml" className={fileInputClass} />
          </div>
          <div>
            <label className={labelClass}>Favicon</label>
            {brand?.faviconUrl && <p className="text-xs text-navy/50 mb-1.5">Actuel : {brand.faviconUrl}</p>}
            <input type="file" name="faviconFile" accept="image/*" className={fileInputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Image Open Graph</label>
          {brand?.ogImage && <p className="text-xs text-navy/50 mb-1.5">Actuelle : {brand.ogImage}</p>}
          <input type="file" name="ogImageFile" accept="image/*" className={fileInputClass} />
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Couleurs</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <ColorField name="colorNavy" label="Bleu marine" defaultValue={brand?.colorNavy ?? "#0D1B2A"} />
          <ColorField name="colorInstitutional" label="Bleu institutionnel" defaultValue={brand?.colorInstitutional ?? "#133A7C"} />
          <ColorField name="colorAccent" label="Bleu accent" defaultValue={brand?.colorAccent ?? "#2563EB"} />
          <ColorField name="colorGrayLight" label="Gris clair" defaultValue={brand?.colorGrayLight ?? "#F1F3F6"} />
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Typographie</h2>
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
      </section>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

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
