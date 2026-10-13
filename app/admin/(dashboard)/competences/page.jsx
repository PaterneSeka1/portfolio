import { getAllSkills } from "../../../../lib/db/skills"
import SkillBoard from "./SkillBoard"

export const dynamic = "force-dynamic"
export const metadata = { title: "Technologies — Administration" }

export default async function AdminSkillsPage() {
  const skills = await getAllSkills()
  return <SkillBoard skills={JSON.parse(JSON.stringify(skills))} />
}
