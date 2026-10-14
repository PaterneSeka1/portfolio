import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import Logo from "./Logo"
import { localePath } from "../../lib/i18n/config"

export default function Footer({ locale, dict, profile }) {
  const year = new Date().getFullYear()
  if (!profile) return null

  const socials = [
    profile.github && { href: profile.github, label: "GitHub", icon: Github, external: true },
    profile.linkedin && { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
    profile.email && { href: `mailto:${profile.email}`, label: profile.email, icon: Mail, external: false },
  ].filter(Boolean)

  return (
    <footer className="border-t border-white/[0.08] bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="white" className="h-9 w-9" />
          <div>
            <p className="font-heading font-semibold text-white">{profile.name}</p>
            <p className="text-sm text-white/60">
              {profile.title}
              {profile.tagline ? ` · ${profile.tagline}` : ""}
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
                {external && <span className="sr-only">{dict.a11y.newTab}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {profile.name}. {dict.footer.rights}
          </p>
          <nav aria-label={dict.a11y.footerNav} className="flex gap-5">
            <Link href={localePath(locale, "/legal")} className="hover:text-white">
              {dict.footer.legal}
            </Link>
            <Link href={localePath(locale, "/privacy")} className="hover:text-white">
              {dict.footer.privacy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
