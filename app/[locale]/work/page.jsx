import CtaBanner from "../../_components/CtaBanner"
import { ArchiveProjectItem, ProjectCard } from "../../_components/ProjectCards"
import { Container, Reveal, SectionHeader } from "../../_components/ui"
import { getDictionary } from "../../../lib/i18n"
import { localePath } from "../../../lib/i18n/config"
import { getProjects } from "../../../lib/db/projects"
import { buildMetadata } from "../../../lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const { work } = getDictionary(locale)
  return buildMetadata({ locale, path: "/work", title: work.metaTitle, description: work.metaDescription })
}

export default async function WorkPage({ params }) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const { work } = dict
  const projects = await getProjects(locale)
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)

  return (
    <>
      <Container className="pt-14 pb-6 sm:pt-20">
        <SectionHeader as="h1" title={work.title} intro={work.intro} />
      </Container>

      {projects.length === 0 && (
        <Container className="py-12">
          <p className="text-white/60">{work.empty}</p>
        </Container>
      )}

      {featured.length > 0 && (
        <section aria-labelledby="featured-work" className="py-10 sm:py-14">
          <Container>
            <h2 id="featured-work" className="mb-8 text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">
              {work.featuredTitle}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {featured.map((project, index) => (
                <Reveal as="li" key={project.slug} index={index % 2}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    work={work}
                    sketchLabel={dict.hero.showcase.sketchNote}
                    priority={index < 2 && Boolean(project.images?.[0])}
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="other-projects" className="py-10 sm:py-14">
          <Container>
            <Reveal className="mb-8">
              <h2 id="other-projects" className="font-heading text-2xl font-bold text-white">
                {work.otherTitle}
              </h2>
              <p className="mt-2 text-white/60">{work.otherIntro}</p>
            </Reveal>
            <Reveal as="ul" stagger className="grid gap-4">
              {others.map((project, index) => (
                <ArchiveProjectItem key={project.slug} project={project} locale={locale} work={work} index={index} />
              ))}
            </Reveal>
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
