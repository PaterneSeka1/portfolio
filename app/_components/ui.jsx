import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Database,
  LayoutDashboard,
  Network,
  Plug,
  Server,
  Sparkles,
} from "lucide-react"

const ICONS = { Building2, Database, LayoutDashboard, Network, Plug, Server, Sparkles }

export function Icon({ name, size = 20, className = "" }) {
  const Component = ICONS[name] ?? Building2
  return <Component size={size} className={className} aria-hidden="true" />
}

export function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-accent-light ${className}`}>{children}</p>
  )
}

export function SectionHeader({ eyebrow, title, intro, as: Heading = "h2", id, className = "" }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Heading id={id} className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[2.25rem] md:leading-tight">
        {title}
      </Heading>
      {intro && <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{intro}</p>}
    </div>
  )
}

export function Tag({ children, tone = "default" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.04] text-white/75",
    accent: "border-accent/40 bg-accent/10 text-accent-light",
    muted: "border-white/10 bg-transparent text-white/60",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
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

export function ButtonLink({ href, children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-accent text-white hover:bg-[#1d4fd8]",
    secondary: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  }
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors sm:text-[15px] ${variants[variant]} ${className}`
  const isInternal = href.startsWith("/") && !props.download
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}

export function TextLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light hover:text-white ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
