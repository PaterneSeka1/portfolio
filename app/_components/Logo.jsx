/**
 * Official PS monogram, vectorised from public/logo-ps.png (same geometry,
 * checked pixel by pixel against the PNG): crisp at any size, transparent,
 * and colourable with `currentColor`. The PNG files remain the reference
 * (Open Graph card, admin uploads).
 */
const P_SHAPE = "0,177 290,0 519,137 519,187 234,361 234,502 165,462 165,322 420,164 290,87 72,220 72,612 0,569"
const S_SHAPE =
  "314,388 618,201 618,282 383,426 383,509 618,366 618,609 355,768 165,653 165,570 355,684 548,568 548,490 359,604 314,578"

export function Monogram({ className = "", title }) {
  return (
    <svg
      viewBox="0 0 618 768"
      className={className}
      fill="currentColor"
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true, focusable: "false" })}
    >
      <polygon points={P_SHAPE} />
      <polygon points={S_SHAPE} />
    </svg>
  )
}

const VARIANTS = {
  // Brand icon: accent mark on a navy tile (same as the favicon).
  tile: "bg-navy text-accent ring-1 ring-inset ring-white/10",
  // Mark only, for dark backgrounds.
  white: "text-white",
}

export default function Logo({ variant = "tile", className = "h-10 w-10" }) {
  const isTile = variant === "tile"
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${isTile ? "rounded-[28%]" : ""} ${VARIANTS[variant] ?? VARIANTS.tile} ${className}`}
    >
      <Monogram title="Paterne SEKA" className={isTile ? "h-[62%] w-auto" : "h-full w-auto"} />
    </span>
  )
}
