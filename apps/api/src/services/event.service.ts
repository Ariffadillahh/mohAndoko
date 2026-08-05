import type { Prisma } from "@prisma/client";
import type {
  CreateEventDTO,
  UpdateEventDTO,
} from "../interfaces/event.interface.js";
import { EventRepository } from "../repositories/event.repository.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EventService {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
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
      console.error("🚨 [ERROR] Terjadi kesalahan saat menghapus file:", error);
    }
  }

  private generateCleanSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async getAllEvents(query: any) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { search, type } = query;

    const { data, total } = await this.eventRepository.findAll({
      skip,
      take: limit,
      search,
      type,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async getEventById(id: string) {
    const event = await this.eventRepository.findById(id);
    if (!event) throw new Error("Event tidak ditemukan");
    return event;
  }

  async getEventBySlug(slug: string) {
    const event = await this.eventRepository.findBySlug(slug);
    if (!event) throw new Error("Event tidak ditemukan");
    return event;
  }

  async createEvent(data: CreateEventDTO) {
    let slug: string;

    if (data.slug) {
      slug = this.generateCleanSlug(data.slug);
    } else {
      slug = this.generateCleanSlug(data.title);
    }

    const existingEvent = await this.eventRepository.findBySlug(slug);
    if (existingEvent) {
      const uniqueSuffix = Math.random().toString(36).substring(2, 6);
      slug = `${slug}-${uniqueSuffix}`;
    }

    const parsedDate = new Date(data.eventDate);

    const parsedPrice = data.price ? Number(data.price) : 0;

    const parsedBenefits =
      typeof data.benefits === "string"
        ? JSON.parse(data.benefits)
        : data.benefits;
    const parsedResources =
      typeof data.resources === "string"
        ? JSON.parse(data.resources)
        : data.resources;

    const eventData = {
      ...data,
      price: parsedPrice,
      benefits: parsedBenefits,
      resources: parsedResources,
      eventDate: parsedDate,
      slug,
    };

    return await this.eventRepository.create(eventData);
  }

  async updateEvent(id: string, data: UpdateEventDTO) {
    const existingEvent = await this.getEventById(id);

    let updatePayload: any = { ...data };

    if (
      data.thumbnailUrl &&
      existingEvent.thumbnailUrl &&
      data.thumbnailUrl !== existingEvent.thumbnailUrl
    ) {
      this.removeFile(existingEvent.thumbnailUrl);
    }

    if (data.slug) {
      let newSlug = this.generateCleanSlug(data.slug);
      const existing = await this.eventRepository.findBySlug(newSlug);
      if (existing && existing.id !== id) {
        const uniqueSuffix = Math.random().toString(36).substring(2, 6);
        newSlug = `${newSlug}-${uniqueSuffix}`;
      }
      updatePayload.slug = newSlug;
    }

    if (data.eventDate) {
      updatePayload.eventDate = new Date(data.eventDate);
    }

    if (data.price !== undefined) {
      updatePayload.price = Number(data.price);
    }
    if (data.benefits && typeof data.benefits === "string") {
      updatePayload.benefits = JSON.parse(data.benefits);
    }
    if (data.resources && typeof data.resources === "string") {
      updatePayload.resources = JSON.parse(data.resources);
    }

    return await this.eventRepository.update(id, updatePayload);
  }

  async deleteEvent(id: string) {
    const event = await this.getEventById(id);

    if (event.thumbnailUrl) {
      this.removeFile(event.thumbnailUrl);
    }

    return await this.eventRepository.delete(id);
  }
}
