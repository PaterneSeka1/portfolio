import { getAllSkills } from "../../../../lib/db/skills"
import SkillsManager from "./SkillsManager"

export const dynamic = "force-dynamic"

export default async function AdminSkillsPage() {
  const skills = await getAllSkills()

  return <SkillsManager skills={skills} />
}
