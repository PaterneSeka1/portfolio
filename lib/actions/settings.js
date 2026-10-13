"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";

// Prisma rejects a plain null for optional JSON columns.
const jsonNulls = (data, keys) =>
  Object.fromEntries(Object.entries(data).map(([k, v]) => [k, keys.includes(k) && v === null ? Prisma.DbNull : v]));

/** French SEO texts of the home page (English ones come from the site dictionary). */
export async function updateSeoAction(prevState, formData) {
  await requireAdmin();
  const seoTitle = String(formData.get("seoTitle") ?? "").trim();
  const seoDescription = String(formData.get("seoDescription") ?? "").trim();
  const fieldErrors = {};
  if (seoTitle.length > 70)
    fieldErrors.seoTitle = "Le titre doit tenir en 70 caractères pour ne pas être coupé dans Google.";
  if (seoDescription.length > 170) fieldErrors.seoDescription = "La description doit tenir en 170 caractères.";
  if (seoDescription && seoDescription.length < 50)
    fieldErrors.seoDescription = "Une description utile fait au moins 50 caractères.";
  if (Object.keys(fieldErrors).length)
    return { error: "Certains champs sont à corriger.", fieldErrors, at: Date.now() };

  const data = { seoTitle: seoTitle || null, seoDescription: seoDescription || null };
  await prisma.siteSettings.upsert({ where: { id: "site" }, update: data, create: { id: "site", ...data } });
  revalidatePath("/", "layout");
  return { success: true, message: "Référencement mis à jour.", at: Date.now() };
}

export async function exportDataAction() {
  await requireAdmin();

  const [profile, brand, settings, expertises, skills, experiences, projects] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "profile" } }),
    prisma.brandSettings.findUnique({ where: { id: "brand" } }),
    prisma.siteSettings.findUnique({ where: { id: "site" } }),
    prisma.expertise.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" }, include: { images: true } }),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    profile,
    brand,
    settings,
    expertises,
    skills,
    experiences,
    projects,
  };
}

function omit(obj, keys) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
}

export async function importDataAction(prevState, formData) {
  await requireAdmin();

  const file = formData.get("file");
  if (!file || file.size === 0) return { error: "Choisissez un fichier d'export (.json).", at: Date.now() };

  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    return { error: "Ce fichier n'est pas un JSON valide.", at: Date.now() };
  }

  if (typeof payload !== "object" || payload === null) {
    return { error: "Ce fichier ne ressemble pas à un export du portfolio.", at: Date.now() };
  }

  if (!["profile", "projects", "experiences", "expertises", "skills"].some((key) => key in payload)) {
    return { error: "Ce fichier ne ressemble pas à un export du portfolio.", at: Date.now() };
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (payload.profile) {
        const rest = jsonNulls(omit(payload.profile, ["id"]), ["en"]);
        await tx.profile.upsert({ where: { id: "profile" }, update: rest, create: { id: "profile", ...rest } });
      }
      if (payload.brand) {
        const rest = omit(payload.brand, ["id"]);
        await tx.brandSettings.upsert({ where: { id: "brand" }, update: rest, create: { id: "brand", ...rest } });
      }
      if (payload.settings) {
        const rest = omit(payload.settings, ["id"]);
        await tx.siteSettings.upsert({ where: { id: "site" }, update: rest, create: { id: "site", ...rest } });
      }
      if (Array.isArray(payload.expertises)) {
        await tx.expertise.deleteMany();
        for (const item of payload.expertises) {
          await tx.expertise.create({ data: jsonNulls(omit(item, ["id"]), ["en"]) });
        }
      }
      if (Array.isArray(payload.skills)) {
        await tx.skill.deleteMany();
        for (const item of payload.skills) {
          await tx.skill.create({ data: jsonNulls(omit(item, ["id"]), ["en"]) });
        }
      }
      if (Array.isArray(payload.experiences)) {
        await tx.experience.deleteMany();
        for (const item of payload.experiences) {
          await tx.experience.create({ data: jsonNulls(omit(item, ["id"]), ["en"]) });
        }
      }
      if (Array.isArray(payload.projects)) {
        await tx.projectImage.deleteMany();
        await tx.project.deleteMany();
        for (const item of payload.projects) {
          const images = item.images ?? [];
          // Exports made before the status field used a published flag.
          if (item.status === undefined && "published" in item) {
            item.status = item.published ? "published" : "draft";
          }
          delete item.published;
          await tx.project.create({
            data: {
              ...jsonNulls(omit(item, ["id", "images", "createdAt", "updatedAt"]), ["en", "caseStudy"]),
              images: {
                create: images.map((image) => omit(image, ["id", "projectId"])),
              },
            },
          });
        }
      }
    });
  } catch (error) {
    console.error("Import failed:", error);
    return {
      error: "L'import a échoué : aucune donnée n'a été modifiée. Vérifiez que le fichier provient de cet export.",
      at: Date.now(),
    };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Import terminé : le contenu a été remplacé.", at: Date.now() };
}
