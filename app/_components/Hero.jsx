import Image from "next/image"
import { Download, Github, Linkedin, MapPin } from "lucide-react"
import HeroShowcase from "./HeroShowcase"
import { Monogram } from "./Logo"
import { ButtonLink, Container } from "./ui"
import { localePath } from "../../lib/i18n/config"

const secondaryLink =
  "group inline-flex min-h-11 items-center gap-2 rounded-control px-2.5 text-sm font-medium text-white/70 transition-surface hover:bg-white/[0.06] hover:text-white"

export default function Hero({ locale, profile, dict, showcase }) {
  const { hero } = dict

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      {/* Background: faint grid fading out, and the PS monogram as a watermark. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
        <Monogram className="absolute top-1/2 -right-24 hidden h-[130%] -translate-y-1/2 text-white/[0.018] lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative grid items-center gap-14 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:min-h-[calc(92vh-4rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-16 xl:gap-20">
        <div>
          {profile.available && profile.availabilityLabel && (
            <p className="enter inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-3.5 pl-1 text-xs font-medium text-white/80 sm:text-sm">
              {profile.heroPhoto ? (
                <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image
                    src={profile.heroPhoto}
                    alt={hero.photoAlt}
                    fill
                    sizes="28px"
                    className="object-cover object-top"
                  />
                </span>
              ) : null}
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-50 motion-safe:animate-ping motion-safe:[animation-iteration-count:3]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {profile.availabilityLabel}
            </p>
          )}

          <h1 id="hero-title" className="mt-7 font-heading font-extrabold tracking-tight text-white">
            <span
              className="enter block text-[2.5rem] leading-[1.02] xs:text-5xl sm:text-6xl lg:text-[4.25rem]"
              style={{ "--i": 1 }}
            >
              {profile.name}
            </span>
            <span
              className="enter mt-4 block text-xl font-semibold text-accent-light sm:text-2xl lg:text-[1.75rem]"
              style={{ "--i": 2 }}
            >
              {profile.title}
            </span>
            {profile.tagline && (
              <span
                className="enter mt-1 block text-xl font-semibold text-white/85 sm:text-2xl lg:text-[1.75rem]"
                style={{ "--i": 2 }}
              >
                {profile.tagline}
              </span>
            )}
          </h1>

          <p
            className="enter mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/70 sm:text-lg"
            style={{ "--i": 3 }}
          >
            {profile.promise}
          </p>

          <div className="enter mt-9 flex flex-col gap-3 xs:flex-row" style={{ "--i": 4 }}>
            <ButtonLink href={localePath(locale, "/work")} arrow>
              {hero.ctaWork}
            </ButtonLink>
            <ButtonLink
              href={localePath(locale, "/contact")}
              variant="secondary"
              data-track="contact_click"
              data-track-from="hero"
            >
              {hero.ctaContact}
            </ButtonLink>
          </div>

          <div className="enter mt-8 border-t border-line pt-4" style={{ "--i": 5 }}>
            <p className="sr-only">{hero.linksLabel}</p>
            {/* Negative margin: link hit areas extend beyond the text column edge. */}
            <div className="-mx-2.5 flex flex-wrap items-center gap-x-1">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="github_click"
                  data-track-from="hero"
                  className={secondaryLink}
                >
                  <Github size={17} aria-hidden="true" />
                  GitHub
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="linkedin_click"
                  data-track-from="hero"
                  className={secondaryLink}
                >
                  <Linkedin size={17} aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only">{dict.a11y.newTab}</span>
                </a>
              )}
              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  download
                  data-track="cv_download"
                  data-track-from="hero"
                  className={secondaryLink}
                >
                  <Download size={17} aria-hidden="true" className="transition-surface group-hover:translate-y-px" />
                  {hero.resume}
                </a>
              )}
              {profile.location && (
                <span className="inline-flex min-h-11 items-center gap-2 px-2.5 text-sm text-white/50">
                  <MapPin size={16} aria-hidden="true" />
                  {profile.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <HeroShowcase projects={showcase} labels={hero.showcase} />
      </Container>
    </section>
  )
}
