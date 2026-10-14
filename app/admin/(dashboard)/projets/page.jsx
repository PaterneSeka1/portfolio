import { Plus } from "lucide-react"
import { getAllProjectsAdmin } from "../../../../lib/db/projects"
import { ButtonLink, PageHeader } from "../../_ui/primitives"
import ProjectsList from "./ProjectsList"

export const dynamic = "force-dynamic"
export const metadata = { title: "Réalisations — Administration" }

export default async function AdminProjectsPage({ searchParams }) {
  const [projects, query] = await Promise.all([getAllProjectsAdmin(), searchParams])

  return (
    <>
      <PageHeader
        title="Réalisations"
        description="Projets présentés sur le site. L'ordre ci-dessous est l'ordre d'affichage public."
        actions={
          <ButtonLink href="/admin/projets/nouveau" variant="primary">
            <Plus size={16} aria-hidden="true" />
            Nouvelle réalisation
          </ButtonLink>
        }
      />
      <ProjectsList
        projects={projects.map((project) => ({
          id: project.id,
          slug: project.slug,
          title: project.title,
          headline: project.caseStudy?.headline ?? "",
          category: project.category,
          visibility: project.visibility,
          status: project.status,
          featured: project.featured,
          updatedAt: project.updatedAt.toISOString(),
          images: project._count.images,
        }))}
        initialFilter={typeof query.filtre === "string" ? query.filtre : "tous"}
      />
    </>
  )
}
