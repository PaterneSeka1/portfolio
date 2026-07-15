import { prisma } from "../prisma";

export async function getSkillsGroupedByCategory() {
  const skills = await prisma.skill.findMany({
    where: { visible: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const groups = new Map();
  for (const skill of skills) {
    if (!groups.has(skill.category)) groups.set(skill.category, []);
    groups.get(skill.category).push(skill);
  }
  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }));
}

export async function getAllSkills() {
  return prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
}

export async function getSkillById(id) {
  return prisma.skill.findUnique({ where: { id } });
}
