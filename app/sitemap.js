import { getAllProjectSlugs } from "../lib/db/projects";
import { locales, localePath } from "../lib/i18n/config";
import { SITE_URL, languageAlternates } from "../lib/seo";

export const dynamic = "force-dynamic";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.9 },
  { path: "/expertise", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/legal", priority: 0.2 },
  { path: "/privacy", priority: 0.2 },
];

const absolute = (path) => `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;

function entriesFor(path, { lastModified, priority }) {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absolute(href)])
  );
  return locales.map((locale) => ({
    url: absolute(localePath(locale, path)),
    lastModified,
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap() {
  const projects = await getAllProjectSlugs();
  const now = new Date();

  return [
    ...staticRoutes.flatMap((route) => entriesFor(route.path, { lastModified: now, priority: route.priority })),
    ...projects.flatMap((project) =>
      entriesFor(`/work/${project.slug}`, { lastModified: project.updatedAt, priority: 0.7 })
    ),
  ];
}
