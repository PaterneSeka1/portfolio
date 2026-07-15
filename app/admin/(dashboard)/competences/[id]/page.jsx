import { notFound } from "next/navigation"
import SkillForm from "../SkillForm"
import { getSkillById } from "../../../../../lib/db/skills"
import { updateSkillAction } from "../../../../../lib/actions/skills"

export default async function EditSkillPage({ params }) {
  const { id } = await params
  const skill = await getSkillById(id)
  if (!skill) notFound()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Modifier la compétence</h1>
      <SkillForm action={updateSkillAction.bind(null, id)} skill={skill} />
    </div>
  )
}
