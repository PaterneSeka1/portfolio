import { getAllExpertises } from "../../../../lib/db/expertises"
import { getAllSkills } from "../../../../lib/db/skills"
import ExpertiseList from "./ExpertiseList"

export const dynamic = "force-dynamic"
export const metadata = { title: "Expertise — Administration" }

export default async function AdminExpertisesPage() {
  const [expertises, skills] = await Promise.all([getAllExpertises(), getAllSkills()])
  return (
    <ExpertiseList
      expertises={JSON.parse(JSON.stringify(expertises))}
      suggestions={skills.map((skill) => ({ name: skill.name, category: skill.category }))}
    />
  )
}
