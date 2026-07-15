import ExperienceForm from "../ExperienceForm"
import { createExperienceAction } from "../../../../../lib/actions/experiences"

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Nouvelle expérience</h1>
      <ExperienceForm action={createExperienceAction} />
    </div>
  )
}
