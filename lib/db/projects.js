import { prisma } from "../prisma";

function toProjectView(project) {
  if (!project) return null;
  const { ctaLabel, ctaHref, images, ...rest } = project;
  return {
    ...rest,
    cta: { label: ctaLabel, href: ctaHref },
    images,
  };
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return projects.map(toProjectView);
}

export async function getProjectBySlug(slug) {
  const project = await prisma.project.findFirst({
    where: { slug, published: true },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return toProjectView(project);
}

export async function getAllProjectSlugs() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return projects.map((p) => p.slug);
}

export async function getAllProjectsAdmin() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return projects.map(toProjectView);
}
