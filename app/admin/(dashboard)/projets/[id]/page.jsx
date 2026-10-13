import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { getProjectAdmin } from "../../../../../lib/db/projects"
import { getAllSkills } from "../../../../../lib/db/skills"
import { ButtonLink, PageHeader } from "../../../_ui/primitives"
import ProjectEditor from "../ProjectEditor"
import ProjectMedia from "../ProjectMedia"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { id } = await params
  const project = await getProjectAdmin(id)
  return { title: `${project?.title ?? "Réalisation"} — Administration` }
}

export default async function EditProjectPage({ params, searchParams }) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  const [project, skills] = await Promise.all([getProjectAdmin(id), getAllSkills()])
  if (!project) notFound()

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Réalisations", href: "/admin/projets" }, { label: project.title }]}
        title={project.title}
        description={project.caseStudy?.headline || "Modifier la réalisation et son étude de cas."}
        actions={
          project.status === "published" && (
            <ButtonLink href={`/work/${project.slug}`} external variant="secondary" size="sm">
              <ExternalLink size={15} aria-hidden="true" />
              Voir en ligne
            </ButtonLink>
          )
        }
      />
      <ProjectEditor
        key={project.updatedAt.toISOString()}
        project={JSON.parse(JSON.stringify(project))}
        suggestions={skills.map((skill) => ({ name: skill.name, category: skill.category }))}
        created={typeof query.created === "string" ? query.created : null}
        media={<ProjectMedia projectId={project.id} images={project.images} />}
      />
    </>
  )
}
