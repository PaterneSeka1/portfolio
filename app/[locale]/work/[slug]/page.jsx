import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Lock, Users } from "lucide-react"
import ArchitectureDiagram from "../../../_components/ArchitectureDiagram"
import BrowserFrame from "../../../_components/BrowserFrame"
import CtaBanner from "../../../_components/CtaBanner"
import { ProjectBadges, sketchVariant } from "../../../_components/ProjectCards"
import { Container, TagList } from "../../../_components/ui"
import { getDictionary } from "../../../../lib/i18n"
import { localePath } from "../../../../lib/i18n/config"
import { getProjectBySlug, getProjects } from "../../../../lib/db/projects"
import { SITE_URL, buildMetadata } from "../../../../lib/seo"
import { getSession } from "../../../../lib/auth/current-user"

/** ?preview=1 shows drafts and archived projects, for a signed-in admin only. */
async function isPreview(searchParams) {
  const query = await searchParams
  if (query?.preview !== "1") return false
  return Boolean(await getSession())
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params, searchParams }) {
  const { locale, slug } = await params
  const preview = await isPreview(searchParams)
  const project = await getProjectBySlug(slug, locale, { preview })
  if (!project) return {}
  if (preview) return { title: `Aperçu — ${project.title}`, robots: { index: false, follow: false } }
  const headline = project.caseStudy?.headline
  return buildMetadata({
    locale,
    path: `/work/${project.slug}`,
    title: project.seoTitle || (headline ? `${project.title} — ${headline}` : project.title),
    description: project.seoDescription || project.summary,
    type: "article",
  })
}

const hasContent = (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value && String(value).trim()))

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0">
      <h2 id={id} className="font-heading text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function Prose({ children }) {
  return <p className="max-w-prose text-base leading-relaxed text-white/75 sm:text-[17px]">{children}</p>
}

function BulletList({ items }) {
  return (
    <ul className="max-w-prose space-y-2.5 text-base text-white/75 sm:text-[17px]">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ value }) {
  return Array.isArray(value) ? <BulletList items={value} /> : <Prose>{value}</Prose>
}

export default async function CaseStudyPage({ params, searchParams }) {
  const { locale, slug } = await params
  const preview = await isPreview(searchParams)
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug, locale, { preview }),
    getProjects(locale),
  ])
  if (!project) notFound()

  const dict = getDictionary(locale)
  const { work, caseStudy: labels } = dict
  const cs = project.caseStudy ?? {}
  const isPrivate = project.visibility === "private"
  const [cover, ...gallery] = project.images ?? []
  const stack = hasContent(cs.stack) ? cs.stack : project.technologies

  const ctaHref = project.cta?.href?.startsWith("/")
    ? localePath(locale, project.cta.href)
    : localePath(locale, `/contact?project=${project.slug}`)

  const related = allProjects.filter((p) => p.featured && p.slug !== project.slug).slice(0, 3)

  // Narrative order requested for the case studies.
  const sections = [
    ["context", cs.context],
    ["problem", cs.problem],
    ["objectives", cs.objectives],
    ["constraints", cs.constraints],
    ["solution", cs.solution],
    ["features", cs.features],
    ["users", cs.users],
  ]
  const afterArchitecture = [
    ["challenges", cs.challenges],
    ["decisions", cs.decisions],
    ["results", cs.results],
    ["nextSteps", cs.nextSteps],
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.headline ? `${project.title} — ${cs.headline}` : project.title,
    description: project.summary,
    inLanguage: locale,
    url: `${SITE_URL}${localePath(locale, `/work/${project.slug}`)}`,
    author: { "@type": "Person", name: "Paterne SEKA", "@id": `${SITE_URL}/#person` },
    keywords: project.technologies.join(", "),
    ...(project.publicUrl ? { sameAs: project.publicUrl } : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {preview && (
        <div role="status" className="sticky top-16 z-40 border-b border-amber-300/30 bg-amber-300/15 backdrop-blur">
          <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm text-amber-100">
            <p>
              <strong className="font-semibold">Aperçu administrateur</strong> — statut :{" "}
              {{ draft: "brouillon", published: "publié", archived: "archivé" }[project.status]}. Cette page
              n&apos;est visible que par vous.
            </p>
            <Link href={`/admin/projets/${project.id}`} className="font-semibold underline underline-offset-4">
              Retour à l&apos;édition
            </Link>
          </Container>
        </div>
      )}

      <article>
        <header className="border-b border-white/[0.06]">
          <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
            <Link
              href={localePath(locale, "/work")}
              className="inline-flex items-center gap-2 rounded text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {labels.back}
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <ProjectBadges project={project} work={work} />
                <p className="mt-6 text-sm font-medium text-white/55">{project.title}</p>
                <h1 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  {cs.headline || project.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{project.summary}</p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  {project.publicUrl && (
                    <a
                      href={project.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-accent-light hover:text-white"
                    >
                      {work.visitSite}
                      <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only">{dict.a11y.newTab}</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-accent-light hover:text-white"
                    >
                      GitHub
                      <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only">{dict.a11y.newTab}</span>
                    </a>
                  )}
                  {isPrivate && (
                    <span className="inline-flex items-center gap-1.5 text-white/55">
                      <Lock size={14} aria-hidden="true" />
                      {work.privateNote}
                    </span>
                  )}
                </div>
              </div>

              <BrowserFrame
                image={cover}
                alt={cs.headline || project.title}
                variant={sketchVariant(project)}
                priority
                sizes="(max-width: 1024px) 92vw, 520px"
              />
            </div>
          </Container>
        </header>

        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside aria-label={labels.overview} className="lg:sticky lg:top-24 lg:self-start">
            <dl className="space-y-6 rounded-2xl border border-white/[0.08] bg-surface/50 p-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{labels.labels.type}</dt>
                <dd className="mt-1.5 text-white/85">{work.categories[project.category]}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                  {labels.labels.visibility}
                </dt>
                <dd className="mt-1.5 text-white/85">
                  {isPrivate ? `${work.privateBadge} · ${work.internalBadge}` : work.publicBadge}
                </dd>
              </div>
              {hasContent(cs.role) && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    {labels.sections.role}
                  </dt>
                  <dd className="mt-1.5 text-white/85">{cs.role[0]}</dd>
                </div>
              )}
              {hasContent(stack) && (
                <div>
                  <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    {labels.labels.stack}
                  </dt>
                  <dd>
                    <TagList items={stack} label={labels.labels.stack} />
                  </dd>
                </div>
              )}
            </dl>
            {isPrivate && <p className="mt-4 px-1 text-xs leading-relaxed text-white/50">{labels.privateNotice}</p>}
          </aside>

          <div className="min-w-0">
            {sections
              .filter(([, value]) => hasContent(value))
              .map(([key, value]) => (
                <Section key={key} id={`cs-${key}`} title={labels.sections[key]}>
                  <Block value={value} />
                </Section>
              ))}

            {(hasContent(cs.role) || hasContent(cs.collaboration)) && (
              <Section id="cs-role" title={labels.sections.role}>
                {hasContent(cs.role) && <BulletList items={cs.role} />}
                {hasContent(cs.collaboration) && (
                  <div className="mt-6 flex max-w-prose gap-3 rounded-xl border border-accent/30 bg-accent/[0.07] p-4 text-[15px] leading-relaxed text-white/80">
                    <Users size={18} className="mt-0.5 shrink-0 text-accent-light" aria-hidden="true" />
                    <p>
                      <span className="font-semibold text-white">{labels.collaborationTitle}. </span>
                      {cs.collaboration}
                    </p>
                  </div>
                )}
              </Section>
            )}

            {(hasContent(cs.architecture) || hasContent(cs.architectureDiagram)) && (
              <Section id="cs-architecture" title={labels.sections.architecture}>
                {hasContent(cs.architecture) && <Prose>{cs.architecture}</Prose>}
                {hasContent(cs.architectureDiagram) && (
                  <div className="mt-6">
                    <ArchitectureDiagram source={cs.architectureDiagram} caption={labels.diagramCaption} />
                  </div>
                )}
              </Section>
            )}

            {gallery.length > 0 && (
              <Section id="cs-gallery" title={labels.sections.gallery}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {gallery.map((image) => (
                    <li key={image.id} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={image.url}
                        alt={image.alt || project.title}
                        fill
                        sizes="(max-width: 640px) 92vw, 380px"
                        className="object-cover object-top"
                      />
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-white/50">{labels.galleryNote}</p>
              </Section>
            )}

            {afterArchitecture
              .filter(([, value]) => hasContent(value))
              .map(([key, value]) => (
                <Section key={key} id={`cs-${key}`} title={labels.sections[key]}>
                  <Block value={value} />
                </Section>
              ))}
          </div>
        </Container>
      </article>

      <CtaBanner
        title={cs.ctaTitle || labels.ctaDefault.title}
        href={ctaHref}
        button={project.cta?.label || labels.ctaDefault.button}
      />

      {related.length > 0 && (
        <nav aria-labelledby="related-work" className="pb-20">
          <Container>
            <h2 id="related-work" className="mb-6 font-heading text-lg font-semibold text-white">
              {labels.otherProjects}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localePath(locale, `/work/${item.slug}`)}
                    className="block h-full rounded-xl border border-white/[0.08] p-5 transition-colors hover:border-white/20"
                  >
                    <p className="text-xs font-medium text-white/50">{item.title}</p>
                    <p className="mt-1 font-heading font-semibold text-white">{item.caseStudy?.headline || item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </>
  )
}
