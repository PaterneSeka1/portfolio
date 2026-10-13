import Link from "next/link"
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, FolderKanban, Inbox, Plus, Star } from "lucide-react"
import { getDashboardData } from "../../../lib/db/dashboard"
import { formatRelative } from "../../../lib/format-admin"
import { Badge, ButtonLink, Card, CardHeader, EmptyState, PageHeader, StatusBadge } from "../_ui/primitives"

export const dynamic = "force-dynamic"
export const metadata = { title: "Tableau de bord — Administration" }

function Stat({ href, label, value, hint, icon: Icon, highlight }) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300 sm:p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-navy/65">{label}</p>
        <Icon size={18} aria-hidden="true" className={highlight ? "text-accent" : "text-navy/35"} />
      </div>
      <p className="mt-3 font-heading text-3xl font-bold text-navy">{value}</p>
      <p className="mt-1 text-xs text-navy/50 group-hover:text-navy/70">{hint}</p>
    </Link>
  )
}

export default async function AdminDashboard() {
  const { counts, recentMessages, recentProjects, attention } = await getDashboardData()

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="L'essentiel sur le contenu publié et les demandes reçues."
        actions={
          <>
            <ButtonLink href="/" external variant="secondary">
              <ExternalLink size={16} aria-hidden="true" />
              Voir le site
            </ButtonLink>
            <ButtonLink href="/admin/projets/nouveau" variant="primary">
              <Plus size={16} aria-hidden="true" />
              Nouvelle réalisation
            </ButtonLink>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat href="/admin/projets?filtre=publies" label="Publiées" value={counts.published} hint="Réalisations en ligne" icon={CheckCircle2} />
        <Stat href="/admin/projets?filtre=brouillons" label="Brouillons" value={counts.draft} hint="En préparation" icon={FolderKanban} />
        <Stat href="/admin/projets?filtre=avant" label="Mises en avant" value={counts.featured} hint="Affichées sur l'accueil" icon={Star} />
        <Stat
          href="/admin/messages?filtre=nouveaux"
          label="Messages non lus"
          value={counts.unread}
          hint={counts.unread ? "À traiter" : "Tout est lu"}
          icon={Inbox}
          highlight={counts.unread > 0}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3" aria-labelledby="recent-messages">
          <CardHeader
            id="recent-messages"
            title="Derniers messages"
            actions={
              <Link href="/admin/messages" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-navy">
                Tout voir
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            }
          />
          {recentMessages.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Aucun message pour l'instant"
              text="Les demandes envoyées depuis la page Contact apparaîtront ici."
            />
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentMessages.map((message) => (
                <li key={message.id}>
                  <Link
                    href={`/admin/messages/${message.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 sm:px-6"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 rounded-full ${message.status === "new" ? "bg-accent" : "bg-transparent"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${message.status === "new" ? "font-semibold text-navy" : "text-navy/80"}`}>
                        {message.name}
                        {message.company && <span className="font-normal text-navy/50"> · {message.company}</span>}
                      </p>
                      <p className="truncate text-xs text-navy/55">{message.projectType}</p>
                    </div>
                    <span className="shrink-0 text-xs text-navy/50">{formatRelative(message.createdAt)}</span>
                    {message.status === "new" && <span className="sr-only">(non lu)</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-2" aria-labelledby="attention">
          <CardHeader
            id="attention"
            title="À compléter"
            description="Réalisations publiées auxquelles il manque des éléments visibles par les visiteurs."
          />
          {attention.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="Rien à signaler" text="Toutes les réalisations publiées sont complètes." />
          ) : (
            <ul className="divide-y divide-gray-100">
              {attention.map((group) => (
                <li key={group.key} className="flex gap-3 px-5 py-3.5 sm:px-6">
                  <AlertTriangle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-amber-500" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy">
                      {group.label} <span className="font-normal text-navy/50">· {group.projects.length}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-navy/50">{group.hint}</p>
                    <p className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-xs">
                      {group.projects.map((project) => (
                        <Link key={project.id} href={`/admin/projets/${project.id}`} className="text-accent hover:underline">
                          {project.title}
                        </Link>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="mt-6" aria-labelledby="recent-projects">
        <CardHeader
          id="recent-projects"
          title="Modifiées récemment"
          actions={
            <Link href="/admin/projets" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-navy">
              Toutes les réalisations
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          }
        />
        {recentProjects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="Aucune réalisation"
            text="Créez votre première réalisation pour commencer à construire le portfolio."
            action={
              <ButtonLink href="/admin/projets/nouveau" variant="primary">
                <Plus size={16} aria-hidden="true" />
                Créer une réalisation
              </ButtonLink>
            }
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentProjects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/admin/projets/${project.id}`}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3.5 hover:bg-gray-50 sm:px-6"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-navy">{project.title}</span>
                  {project.featured && (
                    <Badge tone="accent">
                      <Star size={11} aria-hidden="true" />
                      En avant
                    </Badge>
                  )}
                  <StatusBadge status={project.status} />
                  <span className="w-full text-xs text-navy/50 sm:w-28 sm:text-right">
                    {formatRelative(project.updatedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}
