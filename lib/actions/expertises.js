"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { EXPERTISE_EN_SPEC, readFields } from "../admin/form-fields";
import { expertiseSchema } from "../validation/expertise";

function parse(formData) {
  return expertiseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    technologies: formData.get("technologies"),
    order: formData.get("order"),
    visible: formData.get("visible") === "on",
  });
}

function toData(parsed, formData) {
  return {
    en: readFields(formData, EXPERTISE_EN_SPEC, "en_") ?? Prisma.DbNull,
    title: parsed.title,
    description: parsed.description,
    icon: parsed.icon,
    technologies: parsed.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    order: parsed.order,
    visible: parsed.visible,
  };
}

export async function createExpertiseAction(prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  await prisma.expertise.create({ data: toData(parsed.data, formData) });
  revalidatePath("/", "layout");
  revalidatePath("/admin/expertises");
  return { success: true };
}

export async function updateExpertiseAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  await prisma.expertise.update({ where: { id }, data: toData(parsed.data, formData) });
  revalidatePath("/", "layout");
  revalidatePath("/admin/expertises");
  return { success: true };
}

export async function deleteExpertiseAction(id) {
  await requireAdmin();
  await prisma.expertise.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/expertises");
}

export async function toggleExpertiseVisibleAction(id, visible) {
  await requireAdmin();
  await prisma.expertise.update({ where: { id }, data: { visible: !visible } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/expertises");
}
