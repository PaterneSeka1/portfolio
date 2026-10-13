import { ExternalLink } from "lucide-react"
import { getProfile } from "../../../../lib/db/profile"
import { ButtonLink, PageHeader } from "../../_ui/primitives"
import ProfileEditor from "./ProfileEditor"

export const dynamic = "force-dynamic"
export const metadata = { title: "Profil & accueil — Administration" }

export default async function AdminProfilePage() {
  const profile = await getProfile()
  return (
    <>
      <PageHeader
        title="Profil & accueil"
        description="Textes du haut de la page d'accueil, coordonnées, photo et CV. Les autres textes du site sont fixes, pour garder un ton cohérent."
        actions={
          <ButtonLink href="/" external variant="secondary" size="sm">
            <ExternalLink size={15} aria-hidden="true" />
            Voir l&apos;accueil
          </ButtonLink>
        }
      />
      <ProfileEditor key={profile?.updatedAt?.toISOString() ?? "new"} profile={JSON.parse(JSON.stringify(profile ?? {}))} />
    </>
  )
}
