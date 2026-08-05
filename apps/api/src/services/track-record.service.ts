import type {
  CreateTrackRecordDTO,
  UpdateTrackRecordDTO,
} from "../interfaces/track-record.interface.js";
import { TrackRecordRepository } from "../repositories/track-record.repository.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TrackRecordService {
  private trackRecordRepository: TrackRecordRepository;

  constructor() {
    this.trackRecordRepository = new TrackRecordRepository();
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

  async getAllTrackRecords(query: any) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { search } = query;

    const { data, total } = await this.trackRecordRepository.findAll({
      skip,
      take: limit,
      search,
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

  async getTrackRecordById(id: string) {
    const trackRecord = await this.trackRecordRepository.findById(id);
    if (!trackRecord) throw new Error("Track Record tidak ditemukan");
    return trackRecord;
  }

  async createTrackRecord(data: CreateTrackRecordDTO) {
    return await this.trackRecordRepository.create(data);
  }

  async updateTrackRecord(id: string, data: UpdateTrackRecordDTO) {
    const existingRecord = await this.getTrackRecordById(id);
    let updatePayload: any = { ...data };

    if (data.thumbnailUrl) {
      if (existingRecord.thumbnailUrl) {
        this.removeFile(existingRecord.thumbnailUrl);
      }
    } else {
      delete updatePayload.thumbnailUrl;
    }

    return await this.trackRecordRepository.update(id, updatePayload);
  }

  async deleteTrackRecord(id: string) {
    const record = await this.getTrackRecordById(id);

    if (record.thumbnailUrl) {
      this.removeFile(record.thumbnailUrl);
    }

    return await this.trackRecordRepository.delete(id);
  }
}
