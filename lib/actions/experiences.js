"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { experienceSchema } from "../validation/experience";

function parse(formData) {
  return experienceSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    period: formData.get("period"),
    missions: formData.get("missions"),
    order: formData.get("order"),
    published: formData.get("published") === "on",
  });
}

function toData(parsed) {
  return {
    company: parsed.company,
    role: parsed.role,
    period: parsed.period || null,
    missions: parsed.missions.split("\n").map((m) => m.trim()).filter(Boolean),
    order: parsed.order,
    published: parsed.published,
  };
}

export async function createExperienceAction(prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  await prisma.experience.create({ data: toData(parsed.data) });
  revalidatePath("/parcours");
  revalidatePath("/admin/experiences");
  return { success: true };
}

export async function updateExperienceAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  await prisma.experience.update({ where: { id }, data: toData(parsed.data) });
  revalidatePath("/parcours");
  revalidatePath("/admin/experiences");
  return { success: true };
}

export async function deleteExperienceAction(id) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/parcours");
  revalidatePath("/admin/experiences");
}

export async function togglePublishedAction(id, published) {
  await requireAdmin();
  await prisma.experience.update({ where: { id }, data: { published: !published } });
  revalidatePath("/parcours");
  revalidatePath("/admin/experiences");
}
