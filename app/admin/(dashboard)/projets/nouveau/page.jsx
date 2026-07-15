import ProjectForm from "../ProjectForm"
import { createProjectAction } from "../../../../../lib/actions/projects"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Nouveau projet</h1>
      <ProjectForm action={createProjectAction} />
    </div>
  )
}
