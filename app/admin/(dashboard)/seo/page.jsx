import { getSiteSettings } from "../../../../lib/db/settings"
import { getDictionary } from "../../../../lib/i18n"
import { SITE_URL } from "../../../../lib/seo"
import { PageHeader } from "../../_ui/primitives"
import SeoEditor from "./SeoEditor"

export const dynamic = "force-dynamic"
export const metadata = { title: "Référencement — Administration" }

export default async function AdminSeoPage() {
  const settings = await getSiteSettings()
  const fr = getDictionary("fr").meta
  const en = getDictionary("en").meta
  return (
    <>
      <PageHeader
        title="Référencement"
        description="Ce qui s'affiche dans Google et lors d'un partage (LinkedIn, WhatsApp, X, Facebook). Chaque réalisation a aussi ses propres champs SEO."
      />
      <SeoEditor
        settings={{ seoTitle: settings?.seoTitle ?? "", seoDescription: settings?.seoDescription ?? "" }}
        defaults={{ title: fr.defaultTitle, description: fr.description }}
        english={{ title: en.defaultTitle, description: en.description }}
        siteUrl={SITE_URL}
      />
    </>
  )
}
