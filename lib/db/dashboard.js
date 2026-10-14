import { prisma } from "../prisma";

const isEmpty = (value) => !value || (Array.isArray(value) && value.length === 0);

/** Content completeness checks that change what visitors see, grouped by issue. */
const CHECKS = [
  { key: "images", label: "Sans capture d'écran", hint: "Le site affiche une maquette abstraite.", test: (p) => p._count.images === 0 },
  { key: "role", label: "« Mon rôle » vide", hint: "Projets mis en avant.", test: (p) => p.featured && isEmpty(p.caseStudy?.role) },
  { key: "headline", label: "Sans titre métier", hint: "Projets mis en avant.", test: (p) => p.featured && isEmpty(p.caseStudy?.headline) },
  { key: "english", label: "Sans version anglaise", hint: "La page /en reprend le français.", test: (p) => !p.en || isEmpty(p.en.summary) },
];

function attentionPoints(projects) {
  const published = projects.filter((project) => project.status === "published");
  return CHECKS.map((check) => ({
    key: check.key,
    label: check.label,
    hint: check.hint,
    projects: published.filter(check.test).map((project) => ({ id: project.id, title: project.title })),
  })).filter((group) => group.projects.length > 0);
}

export async function getDashboardData() {
  const [statusCounts, featured, unread, recentMessages, projects] = await Promise.all([
    prisma.project.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.project.count({ where: { featured: true, status: "published" } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.contactMessage.findMany({
      where: { status: { not: "archived" } },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, name: true, company: true, projectType: true, status: true, createdAt: true },
    }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        featured: true,
        updatedAt: true,
        caseStudy: true,
        en: true,
        _count: { select: { images: true } },
      },
    }),
  ]);

  const byStatus = Object.fromEntries(statusCounts.map((row) => [row.status, row._count._all]));

  return {
    counts: {
      published: byStatus.published ?? 0,
      draft: byStatus.draft ?? 0,
      archived: byStatus.archived ?? 0,
      featured,
      unread,
    },
    recentMessages,
    recentProjects: projects.slice(0, 5),
    attention: attentionPoints(projects),
  };
}
