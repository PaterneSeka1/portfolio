"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { skillSchema } from "../validation/skill";
import { SKILL_EN_SPEC, readFields } from "../admin/form-fields";
import { nextOrder } from "../db/reorder";

function revalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/competences");
}

export async function saveSkillAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = skillSchema.safeParse({
    name: formData.get("name") ?? "",
    category: formData.get("category") ?? "",
    visible: formData.get("visible") === "on",
    learning: formData.get("learning") === "on",
  });
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0]])
    );
    return { error: "Certains champs sont à corriger.", fieldErrors, at: Date.now() };
  }

  const duplicate = await prisma.skill.findFirst({
    where: { name: { equals: parsed.data.name, mode: "insensitive" }, ...(id ? { NOT: { id } } : {}) },
    select: { id: true },
  });
  if (duplicate) {
    return { error: "Cette technologie existe déjà.", fieldErrors: { name: "Cette technologie existe déjà dans la liste." }, at: Date.now() };
  }

  const data = { ...parsed.data, en: readFields(formData, SKILL_EN_SPEC, "en_") ?? Prisma.DbNull };
  if (id) await prisma.skill.update({ where: { id }, data });
  else await prisma.skill.create({ data: { ...data, order: await nextOrder("skill") } });

  revalidate();
  return { success: true, message: id ? "Technologie mise à jour." : "Technologie ajoutée.", at: Date.now() };
}

export async function moveSkillAction(id, direction) {
  await requireAdmin();
  const skill = await prisma.skill.findUnique({ where: { id }, select: { category: true } });
  if (!skill) return { error: "Technologie introuvable." };
  // Global order is kept; moving swaps with the neighbour of the same category.
  const items = await prisma.skill.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }], select: { id: true, category: true } });
  const sameCategory = items.filter((item) => item.category === skill.category);
  const index = sameCategory.findIndex((item) => item.id === id);
  const neighbour = sameCategory[direction === "up" ? index - 1 : index + 1];
  if (!neighbour) return { success: true };
  const a = items.findIndex((item) => item.id === id);
  const b = items.findIndex((item) => item.id === neighbour.id);
  [items[a], items[b]] = [items[b], items[a]];
  await prisma.$transaction(items.map((item, order) => prisma.skill.update({ where: { id: item.id }, data: { order } })));
  revalidate();
  return { success: true };
}

export async function toggleSkillAction(id, field) {
  await requireAdmin();
  if (!["visible", "learning"].includes(field)) return { error: "Action inconnue." };
  const skill = await prisma.skill.findUnique({ where: { id }, select: { [field]: true } });
  if (!skill) return { error: "Technologie introuvable." };
  await prisma.skill.update({ where: { id }, data: { [field]: !skill[field] } });
  revalidate();
  return { success: true };
}

export async function deleteSkillAction(id) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidate();
  return { success: true };
}

