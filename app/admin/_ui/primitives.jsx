import Link from "next/link"
import { ChevronRight, Loader2 } from "lucide-react"

/** Admin design system — shared primitives (no client hooks, usable everywhere). */
export const cx = (...classes) => classes.filter(Boolean).join(" ")

const BUTTON_VARIANTS = {
  primary: "bg-navy text-white hover:bg-institutional shadow-sm",
  accent: "bg-accent text-white hover:bg-[#1d4fd8] shadow-sm",
  secondary: "border border-gray-300 bg-white text-navy hover:bg-gray-50 hover:border-gray-400",
  ghost: "text-navy/70 hover:bg-navy/5 hover:text-navy",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  dangerGhost: "text-red-600 hover:bg-red-50",
}
const BUTTON_SIZES = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-[15px] gap-2",
}

export function buttonClass({ variant = "primary", size = "md", className } = {}) {
  return cx(
    "inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className
  )
}

export function Button({ variant, size, className, pending = false, pendingLabel, children, type = "button", ...props }) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} disabled={pending || props.disabled} {...props}>
      {pending && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  )
}

export function ButtonLink({ href, variant = "secondary", size, className, children, external, ...props }) {
  const classes = buttonClass({ variant, size, className })
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}

export function IconButton({ label, icon: Icon, className, size = 18, tone = "default", ...props }) {
  const tones = {
    default: "text-navy/60 hover:text-navy hover:bg-navy/5",
    active: "text-accent hover:bg-accent/10",
    danger: "text-red-600 hover:bg-red-50",
  }
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors disabled:opacity-40",
        tones[tone],
        className
      )}
      {...props}
    >
      <Icon size={size} aria-hidden="true" />
    </button>
  )
}

export function Card({ as: Tag = "section", className, children, ...props }) {
  return (
    <Tag className={cx("rounded-xl border border-gray-200 bg-white", className)} {...props}>
      {children}
    </Tag>
  )
}

export function CardHeader({ title, description, actions, id }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
      <div className="min-w-0">
        <h2 id={id} className="font-heading text-[15px] font-semibold text-navy">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-navy/60">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}

const BADGE_TONES = {
  neutral: "bg-gray-100 text-navy/70 ring-gray-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-800 ring-amber-200",
  info: "bg-blue-50 text-blue-700 ring-blue-200",
  accent: "bg-accent/10 text-accent ring-accent/20",
  danger: "bg-red-50 text-red-700 ring-red-200",
}

export function Badge({ tone = "neutral", children, className, dot = false }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        BADGE_TONES[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}

export const PROJECT_STATUS = {
  draft: { label: "Brouillon", tone: "warning" },
  published: { label: "Publié", tone: "success" },
  archived: { label: "Archivé", tone: "neutral" },
}

export function StatusBadge({ status }) {
  const meta = PROJECT_STATUS[status] ?? PROJECT_STATUS.draft
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  )
}

export function PageHeader({ title, description, breadcrumb, actions }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {breadcrumb?.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-2">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-navy/55">
              {breadcrumb.map((item, index) => (
                <li key={item.label} className="flex items-center gap-1">
                  {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-navy">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-navy/80">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-navy/60 sm:text-[15px]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}

export function EmptyState({ icon: Icon, title, text, action, className }) {
  return (
    <div className={cx("flex flex-col items-center px-6 py-14 text-center", className)}>
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy/50">
          <Icon size={22} aria-hidden="true" />
        </div>
      )}
      <p className="font-heading font-semibold text-navy">{title}</p>
      {text && <p className="mt-1.5 max-w-sm text-sm text-navy/60">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Skeleton({ className }) {
  return <div className={cx("animate-pulse rounded-md bg-gray-200/80", className)} aria-hidden="true" />
}

/* ---------- Form fields ---------- */

export const inputBase =
  "block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-[15px] text-navy placeholder:text-navy/35 shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:bg-gray-50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/20"

export function Field({ id, label, description, error, required, optional, children, className }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 flex items-baseline gap-1.5 text-sm font-medium text-navy">
          {label}
          {required && (
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          )}
          {optional && <span className="text-xs font-normal text-navy/45">facultatif</span>}
        </label>
      )}
      {description && (
        <p id={`${id}-description`} className="-mt-0.5 mb-2 text-xs leading-relaxed text-navy/55">
          {description}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id, description, error) {
  return [description && `${id}-description`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
}

export function TextInput({ id, name, label, description, error, required, optional, className, fieldClassName, ...props }) {
  const inputId = id ?? name
  return (
    <Field id={inputId} label={label} description={description} error={error} required={required} optional={optional} className={fieldClassName}>
      <input
        id={inputId}
        name={name}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(inputId, description, error)}
        className={cx(inputBase, className)}
        {...props}
      />
    </Field>
  )
}

export function TextArea({ id, name, label, description, error, required, optional, className, fieldClassName, rows = 3, ...props }) {
  const inputId = id ?? name
  return (
    <Field id={inputId} label={label} description={description} error={error} required={required} optional={optional} className={fieldClassName}>
      <textarea
        id={inputId}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(inputId, description, error)}
        className={cx(inputBase, "leading-relaxed", className)}
        {...props}
      />
    </Field>
  )
}

export function Select({ id, name, label, description, error, required, options, className, fieldClassName, ...props }) {
  const inputId = id ?? name
  return (
    <Field id={inputId} label={label} description={description} error={error} required={required} className={fieldClassName}>
      <select
        id={inputId}
        name={name}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(inputId, description, error)}
        className={cx(inputBase, "pr-9", className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

/** Labelled checkbox rendered as a switch-like row. */
export function Toggle({ id, name, label, description, defaultChecked, checked, onChange, disabled }) {
  const inputId = id ?? name
  return (
    <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3 rounded-lg py-1">
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          className="peer sr-only"
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="h-5 w-9 rounded-full bg-gray-300 transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-2" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-navy">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-navy/55">{description}</span>}
      </span>
    </label>
  )
}

export function FormSection({ id, title, description, children, aside }) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader title={title} description={description} actions={aside} />
      <div className="space-y-5 px-5 py-5 sm:px-6">{children}</div>
    </Card>
  )
}
