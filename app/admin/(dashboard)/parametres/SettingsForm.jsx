"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { updateSettingsAction } from "../../../../lib/actions/settings"

const inputClass =
  "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent"
const labelClass = "block text-sm font-medium text-navy mb-1.5"

const initialState = { error: null }

export default function SettingsForm({ settings }) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, initialState)

  useEffect(() => {
    if (state?.success) toast.success("Paramètres mis à jour.")
    else if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <section className="space-y-4">
        <h2 className="font-heading font-semibold text-navy">SEO &amp; Open Graph</h2>
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
          {settings?.ogImage && <p className="text-xs text-navy/50 mb-1">Actuelle : {settings.ogImage}</p>}
          <input type="file" name="ogImageFile" accept="image/*" className="text-sm" />
        </div>
      </section>

      <section className="space-y-4">
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

      <section className="space-y-4">
        <h2 className="font-heading font-semibold text-navy">SMTP &amp; Analytics</h2>
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

      <section className="space-y-4">
        <h2 className="font-heading font-semibold text-navy">Domaine &amp; maintenance</h2>
        <div>
          <label className={labelClass}>Domaine</label>
          <input name="domain" defaultValue={settings?.domain ?? ""} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" name="maintenanceMode" defaultChecked={settings?.maintenanceMode ?? false} className="h-4 w-4" />
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
