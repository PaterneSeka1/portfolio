"use client"

import { useState } from "react"
import ProjectCard from "./ProjectCard"

const filters = [
  { key: "all", label: "Tous" },
  { key: "business", label: "Applications métier" },
  { key: "saas", label: "SaaS" },
  { key: "website", label: "Sites web" },
  { key: "public", label: "Publics" },
  { key: "private", label: "Privés" },
]

export default function ProjectsFilter({ projects }) {
  const [active, setActive] = useState("all")

  const filtered = projects.filter((project) => {
    if (active === "all") return true
    if (active === "public" || active === "private") return project.visibility === active
    return project.category === active
  })

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === f.key
                ? "bg-navy text-white"
                : "bg-gray-light text-navy/70 hover:bg-navy/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
