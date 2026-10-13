"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { SKILL_EN_SPEC, readFields } from "../admin/form-fields";
import { skillSchema } from "../validation/skill";

function parse(formData) {
  return skillSchema.safeParse({
    category: formData.get("category"),
    name: formData.get("name"),
    icon: formData.get("icon"),
    order: formData.get("order"),
    visible: formData.get("visible") === "on",
    learning: formData.get("learning") === "on",
  });
}

function toData(parsed, formData) {
  return {
    en: readFields(formData, SKILL_EN_SPEC, "en_") ?? Prisma.DbNull,
    category: parsed.category,
    name: parsed.name,
    icon: parsed.icon || null,
    order: parsed.order,
    visible: parsed.visible,
    learning: parsed.learning,
  };
}

export async function createSkillAction(prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  await prisma.skill.create({ data: toData(parsed.data, formData) });
  revalidatePath("/", "layout");
  revalidatePath("/admin/competences");
  return { success: true };
}

export async function updateSkillAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  await prisma.skill.update({ where: { id }, data: toData(parsed.data, formData) });
  revalidatePath("/", "layout");
  revalidatePath("/admin/competences");
  return { success: true };
}

export async function deleteSkillAction(id) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/competences");
}

export async function toggleSkillVisibleAction(id, visible) {
  await requireAdmin();
  await prisma.skill.update({ where: { id }, data: { visible: !visible } });
  revalidatePath("/", "layout");
  revalidatePath("/admin/competences");
}
