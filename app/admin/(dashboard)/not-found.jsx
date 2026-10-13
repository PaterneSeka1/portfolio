import { SearchX } from "lucide-react"
import { ButtonLink, Card, EmptyState } from "../_ui/primitives"

export default function AdminNotFound() {
  return (
    <Card className="mx-auto mt-10 max-w-lg">
      <EmptyState
        icon={SearchX}
        title="Élément introuvable"
        text="Il a peut-être été supprimé, ou le lien est incorrect."
        action={<ButtonLink href="/admin">Retour au tableau de bord</ButtonLink>}
      />
    </Card>
  )
}
