import { headers } from "next/headers"
import { Container, LoadingRegion, Skeleton } from "../../../_components/ui"
import { getDictionary } from "../../../../lib/i18n"
import { localeFromPathname } from "../../../../lib/i18n/config"

/** Case study placeholder: hero (text + product window), then sidebar and sections. */
export default async function CaseStudyLoading() {
  const requestHeaders = await headers()
  const { a11y } = getDictionary(localeFromPathname(requestHeaders.get("x-pathname") ?? ""))

  return (
    <LoadingRegion label={a11y.loading}>
      <div className="border-b border-line">
        <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
          <Skeleton className="h-4 w-40" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Skeleton className="h-6 w-44 rounded-full" />
              <Skeleton className="mt-7 h-10 w-full max-w-lg" />
              <Skeleton className="mt-3 h-10 w-3/4 max-w-md" />
              <Skeleton className="mt-6 h-4 w-full max-w-xl" />
              <Skeleton className="mt-2.5 h-4 w-5/6 max-w-lg" />
            </div>
            <Skeleton className="aspect-[16/10] w-full rounded-card" />
          </div>
        </Container>
      </div>
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[250px_1fr] lg:gap-16">
        <Skeleton className="h-48 rounded-card" />
        <div>
          {[0, 1].map((item) => (
            <div key={item} className="pb-10">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="mt-5 h-4 w-full max-w-prose" />
              <Skeleton className="mt-2.5 h-4 w-11/12 max-w-prose" />
              <Skeleton className="mt-2.5 h-4 w-3/4 max-w-prose" />
            </div>
          ))}
        </div>
      </Container>
    </LoadingRegion>
  )
}
