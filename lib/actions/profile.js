"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { profileSchema } from "../validation/profile";
import { saveUploadedFile, validateFile } from "../storage";
import { PROFILE_EN_SPEC, readFields } from "../admin/form-fields";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function updateProfileAction(prevState, formData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = profileSchema.safeParse({
    name: raw.name ?? "",
    title: raw.title ?? "",
    tagline: raw.tagline ?? "",
    promise: raw.promise ?? "",
    location: raw.location ?? "",
    available: raw.available === "on",
    availabilityLabel: raw.availabilityLabel ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    whatsapp: raw.whatsapp ?? "",
    github: raw.github ?? "",
    linkedin: raw.linkedin ?? "",
  });

  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0]])
    );
    return { error: "Certains champs sont à corriger avant d'enregistrer.", fieldErrors, at: Date.now() };
  }

  const data = {
    ...parsed.data,
    tagline: parsed.data.tagline || null,
    phone: parsed.data.phone || null,
    whatsapp: parsed.data.whatsapp || null,
    github: parsed.data.github || null,
    linkedin: parsed.data.linkedin || null,
  };
  const en = readFields(formData, PROFILE_EN_SPEC, "en_");
  if (en) data.en = en;

  const photo = formData.get("heroPhotoFile");
  if (photo && photo.size > 0) {
    const error = validateFile(photo) ?? (IMAGE_TYPES.includes(photo.type) ? null : "La photo doit être au format PNG, JPEG ou WebP.");
    if (error) return { error, fieldErrors: { heroPhotoFile: error }, at: Date.now() };
    data.heroPhoto = (await saveUploadedFile(photo)).url;
  }

  const cv = formData.get("cvFile");
  if (cv && cv.size > 0) {
    const error = validateFile(cv) ?? (cv.type === "application/pdf" ? null : "Le CV doit être un fichier PDF.");
    if (error) return { error, fieldErrors: { cvFile: error }, at: Date.now() };
    data.cvUrl = (await saveUploadedFile(cv)).url;
  }

  await prisma.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", ...data },
  });

  revalidatePath("/", "layout");
  return { success: true, message: "Profil mis à jour sur le site.", at: Date.now() };
}
