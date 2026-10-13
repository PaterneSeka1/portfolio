"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { saveUploadedFile, deleteUploadedFile, validateFile } from "../storage";

export async function uploadMediaAction(prevState, formData) {
  await requireAdmin();

  const file = formData.get("file");
  const error = validateFile(file);
  if (error) return { error, at: Date.now() };

  const alt = String(formData.get("alt") || "").trim();
  if (file.type.startsWith("image/") && alt.length < 5) {
    return { error: "Ajoutez un texte alternatif d'au moins 5 caractères pour cette image.", at: Date.now() };
  }

  const saved = await saveUploadedFile(file);
  await prisma.media.create({ data: { url: saved.url, alt, type: saved.type, size: saved.size } });

  revalidatePath("/admin/medias");
  return { success: true, message: "Fichier ajouté à la médiathèque.", at: Date.now() };
}

export async function updateMediaAltAction(id, alt) {
  await requireAdmin();
  const value = String(alt ?? "").trim();
  await prisma.media.update({ where: { id }, data: { alt: value || null } });
  revalidatePath("/admin/medias");
  return { success: true };
}

export async function deleteMediaAction(id) {
  await requireAdmin();
  const media = await prisma.media.delete({ where: { id } });
  await deleteUploadedFile(media.url);
  revalidatePath("/admin/medias");
  return { success: true };
}
