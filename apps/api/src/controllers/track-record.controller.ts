import type { Request, Response } from "express";
import { TrackRecordService } from "../services/track-record.service.js";

export class TrackRecordController {
  private trackRecordService: TrackRecordService;

  constructor() {
    this.trackRecordService = new TrackRecordService();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.trackRecordService.getAllTrackRecords(
        req.query,
      );
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.trackRecordService.getTrackRecordById(
        req.params.id as string,
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
        res.status(401).json({
          success: false,
          message:
            "Sesi login tidak valid (authorId tidak ditemukan). Pastikan Anda sudah login.",
        });
        return;
      }

      const thumbnailUrl = req.file
        ? `/uploads/track-records/${req.file.filename}`
        : undefined;

      const result = await this.trackRecordService.createTrackRecord({
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
        ? `/uploads/track-records/${req.file.filename}`
        : undefined;
      const data = { ...req.body };

      if (thumbnailUrl) data.thumbnailUrl = thumbnailUrl;

      const result = await this.trackRecordService.updateTrackRecord(
        req.params.id as string,
        data,
      );
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.trackRecordService.deleteTrackRecord(req.params.id as string);
      res
        .status(200)
        .json({ success: true, message: "Track Record berhasil dihapus" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
