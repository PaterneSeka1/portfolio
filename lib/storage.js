import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024;

export function validateFile(file) {
  if (!file || file.size === 0) return "Aucun fichier fourni.";
  if (!ALLOWED_TYPES.includes(file.type)) return "Type de fichier non autorisé.";
  if (file.size > MAX_SIZE) return "Fichier trop volumineux (5 Mo maximum).";
  return null;
}

export async function saveUploadedFile(file) {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return { url: `/uploads/${filename}`, type: file.type, size: file.size };
}
