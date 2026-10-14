import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react"
import { PhoneFrame, ProductWindow, sketchVariant } from "./ProductFrames"
import { ButtonLink, Eyebrow, Reveal, Tag, TechLine } from "./ui"
import { localePath } from "../../lib/i18n/config"
import { isPrivateProject, projectHighlights } from "../../lib/projects"

/** Projects whose main screen has a mobile counterpart worth showing (QR cards, tickets). */
const MOBILE_COMPANION = new Set(["scout-ascci", "vedem-ticket"])

const caseStudyHref = (locale, project) => localePath(locale, `/work/${project.slug}`)

export function ProjectBadges({ project, work }) {
  const isPrivate = isPrivateProject(project)
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

function HighlightList({ items, label, className = "" }) {
  if (!items.length) return null
  return (
    <ul aria-label={label} className={`space-y-2 text-sm text-white/75 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check size={16} className="mt-0.5 shrink-0 text-accent-light" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Visual composition of a project: real screenshot when available, otherwise
 * the product schematic, plus a phone companion for mobile-first features.
 */
export function ProjectVisual({ project, priority = false, sizes, zoomOnHover = false, sketchLabel }) {
  const cover = project.images?.[0]
  const variant = sketchVariant(project)
  const withPhone = !cover && MOBILE_COMPANION.has(project.slug)
  const alt = cover ? project.title : `${sketchLabel ?? ""} — ${project.title}`.replace(/^ — /, "")

  return (
    <div className={`relative ${withPhone ? "pr-[14%] pb-[6%]" : ""}`}>
      <ProductWindow
        image={cover}
        alt={alt}
        label={project.title}
        isPrivate={isPrivateProject(project)}
        variant={variant}
        priority={priority}
        sizes={sizes}
        zoomOnHover={zoomOnHover}
      />
      {withPhone && <PhoneFrame className="absolute right-0 bottom-0 w-[24%] max-w-36" />}
    </div>
  )
}

/** Home "featured project" spotlight: the problem, the answer and the proof. */
export function FeaturedProject({ project, locale, dict }) {
  const { work } = dict
  const labels = dict.home.featured
  const cs = project.caseStudy ?? {}
  const highlights = projectHighlights(project, 4)
  const result = cs.results?.[0]
  const href = caseStudyHref(locale, project)

  return (
    <section aria-labelledby="featured-project" className="relative py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-page items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal index={0} className="lg:sticky lg:top-28">
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            data-track="case_study_open"
            data-track-project={project.slug}
            data-track-from="featured_visual"
            className="group block"
          >
            <ProjectVisual
              project={project}
              zoomOnHover
              sketchLabel={dict.hero.showcase.sketchNote}
              sizes="(max-width: 1024px) 92vw, 600px"
            />
          </Link>
        </Reveal>

        <Reveal index={1}>
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <div className="mt-5">
            <ProjectBadges project={project} work={work} />
          </div>
          <h2
            id="featured-project"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {project.title}
          </h2>
          {cs.headline && <p className="mt-3 text-lg leading-snug text-pretty text-accent-light">{cs.headline}</p>}

          <dl className="mt-8 space-y-6">
            {cs.problem && (
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">{labels.problem}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/75">{cs.problem}</dd>
              </div>
            )}
            {cs.solution && (
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">{labels.solution}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/75">{cs.solution}</dd>
              </div>
            )}
            {highlights.length > 0 && (
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">{labels.highlights}</dt>
                <dd className="mt-3">
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 rounded-control border border-line bg-white/[0.03] p-3 text-sm leading-snug text-white/85"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-accent-light" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {result && (
              <div>
                <dt className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">{labels.result}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/75">{result}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink
              href={href}
              arrow
              className="shrink-0"
              data-track="case_study_open"
              data-track-project={project.slug}
              data-track-from="featured"
            >
              {labels.cta}
              <span className="sr-only"> — {project.title}</span>
            </ButtonLink>
            <TechLine items={project.technologies} label={work.stackLabel} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Main project card: visual first, business value, proof points, technologies last. */
export function ProjectCard({ project, locale, work, sketchLabel, headingLevel = "h3", priority = false }) {
  const Heading = headingLevel
  const cs = project.caseStudy ?? {}
  const href = caseStudyHref(locale, project)
  const highlights = projectHighlights(project, 3)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface/50 shadow-card transition-surface hover-lift focus-within:border-white/25 hover:border-white/20 hover:bg-surface/80">
      <div className="p-3 pb-0 xs:p-4 xs:pb-0 sm:p-5 sm:pb-0">
        <ProjectVisual
          project={project}
          priority={priority}
          zoomOnHover
          sketchLabel={sketchLabel}
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 360px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="text-xs font-medium text-white/55">
          {work.categories[project.category]}
          {isPrivateProject(project) && (
            <>
              {" · "}
              <Lock size={11} aria-hidden="true" className="inline align-[-1px]" /> {work.privateBadge}
            </>
          )}
        </p>

        <div>
          <Heading className="font-heading text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
            <Link
              href={href}
              data-track="case_study_open"
              data-track-project={project.slug}
              data-track-from="card"
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </Heading>
          {cs.headline && <p className="mt-1.5 text-[15px] leading-snug text-pretty text-white/75">{cs.headline}</p>}
        </div>

        <HighlightList items={highlights} label={work.highlightsLabel} />

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
          <TechLine items={project.technologies} label={work.stackLabel} />
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-accent-light transition-surface group-hover:border-accent-light/60 group-hover:bg-accent/15 group-hover:text-white"
          >
            <ArrowRight size={16} className="arrow-nudge" />
          </span>
        </div>
      </div>
      {/* Keyboard focus ring for the stretched link, drawn on the whole card. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card ring-2 ring-accent-light opacity-0 transition-opacity group-has-[a:focus-visible]:opacity-100"
      />
    </article>
  )
}

/** "Next project" link at the end of a case study. */
export function NextProjectCard({ project, locale, label, sketchLabel }) {
  const cs = project.caseStudy ?? {}
  return (
    <Link
      href={caseStudyHref(locale, project)}
      data-track="case_study_open"
      data-track-project={project.slug}
      data-track-from="next_project"
      className="group grid items-center gap-6 overflow-hidden rounded-panel border border-line bg-surface/50 p-4 shadow-card transition-surface hover:border-white/20 hover:bg-surface/80 sm:grid-cols-[1fr_1.1fr] sm:p-6"
    >
      <div className="order-2 sm:order-1 sm:pl-2">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">{label}</p>
        <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">{project.title}</p>
        {cs.headline && <p className="mt-2 text-[15px] leading-snug text-white/70">{cs.headline}</p>}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-light group-hover:text-white">
          {label}
          <ArrowRight size={16} aria-hidden="true" className="arrow-nudge" />
        </span>
      </div>
      <div className="order-1 sm:order-2">
        <ProjectVisual project={project} zoomOnHover sketchLabel={sketchLabel} sizes="(max-width: 640px) 92vw, 480px" />
      </div>
    </Link>
  )
}

/** Compact entry for earlier / secondary projects. */
export function ArchiveProjectItem({ project, locale, work, index = 0 }) {
  const cs = project.caseStudy ?? {}
  return (
    <li
      style={{ "--i": index }}
      className="group flex flex-col gap-4 rounded-card border border-line p-5 transition-surface hover:border-white/20 hover:bg-white/[0.02] sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
          <span className="text-xs font-medium text-white/50">
            {work.categories[project.category]} · {isPrivateProject(project) ? work.privateBadge : work.publicBadge}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/65">{project.summary}</p>
        <TechLine items={project.technologies} label={work.stackLabel} />
      </div>
      <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
        {Object.keys(cs).length > 0 && (
          <Link
            href={caseStudyHref(locale, project)}
            data-track="case_study_open"
            data-track-project={project.slug}
            data-track-from="archive"
            className="group/link inline-flex min-h-11 items-center gap-1.5 text-accent-light transition-surface hover:text-white"
          >
            {work.readCaseStudy}
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover/link:translate-x-0.5"
            />
            <span className="sr-only"> — {project.title}</span>
          </Link>
        )}
        {project.publicUrl && (
          <a
            href={project.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex min-h-11 items-center gap-1 text-white/70 transition-surface hover:text-white"
          >
            {work.visitSite}
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
            <span className="sr-only"> — {project.title}</span>
          </a>
        )}
      </div>
    </li>
  )
}
