"use client"

import { useActionState, useEffect } from "react"
import toast from "react-hot-toast"
import { updateProfileAction } from "../../../../lib/actions/profile"
import { inputClass, labelClass, checkboxClass, fileInputClass } from "../_components/formStyles"

const initialState = { error: null, success: false }

export default function ProfileForm({ profile, onSuccess }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState)

  useEffect(() => {
    if (state?.success) {
      toast.success("Profil mis à jour.")
      onSuccess?.(state)
    } else if (state?.error) {
      toast.error(state.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-5">
        <h2 className="font-heading font-semibold text-navy">Informations générales</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Nom</label>
            <input name="name" defaultValue={profile.name} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Titre</label>
            <input name="title" defaultValue={profile.title} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Accroche / promesse</label>
          <textarea name="promise" defaultValue={profile.promise} rows={3} className={inputClass} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Localisation</label>
            <input name="location" defaultValue={profile.location} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Libellé de disponibilité</label>
            <input name="availabilityLabel" defaultValue={profile.availabilityLabel} className={inputClass} required />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" name="available" defaultChecked={profile.available} className={checkboxClass} />
          Disponible pour de nouvelles opportunités
        </label>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Contact & réseaux</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" defaultValue={profile.email} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Téléphone</label>
            <input name="phone" defaultValue={profile.phone ?? ""} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input name="whatsapp" defaultValue={profile.whatsapp ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>GitHub</label>
            <input name="github" defaultValue={profile.github ?? ""} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>LinkedIn</label>
          <input name="linkedin" defaultValue={profile.linkedin ?? ""} className={inputClass} />
        </div>
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-6">
        <h2 className="font-heading font-semibold text-navy">Médias</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Photo du hero</label>
            {profile.heroPhoto && <p className="text-xs text-navy/50 mb-1.5">Actuelle : {profile.heroPhoto}</p>}
            <input type="file" name="heroPhotoFile" accept="image/*" className={fileInputClass} />
          </div>
          <div>
            <label className={labelClass}>CV (PDF)</label>
            {profile.cvUrl && <p className="text-xs text-navy/50 mb-1.5">Actuel : {profile.cvUrl}</p>}
            <input type="file" name="cvFile" accept="application/pdf" className={fileInputClass} />
          </div>
        </div>
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
