import { getAllProjectsAdmin } from "../../../../lib/db/projects"
import ProjectsManager from "./ProjectsManager"

export const dynamic = "force-dynamic"

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin()

  return <ProjectsManager projects={projects} />
}
