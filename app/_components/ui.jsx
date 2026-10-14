import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Database,
  Handshake,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  MonitorSmartphone,
  Network,
  Plug,
  Radio,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

const ICONS = {
  Boxes,
  Building2,
  Database,
  Handshake,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  MonitorSmartphone,
  Network,
  Plug,
  Radio,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
}

export function Icon({ name, size = 20, className = "" }) {
  const Component = ICONS[name] ?? Building2
  return <Component size={size} className={className} aria-hidden="true" />
}

export function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-page px-4 sm:px-6 ${className}`}>{children}</div>
}

/**
 * Scroll-reveal wrapper (see MotionObserver). `index` staggers siblings;
 * `stagger` reveals the direct children one after the other instead.
 * Never put it on an element that has its own hover transform.
 */
export function Reveal({ as: Tag = "div", index, stagger = false, className = "", style, children, ...props }) {
  const attributes = stagger ? { "data-reveal-children": "" } : { "data-reveal": "" }
  return (
    <Tag
      {...attributes}
      className={className}
      style={index !== undefined ? { "--i": index, ...style } : style}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-light ${className}`}
    >
      <span aria-hidden="true" className="h-px w-5 bg-accent-light/60" />
      {children}
    </p>
  )
}

export function SectionHeader({ eyebrow, title, intro, as: Heading = "h2", id, className = "", reveal = true }) {
  const Wrapper = reveal ? Reveal : "div"
  return (
    <Wrapper className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className="font-heading text-[1.65rem] font-bold leading-tight tracking-tight text-balance text-white sm:text-3xl md:text-[2.25rem]"
      >
        {title}
      </Heading>
      {intro && <p className="mt-4 text-base leading-relaxed text-pretty text-white/70 sm:text-lg">{intro}</p>}
    </Wrapper>
  )
}

export function Tag({ children, tone = "default" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.04] text-white/75",
    accent: "border-accent/40 bg-accent/10 text-accent-light",
    muted: "border-white/10 bg-transparent text-white/60",
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function TagList({ items, label, tone }) {
  if (!items?.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

/** Technologies as secondary information: plain text, never the main message. */
export function TechLine({ items, label, className = "" }) {
  if (!items?.length) return null
  return (
    <p className={`text-[13px] leading-relaxed text-white/50 ${className}`}>
      <span className="sr-only">{label} : </span>
      {items.join(" · ")}
    </p>
  )
}

const BUTTON_VARIANTS = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-12px_rgb(37_99_235/0.7)] hover:bg-[#1d4fd8] hover:shadow-[0_14px_34px_-12px_rgb(37_99_235/0.85)]",
  secondary: "border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.06]",
  ghost: "text-white/75 hover:bg-white/[0.06] hover:text-white",
}

const BUTTON_BASE =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 py-2.5 text-sm font-semibold transition-surface active:translate-y-px sm:text-[15px] disabled:pointer-events-none disabled:opacity-60"

export function buttonClasses(variant = "primary", className = "") {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`
}

/**
 * Link styled as a button. `arrow` adds an animated trailing arrow
 * (↗ for external links). Internal links go through next/link.
 */
export function ButtonLink({ href, children, variant = "primary", arrow = false, className = "", ...props }) {
  const isInternal = href.startsWith("/") && !props.download
  const isExternal = /^https?:\/\//.test(href)
  const ArrowIcon = isExternal ? ArrowUpRight : ArrowRight
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon size={17} aria-hidden="true" className="arrow-nudge" />}
    </>
  )
  if (isInternal) {
    return (
      <Link href={href} className={buttonClasses(variant, className)} {...props}>
        {content}
      </Link>
    )
  }
  return (
    <a href={href} className={buttonClasses(variant, className)} {...props}>
      {content}
    </a>
  )
}

export function TextLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-light transition-surface hover:text-white ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" className="arrow-nudge" />
    </Link>
  )
}

/** Placeholder block for loading states; the pulse is dropped under reduced motion. */
export function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={`rounded-control bg-white/[0.06] motion-safe:animate-pulse ${className}`} />
}

/** Accessible wrapper of a loading state: announced once, hidden blocks below. */
export function LoadingRegion({ label, children, className = "" }) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}
