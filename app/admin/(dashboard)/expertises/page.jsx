import Link from "next/link"
import { Plus, Eye, EyeOff, Trash2 } from "lucide-react"
import { getAllExpertises } from "../../../../lib/db/expertises"
import { deleteExpertiseAction, toggleExpertiseVisibleAction } from "../../../../lib/actions/expertises"

export const dynamic = "force-dynamic"

export default async function AdminExpertisesPage() {
  const expertises = await getAllExpertises()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Expertises</h1>
        <Link
          href="/admin/expertises/nouveau"
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Plus size={16} />
          Ajouter
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
        {expertises.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <Link href={`/admin/expertises/${item.id}`} className="font-medium text-navy hover:text-accent">
                {item.title}
              </Link>
              <p className="text-xs text-navy/50">{item.technologies.join(", ")}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form action={toggleExpertiseVisibleAction.bind(null, item.id, item.visible)}>
                <button type="submit" className="p-2 rounded-lg text-navy/60 hover:bg-gray-light" title={item.visible ? "Masquer" : "Afficher"}>
                  {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </form>
              <form action={deleteExpertiseAction.bind(null, item.id)}>
                <button type="submit" className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {expertises.length === 0 && <p className="p-4 text-sm text-navy/50">Aucune expertise pour le moment.</p>}
      </div>
    </div>
  )
}
