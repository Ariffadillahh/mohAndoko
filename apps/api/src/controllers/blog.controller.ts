import type { Request, Response } from "express";
import { BlogService } from "../services/blog.service.js";

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.blogService.getAllBlogs(req.query);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.blogService.getBlogById(
        req.params.id as string,
      );
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.blogService.getBlogBySlug(
        req.params.slug as string,
      );
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      const authorId = user?.id || user?.userId || req.body.authorId;

      if (!authorId) {
        res
          .status(401)
          .json({
            success: false,
            message: "Sesi login tidak valid (authorId kosong).",
          });
        return;
      }

      const thumbnailUrl = req.file
        ? `/uploads/blogs/${req.file.filename}`
        : undefined;

      const result = await this.blogService.createBlog({
        ...req.body,
        authorId,
        thumbnailUrl,
      });

      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const thumbnailUrl = req.file
        ? `/uploads/blogs/${req.file.filename}`
        : undefined;

      // PERBAIKAN: Tambahkan "as string"
      const result = await this.blogService.updateBlog(
        req.params.id as string,
        {
          ...req.body,
          thumbnailUrl,
        },
      );

      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.blogService.deleteBlog(req.params.id as string);
      res.status(200).json({ success: true, message: "Blog berhasil dihapus" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  uploadEditorImage = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res
          .status(400)
          .json({ success: false, message: "Tidak ada gambar yang diunggah" });
        return;
      }

      const imageUrl = `/uploads/blogs/editor/${req.file.filename}`;

      res.status(200).json({
        success: true,
        url: imageUrl,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: "Gagal mengunggah gambar editor" });
    }
  };
}
