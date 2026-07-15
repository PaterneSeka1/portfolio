"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { profileSchema } from "../validation/profile";
import { saveUploadedFile, validateFile } from "../storage";

export async function updateProfileAction(prevState, formData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = profileSchema.safeParse({
    ...raw,
    available: raw.available === "on",
  });

  if (!parsed.success) {
    return { error: "Merci de corriger les champs invalides." };
  }

  const data = { ...parsed.data };

  const photo = formData.get("heroPhotoFile");
  if (photo && photo.size > 0) {
    const error = validateFile(photo);
    if (error) return { error };
    data.heroPhoto = (await saveUploadedFile(photo)).url;
  }

  const cv = formData.get("cvFile");
  if (cv && cv.size > 0) {
    const error = validateFile(cv);
    if (error) return { error };
    data.cvUrl = (await saveUploadedFile(cv)).url;
  }

  await prisma.profile.upsert({
    where: { id: "profile" },
    update: data,
    create: { id: "profile", ...data },
  });

  revalidatePath("/", "layout");
  return { success: true };
}
