import { prisma } from "../prisma";

export async function getExpertises() {
  return prisma.expertise.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllExpertises() {
  return prisma.expertise.findMany({ orderBy: { order: "asc" } });
}

export async function getExpertiseById(id) {
  return prisma.expertise.findUnique({ where: { id } });
}
