import { prisma } from "../prisma";

export async function getAllMedia() {
  return prisma.media.findMany({ orderBy: { createdAt: "desc" } });
}

/** Project screenshots, managed from each project but listed in the media library. */
export async function getProjectImages() {
  return prisma.projectImage.findMany({
    orderBy: [{ project: { order: "asc" } }, { order: "asc" }],
    select: { id: true, url: true, alt: true, order: true, project: { select: { id: true, title: true } } },
  });
}
