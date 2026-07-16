"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { updateSettingsAction } from "../../../../lib/actions/settings"
import { inputClass, labelClass, checkboxClass, fileInputClass } from "../_components/formStyles"

const initialState = { error: null }

export default function SettingsForm({ settings, onSuccess }) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success("Paramètres mis à jour.")
      onSuccess?.(state)
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-5">
        <h2 className="font-heading font-semibold text-navy">SEO & Open Graph</h2>
        <div>
          <label className={labelClass}>Titre SEO</label>
          <input name="seoTitle" defaultValue={settings?.seoTitle ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description SEO</label>
          <textarea name="seoDescription" defaultValue={settings?.seoDescription ?? ""} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Image Open Graph</label>
          {settings?.ogImage && <p className="text-xs text-navy/50 mb-1.5">Actuelle : {settings.ogImage}</p>}
          <input type="file" name="ogImageFile" accept="image/*" className={fileInputClass} />
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Contact</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email de contact</label>
            <input name="contactEmail" defaultValue={settings?.contactEmail ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Téléphone de contact</label>
            <input name="contactPhone" defaultValue={settings?.contactPhone ?? ""} className={inputClass} />
          </div>
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">SMTP & Analytics</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Hôte SMTP</label>
            <input name="smtpHost" defaultValue={settings?.smtpHost ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Utilisateur SMTP</label>
            <input name="smtpUser" defaultValue={settings?.smtpUser ?? ""} className={inputClass} />
          </div>
        </div>
        <p className="text-xs text-navy/50">
          Le mot de passe SMTP reste défini uniquement via la variable d&apos;environnement
          EMAIL_PASS, jamais stocké ici.
        </p>
        <div>
          <label className={labelClass}>Identifiant Analytics</label>
          <input name="analyticsId" defaultValue={settings?.analyticsId ?? ""} className={inputClass} />
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Domaine & maintenance</h2>
        <div>
          <label className={labelClass}>Domaine</label>
          <input name="domain" defaultValue={settings?.domain ?? ""} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" name="maintenanceMode" defaultChecked={settings?.maintenanceMode ?? false} className={checkboxClass} />
          Mode maintenance
        </label>
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
