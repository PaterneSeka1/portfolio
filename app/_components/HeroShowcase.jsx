import { Lock, Radio, ShieldCheck, Server } from "lucide-react"
import PointerTilt from "./motion/PointerTilt"
import { PhoneFrame, ProductWindow, sketchVariant } from "./ProductFrames"
import { isPrivateProject } from "../../lib/projects"

function Chip({ icon: IconComponent, children, className = "", depth }) {
  return (
    <span
      className={`tilt-layer absolute inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-2/90 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white/85 shadow-raised backdrop-blur sm:text-xs ${className}`}
      style={{ "--depth": depth }}
    >
      <IconComponent size={13} aria-hidden="true" className="text-accent-light" />
      {children}
    </span>
  )
}

/**
 * Hero composition: real product windows (screenshots when uploaded in the
 * admin, schematics otherwise) layered with a light perspective. Pointer
 * parallax on desktop only; static everywhere else.
 */
export default function HeroShowcase({ projects, labels }) {
  const [back, front, mobile] = projects
  if (!back) return null
  const sketchAlt = (project) => (project.images?.[0] ? project.title : `${labels.sketchNote} — ${project.title}`)

  return (
    <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <figcaption className="sr-only">
        {labels.label} : {projects.map((project) => project.title).join(", ")}
      </figcaption>

      {/* Soft brand glow behind the composition. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 rounded-[3rem] bg-[radial-gradient(60%_55%_at_60%_45%,rgb(37_99_235/0.22),transparent_70%)]"
      />

      <PointerTilt>
        <div className="relative aspect-[6/5]">
          <div className="enter absolute top-0 left-0 w-[80%]" style={{ "--i": 3 }}>
            <div className="tilt-layer opacity-90" style={{ "--depth": 6 }}>
              <ProductWindow
                image={back.images?.[0]}
                alt={sketchAlt(back)}
                label={back.title}
                isPrivate={isPrivateProject(back)}
                variant={sketchVariant(back)}
                sizes="(max-width: 1024px) 70vw, 440px"
              />
            </div>
          </div>

          {front && (
            <div className="enter absolute top-[30%] right-0 w-[76%]" style={{ "--i": 4 }}>
              <div className="tilt-layer" style={{ "--depth": 14 }}>
                <ProductWindow
                  image={front.images?.[0]}
                  alt={sketchAlt(front)}
                  label={front.title}
                  isPrivate={isPrivateProject(front)}
                  variant={sketchVariant(front)}
                  sizes="(max-width: 1024px) 66vw, 420px"
                />
              </div>
            </div>
          )}

          {mobile && (
            <div className="enter absolute bottom-0 left-[6%] w-[21%]" style={{ "--i": 5 }}>
              <div className="tilt-layer" style={{ "--depth": 22 }}>
                <PhoneFrame alt={`${labels.sketchNote} — ${mobile.title}`} />
              </div>
            </div>
          )}

          {/* Absolute wrapper: the entrance transform must not move the chips' containing block. */}
          <div className="enter absolute inset-0" style={{ "--i": 6 }}>
            <Chip icon={Radio} depth={26} className="top-[4%] right-[2%] sm:right-[6%]">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping motion-safe:[animation-iteration-count:3]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              {labels.chips.realtime}
            </Chip>
            <Chip icon={ShieldCheck} depth={30} className="top-[24%] left-[-2%] sm:left-[2%]">
              {labels.chips.rbac}
            </Chip>
            <Chip icon={Server} depth={34} className="right-[4%] bottom-[2%]">
              {labels.chips.production}
            </Chip>
          </div>
        </div>
      </PointerTilt>

      {/* Private projects: make clear the windows are illustrations, not data. */}
      {projects.some((project) => !project.images?.[0]) && (
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-white/40 lg:justify-end">
          <Lock size={11} aria-hidden="true" />
          {labels.illustrationNote}
        </p>
      )}
    </figure>
  )
}
