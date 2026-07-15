"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { saveUploadedFile, deleteUploadedFile, validateFile } from "../storage";

export async function addProjectImageAction(projectId, prevState, formData) {
  await requireAdmin();

  const file = formData.get("file");
  const error = validateFile(file);
  if (error) return { error };

  const alt = String(formData.get("alt") || "");
  const count = await prisma.projectImage.count({ where: { projectId } });
  const saved = await saveUploadedFile(file);

  await prisma.projectImage.create({
    data: { projectId, url: saved.url, alt, order: count },
  });

  const project = await prisma.project.findUnique({ where: { id: projectId }, select: { slug: true } });
  if (project) revalidatePath(`/projets/${project.slug}`);
  revalidatePath(`/admin/projets/${projectId}`);

  return { success: true };
}

export async function deleteProjectImageAction(projectId, imageId) {
  await requireAdmin();
  const image = await prisma.projectImage.delete({ where: { id: imageId } });
  await deleteUploadedFile(image.url);

  const project = await prisma.project.findUnique({ where: { id: projectId }, select: { slug: true } });
  if (project) revalidatePath(`/projets/${project.slug}`);
  revalidatePath(`/admin/projets/${projectId}`);
}
