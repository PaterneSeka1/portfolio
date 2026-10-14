"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { projectSchema } from "../validation/project";
import { CASE_STUDY_SPEC, PROJECT_EN_SPEC, csv, readFields } from "../admin/form-fields";
import { deleteUploadedFile } from "../storage";

const STATUSES = ["draft", "published", "archived"];
const STATUS_MESSAGES = {
  draft: "Réalisation repassée en brouillon.",
  published: "Réalisation publiée.",
  archived: "Réalisation archivée : elle n'apparaît plus sur le site.",
};

function revalidateAll(id) {
  revalidatePath("/", "layout");
  revalidatePath("/admin/projets");
  if (id) revalidatePath(`/admin/projets/${id}`);
}

function parse(formData) {
  const raw = Object.fromEntries(formData.entries());
  return projectSchema.safeParse({
    title: raw.title ?? "",
    slug: raw.slug ?? "",
    category: raw.category,
    visibility: raw.visibility,
    summary: raw.summary ?? "",
    technologies: raw.technologies ?? "",
    publicUrl: raw.publicUrl ?? "",
    githubUrl: raw.githubUrl ?? "",
    ctaLabel: raw.ctaLabel ?? "",
    ctaHref: raw.ctaHref ?? "",
    featured: raw.featured === "on",
    order: raw.order === "" || raw.order === undefined ? 0 : raw.order,
    seoTitle: raw.seoTitle ?? "",
    seoDescription: raw.seoDescription ?? "",
  });
}

function toData(parsed, formData) {
  const caseStudyEn = readFields(formData, CASE_STUDY_SPEC, "en_cs_");
  const en = readFields(formData, PROJECT_EN_SPEC, "en_");
  const translation = en || caseStudyEn ? { ...(en ?? {}), ...(caseStudyEn ? { caseStudy: caseStudyEn } : {}) } : null;

  return {
    title: parsed.title,
    slug: parsed.slug,
    category: parsed.category,
    visibility: parsed.visibility,
    summary: parsed.summary,
    technologies: csv(parsed.technologies),
    publicUrl: parsed.publicUrl || null,
    githubUrl: parsed.githubUrl || null,
    ctaLabel: parsed.ctaLabel || "Discutons-en",
    ctaHref: parsed.ctaHref || `/contact?project=${parsed.slug}`,
    featured: parsed.featured,
    order: parsed.order,
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    caseStudy: readFields(formData, CASE_STUDY_SPEC, "cs_") ?? {},
    en: translation ?? Prisma.DbNull,
  };
}

/**
 * Creates or updates a project from the editor.
 * intent: "draft" (save as draft), "publish", "save" (keep status) or "preview" (save, then open preview).
 */
export async function saveProjectAction(id, prevState, formData) {
  await requireAdmin();
  const intent = String(formData.get("intent") || "save");
  const parsed = parse(formData);

  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0]])
    );
    return { error: "Certains champs sont à corriger avant d'enregistrer.", fieldErrors, at: Date.now() };
  }

  const clash = await prisma.project.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } });
  if (clash && clash.id !== id) {
    return {
      error: "Ce slug est déjà utilisé.",
      fieldErrors: { slug: "Ce slug est déjà utilisé par une autre réalisation : choisissez-en un autre." },
      at: Date.now(),
    };
  }

  const data = toData(parsed.data, formData);
  if (intent === "publish") data.status = "published";
  if (intent === "draft") data.status = "draft";

  let saved;
  if (id) {
    saved = await prisma.project.update({ where: { id }, data, select: { id: true, slug: true, status: true } });
  } else {
    const last = await prisma.project.aggregate({ _max: { order: true } });
    saved = await prisma.project.create({
      data: { ...data, status: data.status ?? "draft", order: data.order || (last._max.order ?? -1) + 1 },
      select: { id: true, slug: true, status: true },
    });
  }

  revalidateAll(saved.id);

  if (!id) {
    redirect(`/admin/projets/${saved.id}?created=${intent === "preview" ? "preview" : "1"}`);
  }

  const message =
    intent === "publish" ? "Réalisation publiée." : intent === "draft" ? "Brouillon enregistré." : "Modifications enregistrées.";
  return {
    success: true,
    message,
    intent,
    status: saved.status,
    previewUrl: `/work/${saved.slug}?preview=1`,
    at: Date.now(),
  };
}

export async function setProjectStatusAction(id, status) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { error: "Statut inconnu." };
  await prisma.project.update({ where: { id }, data: { status } });
  revalidateAll(id);
  return { success: true, message: STATUS_MESSAGES[status] };
}

export async function toggleFeaturedProjectAction(id) {
  await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id }, select: { featured: true } });
  if (!project) return { error: "Réalisation introuvable." };
  await prisma.project.update({ where: { id }, data: { featured: !project.featured } });
  revalidateAll(id);
  return { success: true, featured: !project.featured };
}

/** Moves a project one step up or down in the display order. */
export async function moveProjectAction(id, direction) {
  await requireAdmin();
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  const index = projects.findIndex((project) => project.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= projects.length) return { success: true };

  [projects[index], projects[target]] = [projects[target], projects[index]];
  await prisma.$transaction(
    projects.map((project, order) => prisma.project.update({ where: { id: project.id }, data: { order } }))
  );
  revalidateAll();
  return { success: true };
}

export async function deleteProjectAction(id) {
  await requireAdmin();
  const project = await prisma.project.delete({ where: { id }, include: { images: true } });
  await Promise.allSettled(project.images.map((image) => deleteUploadedFile(image.url)));
  revalidateAll();
  return { success: true };
}
