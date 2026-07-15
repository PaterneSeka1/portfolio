import { Briefcase } from "lucide-react"
import { getExperiences } from "../../../lib/db/experiences"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Parcours — Paterne SEKA",
  description: "Parcours professionnel de Paterne SEKA.",
}

export default async function Parcours() {
  const experiences = await getExperiences()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-12">Parcours</h1>

      <ol className="relative border-l-2 border-gray-100 space-y-10 ml-3">
        {experiences.map((exp) => (
          <li key={exp.company} className="relative pl-8">
            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-institutional flex items-center justify-center text-white">
              <Briefcase size={13} />
            </span>
            <div className="space-y-1.5">
              <h2 className="font-heading font-semibold text-lg text-navy">{exp.company}</h2>
              <p className="text-accent text-sm font-medium">{exp.role}</p>
              {exp.period && <p className="text-xs text-navy/50">{exp.period}</p>}
              <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 pt-1">
                {exp.missions.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
