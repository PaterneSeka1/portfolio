"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";
import { saveUploadedFile, validateFile } from "../storage";

export async function updateBrandAction(prevState, formData) {
  await requireAdmin();

  const data = {
    colorNavy: String(formData.get("colorNavy") || "#0D1B2A"),
    colorInstitutional: String(formData.get("colorInstitutional") || "#133A7C"),
    colorAccent: String(formData.get("colorAccent") || "#2563EB"),
    colorGrayLight: String(formData.get("colorGrayLight") || "#F1F3F6"),
    fontHeading: String(formData.get("fontHeading") || "Sora"),
    fontBody: String(formData.get("fontBody") || "Inter"),
  };

  for (const [field, key] of [
    ["logoFile", "logoUrl"],
    ["faviconFile", "faviconUrl"],
    ["ogImageFile", "ogImage"],
  ]) {
    const file = formData.get(field);
    if (file && file.size > 0) {
      const error = validateFile(file);
      if (error) return { error };
      data[key] = (await saveUploadedFile(file)).url;
    }
  }

  await prisma.brandSettings.upsert({
    where: { id: "brand" },
    update: data,
    create: { id: "brand", ...data },
  });

  revalidatePath("/", "layout");
  return { success: true };
}
