import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Lock } from "lucide-react"
import { getProjectBySlug } from "../../../../lib/db/projects"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Paterne SEKA`,
    description: project.summary,
  }
}

const sections = [
  ["Contexte", "context"],
  ["Problème", "problem"],
  ["Objectifs", "objectives"],
  ["Utilisateurs et rôles", "users"],
  ["Fonctionnalités", "features"],
  ["Architecture", "architecture"],
  ["Stack", "stack"],
  ["Défis", "challenges"],
  ["Solutions", "solutions"],
  ["Résultats", "results"],
]

function SectionBlock({ title, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null

  return (
    <section className="py-6 border-b border-gray-100 last:border-none">
      <h2 className="font-heading text-xl font-semibold text-navy mb-3">{title}</h2>
      {Array.isArray(value) ? (
        <ul className="list-disc list-inside space-y-1.5 text-navy/70">
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-navy/70 leading-relaxed">{value}</p>
      )}
    </section>
  )
}

export default async function ProjectCaseStudy({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const { caseStudy } = project
  const isExternalCta = project.cta.href.startsWith("http")

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/projets" className="inline-flex items-center gap-2 text-sm text-navy/60 hover:text-accent transition-colors mb-8">
        <ArrowLeft size={16} />
        Retour aux réalisations
      </Link>

      <div className="flex items-center gap-3 text-xs font-medium mb-3">
        <span className="text-institutional">
          {project.category === "business" && "Application métier"}
          {project.category === "saas" && "Produit SaaS"}
          {project.category === "website" && "Site web"}
        </span>
        <span className="inline-flex items-center gap-1 text-navy/60">
          {project.visibility === "private" && <Lock size={12} />}
          {project.visibility === "private" ? "Privé" : "Public"}
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">{project.title}</h1>
      <p className="mt-4 text-lg text-navy/70 leading-relaxed">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.technologies.map((tech) => (
          <span key={tech} className="text-xs text-navy/70 bg-gray-light px-2.5 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>

      <a
        href={project.cta.href}
        {...(isExternalCta ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-block mt-8 rounded-lg bg-navy text-white px-6 py-3 font-semibold hover:bg-institutional transition-colors"
      >
        {project.cta.label}
      </a>

      <div className="mt-12">
        {sections.map(([title, key]) => (
          <SectionBlock key={key} title={title} value={caseStudy[key]} />
        ))}

        {project.images.length > 0 && (
          <section className="py-6">
            <h2 className="font-heading text-xl font-semibold text-navy mb-3">Galerie</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.images.map((image) => (
                <div key={image.id} className="relative h-48 rounded-xl overflow-hidden">
                  <Image src={image.url} alt={image.alt || project.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <a
        href={project.cta.href}
        {...(isExternalCta ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-block mt-4 rounded-lg bg-navy text-white px-6 py-3 font-semibold hover:bg-institutional transition-colors"
      >
        {project.cta.label}
      </a>
    </div>
  )
}
