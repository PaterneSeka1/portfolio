import Link from "next/link"
import Hero from "../_components/Hero"
import InfraFlow from "../_components/InfraFlow"
import MethodTimeline from "../_components/MethodTimeline"
import PathCards from "../_components/PathCards"
import { FeaturedProject, ProjectCard } from "../_components/ProjectCards"
import { Container, Icon, Reveal, SectionHeader, TextLink } from "../_components/ui"
import { getDictionary } from "../../lib/i18n"
import { localePath } from "../../lib/i18n/config"
import { getLocalizedProfile } from "../../lib/db/profile"
import { getProjects } from "../../lib/db/projects"
import { pickShowcaseProjects } from "../../lib/projects"
import { SITE_URL, absoluteUrl } from "../../lib/seo"

export const dynamic = "force-dynamic"

export default async function Home({ params }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const [profile, projects] = await Promise.all([getLocalizedProfile(locale), getProjects(locale)])
  const { home } = dict

  // The first featured project (admin order) is the spotlight; the next three are the cards.
  const featuredProjects = projects.filter((project) => project.featured)
  const [spotlight, ...selected] = featuredProjects
  const cards = selected.slice(0, 3)
  const projectBySlug = new Map(projects.map((project) => [project.slug, project]))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.promise,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
        url: SITE_URL,
        image: profile.heroPhoto ? absoluteUrl(profile.heroPhoto) : undefined,
        sameAs: [profile.github, profile.linkedin].filter(Boolean),
        knowsAbout: dict.hero.focus,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: profile.name,
        url: SITE_URL,
        inLanguage: ["fr", "en"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero locale={locale} profile={profile} dict={dict} showcase={pickShowcaseProjects(projects)} />

      {spotlight && <FeaturedProject project={spotlight} locale={locale} dict={dict} />}

      {cards.length > 0 && (
        <section aria-labelledby="selected-work" className="border-t border-line py-20 sm:py-28">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                id="selected-work"
                eyebrow={home.selectedWork.eyebrow}
                title={home.selectedWork.title}
                intro={home.selectedWork.intro}
              />
              <TextLink href={localePath(locale, "/work")} className="shrink-0">
                {home.selectedWork.viewAll}
              </TextLink>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((project, index) => (
                <Reveal as="li" key={project.slug} index={index}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    work={dict.work}
                    sketchLabel={dict.hero.showcase.sketchNote}
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="what-i-build" className="border-y border-line bg-surface/40 py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="what-i-build"
            eyebrow={home.build.eyebrow}
            title={home.build.title}
            intro={home.build.intro}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.build.items.map((item, index) => {
              const proofs = (item.projects ?? []).map((slug) => projectBySlug.get(slug)).filter(Boolean)
              return (
                <Reveal as="li" key={item.title} index={index}>
                  <div className="group flex h-full flex-col rounded-card border border-line bg-ink/80 p-6 transition-surface hover:border-white/20 hover:bg-ink sm:p-7">
                    <div className="flex h-10 w-10 items-center justify-center rounded-control bg-accent/15 text-accent-light transition-surface group-hover:bg-accent group-hover:text-white">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/65">{item.text}</p>
                    {proofs.length > 0 && (
                      <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-[13px] text-white/50">
                        <span>{home.build.proofLabel}</span>
                        {proofs.map((project) => (
                          <Link
                            key={project.slug}
                            href={localePath(locale, `/work/${project.slug}`)}
                            data-track="case_study_open"
                            data-track-project={project.slug}
                            data-track-from="capabilities"
                            className="inline-flex min-h-8 items-center rounded-full border border-white/10 px-2.5 font-medium text-white/75 transition-surface hover:border-accent-light/50 hover:text-white"
                          >
                            {project.title}
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </Reveal>
              )
            })}
            <Reveal
              as="li"
              index={home.build.items.length}
              className="flex flex-col justify-end rounded-card border border-dashed border-white/10 p-6 sm:p-7"
            >
              <TextLink href={localePath(locale, "/expertise")}>{dict.expertise.title}</TextLink>
            </Reveal>
          </ul>
        </Container>
      </section>

      <section aria-labelledby="how-i-work" className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            id="how-i-work"
            eyebrow={home.method.eyebrow}
            title={home.method.title}
            intro={home.method.intro}
          />
          <MethodTimeline steps={home.method.steps} />
        </Container>
      </section>

      <section aria-labelledby="idea-to-production" className="border-y border-line bg-surface/40 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeader
            id="idea-to-production"
            eyebrow={home.production.eyebrow}
            title={home.production.title}
            intro={home.production.text}
          />
          <InfraFlow
            title={home.production.diagramTitle}
            serverLabel={home.production.serverLabel}
            layers={home.production.layers}
          />
        </Container>
      </section>

      <section aria-labelledby="collaboration" className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeader
            id="collaboration"
            eyebrow={home.collaboration.eyebrow}
            title={home.collaboration.title}
            intro={home.collaboration.text}
          />
          <Reveal as="ul" stagger className="flex flex-wrap gap-3 lg:justify-end">
            {home.collaboration.partners.map((partner, index) => (
              <li
                key={partner}
                style={{ "--i": index }}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/80"
              >
                {partner}
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <PathCards locale={locale} labels={home.paths} cvUrl={profile.cvUrl} />
    </>
  )
}
