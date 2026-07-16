export default function InfoRow({ label, value, className = "" }) {
  return (
    <div className={className}>
      <dt className="text-xs text-navy/50">{label}</dt>
      <dd className="text-sm text-navy mt-0.5 break-words">
        {value || value === 0 ? value : <span className="text-navy/30">—</span>}
      </dd>
    </div>
  )
}
