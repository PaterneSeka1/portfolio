"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { expertiseSchema } from "../validation/expertise";
import { EXPERTISE_EN_SPEC, csv, readFields } from "../admin/form-fields";
import { moveInOrder, nextOrder } from "../db/reorder";

function revalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/expertises");
}

export async function saveExpertiseAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = expertiseSchema.safeParse({
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    icon: formData.get("icon"),
    technologies: formData.get("technologies") ?? "",
    visible: formData.get("visible") === "on",
  });
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0]])
    );
    return { error: "Certains champs sont à corriger.", fieldErrors, at: Date.now() };
  }

  const data = {
    ...parsed.data,
    technologies: csv(parsed.data.technologies),
    en: readFields(formData, EXPERTISE_EN_SPEC, "en_") ?? Prisma.DbNull,
  };
  if (id) await prisma.expertise.update({ where: { id }, data });
  else await prisma.expertise.create({ data: { ...data, order: await nextOrder("expertise") } });

  revalidate();
  return { success: true, message: id ? "Expertise mise à jour." : "Expertise ajoutée.", at: Date.now() };
}

export async function moveExpertiseAction(id, direction) {
  await requireAdmin();
  await moveInOrder("expertise", id, direction);
  revalidate();
  return { success: true };
}

export async function toggleExpertiseVisibleAction(id) {
  await requireAdmin();
  const item = await prisma.expertise.findUnique({ where: { id }, select: { visible: true } });
  if (!item) return { error: "Expertise introuvable." };
  await prisma.expertise.update({ where: { id }, data: { visible: !item.visible } });
  revalidate();
  return { success: true };
}

export async function deleteExpertiseAction(id) {
  await requireAdmin();
  await prisma.expertise.delete({ where: { id } });
  revalidate();
  return { success: true };
}
