"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Archive,
  ArchiveRestore,
  ArrowDown,
  ArrowUp,
  Eye,
  FileEdit,
  FolderKanban,
  Lock,
  Plus,
  Search,
  Send,
  Star,
  Trash2,
  Undo2,
} from "lucide-react"
import { Badge, ButtonLink, Card, EmptyState, IconButton, StatusBadge, cx, inputBase } from "../../_ui/primitives"
import { DropdownMenu, useAction, useConfirm } from "../../_ui/overlays"
import {
  deleteProjectAction,
  moveProjectAction,
  setProjectStatusAction,
  toggleFeaturedProjectAction,
} from "../../../../lib/actions/projects"
import { PROJECT_CATEGORIES } from "../../../../lib/validation/project"
import { formatRelative } from "../../../../lib/format-admin"

const FILTERS = [
  { key: "tous", label: "Toutes", test: (p) => p.status !== "archived" },
  { key: "publies", label: "Publiées", test: (p) => p.status === "published" },
  { key: "brouillons", label: "Brouillons", test: (p) => p.status === "draft" },
  { key: "avant", label: "Mises en avant", test: (p) => p.featured && p.status !== "archived" },
  { key: "archives", label: "Archivées", test: (p) => p.status === "archived" },
]

const categoryLabel = Object.fromEntries(PROJECT_CATEGORIES.map((c) => [c.value, c.label]))

function ProjectActions({ project, index, total, canReorder, run, ask }) {
  const statusItems =
    project.status === "published"
      ? [{ key: "draft", label: "Repasser en brouillon", icon: Undo2, onSelect: () => run(() => setProjectStatusAction(project.id, "draft"), { success: "Réalisation repassée en brouillon." }) }]
      : project.status === "draft"
        ? [{ key: "publish", label: "Publier", icon: Send, onSelect: () => run(() => setProjectStatusAction(project.id, "published"), { success: "Réalisation publiée." }) }]
        : [{ key: "restore", label: "Restaurer en brouillon", icon: ArchiveRestore, onSelect: () => run(() => setProjectStatusAction(project.id, "draft"), { success: "Réalisation restaurée en brouillon." }) }]

  return (
    <div className="flex items-center justify-end gap-0.5">
      <IconButton
        icon={Star}
        tone={project.featured ? "active" : "default"}
        label={project.featured ? `Ne plus mettre en avant « ${project.title} »` : `Mettre en avant « ${project.title} »`}
        aria-pressed={project.featured}
        onClick={() =>
          run(() => toggleFeaturedProjectAction(project.id), {
            success: project.featured ? "Retirée de la mise en avant." : "Mise en avant sur l'accueil.",
          })
        }
      />
      {canReorder && (
        <>
          <IconButton
            icon={ArrowUp}
            label={`Monter « ${project.title} »`}
            disabled={index === 0}
            onClick={() => run(() => moveProjectAction(project.id, "up"))}
          />
          <IconButton
            icon={ArrowDown}
            label={`Descendre « ${project.title} »`}
            disabled={index === total - 1}
            onClick={() => run(() => moveProjectAction(project.id, "down"))}
          />
        </>
      )}
      <DropdownMenu
        label={`Actions pour « ${project.title} »`}
        items={[
          { key: "edit", label: "Modifier", icon: FileEdit, onSelect: () => (window.location.href = `/admin/projets/${project.id}`) },
          { key: "preview", label: "Aperçu", icon: Eye, onSelect: () => window.open(`/work/${project.slug}?preview=1`, "_blank", "noopener") },
          ...statusItems,
          project.status !== "archived" && {
            key: "archive",
            label: "Archiver (retirer du site)",
            icon: Archive,
            onSelect: () => run(() => setProjectStatusAction(project.id, "archived"), { success: "Réalisation archivée." }),
          },
          { key: "sep", separator: true },
          {
            key: "delete",
            label: "Supprimer",
            icon: Trash2,
            danger: true,
            onSelect: () =>
              ask({
                title: `Supprimer « ${project.title} » ?`,
                description:
                  "La réalisation, son étude de cas et ses captures seront supprimées définitivement. Cette action est irréversible. Pour la retirer du site sans la perdre, archivez-la plutôt.",
                confirmLabel: "Supprimer définitivement",
                onConfirm: () => run(() => deleteProjectAction(project.id), { success: "Réalisation supprimée." }),
              }),
          },
        ]}
      />
    </div>
  )
}

export default function ProjectsList({ projects, initialFilter }) {
  const [filter, setFilter] = useState(FILTERS.some((f) => f.key === initialFilter) ? initialFilter : "tous")
  const [query, setQuery] = useState("")
  const { run, pending } = useAction()
  const { ask, dialog } = useConfirm()

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.key, projects.filter(f.test).length])),
    [projects]
  )
  const term = query.trim().toLowerCase()
  const visible = projects.filter(
    (p) =>
      FILTERS.find((f) => f.key === filter).test(p) &&
      (!term || `${p.title} ${p.headline} ${p.slug}`.toLowerCase().includes(term))
  )
  // Reordering only makes sense on the full, unfiltered list.
  const canReorder = filter === "tous" && !term

  const selectFilter = (key) => {
    setFilter(key)
    const url = new URL(window.location.href)
    if (key === "tous") url.searchParams.delete("filtre")
    else url.searchParams.set("filtre", key)
    window.history.replaceState(null, "", url)
  }

  if (projects.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={FolderKanban}
          title="Aucune réalisation pour l'instant"
          text="Créez votre première réalisation pour commencer à construire le portfolio."
          action={
            <ButtonLink href="/admin/projets/nouveau" variant="primary">
              <Plus size={16} aria-hidden="true" />
              Créer une réalisation
            </ButtonLink>
          }
        />
      </Card>
    )
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filtrer les réalisations" className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => selectFilter(f.key)}
              className={cx(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
                filter === f.key ? "bg-navy text-white" : "text-navy/65 hover:bg-white hover:text-navy"
              )}
            >
              {f.label}
              <span className={cx("rounded-full px-1.5 text-xs", filter === f.key ? "bg-white/20" : "bg-navy/5")}>
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
          <label htmlFor="project-search" className="sr-only">
            Rechercher une réalisation
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une réalisation…"
            className={cx(inputBase, "h-10 py-2 pl-9")}
          />
        </div>
      </div>

      <Card className={cx("overflow-visible transition-opacity", pending && "opacity-70")} aria-busy={pending}>
        {visible.length === 0 ? (
          <EmptyState
            icon={Search}
            title={term ? "Aucun résultat" : "Rien dans cette catégorie"}
            text={term ? `Aucune réalisation ne correspond à « ${query} ».` : "Changez de filtre pour voir les autres réalisations."}
          />
        ) : (
          <>
            {/* Desktop: structured table */}
            <table className="hidden w-full table-fixed text-left text-sm md:table">
              <colgroup>
                <col />
                <col className="w-36 lg:w-44" />
                <col className="w-28" />
                <col className="hidden w-32 xl:table-column" />
                <col className="w-[184px]" />
              </colgroup>
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-navy/50">
                  <th scope="col" className="px-5 py-3 font-medium">Réalisation</th>
                  <th scope="col" className="px-3 py-3 font-medium">Type</th>
                  <th scope="col" className="px-3 py-3 font-medium">Statut</th>
                  <th scope="col" className="hidden px-3 py-3 font-medium xl:table-cell">Modifiée</th>
                  <th scope="col" className="px-5 py-3 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visible.map((project, index) => (
                  <tr key={project.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-3">
                      <Link href={`/admin/projets/${project.id}`} className="group block min-w-0">
                        <span className="flex items-center gap-1.5 font-medium text-navy group-hover:text-accent">
                          {project.visibility === "private" && <Lock size={13} aria-label="Projet privé" className="shrink-0 text-navy/40" />}
                          <span className="truncate">{project.title}</span>
                          {project.featured && <Star size={13} aria-label="Mise en avant" className="shrink-0 fill-accent text-accent" />}
                        </span>
                        {project.headline && <span className="block truncate text-xs text-navy/55">{project.headline}</span>}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-navy/70">{categoryLabel[project.category]}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-3 text-navy/60 xl:table-cell">{formatRelative(project.updatedAt)}</td>
                    <td className="px-3 py-2">
                      <ProjectActions project={project} index={index} total={visible.length} canReorder={canReorder} run={run} ask={ask} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile: cards */}
            <ul className="divide-y divide-gray-100 md:hidden">
              {visible.map((project, index) => (
                <li key={project.id} className="px-4 py-3.5">
                  <div className="flex items-start gap-2">
                    <Link href={`/admin/projets/${project.id}`} className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-medium text-navy">
                        {project.visibility === "private" && <Lock size={13} aria-label="Projet privé" className="shrink-0 text-navy/40" />}
                        <span className="truncate">{project.title}</span>
                      </span>
                      {project.headline && <span className="mt-0.5 block text-xs text-navy/55">{project.headline}</span>}
                      <span className="mt-2 flex flex-wrap items-center gap-1.5">
                        <StatusBadge status={project.status} />
                        {project.featured && <Badge tone="accent">En avant</Badge>}
                        <span className="text-xs text-navy/50">{formatRelative(project.updatedAt)}</span>
                      </span>
                    </Link>
                  </div>
                  <div className="mt-2 -mr-2">
                    <ProjectActions project={project} index={index} total={visible.length} canReorder={canReorder} run={run} ask={ask} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
      {dialog}
    </>
  )
}
