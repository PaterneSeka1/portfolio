import { getBrandSettings } from "../../../../lib/db/brand"
import BrandManager from "./BrandManager"

export const dynamic = "force-dynamic"

export default async function AdminBrandPage() {
  const brand = await getBrandSettings()

  return <BrandManager brand={brand} />
}
