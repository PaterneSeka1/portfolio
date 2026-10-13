import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { ButtonLink, Container } from "./ui"
import { localePath } from "../../lib/i18n/config"

export default function Hero({ locale, profile, dict }) {
  const { hero } = dict

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-white/[0.06]">
      {/* Single, discrete geometric accent inspired by the PS monogram. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rotate-12 rounded-[3rem] border border-white/[0.05] bg-institutional/20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:min-h-[calc(88vh-4rem)] lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-16">
        <div className="motion-safe:animate-fade-up">
          {profile.available && profile.availabilityLabel && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              {profile.availabilityLabel}
            </p>
          )}

          <h1 id="hero-title" className="font-heading font-extrabold tracking-tight text-white">
            <span className="block text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">{profile.name}</span>
            <span className="mt-4 block text-xl font-semibold text-accent-light sm:text-2xl lg:text-[1.75rem]">
              {profile.title}
            </span>
            {profile.tagline && (
              <span className="mt-1 block text-xl font-semibold text-white/85 sm:text-2xl lg:text-[1.75rem]">
                {profile.tagline}
              </span>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{profile.promise}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localePath(locale, "/work")}>
              {hero.ctaWork}
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/contact")} variant="secondary">
              {hero.ctaContact}
            </ButtonLink>
          </div>

          <div className="mt-10">
            <p className="sr-only">{hero.focusLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {hero.focus.map((item) => (
                <li key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/65 sm:text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 text-sm text-white/60">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub ${dict.a11y.newTab}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/5 hover:text-white"
                >
                  <Github size={18} aria-hidden="true" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn ${dict.a11y.newTab}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/5 hover:text-white"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label={`${dict.contact.form.email} ${profile.email}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/5 hover:text-white"
                >
                  <Mail size={18} aria-hidden="true" />
                </a>
              )}
            </span>
          </div>
        </div>

        {profile.heroPhoto && (
          <div className="relative mx-auto w-full max-w-[18rem] motion-safe:animate-fade-up sm:max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-surface">
              <Image
                src={profile.heroPhoto}
                alt={hero.photoAlt}
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 448px, 420px"
                className="object-cover object-top"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
