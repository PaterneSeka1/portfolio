import Link from "next/link"
import { Plus, Eye, EyeOff, Star, Trash2, Lock } from "lucide-react"
import { getAllProjectsAdmin } from "../../../../lib/db/projects"
import { deleteProjectAction, togglePublishedProjectAction, toggleFeaturedProjectAction } from "../../../../lib/actions/projects"

export const dynamic = "force-dynamic"

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Projets</h1>
        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Plus size={16} />
          Nouveau projet
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
        {projects.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-2">
              {item.visibility === "private" && <Lock size={14} className="text-navy/40" />}
              <div>
                <Link href={`/admin/projets/${item.id}`} className="font-medium text-navy hover:text-accent">
                  {item.title}
                </Link>
                <p className="text-xs text-navy/50">
                  {item.category} · {item.published ? "publié" : "brouillon"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form action={toggleFeaturedProjectAction.bind(null, item.id, item.featured)}>
                <button
                  type="submit"
                  className={`p-2 rounded-lg hover:bg-gray-light ${item.featured ? "text-accent" : "text-navy/40"}`}
                  title={item.featured ? "Retirer des projets vedettes" : "Mettre en vedette"}
                >
                  <Star size={16} fill={item.featured ? "currentColor" : "none"} />
                </button>
              </form>
              <form action={togglePublishedProjectAction.bind(null, item.id, item.published)}>
                <button type="submit" className="p-2 rounded-lg text-navy/60 hover:bg-gray-light" title={item.published ? "Repasser en brouillon" : "Publier"}>
                  {item.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </form>
              <form action={deleteProjectAction.bind(null, item.id)}>
                <button type="submit" className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="p-4 text-sm text-navy/50">Aucun projet pour le moment.</p>}
      </div>
    </div>
  )
}
