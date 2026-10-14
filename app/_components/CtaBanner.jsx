import { Monogram } from "./Logo"
import { ButtonLink, Container, Reveal } from "./ui"

export default function CtaBanner({ title, text, href, button, secondary }) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-panel border border-accent/25 bg-gradient-to-br from-institutional/60 via-surface to-surface px-6 py-12 shadow-raised sm:px-12 sm:py-16">
          <Monogram className="pointer-events-none absolute -top-10 -right-6 h-72 text-white/[0.04] sm:h-80" />
          <div className="relative max-w-2xl">
            <h2
              id="cta-title"
              className="font-heading text-2xl font-bold tracking-tight text-balance text-white sm:text-4xl"
            >
              {title}
            </h2>
            {text && <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>}
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <ButtonLink
                href={href}
                arrow
                {...(href.includes("/contact")
                  ? { "data-track": "contact_click", "data-track-from": "cta_banner" }
                  : {})}
              >
                {button}
              </ButtonLink>
              {secondary && (
                <ButtonLink
                  href={secondary.href}
                  variant="secondary"
                  download={secondary.download}
                  {...(secondary.download ? { "data-track": "cv_download", "data-track-from": "cta_banner" } : {})}
                >
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
