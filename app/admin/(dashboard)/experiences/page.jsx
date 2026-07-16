import { getAllExperiences } from "../../../../lib/db/experiences"
import ExperiencesManager from "./ExperiencesManager"

export const dynamic = "force-dynamic"

export default async function AdminExperiencesPage() {
  const experiences = await getAllExperiences()

  return <ExperiencesManager experiences={experiences} />
}
