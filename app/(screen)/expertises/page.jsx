import {
  LayoutTemplate,
  Server,
  Database,
  Network,
  Rocket,
  Radio,
  Layers,
  Handshake,
} from "lucide-react"
import { getExpertises } from "../../../lib/db/expertises"
import { getSkillsGroupedByCategory } from "../../../lib/db/skills"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Expertises — Paterne SEKA",
  description: "Frontend, backend, bases de données, architecture, DevOps et accompagnement.",
}

const icons = {
  LayoutTemplate,
  Server,
  Database,
  Network,
  Rocket,
  Radio,
  Layers,
  Handshake,
}

export default async function Expertises() {
  const [expertises, skillGroups] = await Promise.all([getExpertises(), getSkillsGroupedByCategory()])

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">Expertises</h1>
        <p className="mt-3 text-navy/70 text-lg">
          Une expertise complète, du frontend au déploiement, pour accompagner vos projets de bout
          en bout.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertises.map((item) => {
          const Icon = icons[item.icon]
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 p-6 space-y-4 hover:border-accent/40 hover:shadow-md transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-institutional/10 flex items-center justify-center text-institutional">
                {Icon && <Icon size={22} />}
              </div>
              <h2 className="font-heading font-semibold text-lg text-navy">{item.title}</h2>
              <p className="text-navy/70 text-sm leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium text-navy/70 bg-gray-light px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {skillGroups.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-navy mb-8">Toutes mes compétences</h2>
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-institutional uppercase tracking-wide mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs font-medium text-navy/70 bg-gray-light px-2.5 py-1 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
