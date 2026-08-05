import type { AddAdminDTO, RegisterDTO } from "../interfaces/auth.interface.js";
import { Role } from "@prisma/client";
import prisma from "../lib/prisma.js";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async createUser(data: RegisterDTO) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl || null,
        role: Role.USER,
      },
    });
  }

  async createAdmin(data: AddAdminDTO) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl || null,
        role: Role.ADMIN,
      },
    });
  }

  async updatePassword(email: string, hashedPassword: string) {
    return await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }
}
