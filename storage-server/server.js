import express from "express";
import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 8787;
const STORAGE_TOKEN = process.env.STORAGE_TOKEN;
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || "").replace(/\/$/, "");

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
const MAX_SIZE = 5 * 1024 * 1024;

if (!STORAGE_TOKEN) {
  console.error("STORAGE_TOKEN n'est pas défini — le service refusera toutes les écritures.");
}

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();

function requireToken(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!STORAGE_TOKEN || token !== STORAGE_TOKEN) {
    return res.status(401).json({ error: "Non autorisé." });
  }
  next();
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error("Type de fichier non autorisé."));
    }
    cb(null, true);
  },
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/upload", requireToken, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "Aucun fichier fourni." });

    const ext = path.extname(req.file.originalname) || "";
    const filename = `${crypto.randomUUID()}${ext}`;
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), req.file.buffer);

    res.json({
      url: `${PUBLIC_BASE_URL}/uploads/${filename}`,
      filename,
      type: req.file.mimetype,
      size: req.file.size,
    });
  });
});

app.delete("/upload/:filename", requireToken, (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(UPLOAD_DIR, filename);
  fs.rm(filePath, { force: true }, (err) => {
    if (err) return res.status(500).json({ error: "Suppression impossible." });
    res.json({ success: true });
  });
});

app.use(
  "/uploads",
  express.static(UPLOAD_DIR, { maxAge: "30d", immutable: true })
);

app.listen(PORT, () => {
  console.log(`Storage server listening on port ${PORT}`);
});
