"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/current-user";
import { prisma } from "../prisma";

const STATUSES = ["new", "read", "archived"];
const MESSAGES = {
  new: "Message marqué comme non lu.",
  read: "Message marqué comme lu.",
  archived: "Message archivé.",
};

function revalidate(id) {
  revalidatePath("/admin", "layout");
  if (id) revalidatePath(`/admin/messages/${id}`);
}

export async function setMessageStatusAction(id, status) {
  await requireAdmin();
  if (!STATUSES.includes(status)) return { error: "Statut inconnu." };
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidate(id);
  return { success: true, message: MESSAGES[status] };
}

export async function deleteMessageAction(id) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidate();
  return { success: true };
}
