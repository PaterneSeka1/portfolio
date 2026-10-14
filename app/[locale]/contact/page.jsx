import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "./ContactForm"
import { Container, SectionHeader } from "../../_components/ui"
import { getDictionary } from "../../../lib/i18n"
import { getLocalizedProfile } from "../../../lib/db/profile"
import { getProjectBySlug } from "../../../lib/db/projects"
import { buildMetadata } from "../../../lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const { contact } = getDictionary(locale)
  return buildMetadata({ locale, path: "/contact", title: contact.metaTitle, description: contact.metaDescription })
}

export default async function ContactPage({ params, searchParams }) {
  const { locale } = await params
  const query = await searchParams
  // "projet" is the parameter used by the previous version of the site.
  const slug = typeof (query.project ?? query.projet) === "string" ? (query.project ?? query.projet) : null
  const dict = getDictionary(locale)
  const { contact } = dict

  const [profile, project] = await Promise.all([
    getLocalizedProfile(locale),
    slug ? getProjectBySlug(slug, locale) : Promise.resolve(null),
  ])

  const direct = [
    profile.email && { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    profile.linkedin && { icon: Linkedin, label: "LinkedIn", href: profile.linkedin, external: true, track: "linkedin_click" },
    profile.github && { icon: Github, label: "GitHub", href: profile.github, external: true, track: "github_click" },
  ].filter(Boolean)

  return (
    <Container className="grid gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1fr_320px] lg:gap-16">
      <div>
        <SectionHeader as="h1" title={contact.title} intro={contact.intro} />

        {project && (
          <p className="mt-6 inline-block rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-white/85">
            {contact.aboutProject} <strong className="font-semibold text-white">{project.title}</strong>
          </p>
        )}

        <div className="mt-10">
          <ContactForm
            locale={locale}
            labels={contact.form}
            projectTypes={contact.projectTypes}
            validation={contact.validation}
            project={project ? { slug: project.slug, title: project.title, category: project.category } : null}
          />
        </div>
      </div>

      <aside aria-labelledby="direct-contact" className="h-fit rounded-card border border-line bg-surface/50 p-6 lg:mt-20">
        <h2 id="direct-contact" className="font-heading font-semibold text-white">
          {contact.directContact}
        </h2>
        <ul className="mt-3 text-sm">
          {direct.map(({ icon: Icon, label, href, external, track }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(track ? { "data-track": track, "data-track-from": "contact" } : {})}
                className="-mx-2 flex min-h-11 items-center gap-3 rounded-control px-2 py-1.5 break-all text-white/75 transition-surface hover:bg-white/[0.04] hover:text-white"
              >
                <Icon size={18} className="shrink-0 text-accent-light" aria-hidden="true" />
                {label}
                {external && <span className="sr-only">{dict.a11y.newTab}</span>}
              </a>
            </li>
          ))}
          <li className="flex min-h-11 items-center gap-3 py-1.5 text-white/75">
            <MapPin size={18} className="shrink-0 text-accent-light" aria-hidden="true" />
            {profile.location}
          </li>
        </ul>
      </aside>
    </Container>
  )
}
