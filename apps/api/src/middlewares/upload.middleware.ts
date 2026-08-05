import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import type { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan!'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, 
  },
});

export const convertToWebp = (subFolder: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const targetDir = path.join(__dirname, '../../uploads', subFolder);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(targetDir, filename);

    try {
      await sharp(req.file.buffer)
        .webp({ quality: 80 }) 
        .toFile(outputPath);

      req.file.filename = filename;
      req.file.path = `/uploads/${subFolder}/${filename}`;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Gagal mengompresi gambar ke WebP', error });
    }
  };
};