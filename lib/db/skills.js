import { prisma } from "../prisma";
import { localizeAll } from "../i18n/localize";

/**
 * Visible skills grouped by category. Categories keep the order of their first
 * skill (by `order`), so the admin controls the display order.
 */
export async function getSkillsGroupedByCategory(locale) {
  const skills = await prisma.skill.findMany({
    where: { visible: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  const items = locale ? localizeAll(skills, locale) : skills;

  const groups = new Map();
  for (const skill of items) {
    if (!groups.has(skill.category)) groups.set(skill.category, []);
    groups.get(skill.category).push(skill);
  }
  return Array.from(groups.entries()).map(([category, groupItems]) => ({
    category,
    items: groupItems,
    learning: groupItems.length > 0 && groupItems.every((skill) => skill.learning),
  }));
}

export async function getAllSkills() {
  return prisma.skill.findMany({ orderBy: [{ order: "asc" }, { category: "asc" }] });
}

export async function getSkillById(id) {
  return prisma.skill.findUnique({ where: { id } });
}
