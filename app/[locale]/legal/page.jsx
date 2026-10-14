import { Container } from "../../_components/ui"
import { getDictionary } from "../../../lib/i18n"
import { getLocalizedProfile } from "../../../lib/db/profile"
import { buildMetadata } from "../../../lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const { legal } = getDictionary(locale)
  return buildMetadata({ locale, path: "/legal", title: legal.metaTitle })
}

export default async function LegalPage({ params }) {
  const { locale } = await params
  const { legal } = getDictionary(locale)
  const profile = await getLocalizedProfile(locale)

  return (
    <Container className="max-w-3xl pt-14 pb-20 sm:pt-20">
      <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{legal.title}</h1>
      <div className="mt-10 space-y-8 leading-relaxed text-white/75">
        <section>
          <h2 className="mb-2 font-heading text-lg font-semibold text-white">{legal.publisherTitle}</h2>
          <p>{legal.publisher(profile.name, profile.location)}</p>
          <p className="mt-2">
            {legal.contactLabel}{" "}
            <a href={`mailto:${profile.email}`} className="text-accent-light underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-lg font-semibold text-white">{legal.ipTitle}</h2>
          <p>{legal.ip}</p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-lg font-semibold text-white">{legal.hostingTitle}</h2>
          <p>{legal.hosting}</p>
        </section>
      </div>
    </Container>
  )
}
