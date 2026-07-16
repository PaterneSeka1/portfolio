"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, Eye, EyeOff, Star, Trash2, Lock } from "lucide-react"
import Modal from "../_components/Modal"
import ActionButton from "../_components/ActionButton"
import ProjectForm from "./ProjectForm"
import ProjectGallery from "./ProjectGallery"
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
  togglePublishedProjectAction,
  toggleFeaturedProjectAction,
} from "../../../../lib/actions/projects"

export default function ProjectsManager({ projects }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const editId = searchParams.get("edit")
    if (editId && projects.some((p) => p.id === editId)) {
      setModal({ mode: "edit", id: editId })
    } else if (searchParams.get("new") === "1") {
      setModal({ mode: "create" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => {
    setModal(null)
    if (searchParams.get("edit") || searchParams.get("new")) {
      router.replace("/admin/projets")
    } else {
      router.refresh()
    }
  }, [router, searchParams])

  const editingProject = modal?.mode === "edit" ? projects.find((p) => p.id === modal.id) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">Projets</h1>
        <button
          type="button"
          onClick={() => setModal({ mode: "create" })}
          className="inline-flex items-center gap-2 rounded-lg bg-navy text-white px-4 py-2.5 text-sm font-semibold hover:bg-institutional transition-colors"
        >
          <Plus size={16} />
          Nouveau projet
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
        {projects.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-2 min-w-0">
              {item.visibility === "private" && <Lock size={14} className="text-navy/40 shrink-0" />}
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setModal({ mode: "edit", id: item.id })}
                  className="font-medium text-navy hover:text-accent text-left truncate block"
                >
                  {item.title}
                </button>
                <p className="text-xs text-navy/50">
                  {item.category} · {item.published ? "publié" : "brouillon"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ActionButton
                action={() => toggleFeaturedProjectAction(item.id, item.featured)}
                icon={Star}
                label={item.featured ? "Retirer des projets vedettes" : "Mettre en vedette"}
                className={`p-2 rounded-lg hover:bg-gray-light ${item.featured ? "text-accent" : "text-navy/40"}`}
                successMessage={item.featured ? "Retiré des projets vedettes." : "Mis en vedette."}
                onSuccess={() => router.refresh()}
              />
              <ActionButton
                action={() => togglePublishedProjectAction(item.id, item.published)}
                icon={item.published ? Eye : EyeOff}
                label={item.published ? "Repasser en brouillon" : "Publier"}
                className="p-2 rounded-lg text-navy/60 hover:bg-gray-light"
                successMessage={item.published ? "Projet repassé en brouillon." : "Projet publié."}
                onSuccess={() => router.refresh()}
              />
              <ActionButton
                action={() => deleteProjectAction(item.id)}
                icon={Trash2}
                label="Supprimer"
                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                confirm={`Supprimer définitivement le projet « ${item.title} » ?`}
                successMessage="Projet supprimé."
                onSuccess={() => router.refresh()}
              />
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="p-4 text-sm text-navy/50">Aucun projet pour le moment.</p>}
      </div>

      <Modal open={modal?.mode === "create"} onClose={close} title="Nouveau projet" maxWidth="max-w-3xl">
        <ProjectForm action={createProjectAction} onSuccess={close} />
      </Modal>

      <Modal open={modal?.mode === "edit" && !!editingProject} onClose={close} title="Modifier le projet" maxWidth="max-w-3xl">
        {editingProject && (
          <div className="space-y-10">
            <ProjectForm
              action={updateProjectAction.bind(null, editingProject.id)}
              project={editingProject}
              onSuccess={close}
            />
            <ProjectGallery projectId={editingProject.id} images={editingProject.images} />
          </div>
        )}
      </Modal>
    </div>
  )
}
