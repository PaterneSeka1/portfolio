/** Presentation helpers for projects, shared by the public pages (pure functions). */

/** Projects shown in the hero composition, back to front. */
export const HERO_SHOWCASE = ["intranet", "scout-ascci", "vedem-ticket"];

/** @param {import("./types").Project} project */
export const isPrivateProject = (project) => project.visibility === "private";

/**
 * Short proof points for a project: the dedicated "Points clés" field when it
 * is filled in the admin, otherwise the first main features.
 * @param {import("./types").Project} project
 * @param {number} [max]
 * @returns {string[]}
 */
export function projectHighlights(project, max = 4) {
  const cs = project.caseStudy ?? {};
  if (cs.highlights?.length) return cs.highlights.slice(0, max);
  return (cs.features ?? []).slice(0, Math.min(max, 3));
}

/**
 * Up to three featured projects for the hero: the HERO_SHOWCASE slugs first,
 * then any other featured project if one of them is missing or unpublished.
 * @param {import("./types").Project[]} projects
 * @returns {import("./types").Project[]}
 */
export function pickShowcaseProjects(projects) {
  const featured = projects.filter((project) => project.featured);
  const picked = HERO_SHOWCASE.map((slug) => featured.find((project) => project.slug === slug)).filter(Boolean);
  for (const project of featured) {
    if (picked.length >= 3) break;
    if (!picked.includes(project)) picked.push(project);
  }
  return picked;
}
