import { prisma } from "../prisma";

export async function getAllMessages() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getMessageById(id) {
  return prisma.contactMessage.findUnique({ where: { id } });
}

export async function countUnreadMessages() {
  return prisma.contactMessage.count({ where: { status: "new" } });
}
