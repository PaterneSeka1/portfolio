import { getProfile } from "../../../../lib/db/profile"
import ProfileForm from "./ProfileForm"

export const dynamic = "force-dynamic"

export default async function AdminProfilePage() {
  const profile = await getProfile()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Profil</h1>
      <ProfileForm profile={profile} />
    </div>
  )
}
