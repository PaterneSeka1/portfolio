import { ArrowDown } from "lucide-react"

/**
 * Parses the simple text format used in case studies:
 *   one node per line, "Label | detail";
 *   lines starting with "- " are parallel branches of the previous node.
 */
export function parseDiagram(source) {
  if (!source || typeof source !== "string") return []
  const steps = []
  for (const raw of source.split("\n")) {
    const line = raw.trim()
    if (!line) continue
    const isBranch = line.startsWith("- ")
    const [label, detail] = line
      .replace(/^-\s+/, "")
      .split("|")
      .map((part) => part.trim())
    const node = { label, detail: detail || null }
    if (isBranch && steps.length > 0) {
      const last = steps[steps.length - 1]
      last.branches = [...(last.branches ?? []), node]
    } else {
      steps.push({ ...node, branches: [] })
    }
  }
  return steps
}

function Node({ label, detail, highlight }) {
  return (
    <div
      className={`rounded-card border px-4 py-3 text-center transition-surface hover:border-white/25 ${
        highlight ? "border-accent/50 bg-accent/10" : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <p className="font-heading text-sm font-semibold text-white sm:text-[15px]">{label}</p>
      {detail && <p className="mt-0.5 text-xs text-white/55">{detail}</p>}
    </div>
  )
}

const BRANCH_COLUMNS = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" }

function Arrow() {
  return (
    <div className="flex justify-center py-1.5 text-white/30" aria-hidden="true">
      <ArrowDown size={18} />
    </div>
  )
}

export default function ArchitectureDiagram({ source, caption }) {
  const steps = parseDiagram(source)
  if (steps.length === 0) return null

  const description = steps
    .map((step) =>
      step.branches.length ? `${step.label} → ${step.branches.map((b) => b.label).join(", ")}` : step.label
    )
    .join(" → ")

  return (
    <figure className="rounded-panel border border-line bg-surface/50 p-4 sm:p-6">
      {/* One accessible description for the whole diagram; the steps then appear in sequence. */}
      <div role="img" aria-label={`${caption}. ${description}`} data-reveal-children className="mx-auto max-w-xl">
        {steps.map((step, index) => (
          <div key={`${step.label}-${index}`} style={{ "--i": index }}>
            {index > 0 && <Arrow />}
            <div className="mx-auto max-w-xs">
              <Node label={step.label} detail={step.detail} highlight={step.branches.length > 0} />
            </div>
            {step.branches.length > 0 && (
              <>
                <Arrow />
                <div className={`grid gap-3 ${BRANCH_COLUMNS[Math.min(step.branches.length, 3)]}`}>
                  {step.branches.map((branch) => (
                    <Node key={branch.label} label={branch.label} detail={branch.detail} />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-5 text-center text-xs text-white/50">{caption}</figcaption>}
    </figure>
  )
}
