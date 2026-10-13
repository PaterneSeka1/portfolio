import { getAllMedia, getProjectImages } from "../../../../lib/db/media"
import { PageHeader } from "../../_ui/primitives"
import MediaLibrary from "./MediaLibrary"

export const dynamic = "force-dynamic"
export const metadata = { title: "Médiathèque — Administration" }

export default async function AdminMediaPage() {
  const [files, captures] = await Promise.all([getAllMedia(), getProjectImages()])
  return (
    <>
      <PageHeader
        title="Médiathèque"
        description="Fichiers hébergés par le site. Les captures des réalisations se gèrent depuis chaque réalisation et sont listées ici pour vue d'ensemble."
      />
      <MediaLibrary files={JSON.parse(JSON.stringify(files))} captures={captures} />
    </>
  )
}
