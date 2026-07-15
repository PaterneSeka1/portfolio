import { notFound } from "next/navigation"
import ExperienceForm from "../ExperienceForm"
import { getExperienceById } from "../../../../../lib/db/experiences"
import { updateExperienceAction } from "../../../../../lib/actions/experiences"

export default async function EditExperiencePage({ params }) {
  const { id } = await params
  const experience = await getExperienceById(id)
  if (!experience) notFound()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Modifier l&apos;expérience</h1>
      <ExperienceForm action={updateExperienceAction.bind(null, id)} experience={experience} />
    </div>
  )
}
