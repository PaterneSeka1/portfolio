import { notFound } from "next/navigation"
import { getProjectStatus } from "../../../../lib/db/projects"
import { getSession } from "../../../../lib/auth/current-user"

/**
 * Checks that the case study exists *above* the loading.jsx boundary of this
 * segment: a notFound() thrown inside a streamed page answers 200 (soft 404).
 * Unpublished projects stay reachable for a signed-in admin (?preview=1 is
 * then checked by the page itself).
 */
export default async function CaseStudyLayout({ children, params }) {
  const { slug } = await params
  const status = await getProjectStatus(slug)
  if (!status) notFound()
  if (status !== "published" && !(await getSession())) notFound()
  return children
}
