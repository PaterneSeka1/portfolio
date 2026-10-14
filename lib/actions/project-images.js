"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { saveUploadedFile, deleteUploadedFile, validateFile } from "../storage";

function revalidate(projectId) {
  revalidatePath("/", "layout");
  revalidatePath(`/admin/projets/${projectId}`);
}

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function addProjectImageAction(projectId, prevState, formData) {
  await requireAdmin();

  const file = formData.get("file");
  const error = validateFile(file);
  if (error) return { error, at: Date.now() };
  if (!IMAGE_TYPES.includes(file.type)) {
    return { error: "Format non pris en charge : utilisez une image PNG, JPEG ou WebP.", at: Date.now() };
  }

  const alt = String(formData.get("alt") || "").trim();
  if (alt.length < 5) {
    return {
      error: "Décrivez l'image en quelques mots (texte alternatif) pour l'accessibilité.",
      fieldErrors: { alt: "Le texte alternatif doit contenir au moins 5 caractères." },
      at: Date.now(),
    };
  }

  const count = await prisma.projectImage.count({ where: { projectId } });
  let saved;
  try {
    saved = await saveUploadedFile(file);
  } catch {
    return { error: "Le serveur de stockage n'a pas accepté le fichier. Réessayez dans un instant.", at: Date.now() };
  }
  await prisma.projectImage.create({ data: { projectId, url: saved.url, alt, order: count } });

  revalidate(projectId);
  return { success: true, message: "Capture ajoutée.", at: Date.now() };
}

export async function updateProjectImageAltAction(projectId, imageId, alt) {
  await requireAdmin();
  const value = String(alt ?? "").trim();
  if (value.length < 5) return { error: "Le texte alternatif doit contenir au moins 5 caractères." };
  await prisma.projectImage.update({ where: { id: imageId }, data: { alt: value } });
  revalidate(projectId);
  return { success: true };
}

/** Reorders images; "cover" moves the image to the first position (used as the cover). */
export async function moveProjectImageAction(projectId, imageId, direction) {
  await requireAdmin();
  const images = await prisma.projectImage.findMany({ where: { projectId }, orderBy: { order: "asc" }, select: { id: true } });
  const index = images.findIndex((image) => image.id === imageId);
  if (index < 0) return { error: "Image introuvable." };

  const [moved] = images.splice(index, 1);
  const target = direction === "cover" ? 0 : direction === "up" ? Math.max(0, index - 1) : Math.min(images.length, index + 1);
  images.splice(target, 0, moved);

  await prisma.$transaction(
    images.map((image, order) => prisma.projectImage.update({ where: { id: image.id }, data: { order } }))
  );
  revalidate(projectId);
  return { success: true };
}

export async function deleteProjectImageAction(projectId, imageId) {
  await requireAdmin();
  const image = await prisma.projectImage.delete({ where: { id: imageId } });
  await deleteUploadedFile(image.url);
  revalidate(projectId);
  return { success: true };
}
