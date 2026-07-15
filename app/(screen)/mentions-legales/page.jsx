import { getProfile } from "../../../lib/db/profile"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Mentions légales — Paterne SEKA",
  alternates: { canonical: "/mentions-legales" },
}

export default async function MentionsLegales() {
  const profile = await getProfile()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 prose-navy">
      <h1 className="font-heading text-3xl font-bold text-navy mb-8">Mentions légales</h1>

      <div className="space-y-6 text-navy/80 leading-relaxed">
        <section>
          <h2 className="font-heading font-semibold text-navy text-lg mb-2">Éditeur du site</h2>
          <p>
            Ce site est édité par {profile.name}, développeur indépendant basé à {profile.location}.
            Contact : <a href={`mailto:${profile.email}`} className="text-accent hover:underline">{profile.email}</a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-navy text-lg mb-2">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, visuels, code) est protégé au titre du
            droit d&apos;auteur. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-navy text-lg mb-2">Hébergement</h2>
          <p>Les informations d&apos;hébergement sont communiquées sur simple demande.</p>
        </section>
      </div>
    </div>
  )
}
