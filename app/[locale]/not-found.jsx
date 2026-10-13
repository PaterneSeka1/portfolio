import { headers } from "next/headers"
import { ButtonLink, Container } from "../_components/ui"
import { getDictionary } from "../../lib/i18n"
import { localePath } from "../../lib/i18n/config"

export default async function NotFound() {
  // not-found.js does not receive params: infer the locale from the requested URL.
  const requestHeaders = await headers()
  const pathname = requestHeaders.get("x-pathname") ?? ""
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr"
  const { notFound } = getDictionary(locale)

  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-heading text-sm font-bold text-accent-light">404</p>
      <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{notFound.title}</h1>
      <p className="mt-4 text-white/70">{notFound.text}</p>
      <ButtonLink href={localePath(locale, "/")} className="mt-8">
        {notFound.back}
      </ButtonLink>
    </Container>
  )
}
