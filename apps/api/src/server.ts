import express from "express";
import type { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import trackRecordRoutes from "./routes/track-record.route.js";
import blogRoutes from "./routes/blog.route.js";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/track-records", trackRecordRoutes);
app.use("/api/blogs", blogRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Ukuran file terlalu besar! Maksimal ukuran file adalah 2MB.",
      });
    }
  }

  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }

  next();
});

const PORT = process.env.PORT_EXPRESS || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server backend running on port ${PORT}`);
});