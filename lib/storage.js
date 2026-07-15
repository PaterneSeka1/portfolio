import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024;

const STORAGE_API_URL = process.env.STORAGE_API_URL?.replace(/\/$/, "");
const STORAGE_API_TOKEN = process.env.STORAGE_API_TOKEN;

export function validateFile(file) {
  if (!file || file.size === 0) return "Aucun fichier fourni.";
  if (!ALLOWED_TYPES.includes(file.type)) return "Type de fichier non autorisé.";
  if (file.size > MAX_SIZE) return "Fichier trop volumineux (5 Mo maximum).";
  return null;
}

async function saveRemote(file) {
  const body = new FormData();
  body.append("file", file, file.name);

  const res = await fetch(`${STORAGE_API_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${STORAGE_API_TOKEN}` },
    body,
  });

  if (!res.ok) {
    throw new Error(`Échec de l'upload distant (${res.status}).`);
  }

  return res.json();
}

async function saveLocal(file) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return { url: `/uploads/${filename}`, type: file.type, size: file.size };
}

export async function saveUploadedFile(file) {
  if (STORAGE_API_URL && STORAGE_API_TOKEN) {
    return saveRemote(file);
  }
  return saveLocal(file);
}

export async function deleteUploadedFile(url) {
  if (!url) return;

  if (STORAGE_API_URL && STORAGE_API_TOKEN) {
    if (!url.startsWith(STORAGE_API_URL)) return;
    const filename = path.basename(new URL(url).pathname);
    await fetch(`${STORAGE_API_URL}/upload/${filename}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${STORAGE_API_TOKEN}` },
    }).catch(() => {});
    return;
  }

  if (url.startsWith("/uploads/")) {
    await unlink(path.join(process.cwd(), "public", url)).catch(() => {});
  }
}
