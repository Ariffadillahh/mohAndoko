import type { CookieOptions, Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const avatarUrl = req.file ? req.file.path : undefined;

      const userData = {
        ...req.body,
        avatarUrl,
      };

      const user = await this.authService.register(userData);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password, rememberMe } = req.body;
      const { accessToken, refreshToken, user } = await this.authService.login(
        email,
        password,
      );

      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      };

      if (rememberMe) {
        cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
      }

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        data: { accessToken, user },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token tidak ditemukan" });
      }

      const { accessToken } =
        await this.authService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        data: { accessToken },
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Refresh token tidak valid atau kadaluwarsa",
      });
    }
  };

  logout = async (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Berhasil logout" });
  };

  addAdmin = async (req: Request, res: Response) => {
    try {
      const admin = await this.authService.addAdmin(req.body);
      res.status(201).json({ success: true, data: admin });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.forgotPassword(req.body);
      res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getMe = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Tidak terotentikasi" });
      }

      const user = await this.authService.getProfile(userId);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
