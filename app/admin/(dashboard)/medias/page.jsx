import { getAllMedia } from "../../../../lib/db/media"
import MediaManager from "./MediaManager"

export const dynamic = "force-dynamic"

export default async function AdminMediaPage() {
  const items = await getAllMedia()

  return <MediaManager items={items} />
}
