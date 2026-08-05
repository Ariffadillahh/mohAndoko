import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository.js";
import type {
  RegisterDTO,
  AddAdminDTO,
  ForgotPasswordDTO,
  JwtPayload,
} from "../interfaces/auth.interface.js";

const JWT_SECRET = process.env.JWT_SECRET || "jFLSbYk6Jf0ypzEusSdtSDFXQny3ixN4"; 

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "e186m7rsc1/q/97nud8MuaeDrldYRuON";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterDTO) {
    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email atau password salah");
    }

    const payload: JwtPayload = { userId: user.id, role: user.role };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userWithoutPassword } = user;

    return { accessToken, refreshToken, user: userWithoutPassword };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        JWT_REFRESH_SECRET,
      ) as JwtPayload;

      const payload: JwtPayload = {
        userId: decoded.userId,
        role: decoded.role,
      };
      
      const newAccessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "15m",
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Token tidak valid atau sudah kadaluwarsa");
    }
  }

  async addAdmin(data: AddAdminDTO) {
    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const admin = await this.authRepository.createAdmin({
      ...data,
      password: hashedPassword,
    });

    const { password, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  async forgotPassword(data: ForgotPasswordDTO) {
    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error("Email tidak ditemukan");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await this.authRepository.updatePassword(data.email, hashedPassword);

    return { message: "Password berhasil diperbarui" };
  }

  async getProfile(userId: string) {
    const user = await this.authRepository.findUserById(userId);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }
    return user;
  }
}
