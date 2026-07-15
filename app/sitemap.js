import { getProjects } from "../lib/db/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/expertises", priority: 0.8 },
  { path: "/projets", priority: 0.9 },
  { path: "/parcours", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/confidentialite", priority: 0.2 },
];

export default async function sitemap() {
  const projects = await getProjects();

  const projectEntries = projects.map((project) => ({
    url: `${SITE_URL}/projets/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  return [...staticEntries, ...projectEntries];
}
