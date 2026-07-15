import ExpertiseForm from "../ExpertiseForm"
import { createExpertiseAction } from "../../../../../lib/actions/expertises"

export default function NewExpertisePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Nouvelle expertise</h1>
      <ExpertiseForm action={createExpertiseAction} />
    </div>
  )
}
