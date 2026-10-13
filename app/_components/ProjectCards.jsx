import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react"
import BrowserFrame from "./BrowserFrame"
import { Tag, TagList } from "./ui"
import { localePath } from "../../lib/i18n/config"

export function sketchVariant(project) {
  if (project.category === "ai") return "ai"
  if (project.category === "website") return "website"
  return "dashboard"
}

export function ProjectBadges({ project, work }) {
  const isPrivate = project.visibility === "private"
  const internal = isPrivate && (project.category === "business" || project.category === "ai")
  return (
    <div className="flex flex-wrap gap-2">
      <Tag tone="accent">{internal ? work.internalBadge : work.categories[project.category]}</Tag>
      {isPrivate ? (
        <Tag tone="muted">
          <Lock size={12} aria-hidden="true" />
          {work.privateBadge}
        </Tag>
      ) : (
        <Tag tone="muted">{work.publicBadge}</Tag>
      )}
    </div>
  )
}

/** Main project card: business problem first, technologies last. */
export function FeaturedProjectCard({ project, locale, work, headingLevel = "h3", priority = false }) {
  const Heading = headingLevel
  const cs = project.caseStudy ?? {}
  const href = localePath(locale, `/work/${project.slug}`)
  const highlights = (cs.features ?? []).slice(0, 3)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/60 transition-colors hover:border-white/20">
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <BrowserFrame
          image={project.images?.[0]}
          alt={project.title}
          variant={sketchVariant(project)}
          priority={priority}
          sizes="(max-width: 768px) 92vw, 540px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <ProjectBadges project={project} work={work} />

        <div>
          <p className="text-sm font-medium text-white/55">{project.title}</p>
          <Heading className="mt-1 font-heading text-xl font-semibold leading-snug text-white sm:text-[1.35rem]">
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {cs.headline || project.title}
            </Link>
          </Heading>
        </div>

        <p className="text-[15px] leading-relaxed text-white/70">{project.summary}</p>

        {highlights.length > 0 && (
          <ul className="space-y-1.5 text-sm text-white/70">
            {highlights.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-accent-light" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto space-y-4 border-t border-white/[0.08] pt-4">
          <TagList items={project.technologies} label={work.stackLabel} tone="default" />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light group-hover:text-white">
            {work.readCaseStudy}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

/** Compact entry for earlier / secondary projects. */
export function ArchiveProjectItem({ project, locale, work }) {
  const cs = project.caseStudy ?? {}
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-white/[0.08] p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
          <span className="text-xs font-medium text-white/50">
            {work.categories[project.category]} ·{" "}
            {project.visibility === "private" ? work.privateBadge : work.publicBadge}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/65">{project.summary}</p>
        <p className="text-xs text-white/45">{project.technologies.join(" · ")}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        {Object.keys(cs).length > 0 && (
          <Link href={localePath(locale, `/work/${project.slug}`)} className="text-accent-light hover:text-white">
            {work.readCaseStudy}
            <span className="sr-only"> — {project.title}</span>
          </Link>
        )}
        {project.publicUrl && (
          <a
            href={project.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white"
          >
            {work.visitSite}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> — {project.title}</span>
          </a>
        )}
      </div>
    </li>
  )
}
