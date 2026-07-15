"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { projectSchema } from "../validation/project";

const lines = (value) => (value ? value.split("\n").map((v) => v.trim()).filter(Boolean) : []);
const csv = (value) => (value ? value.split(",").map((v) => v.trim()).filter(Boolean) : []);

function parse(formData) {
  return projectSchema.safeParse(Object.fromEntries(formData.entries()));
}

function toData(parsed) {
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
    caseStudy: {
      context: parsed.context || "",
      problem: parsed.problem || "",
      objectives: lines(parsed.objectives),
      users: lines(parsed.users),
      features: lines(parsed.features),
      architecture: parsed.architecture || "",
      stack: csv(parsed.stack),
      challenges: lines(parsed.challenges),
      solutions: lines(parsed.solutions),
      results: lines(parsed.results),
    },
  };
}

export async function createProjectAction(prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { error: "Ce slug est déjà utilisé par un autre projet." };

  const project = await prisma.project.create({ data: toData(parsed.data) });
  revalidatePath("/projets");
  redirect(`/admin/projets/${project.id}`);
}

export async function updateProjectAction(id, prevState, formData) {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { error: "Merci de corriger les champs invalides." };

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) return { error: "Ce slug est déjà utilisé par un autre projet." };

  await prisma.project.update({ where: { id }, data: toData(parsed.data) });
  revalidatePath("/projets");
  revalidatePath(`/projets/${parsed.data.slug}`);
  return { success: true };
}

export async function deleteProjectAction(id) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projets");
  revalidatePath("/admin/projets");
}

export async function togglePublishedProjectAction(id, published) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { published: !published } });
  revalidatePath("/projets");
  revalidatePath("/admin/projets");
}

export async function toggleFeaturedProjectAction(id, featured) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { featured: !featured } });
  revalidatePath("/projets");
  revalidatePath("/admin/projets");
}
