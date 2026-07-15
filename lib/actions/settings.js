"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { saveUploadedFile, validateFile } from "../storage";

export async function updateSettingsAction(prevState, formData) {
  await requireAdmin();

  const data = {
    seoTitle: String(formData.get("seoTitle") || "") || null,
    seoDescription: String(formData.get("seoDescription") || "") || null,
    contactEmail: String(formData.get("contactEmail") || "") || null,
    contactPhone: String(formData.get("contactPhone") || "") || null,
    smtpHost: String(formData.get("smtpHost") || "") || null,
    smtpUser: String(formData.get("smtpUser") || "") || null,
    analyticsId: String(formData.get("analyticsId") || "") || null,
    domain: String(formData.get("domain") || "") || null,
    maintenanceMode: formData.get("maintenanceMode") === "on",
  };

  const ogImageFile = formData.get("ogImageFile");
  if (ogImageFile && ogImageFile.size > 0) {
    const error = validateFile(ogImageFile);
    if (error) return { error };
    data.ogImage = (await saveUploadedFile(ogImageFile)).url;
  }

  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: data,
    create: { id: "site", ...data },
  });

  revalidatePath("/", "layout");
  return { success: true };
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
  if (!file || file.size === 0) return { error: "Aucun fichier fourni." };

  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    return { error: "Fichier JSON invalide." };
  }

  if (typeof payload !== "object" || payload === null) {
    return { error: "Format de fichier inattendu." };
  }

  await prisma.$transaction(async (tx) => {
    if (payload.profile) {
      const rest = omit(payload.profile, ["id"]);
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
        await tx.expertise.create({ data: omit(item, ["id"]) });
      }
    }
    if (Array.isArray(payload.skills)) {
      await tx.skill.deleteMany();
      for (const item of payload.skills) {
        await tx.skill.create({ data: omit(item, ["id"]) });
      }
    }
    if (Array.isArray(payload.experiences)) {
      await tx.experience.deleteMany();
      for (const item of payload.experiences) {
        await tx.experience.create({ data: omit(item, ["id"]) });
      }
    }
    if (Array.isArray(payload.projects)) {
      await tx.projectImage.deleteMany();
      await tx.project.deleteMany();
      for (const item of payload.projects) {
        const images = item.images ?? [];
        await tx.project.create({
          data: {
            ...omit(item, ["id", "images", "createdAt", "updatedAt"]),
            images: {
              create: images.map((image) => omit(image, ["id", "projectId"])),
            },
          },
        });
      }
    }
  });

  revalidatePath("/", "layout");
  return { success: true };
}
