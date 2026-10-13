"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { projectSchema } from "../validation/project";
import { CASE_STUDY_SPEC, PROJECT_EN_SPEC, csv, readFields } from "../admin/form-fields";

function revalidatePublic() {
  revalidatePath("/", "layout");
}

function parse(formData) {
  const raw = Object.fromEntries(formData.entries());
  return projectSchema.safeParse({
    ...raw,
    featured: raw.featured === "on",
    published: raw.published === "on",
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
    ctaLabel: parsed.ctaLabel,
    ctaHref: parsed.ctaHref,
    featured: parsed.featured,
    order: parsed.order,
    published: parsed.published,
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    caseStudy: readFields(formData, CASE_STUDY_SPEC, "cs_") ?? {},
    en: translation ?? Prisma.DbNull,
  };
}

export async function createProjectAction(prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { error: "Ce slug est déjà utilisé par un autre projet." };

  const project = await prisma.project.create({ data: toData(parsed.data, formData) });
  revalidatePublic();
  revalidatePath("/admin/projets");
  return { success: true, id: project.id };
}

export async function updateProjectAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) return { error: "Ce slug est déjà utilisé par un autre projet." };

  await prisma.project.update({ where: { id }, data: toData(parsed.data, formData) });
  revalidatePublic();
  return { success: true };
}

export async function deleteProjectAction(id) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePublic();
  revalidatePath("/admin/projets");
}

export async function togglePublishedProjectAction(id, published) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { published: !published } });
  revalidatePublic();
  revalidatePath("/admin/projets");
}

export async function toggleFeaturedProjectAction(id, featured) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { featured: !featured } });
  revalidatePublic();
  revalidatePath("/admin/projets");
}
