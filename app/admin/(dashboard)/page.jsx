import Link from "next/link"
import { Briefcase, CheckCircle2, MessageSquare, Plus } from "lucide-react"
import { getDashboardStats } from "../../../lib/db/dashboard"

export const dynamic = "force-dynamic"

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center gap-4">
      <div className="h-11 w-11 rounded-xl bg-institutional/10 flex items-center justify-center text-institutional">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-navy font-heading">{value}</p>
        <p className="text-sm text-navy/60">{label}</p>
      </div>
    </div>
  )
}

export default async function AdminDashboard() {
  const { projectsTotal, projectsPublished, messagesNew, recentProjects } = await getDashboardStats()

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard label="Projets" value={projectsTotal} icon={Briefcase} />
        <StatCard label="Projets publiés" value={projectsPublished} icon={CheckCircle2} />
        <StatCard label="Nouveaux messages" value={messagesNew} icon={MessageSquare} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-heading font-semibold text-navy mb-4">Dernières modifications</h2>
          <ul className="space-y-3">
            {recentProjects.map((p) => (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <Link href={`/admin/projets?edit=${p.id}`} className="text-navy hover:text-accent">
                  {p.title}
                </Link>
                <span className="text-navy/50">
                  {new Date(p.updatedAt).toLocaleDateString("fr-FR")}
                </span>
              </li>
            ))}
            {recentProjects.length === 0 && (
              <li className="text-sm text-navy/50">Aucun projet pour le moment.</li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-heading font-semibold text-navy mb-4">Actions rapides</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/projets?new=1"
              className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
            >
              <Plus size={16} />
              Nouveau projet
            </Link>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-navy hover:border-accent transition-colors"
            >
              <MessageSquare size={16} />
              Voir les messages
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
