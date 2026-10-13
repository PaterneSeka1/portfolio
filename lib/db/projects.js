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

export async function getProjects(locale) {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: publicInclude,
  });
  return projects.map((project) => toProjectView(project, locale));
}

export async function getProjectBySlug(slug, locale) {
  const project = await prisma.project.findFirst({
    where: { slug, published: true },
    include: publicInclude,
  });
  return toProjectView(project, locale);
}

export async function getAllProjectSlugs() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  return projects;
}

export async function getAllProjectsAdmin() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: publicInclude,
  });
  return projects.map((project) => toProjectView(project));
}
