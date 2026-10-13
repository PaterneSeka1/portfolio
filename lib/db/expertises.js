import { prisma } from "../prisma";
import { localizeAll } from "../i18n/localize";

export async function getExpertises(locale) {
  const expertises = await prisma.expertise.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return locale ? localizeAll(expertises, locale) : expertises;
}

export async function getAllExpertises() {
  return prisma.expertise.findMany({ orderBy: { order: "asc" } });
}

export async function getExpertiseById(id) {
  return prisma.expertise.findUnique({ where: { id } });
}
