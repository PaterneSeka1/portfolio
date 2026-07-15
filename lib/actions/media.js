"use server";

import { unlink } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { saveUploadedFile, validateFile } from "../storage";

export async function uploadMediaAction(prevState, formData) {
  await requireAdmin();

  const file = formData.get("file");
  const error = validateFile(file);
  if (error) return { error };

  const alt = String(formData.get("alt") || "");
  const saved = await saveUploadedFile(file);

  await prisma.media.create({
    data: { url: saved.url, alt, type: saved.type, size: saved.size },
  });

  revalidatePath("/admin/medias");
  return { success: true };
}

export async function deleteMediaAction(id) {
  await requireAdmin();
  const media = await prisma.media.delete({ where: { id } });

  if (media.url.startsWith("/uploads/")) {
    await unlink(path.join(process.cwd(), "public", media.url)).catch(() => {});
  }

  revalidatePath("/admin/medias");
}
