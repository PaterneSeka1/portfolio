import { Reveal } from "./ui"

/**
 * "How I work" as a timeline: horizontal from lg, vertical below. The progress
 * line is drawn by a CSS scroll-driven animation (.timeline-progress): no
 * JavaScript and no scroll-jacking; it is simply fully drawn where the feature
 * is unsupported or motion is reduced.
 */
export default function MethodTimeline({ steps }) {
  return (
    <div className="timeline relative mt-14">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[17px] w-px overflow-hidden bg-white/10 lg:top-[17px] lg:right-[calc(100%/6-33px)] lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
      >
        <div className="timeline-progress h-full w-full bg-gradient-to-b from-accent-light via-accent to-accent/40 lg:bg-gradient-to-r" />
      </div>

      <ol className="relative grid gap-9 lg:grid-cols-6 lg:gap-5">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} index={index} className="relative pl-14 lg:pt-14 lg:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 flex h-[35px] w-[35px] items-center justify-center rounded-full border border-accent-light/40 bg-ink font-heading text-xs font-bold text-accent-light shadow-[0_0_0_6px_var(--color-ink)]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/65 lg:text-sm">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
