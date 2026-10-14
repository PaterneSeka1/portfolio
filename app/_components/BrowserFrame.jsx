import Image from "next/image"

/**
 * Browser-style frame. Shows a real (anonymised) screenshot when one exists,
 * otherwise an abstract interface sketch that is clearly not a screenshot.
 */
export default function BrowserFrame({ image, alt = "", variant = "dashboard", priority = false, sizes }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-surface-2/60 px-3 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-4 flex-1 rounded-md bg-white/[0.06]" />
      </div>
      <div className="relative aspect-[16/10]">
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
          <Sketch variant={variant} />
        )}
      </div>
    </div>
  )
}

function Sketch({ variant }) {
  if (variant === "ai") {
    return (
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-end gap-3 p-5 sm:p-6">
        <div className="max-w-[65%] rounded-2xl rounded-bl-sm bg-white/[0.07] p-3">
          <div className="h-2 w-4/5 rounded bg-white/20" />
          <div className="mt-2 h-2 w-3/5 rounded bg-white/15" />
        </div>
        <div className="ml-auto max-w-[60%] rounded-2xl rounded-br-sm bg-accent/30 p-3">
          <div className="h-2 w-24 rounded bg-white/40" />
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

  if (variant === "website") {
    return (
      <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-4 p-5 sm:p-6">
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

  return (
    <div aria-hidden="true" className="absolute inset-0 flex">
      <div className="hidden w-1/4 flex-col gap-2.5 border-r border-white/[0.06] p-4 sm:flex">
        <div className="mb-2 h-3 w-3/4 rounded bg-white/25" />
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className={`h-2 rounded ${row === 1 ? "w-4/5 bg-accent/60" : "w-3/5 bg-white/15"}`} />
        ))}
      </div>
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
              <div className={`h-2 w-10 rounded ${row % 2 ? "bg-emerald-400/40" : "bg-accent/50"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
