import { getProfile } from "../../../lib/db/profile"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Confidentialité — Paterne SEKA",
}

export default async function Confidentialite() {
  const profile = await getProfile()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Politique de confidentialité</h1>

      <div className="space-y-6 text-navy/80 leading-relaxed">
        <section>
          <h2 className="font-heading font-semibold text-navy text-lg mb-2">Données collectées</h2>
          <p>
            Le formulaire de contact collecte uniquement les informations que vous transmettez
            volontairement (nom, email, entreprise, téléphone, message) afin de répondre à votre demande.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-navy text-lg mb-2">Utilisation des données</h2>
          <p>
            Ces informations sont utilisées exclusivement pour traiter votre demande de contact et ne
            sont ni cédées ni transmises à des tiers.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-navy text-lg mb-2">Vos droits</h2>
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant
            à <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
