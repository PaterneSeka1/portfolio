import { notFound } from "next/navigation"
import ProjectForm from "../ProjectForm"
import ProjectGallery from "../ProjectGallery"
import { getProjectByIdAdmin } from "../../../../../lib/db/projects"
import { updateProjectAction } from "../../../../../lib/actions/projects"

export const dynamic = "force-dynamic"

export default async function EditProjectPage({ params }) {
  const { id } = await params
  const project = await getProjectByIdAdmin(id)
  if (!project) notFound()

  return (
    <div className="space-y-10">
      <h1 className="font-heading text-2xl font-bold text-navy">Modifier le projet</h1>
      <ProjectForm action={updateProjectAction.bind(null, id)} project={project} />
      <ProjectGallery projectId={id} images={project.images} />
    </div>
  )
}
