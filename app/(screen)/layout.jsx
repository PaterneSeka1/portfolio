import ClientLayout from "../ClientLayout"
import { getProfile } from "../../lib/db/profile"
import { getBrandSettings } from "../../lib/db/brand"

export default async function PublicLayout({ children }) {
  const [profile, brand] = await Promise.all([getProfile(), getBrandSettings()])
  return (
    <ClientLayout profile={profile} logoUrl={brand?.logoUrl}>
      {children}
    </ClientLayout>
  )
}
