import Image from "next/image"
import { getProfile } from "../../../lib/db/profile"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "À propos — Paterne SEKA",
  description: "Développeur full-stack orienté produit, du besoin métier au déploiement.",
  alternates: { canonical: "/about" },
}

const method = [
  "Compréhension du besoin",
  "Cadrage fonctionnel",
  "UX et architecture",
  "Développement",
  "Tests et optimisation",
  "Déploiement",
  "Maintenance et évolution",
]

export default async function About() {
  const profile = await getProfile()

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-16">
      <section className="grid md:grid-cols-3 gap-10 items-start">
        <div className="relative h-56 w-56 rounded-2xl overflow-hidden mx-auto md:mx-0">
          <Image
            src={profile.heroPhoto}
            alt={profile.name}
            fill
            sizes="224px"
            className="object-cover"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">À propos</h1>
          <p className="text-navy/80 leading-relaxed text-lg">
            Passionné par la technologie et la résolution de problèmes complexes, je transforme les
            besoins métiers en solutions numériques performantes. Mon approche combine rigueur
            technique, expérience utilisateur et impact réel.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl font-bold text-navy mb-8">Méthode de travail</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {method.map((step, index) => (
            <li
              key={step}
              className="rounded-xl border border-gray-100 bg-gray-light p-5 space-y-2"
            >
              <span className="font-heading text-accent font-bold text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-navy font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
