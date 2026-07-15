import { prisma } from "../prisma";

export async function getDashboardStats() {
  const [projectsTotal, projectsPublished, messagesNew, recentProjects] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.contactMessage.count({ where: { status: "new" } }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, updatedAt: true, published: true },
    }),
  ]);

  return { projectsTotal, projectsPublished, messagesNew, recentProjects };
}
