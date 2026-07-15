import SkillForm from "../SkillForm"
import { createSkillAction } from "../../../../../lib/actions/skills"

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Nouvelle compétence</h1>
      <SkillForm action={createSkillAction} />
    </div>
  )
}
