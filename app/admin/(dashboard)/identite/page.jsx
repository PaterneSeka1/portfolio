import { getBrandSettings } from "../../../../lib/db/brand"
import BrandForm from "./BrandForm"

export const dynamic = "force-dynamic"

export default async function AdminBrandPage() {
  const brand = await getBrandSettings()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Identité</h1>
      <BrandForm brand={brand} />
    </div>
  )
}
