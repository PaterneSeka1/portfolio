import { prisma } from "../prisma";
import { localize } from "../i18n/localize";

function toProjectView(project, locale) {
  if (!project) return null;
  const localized = locale ? localize(project, locale) : project;
  const { ctaLabel, ctaHref, images, ...rest } = localized;
  return {
    ...rest,
    caseStudy: rest.caseStudy ?? {},
    cta: { label: ctaLabel, href: ctaHref },
    images,
  };
}

const publicInclude = { images: { orderBy: { order: "asc" } } };

const PUBLIC = { status: "published" };

export async function getProjects(locale) {
  const projects = await prisma.project.findMany({
    where: PUBLIC,
    orderBy: { order: "asc" },
    include: publicInclude,
  });
  return projects.map((project) => toProjectView(project, locale));
}

/** Public lookup; `preview: true` (admin only) also returns drafts and archived projects. */
export async function getProjectBySlug(slug, locale, { preview = false } = {}) {
  const project = await prisma.project.findFirst({
    where: preview ? { slug } : { slug, ...PUBLIC },
    include: publicInclude,
  });
  return toProjectView(project, locale);
}

export async function getAllProjectSlugs() {
  const projects = await prisma.project.findMany({
    where: PUBLIC,
    select: { slug: true, updatedAt: true },
  });
  return projects;
}

export async function getAllProjectsAdmin() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      visibility: true,
      status: true,
      featured: true,
      order: true,
      updatedAt: true,
      caseStudy: true,
      en: true,
      _count: { select: { images: true } },
    },
  });
}

export async function getProjectAdmin(id) {
  return prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
}
