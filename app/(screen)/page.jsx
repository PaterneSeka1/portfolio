import Hero from "./components/Hero"
import { getProfile } from "../../lib/db/profile"

export const dynamic = "force-dynamic"

export async function generateMetadata() {
  const profile = await getProfile()
  return {
    title: `${profile.name} — ${profile.title}`,
    description: profile.promise,
    alternates: { canonical: "/" },
  }
}

export default async function Home() {
  const profile = await getProfile()

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      description: profile.promise,
      email: profile.email,
      address: profile.location,
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      sameAs: [profile.github, profile.linkedin].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: profile.name,
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero profile={profile} />
    </>
  )
}
