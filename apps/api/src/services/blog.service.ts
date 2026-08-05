import { BlogRepository } from "../repositories/blog.repository.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type {
  CreateBlogDTO,
  UpdateBlogDTO,
} from "../interfaces/blog.interface.js";
import { PublishStatus } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BlogService {
  private blogRepository: BlogRepository;

  constructor() {
    this.blogRepository = new BlogRepository();
  }

  private removeFile(fileUrl: string | null) {
    if (!fileUrl) return;
    try {
      const cleanPath = fileUrl.startsWith("/")
        ? fileUrl.substring(1)
        : fileUrl;
      const filePath = path.join(__dirname, "../../", cleanPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("🚨 Gagal menghapus file:", error);
    }
  }

  private generateSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomString}`;
  }

  private extractImageUrls(html: string): string[] {
    if (!html) return [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    const urls: string[] = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      let url = match[1] ?? "";
      if (!url) continue;
      if (url.includes("/uploads/")) {
        const idx = url.indexOf("/uploads/");
        if (idx !== -1) url = url.substring(idx);
      }
      urls.push(url);
    }
    return urls;
  }

  async getAllBlogs(query: any) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { data, total } = await this.blogRepository.findAll({
      skip,
      take: limit,
      search: query.search,
      category: query.category,
      status: query.status,
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 },
    };
  }

  async getBlogById(id: string) {
    const blog = await this.blogRepository.findById(id);
    if (!blog) throw new Error("Blog tidak ditemukan");
    return blog;
  }

  async getBlogBySlug(slug: string) {
    const blog = await this.blogRepository.findBySlug(slug);
    if (!blog) throw new Error("Blog tidak ditemukan");
    return blog;
  }

  async createBlog(data: CreateBlogDTO) {
    const slug = this.generateSlug(data.title);

    const publishedAt =
      data.status === PublishStatus.DITERBITKAN ? new Date() : null;

    return await this.blogRepository.create({
      ...data,
      slug,
      publishedAt,
    });
  }

  async updateBlog(id: string, data: UpdateBlogDTO) {
    const existingBlog = await this.getBlogById(id);
    let updatePayload: any = { ...data };

    if (data.title && data.title !== existingBlog.title) {
      updatePayload.slug = this.generateSlug(data.title);
    }

    if (
      data.status === PublishStatus.DITERBITKAN &&
      existingBlog.status !== PublishStatus.DITERBITKAN
    ) {
      updatePayload.publishedAt = new Date();
    }

    if (data.thumbnailUrl) {
      if (existingBlog.thumbnailUrl) {
        this.removeFile(existingBlog.thumbnailUrl);
      }
    } else if (data.removeThumbnail === "true") {
      if (existingBlog.thumbnailUrl) {
        this.removeFile(existingBlog.thumbnailUrl);
      }
      updatePayload.thumbnailUrl = null;
    } else {
      delete updatePayload.thumbnailUrl;
    }

    delete updatePayload.removeThumbnail;

    if (data.uploadedImagesTracker) {
      try {
        const historyImages = JSON.parse(data.uploadedImagesTracker);
        const finalHtml = data.contentHtml || "";

        historyImages.forEach((imgUrl: string) => {
          if (!finalHtml.includes(imgUrl)) {
            this.removeFile(imgUrl);
          }
        });
      } catch (error) {
        console.error("Gagal memproses cleanup gambar editor:", error);
      }

      delete updatePayload.uploadedImagesTracker;
    }

    if (data.contentHtml && existingBlog.contentHtml) {
      const oldImages = this.extractImageUrls(existingBlog.contentHtml);
      const newImages = this.extractImageUrls(data.contentHtml);

      const removedImages = oldImages.filter(
        (imgUrl) => !newImages.includes(imgUrl),
      );

      removedImages.forEach((imgUrl) => {
        this.removeFile(imgUrl);
      });
    }

    return await this.blogRepository.update(id, updatePayload);
  }

  async deleteBlog(id: string) {
    const blog = await this.getBlogById(id);
    if (blog.thumbnailUrl) {
      this.removeFile(blog.thumbnailUrl);
    }
    return await this.blogRepository.delete(id);
  }
}
