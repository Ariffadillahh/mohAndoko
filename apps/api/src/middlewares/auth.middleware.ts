import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../interfaces/auth.interface.js";
import type { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "jFLSbYk6Jf0ypzEusSdtSDFXQny3ixN4";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    token = req.cookies?.accessToken || req.cookies?.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak. Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token tidak valid atau sudah kadaluwarsa" });
  }
};

export const authorizeRole = (...allowedRoles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak. Anda tidak memiliki hak akses" });
    }
    next();
  };
};
