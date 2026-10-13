import { prisma } from "../prisma";
import { localizeAll } from "../i18n/localize";

export async function getExperiences(locale) {
  const experiences = await prisma.experience.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return locale ? localizeAll(experiences, locale) : experiences;
}

export async function getAllExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getExperienceById(id) {
  return prisma.experience.findUnique({ where: { id } });
}
