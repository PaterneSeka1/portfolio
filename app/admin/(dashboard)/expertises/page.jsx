import { getAllExpertises } from "../../../../lib/db/expertises"
import ExpertisesManager from "./ExpertisesManager"

export const dynamic = "force-dynamic"

export default async function AdminExpertisesPage() {
  const expertises = await getAllExpertises()

  return <ExpertisesManager expertises={expertises} />
}
