import { Download } from "lucide-react"
import { Monogram } from "./Logo"
import { ButtonLink, Container, Reveal } from "./ui"
import { localePath } from "../../lib/i18n/config"

/** End-of-page conversion: one path for recruiters, one for organisations with a project. */
export default function PathCards({ locale, labels, cvUrl }) {
  const { recruit, project } = labels
  return (
    <section aria-labelledby="next-steps" className="pb-16 sm:pb-24">
      <Container>
        <h2 id="next-steps" className="sr-only">
          {labels.title}
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal
            index={0}
            className="flex flex-col rounded-panel border border-line bg-surface/60 p-6 shadow-card sm:p-10"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">{recruit.eyebrow}</p>
            <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {recruit.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-white/70">{recruit.text}</p>
            <div className="mt-8 flex flex-col gap-3 pt-0 xs:flex-row sm:mt-auto sm:pt-8">
              <ButtonLink href={localePath(locale, "/about#experience")} variant="secondary" arrow>
                {recruit.primary}
              </ButtonLink>
              {cvUrl && (
                <ButtonLink href={cvUrl} variant="ghost" download data-track="cv_download" data-track-from="home_paths">
                  <Download size={17} aria-hidden="true" />
                  {recruit.secondary}
                </ButtonLink>
              )}
            </div>
          </Reveal>

          <Reveal
            index={1}
            className="relative flex flex-col overflow-hidden rounded-panel border border-accent/30 bg-gradient-to-br from-institutional/70 via-surface to-surface p-6 shadow-raised sm:p-10"
          >
            <Monogram className="pointer-events-none absolute -right-10 -bottom-16 h-72 text-white/[0.04]" />
            <p className="relative text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">
              {project.eyebrow}
            </p>
            <h3 className="relative mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="relative mt-3 max-w-md text-base leading-relaxed text-white/75">{project.text}</p>
            <div className="relative mt-8 sm:mt-auto sm:pt-8">
              <ButtonLink
                href={localePath(locale, "/contact")}
                arrow
                data-track="contact_click"
                data-track-from="home_paths"
              >
                {project.primary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
