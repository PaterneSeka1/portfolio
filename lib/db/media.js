import { prisma } from "../prisma";

export async function getAllMedia() {
  return prisma.media.findMany({ orderBy: { createdAt: "desc" } });
}
