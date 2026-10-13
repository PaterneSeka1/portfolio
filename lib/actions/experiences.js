"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { EXPERIENCE_EN_SPEC, csv, lines, readFields } from "../admin/form-fields";
import { experienceSchema } from "../validation/experience";
import { moveInOrder, nextOrder } from "../db/reorder";

function revalidate() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/experiences");
}

const toDate = (value) => (value ? new Date(`${value}-01T00:00:00.000Z`) : null);

export async function saveExperienceAction(id, prevState, formData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = experienceSchema.safeParse({
    company: raw.company ?? "",
    role: raw.role ?? "",
    location: raw.location ?? "",
    startDate: raw.startDate ?? "",
    endDate: raw.current === "on" ? "" : (raw.endDate ?? ""),
    current: raw.current === "on",
    period: raw.period ?? "",
    description: raw.description ?? "",
    missions: raw.missions ?? "",
    technologies: raw.technologies ?? "",
    published: raw.published === "on",
  });

  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0]])
    );
    return { error: "Certains champs sont à corriger.", fieldErrors, at: Date.now() };
  }

  const d = parsed.data;
  const data = {
    company: d.company,
    role: d.role,
    location: d.location || null,
    startDate: toDate(d.startDate),
    endDate: d.current ? null : toDate(d.endDate),
    current: d.current,
    period: d.period || null,
    description: d.description || null,
    missions: lines(d.missions),
    technologies: csv(d.technologies),
    published: d.published,
    en: readFields(formData, EXPERIENCE_EN_SPEC, "en_") ?? Prisma.DbNull,
  };

  if (id) await prisma.experience.update({ where: { id }, data });
  else await prisma.experience.create({ data: { ...data, order: await nextOrder("experience") } });

  revalidate();
  return { success: true, message: id ? "Expérience mise à jour." : "Expérience ajoutée.", at: Date.now() };
}

export async function moveExperienceAction(id, direction) {
  await requireAdmin();
  await moveInOrder("experience", id, direction);
  revalidate();
  return { success: true };
}

export async function toggleExperiencePublishedAction(id) {
  await requireAdmin();
  const experience = await prisma.experience.findUnique({ where: { id }, select: { published: true } });
  if (!experience) return { error: "Expérience introuvable." };
  await prisma.experience.update({ where: { id }, data: { published: !experience.published } });
  revalidate();
  return { success: true, message: experience.published ? "Expérience masquée du site." : "Expérience affichée sur le site." };
}

export async function deleteExperienceAction(id) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidate();
  return { success: true };
}
