export default function SectionCard({ icon: Icon, title, description, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-6 space-y-5 ${className}`}>
      <div>
        <h2 className="flex items-center gap-2.5 font-heading font-semibold text-navy">
          {Icon && (
            <span className="h-8 w-8 rounded-lg bg-institutional/10 flex items-center justify-center text-institutional shrink-0">
              <Icon size={16} />
            </span>
          )}
          {title}
        </h2>
        {description && <p className="text-sm text-navy/60 mt-1.5">{description}</p>}
      </div>
      {children}
    </section>
  )
}
