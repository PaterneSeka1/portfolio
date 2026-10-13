import Image from "next/image"
import { Download } from "lucide-react"
import CtaBanner from "../../_components/CtaBanner"
import { ButtonLink, Container, SectionHeader } from "../../_components/ui"
import { getDictionary } from "../../../lib/i18n"
import { localePath } from "../../../lib/i18n/config"
import { getLocalizedProfile } from "../../../lib/db/profile"
import { getExperiences } from "../../../lib/db/experiences"
import { buildMetadata } from "../../../lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const { about } = getDictionary(locale)
  return buildMetadata({ locale, path: "/about", title: about.metaTitle, description: about.metaDescription })
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const { about, home } = dict
  const [profile, experiences] = await Promise.all([getLocalizedProfile(locale), getExperiences(locale)])

  return (
    <>
      <Container className="grid gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <SectionHeader as="h1" title={about.title} />
          <p className="mt-6 max-w-2xl font-heading text-xl leading-snug text-white sm:text-2xl">{about.lead}</p>
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-white/75 sm:text-[17px]">
            {about.story.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          {profile.cvUrl && (
            <div className="mt-10">
              <ButtonLink href={profile.cvUrl} variant="secondary" download>
                <Download size={18} aria-hidden="true" />
                {about.resumeCta}
              </ButtonLink>
            </div>
          )}
        </div>

        {profile.heroPhoto && (
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface lg:mx-0 lg:mt-16">
            <Image
              src={profile.heroPhoto}
              alt={dict.hero.photoAlt}
              fill
              sizes="(max-width: 1024px) 320px, 320px"
              className="object-cover object-top"
            />
          </div>
        )}
      </Container>

      <section aria-labelledby="path" className="border-y border-white/[0.06] bg-surface/40 py-16 sm:py-20">
        <Container>
          <h2 id="path" className="font-heading text-xl font-semibold text-white sm:text-2xl">
            {about.pathTitle}
          </h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {about.path.map((step, index) => (
              <li key={step} className="rounded-xl border border-white/[0.08] bg-ink p-4">
                <span className="font-heading text-xs font-bold text-accent-light" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-medium text-white">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="collaboration" className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <SectionHeader id="collaboration" title={about.collaborationTitle} intro={home.collaboration.text} />
          <ul className="flex flex-wrap content-start gap-3 lg:justify-end lg:pt-2">
            {home.collaboration.partners.map((partner) => (
              <li key={partner} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75">
                {partner}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {experiences.length > 0 && (
        <section id="experience" aria-labelledby="experience-title" className="border-t border-white/[0.06] py-16 sm:py-20">
          <Container>
            <h2 id="experience-title" className="font-heading text-2xl font-bold text-white sm:text-3xl">
              {about.experienceTitle}
            </h2>
            <ol className="mt-10 space-y-6">
              {experiences.map((exp) => (
                <li
                  key={exp.id}
                  className="grid gap-4 rounded-2xl border border-white/[0.08] p-6 sm:p-8 md:grid-cols-[240px_1fr] md:gap-10"
                >
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">{exp.company}</h3>
                    {exp.period && <p className="mt-1 text-sm text-white/50">{exp.period}</p>}
                  </div>
                  <div>
                    <p className="font-medium text-accent-light">{exp.role}</p>
                    {exp.missions?.length > 0 && (
                      <ul className="mt-4 space-y-2 text-[15px] text-white/70">
                        {exp.missions.map((mission) => (
                          <li key={mission} className="flex gap-3 leading-relaxed">
                            <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                            <span>{mission}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <CtaBanner
        title={dict.cta.title}
        text={dict.cta.text}
        href={localePath(locale, "/contact")}
        button={dict.cta.button}
      />
    </>
  )
}
