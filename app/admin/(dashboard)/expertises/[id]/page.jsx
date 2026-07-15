import { notFound } from "next/navigation"
import ExpertiseForm from "../ExpertiseForm"
import { getExpertiseById } from "../../../../../lib/db/expertises"
import { updateExpertiseAction } from "../../../../../lib/actions/expertises"

export default async function EditExpertisePage({ params }) {
  const { id } = await params
  const expertise = await getExpertiseById(id)
  if (!expertise) notFound()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Modifier l&apos;expertise</h1>
      <ExpertiseForm action={updateExpertiseAction.bind(null, id)} expertise={expertise} />
    </div>
  )
}
