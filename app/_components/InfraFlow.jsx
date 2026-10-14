import { Icon } from "./ui"

function Node({ layer }) {
  return (
    <div className="flex items-center gap-3.5 rounded-card border border-line bg-surface/80 px-4 py-3 shadow-card transition-surface hover:border-white/20 hover:bg-surface-2/80">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-accent/15 text-accent-light">
        <Icon name={layer.icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-[15px] font-semibold text-white">{layer.label}</span>
        <span className="block text-[13px] leading-snug text-white/55">{layer.detail}</span>
      </span>
    </div>
  )
}

/** Vertical connector; the pulse runs once when the diagram is revealed (globals.css .flow-pulse). */
function Connector({ index }) {
  return (
    <span aria-hidden="true" className="relative mx-auto block h-7 w-px overflow-hidden bg-white/15">
      <span
        className="flow-pulse absolute inset-0 bg-gradient-to-b from-transparent via-accent-light to-transparent"
        style={{ "--i": index }}
      />
    </span>
  )
}

/**
 * Simplified production architecture: a request from the user to the data,
 * through the server layers. A real ordered list, so the same information is
 * available without the visuals or the animation.
 */
export default function InfraFlow({ title, serverLabel, layers }) {
  const [client, ...server] = layers
  return (
    <figure data-reveal className="flow mx-auto w-full max-w-md">
      <figcaption className="mb-5 text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">{title}</figcaption>
      <ol>
        <li>
          <Node layer={client} />
        </li>
        <li>
          <Connector index={0} />
          <div className="relative rounded-panel border border-dashed border-white/15 bg-white/[0.015] p-3 pt-8 sm:p-4 sm:pt-9">
            <p className="absolute top-3 left-4 text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
              {serverLabel}
            </p>
            <ol>
              {server.map((layer, index) => (
                <li key={layer.label}>
                  {index > 0 && <Connector index={index} />}
                  <Node layer={layer} />
                </li>
              ))}
            </ol>
          </div>
        </li>
      </ol>
    </figure>
  )
}
