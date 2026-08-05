import { Role } from '@prisma/client';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string; 
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AddAdminDTO {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface ForgotPasswordDTO {
  email: string;
  newPassword: string;
}

export interface JwtPayload {
  userId: string;
  role: Role;
}