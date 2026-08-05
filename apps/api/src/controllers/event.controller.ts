import type { Request, Response } from "express"; // Pastikan pakai 'type' jika menggunakan ES Modules
import { EventService } from "../services/event.service.js"; // Sesuaikan ekstensi .js jika pakai ESM Node16
import type {
  CreateEventDTO,
  UpdateEventDTO,
} from "../interfaces/event.interface.js";

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.eventService.getAllEvents(req.query);

      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const event = await this.eventService.getEventById(id);
      res.status(200).json({ success: true, data: event });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  getBySlug = async (req: Request, res: Response) => {
    try {
      const { slug } = req.params as { slug: string };
      const event = await this.eventService.getEventBySlug(slug);
      res.status(200).json({ success: true, data: event });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const payload: CreateEventDTO = req.body;

      // Mengambil path gambar dari middleware WebP
      if (req.file) {
        // req.file.path sudah diset di middleware Anda: `/uploads/events/filename.webp`
        payload.thumbnailUrl = req.file.path;
      }

      const event = await this.eventService.createEvent(payload);

      res.status(201).json({
        success: true,
        message: "Event berhasil dibuat",
        data: event,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const payload: UpdateEventDTO = req.body;

      // Jika ada gambar baru yang diupload saat update
      if (req.file) {
        payload.thumbnailUrl = req.file.path;
      }

      const event = await this.eventService.updateEvent(id, payload);

      res.status(200).json({
        success: true,
        message: "Event berhasil diperbarui",
        data: event,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      await this.eventService.deleteEvent(id);

      res
        .status(200)
        .json({ success: true, message: "Event berhasil dihapus" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
