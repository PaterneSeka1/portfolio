import Hero from "../_components/Hero"
import CtaBanner from "../_components/CtaBanner"
import { FeaturedProjectCard } from "../_components/ProjectCards"
import { Container, Icon, SectionHeader, TagList, TextLink } from "../_components/ui"
import { getDictionary } from "../../lib/i18n"
import { localePath } from "../../lib/i18n/config"
import { getLocalizedProfile } from "../../lib/db/profile"
import { getProjects } from "../../lib/db/projects"
import { SITE_URL } from "../../lib/seo"

export const dynamic = "force-dynamic"

export default async function Home({ params }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const [profile, projects] = await Promise.all([getLocalizedProfile(locale), getProjects(locale)])
  const featured = projects.filter((project) => project.featured).slice(0, 4)
  const { home } = dict

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
        image: profile.heroPhoto ? `${SITE_URL}${profile.heroPhoto}` : undefined,
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

      <Hero locale={locale} profile={profile} dict={dict} />

      {featured.length > 0 && (
        <section aria-labelledby="selected-work" className="py-20 sm:py-28">
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
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {featured.map((project) => (
                <li key={project.slug}>
                  <FeaturedProjectCard project={project} locale={locale} work={dict.work} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section aria-labelledby="what-i-build" className="border-y border-white/[0.06] bg-surface/40 py-20 sm:py-28">
        <Container>
          <SectionHeader id="what-i-build" eyebrow={home.build.eyebrow} title={home.build.title} intro={home.build.intro} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {home.build.items.map((item) => (
              <li key={item.title} className="bg-ink p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{item.text}</p>
              </li>
            ))}
            <li className="hidden bg-ink p-6 sm:p-7 lg:flex lg:flex-col lg:justify-end">
              <TextLink href={localePath(locale, "/expertise")}>{dict.expertise.title}</TextLink>
            </li>
          </ul>
        </Container>
      </section>

      <section aria-labelledby="how-i-work" className="py-20 sm:py-28">
        <Container>
          <SectionHeader id="how-i-work" eyebrow={home.method.eyebrow} title={home.method.title} intro={home.method.intro} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {home.method.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/[0.08] p-6">
                <p className="font-heading text-sm font-bold text-accent-light" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="idea-to-production" className="border-y border-white/[0.06] bg-surface/40 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              id="idea-to-production"
              eyebrow={home.production.eyebrow}
              title={home.production.title}
              intro={home.production.text}
            />
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                {home.production.stackLabel}
              </p>
              <TagList items={home.production.stack} label={home.production.stackLabel} />
            </div>
          </div>
          <ol className="relative space-y-3 border-l border-white/10 pl-6">
            {home.production.points.map((point) => (
              <li key={point} className="relative rounded-xl border border-white/[0.08] bg-ink px-5 py-4 text-[15px] text-white/80">
                <span
                  aria-hidden="true"
                  className="absolute -left-[29px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent-light"
                />
                {point}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="collaboration" className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            id="collaboration"
            eyebrow={home.collaboration.eyebrow}
            title={home.collaboration.title}
            intro={home.collaboration.text}
          />
          <ul className="flex flex-wrap gap-3 lg:justify-end lg:pt-10">
            {home.collaboration.partners.map((partner) => (
              <li key={partner} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75">
                {partner}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title={dict.cta.title}
        text={dict.cta.text}
        href={localePath(locale, "/contact")}
        button={dict.cta.button}
        secondary={profile.cvUrl ? { href: profile.cvUrl, label: dict.cta.secondary, download: true } : null}
      />
    </>
  )
}
