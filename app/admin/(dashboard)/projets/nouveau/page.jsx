import { getAllSkills } from "../../../../../lib/db/skills"
import { PageHeader } from "../../../_ui/primitives"
import ProjectEditor from "../ProjectEditor"

export const dynamic = "force-dynamic"
export const metadata = { title: "Nouvelle réalisation — Administration" }

export default async function NewProjectPage() {
  const skills = await getAllSkills()
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Réalisations", href: "/admin/projets" }, { label: "Nouvelle" }]}
        title="Nouvelle réalisation"
        description="Commencez par le problème résolu. Seuls le nom, la description courte et les technologies sont obligatoires ; la réalisation reste en brouillon tant que vous ne la publiez pas."
      />
      <ProjectEditor suggestions={skills.map((skill) => ({ name: skill.name, category: skill.category }))} />
    </>
  )
}
