import type { Prisma, Event } from "@prisma/client";
import prisma from "../lib/prisma.js";

export class EventRepository {
  async findAll(params: any): Promise<{ data: Event[]; total: number }> {
    const { skip, take, search, type } = params;

    const where: Prisma.EventWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type && type !== "Semua") {
      where.type = type === "Online Class" ? "ONLINE_CLASS" : "OFFLINE_EVENT";
    }

    const [data, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take,
        include: { author: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.event.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Event | null> {
    return await prisma.event.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async findBySlug(slug: string): Promise<Event | null> {
    return await prisma.event.findUnique({
      where: { slug },
      include: { author: true },
    });
  }

  async create(data: Prisma.EventUncheckedCreateInput): Promise<Event> {
    return await prisma.event.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.EventUncheckedUpdateInput,
  ): Promise<Event> {
    return await prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Event> {
    return await prisma.event.delete({
      where: { id },
    });
  }
}
