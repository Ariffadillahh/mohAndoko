import type { Prisma, TrackRecord } from "@prisma/client";
import prisma from "../lib/prisma.js";

export class TrackRecordRepository {
  async findAll(params: any): Promise<{ data: TrackRecord[]; total: number }> {
    const { skip, take, search } = params;
    const where: Prisma.TrackRecordWhereInput = {};

    if (search) {
      where.OR = [
        { programName: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.trackRecord.findMany({
        where,
        skip,
        take,
        include: { author: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.trackRecord.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<TrackRecord | null> {
    return await prisma.trackRecord.findUnique({ where: { id } });
  }

  async create(
    data: Prisma.TrackRecordUncheckedCreateInput,
  ): Promise<TrackRecord> {
    return await prisma.trackRecord.create({ data });
  }

  async update(
    id: string,
    data: Prisma.TrackRecordUncheckedUpdateInput,
  ): Promise<TrackRecord> {
    return await prisma.trackRecord.update({ where: { id }, data });
  }

  async delete(id: string): Promise<TrackRecord> {
    return await prisma.trackRecord.delete({ where: { id } });
  }
}
