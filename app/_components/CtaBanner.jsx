import { ArrowRight } from "lucide-react"
import { ButtonLink, Container } from "./ui"

export default function CtaBanner({ title, text, href, button, secondary }) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-12 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-12 rounded-[2.5rem] bg-institutional/30"
          />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="font-heading text-2xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            {text && <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href}>
                {button}
                <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="secondary" download={secondary.download}>
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
