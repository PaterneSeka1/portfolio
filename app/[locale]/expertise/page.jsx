import CtaBanner from "../../_components/CtaBanner"
import { Container, Icon, SectionHeader, Tag } from "../../_components/ui"
import { getDictionary } from "../../../lib/i18n"
import { localePath } from "../../../lib/i18n/config"
import { getExpertises } from "../../../lib/db/expertises"
import { getSkillsGroupedByCategory } from "../../../lib/db/skills"
import { buildMetadata } from "../../../lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const { expertise } = getDictionary(locale)
  return buildMetadata({
    locale,
    path: "/expertise",
    title: expertise.metaTitle,
    description: expertise.metaDescription,
  })
}

export default async function ExpertisePage({ params }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const { expertise } = dict
  const [domains, skillGroups] = await Promise.all([
    getExpertises(locale),
    getSkillsGroupedByCategory(locale),
  ])

  return (
    <>
      <Container className="pt-14 pb-6 sm:pt-20">
        <SectionHeader as="h1" title={expertise.title} intro={expertise.intro} />
      </Container>

      <section aria-labelledby="domains" className="py-10 sm:py-14">
        <Container>
          <h2 id="domains" className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
            {expertise.domainsTitle}
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((item) => (
              <li key={item.id} className="flex flex-col rounded-2xl border border-white/[0.08] bg-surface/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/65">{item.description}</p>
                {item.technologies?.length > 0 && (
                  <p className="mt-5 border-t border-white/[0.08] pt-4 text-sm text-white/55">
                    {item.technologies.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {skillGroups.length > 0 && (
        <section aria-labelledby="technologies" className="py-10 sm:py-14">
          <Container>
            <SectionHeader id="technologies" title={expertise.technologiesTitle} intro={expertise.technologiesIntro} />
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.category} className="bg-ink p-6">
                  <h3 className="flex flex-wrap items-center gap-2 font-heading font-semibold text-white">
                    {group.category}
                    {group.learning && <Tag tone="muted">{expertise.learning}</Tag>}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li key={skill.id}>
                        <Tag tone={skill.learning && !group.learning ? "muted" : "default"}>
                          {skill.name}
                          {skill.learning && !group.learning && (
                            <span className="sr-only"> ({expertise.learning})</span>
                          )}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
