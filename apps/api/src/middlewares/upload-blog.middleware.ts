import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogThumbnailDir = path.join(__dirname, "../../uploads/blogs");
const blogEditorDir = path.join(__dirname, "../../uploads/blogs/editor");

if (!fs.existsSync(blogThumbnailDir)) fs.mkdirSync(blogThumbnailDir, { recursive: true });
if (!fs.existsSync(blogEditorDir)) fs.mkdirSync(blogEditorDir, { recursive: true });

const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, blogThumbnailDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `thumbnail-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const editorStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, blogEditorDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `editor-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diizinkan!"), false);
  }
};

export const uploadBlogThumbnail = multer({ storage: thumbnailStorage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
export const uploadBlogEditor = multer({ storage: editorStorage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });