import Link from "next/link"
import { Building2, Rocket, Globe, Lock } from "lucide-react"

const categoryMeta = {
  business: { label: "Application métier", icon: Building2 },
  saas: { label: "Produit SaaS", icon: Rocket },
  website: { label: "Site web", icon: Globe },
}

export default function ProjectCard({ project }) {
  const meta = categoryMeta[project.category]
  const Icon = meta?.icon ?? Building2
  const isExternalCta = project.cta.href.startsWith("http")

  return (
    <article className="rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="h-40 bg-gradient-to-br from-navy to-institutional flex items-center justify-center">
        <Icon size={40} className="text-white/80" />
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-institutional">{meta?.label}</span>
          <span className="inline-flex items-center gap-1 text-navy/60">
            {project.visibility === "private" && <Lock size={12} />}
            {project.visibility === "private" ? "Privé" : "Public"}
          </span>
        </div>

        <h2 className="font-heading text-lg font-semibold text-navy">{project.title}</h2>
        <p className="text-sm text-navy/70 leading-relaxed line-clamp-3">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-xs text-navy/70 bg-gray-light px-2.5 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
          <Link href={`/projets/${project.slug}`} className="text-sm font-semibold text-accent hover:underline">
            Voir l&apos;étude de cas
          </Link>
          <a
            href={project.cta.href}
            {...(isExternalCta ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm font-semibold rounded-lg bg-navy text-white px-4 py-2 hover:bg-institutional transition-colors"
          >
            {project.cta.label}
          </a>
        </div>
      </div>
    </article>
  )
}
