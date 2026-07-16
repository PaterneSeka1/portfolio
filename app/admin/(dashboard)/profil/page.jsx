import { getProfile } from "../../../../lib/db/profile"
import ProfileManager from "./ProfileManager"

export const dynamic = "force-dynamic"

export default async function AdminProfilePage() {
  const profile = await getProfile()

  return <ProfileManager profile={profile} />
}
