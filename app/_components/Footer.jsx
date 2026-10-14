import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import Logo, { Monogram } from "./Logo"
import { localePath } from "../../lib/i18n/config"

const NAV = ["work", "expertise", "about", "contact"]

const footerLink = "inline-flex min-h-10 items-center gap-2 text-white/65 transition-surface hover:text-white"

export default function Footer({ locale, dict, profile }) {
  const year = new Date().getFullYear()
  if (!profile) return null

  const socials = [
    profile.github && { href: profile.github, label: "GitHub", icon: Github, external: true, track: "github_click" },
    profile.linkedin && {
      href: profile.linkedin,
      label: "LinkedIn",
      icon: Linkedin,
      external: true,
      track: "linkedin_click",
    },
    profile.email && { href: `mailto:${profile.email}`, label: profile.email, icon: Mail, external: false },
  ].filter(Boolean)

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      {/* PS signature, cropped at the bottom-right corner. */}
      <Monogram className="pointer-events-none absolute -right-8 -bottom-24 h-80 text-white/[0.025] sm:h-96" />

      <div className="relative mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div>
              <p className="font-heading font-semibold text-white">{profile.name}</p>
              <p className="text-sm text-white/60">
                {profile.title}
                {profile.tagline ? ` · ${profile.tagline}` : ""}
              </p>
            </div>
          </div>
          {profile.location && <p className="mt-5 text-sm text-white/50">{profile.location}</p>}
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">{dict.footer.navTitle}</p>
          <ul className="mt-3 text-sm">
            {NAV.map((key) => (
              <li key={key}>
                <Link href={localePath(locale, `/${key}`)} className={footerLink}>
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">{dict.footer.contactTitle}</p>
          <ul className="mt-3 text-sm">
            {socials.map(({ href, label, icon: Icon, external, track }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(track ? { "data-track": track, "data-track-from": "footer" } : {})}
                  className={`group break-all ${footerLink}`}
                >
                  <Icon size={16} aria-hidden="true" className="shrink-0" />
                  <span>{label}</span>
                  {external && (
                    <>
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="opacity-0 transition-surface group-hover:opacity-100"
                      />
                      <span className="sr-only">{dict.a11y.newTab}</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {profile.name}. {dict.footer.rights}{" "}
            <span className="hidden md:inline">{dict.footer.signature}</span>
          </p>
          <nav aria-label={dict.a11y.footerNav} className="flex gap-5">
            <Link href={localePath(locale, "/legal")} className="inline-flex min-h-10 items-center hover:text-white">
              {dict.footer.legal}
            </Link>
            <Link href={localePath(locale, "/privacy")} className="inline-flex min-h-10 items-center hover:text-white">
              {dict.footer.privacy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
