import Image from "next/image"
import { Lock } from "lucide-react"

/**
 * Product presentation frames.
 *
 * Every frame shows the project's real screenshot when one has been uploaded
 * in the admin (Réalisations → Captures). Otherwise it draws a schematic of
 * the product's main screen: abstract shapes only — no text, numbers or
 * people — so it can never be mistaken for real data.
 */

/**
 * Which schematic to draw for a project: its own when known, else by category.
 * @param {Pick<import("../../lib/types").Project, "slug" | "category">} project
 */
export function sketchVariant(project) {
  if (project?.slug && SKETCHES[project.slug]) return project.slug
  if (project?.category === "ai") return "ai"
  if (project?.category === "website") return "website"
  return "dashboard"
}

/** Minimal browser window (no fake device). */
export function ProductWindow({
  image,
  alt = "",
  label,
  isPrivate = false,
  variant = "dashboard",
  priority = false,
  sizes,
  className = "",
  zoomOnHover = false,
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-surface shadow-window ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2/70 px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 flex h-4 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.06] px-2 text-[9px] font-medium leading-none text-white/45 sm:text-[10px]">
          {isPrivate && <Lock size={8} className="shrink-0" />}
          {label && <span className="truncate">{label}</span>}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className={`absolute inset-0 ${
            zoomOnHover ? "transition-transform duration-700 ease-enter group-hover:scale-[1.035]" : ""
          }`}
        >
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || alt}
              fill
              priority={priority}
              sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
              className="object-cover object-top"
            />
          ) : (
            <Sketch variant={variant} label={alt} />
          )}
        </div>
      </div>
    </div>
  )
}

/** Minimal phone outline for mobile screens (ticket, attendance scan…). */
export function PhoneFrame({ image, alt = "", sizes = "160px", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border border-white/15 bg-surface p-1.5 shadow-window ${className}`}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1rem] bg-ink">
        {image ? (
          <Image src={image.url} alt={image.alt || alt} fill sizes={sizes} className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0" {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}>
            <TicketSketch />
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Schematics                                                                  */
/* -------------------------------------------------------------------------- */

const bar = "rounded-full bg-white/15"

function Sidebar({ rows = 5, active = 1 }) {
  return (
    <div className="hidden w-[22%] shrink-0 flex-col gap-2 border-r border-white/[0.06] p-3 sm:flex">
      <div className="mb-1.5 h-2.5 w-3/4 rounded bg-white/25" />
      {Array.from({ length: rows }, (_, row) => (
        <div
          key={row}
          className={`h-1.5 rounded-full ${row === active ? "w-4/5 bg-accent/70" : "w-3/5 bg-white/12"}`}
        />
      ))}
    </div>
  )
}

/** Tiny decorative QR-like glyph (fixed pattern, not a real code). */
const QR_PATTERN = [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1]
function QrGlyph({ className = "" }) {
  return (
    <div className={`grid grid-cols-5 gap-[1px] rounded-[3px] bg-white p-[2px] ${className}`}>
      {QR_PATTERN.map((on, index) => (
        <span key={index} className={`aspect-square ${on ? "bg-navy" : "bg-white"}`} />
      ))}
    </div>
  )
}

/** SCOUT ASCCI: member records with QR cards and status, plus attendance tiles. */
function ScoutSketch() {
  return (
    <div className="absolute inset-0 flex">
      <Sidebar rows={6} active={2} />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-1/3 rounded bg-white/25" />
          <div className="h-4 w-14 rounded-md bg-accent/60" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["bg-accent/50", "bg-success/45", "bg-white/25"].map((tone) => (
            <div key={tone} className="rounded-lg bg-white/[0.06] p-2">
              <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
              <div className={`mt-1.5 h-2.5 w-3/4 rounded ${tone}`} />
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-1.5 overflow-hidden rounded-lg bg-white/[0.04] p-2">
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-white/15" />
              <div className={`h-1.5 w-1/4 ${bar}`} />
              <div className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              <QrGlyph className="w-3.5 shrink-0 opacity-80" />
              <div
                className={`h-2.5 w-8 shrink-0 rounded-full ${row % 3 === 1 ? "bg-amber-300/40" : "bg-success/40"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Intranet VEDEM: weekly attendance planning and a live messaging panel. */
function IntranetSketch() {
  const cells = [3, 3, 2, 3, 1, 3, 2, 3, 3, 0, 3, 3, 1, 3, 2]
  const tone = ["bg-white/[0.05]", "bg-amber-300/35", "bg-accent/45", "bg-success/40"]
  return (
    <div className="absolute inset-0 flex">
      <Sidebar rows={5} active={0} />
      <div className="flex min-w-0 flex-1 gap-2.5 p-3 sm:p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="h-2.5 w-2/5 rounded bg-white/25" />
          <div className="grid flex-1 grid-cols-5 gap-1.5">
            {cells.map((value, index) => (
              <span key={index} className={`rounded-md ${tone[value]}`} />
            ))}
          </div>
          <div className="flex gap-1.5">
            <div className="h-5 flex-1 rounded-md bg-white/[0.06]" />
            <div className="h-5 w-1/4 rounded-md bg-accent/50" />
          </div>
        </div>
        <div className="flex w-[34%] shrink-0 flex-col gap-1.5 rounded-lg bg-white/[0.05] p-2">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <div className={`h-1.5 w-1/2 ${bar}`} />
          </div>
          <div className="mt-1 w-4/5 rounded-lg rounded-bl-sm bg-white/[0.09] p-1.5">
            <div className="h-1 w-full rounded-full bg-white/25" />
            <div className="mt-1 h-1 w-2/3 rounded-full bg-white/15" />
          </div>
          <div className="ml-auto w-3/4 rounded-lg rounded-br-sm bg-accent/40 p-1.5">
            <div className="h-1 w-full rounded-full bg-white/50" />
          </div>
          <div className="w-2/3 rounded-lg rounded-bl-sm bg-white/[0.09] p-1.5">
            <div className="h-1 w-full rounded-full bg-white/25" />
          </div>
          <div className="mt-auto h-3.5 rounded-md border border-white/10" />
        </div>
      </div>
    </div>
  )
}

/** RH VEDEM: requests moving through a multi-level approval circuit. */
function HrSketch() {
  const steps = [
    [2, 2, 1],
    [2, 1, 0],
    [2, 2, 2],
    [1, 0, 0],
  ]
  const dot = ["bg-white/15", "bg-amber-300/70", "bg-success/80"]
  return (
    <div className="absolute inset-0 flex">
      <Sidebar rows={5} active={1} />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-2/5 rounded bg-white/25" />
          <div className="flex gap-1">
            <div className="h-4 w-10 rounded-md bg-white/[0.08]" />
            <div className="h-4 w-12 rounded-md bg-accent/60" />
          </div>
        </div>
        <div className="flex-1 space-y-2 rounded-lg bg-white/[0.04] p-2.5">
          {steps.map((row, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span className="h-4 w-4 shrink-0 rounded-md bg-white/10" />
              <div className="min-w-0 flex-1 space-y-1">
                <div className={`h-1.5 w-3/5 ${bar}`} />
                <div className="h-1 w-2/5 rounded-full bg-white/[0.08]" />
              </div>
              <div className="flex shrink-0 items-center">
                {row.map((state, step) => (
                  <span key={step} className="flex items-center">
                    {step > 0 && <span className={`h-px w-2.5 ${state ? "bg-white/30" : "bg-white/10"}`} />}
                    <span className={`h-2 w-2 rounded-full ${dot[state]}`} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** VEDEM Ticket admin: orders awaiting payment validation, seat categories. */
function TicketAdminSketch() {
  return (
    <div className="absolute inset-0 flex">
      <Sidebar rows={4} active={1} />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2">
          {["bg-accent/55", "bg-amber-300/45", "bg-success/45"].map((tone) => (
            <div key={tone} className="rounded-lg bg-white/[0.06] p-2">
              <div className={`h-1.5 w-1/3 rounded-full ${tone}`} />
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/[0.08]">
                <div className={`h-1 w-2/3 rounded-full ${tone}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-1.5 rounded-lg bg-white/[0.04] p-2">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-2">
              <div className={`h-1.5 w-1/4 ${bar}`} />
              <div className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              <span className="h-3 w-5 shrink-0 rounded-sm border border-white/15 bg-white/[0.06]" />
              <span className={`h-3 w-10 shrink-0 rounded-md ${row === 0 ? "bg-accent/60" : "bg-success/35"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Mobile ticket with QR code, for the phone frame. */
function TicketSketch() {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-2.5">
      <div className="h-1.5 w-1/2 rounded-full bg-white/25" />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-institutional/60 to-surface-2 p-2">
        <QrGlyph className="w-3/4" />
        <div className="h-1 w-1/2 rounded-full bg-white/30" />
      </div>
      <div className="flex gap-1">
        <span className="h-3 flex-1 rounded-md bg-white/[0.08]" />
        <span className="h-3 flex-1 rounded-md bg-success/45" />
      </div>
    </div>
  )
}

function AiSketch() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-3 p-5 sm:p-6">
      <div className="max-w-[65%] rounded-2xl rounded-bl-sm bg-white/[0.07] p-3">
        <div className="h-2 w-4/5 rounded bg-white/20" />
        <div className="mt-2 h-2 w-3/5 rounded bg-white/15" />
      </div>
      <div className="ml-auto max-w-[60%] rounded-2xl rounded-br-sm bg-accent/30 p-3">
        <div className="h-2 w-24 max-w-full rounded bg-white/40" />
      </div>
      <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white/[0.07] p-3">
        <div className="h-2 w-full rounded bg-white/20" />
        <div className="mt-2 h-2 w-4/5 rounded bg-white/15" />
        <div className="mt-2 h-2 w-2/5 rounded bg-white/15" />
      </div>
      <div className="mt-1 h-8 rounded-lg border border-white/10 bg-white/[0.03]" />
    </div>
  )
}

function WebsiteSketch() {
  return (
    <div className="absolute inset-0 flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-white/25" />
        <div className="flex gap-2">
          <div className="h-2 w-8 rounded bg-white/15" />
          <div className="h-2 w-8 rounded bg-white/15" />
          <div className="h-2 w-8 rounded bg-white/15" />
        </div>
      </div>
      <div className="mt-3 h-4 w-3/5 rounded bg-white/25" />
      <div className="h-2.5 w-2/5 rounded bg-white/15" />
      <div className="h-6 w-24 rounded-md bg-accent/50" />
      <div className="mt-auto grid grid-cols-3 gap-3">
        <div className="h-12 rounded-lg bg-white/[0.06]" />
        <div className="h-12 rounded-lg bg-white/[0.06]" />
        <div className="h-12 rounded-lg bg-white/[0.06]" />
      </div>
    </div>
  )
}

function DashboardSketch() {
  return (
    <div className="absolute inset-0 flex">
      <Sidebar rows={5} active={1} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((tile) => (
            <div key={tile} className="rounded-lg bg-white/[0.06] p-3">
              <div className="h-2 w-1/2 rounded bg-white/15" />
              <div className="mt-2 h-3 w-3/4 rounded bg-white/25" />
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2.5 rounded-lg bg-white/[0.04] p-3">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-3">
              <div className="h-2 w-1/4 rounded bg-white/20" />
              <div className="h-2 flex-1 rounded bg-white/10" />
              <div className={`h-2 w-10 rounded ${row % 2 ? "bg-success/40" : "bg-accent/50"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SKETCHES = {
  "scout-ascci": ScoutSketch,
  intranet: IntranetSketch,
  "rh-vedem": HrSketch,
  "vedem-ticket": TicketAdminSketch,
  ai: AiSketch,
  website: WebsiteSketch,
  dashboard: DashboardSketch,
}

function Sketch({ variant, label }) {
  const Component = SKETCHES[variant] ?? DashboardSketch
  // Exposed as one image with a neutral description, never as fake content.
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(19_58_124/0.35),transparent_60%)]"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <Component />
    </div>
  )
}
