import { getAllExperiences } from "../../../../lib/db/experiences"
import { getAllSkills } from "../../../../lib/db/skills"
import ExperienceList from "./ExperienceList"

export const dynamic = "force-dynamic"
export const metadata = { title: "Expérience — Administration" }

export default async function AdminExperiencesPage() {
  const [experiences, skills] = await Promise.all([getAllExperiences(), getAllSkills()])
  return (
    <ExperienceList
      experiences={JSON.parse(JSON.stringify(experiences))}
      suggestions={skills.map((skill) => ({ name: skill.name, category: skill.category }))}
    />
  )
}
