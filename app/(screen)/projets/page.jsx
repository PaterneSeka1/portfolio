import { getProjects } from "../../../lib/db/projects"
import ProjectsFilter from "./ProjectsFilter"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Réalisations — Paterne SEKA",
  description: "Applications métier, produits SaaS et sites web conçus et développés par Paterne SEKA.",
}

export default async function Projets() {
  const projects = await getProjects()

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">Réalisations</h1>
        <p className="mt-3 text-navy/70 text-lg">
          Une sélection de plateformes métier, produits SaaS et sites publics conçus et développés
          de bout en bout.
        </p>
      </div>

      <ProjectsFilter projects={projects} />
    </div>
  )
}
