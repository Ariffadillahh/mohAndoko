import { Prisma, type Blog } from "@prisma/client";
import prisma from "../lib/prisma.js";

export class BlogRepository {
  async findAll(params: any): Promise<{ data: Blog[]; total: number }> {
    const { skip, take, search, category, status } = params;

    const where: Prisma.BlogWhereInput = {};

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }
    if (category) {
      where.category = category;
    }
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take,
        include: {
          author: {
            select: { id: true, name: true, email: true }, // Jangan kirim password!
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.blog.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Blog | null> {
    return await prisma.blog.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async findBySlug(slug: string): Promise<Blog | null> {
    return await prisma.blog.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async create(data: Prisma.BlogUncheckedCreateInput): Promise<Blog> {
    return await prisma.blog.create({ data });
  }

  async update(
    id: string,
    data: Prisma.BlogUncheckedUpdateInput,
  ): Promise<Blog> {
    return await prisma.blog.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Blog> {
    return await prisma.blog.delete({
      where: { id },
    });
  }
}
