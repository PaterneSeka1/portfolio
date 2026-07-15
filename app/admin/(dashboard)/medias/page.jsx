import { getAllMedia } from "../../../../lib/db/media"
import MediaUploadForm from "./MediaUploadForm"
import MediaGrid from "./MediaGrid"

export const dynamic = "force-dynamic"

export default async function AdminMediaPage() {
  const items = await getAllMedia()

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">Médias</h1>
      <MediaUploadForm />
      <MediaGrid items={items} />
    </div>
  )
}
