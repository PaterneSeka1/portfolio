import { prisma } from "../prisma";

export async function getExperiences() {
  return prisma.experience.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getExperienceById(id) {
  return prisma.experience.findUnique({ where: { id } });
}
