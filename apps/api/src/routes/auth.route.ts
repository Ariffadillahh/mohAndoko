import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/auth.middleware.js";
import { convertToWebp, upload } from "../middlewares/upload.middleware.js";

const router: Router = Router();
const authController = new AuthController();

router.post(
  "/register",
  upload.single("avatar"),
  convertToWebp("avatars"),
  authController.register,
);

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);

router.get("/me", authenticateToken, authController.getMe);

router.post(
  "/add-admin",
  authenticateToken,
  authorizeRole("SUPERADMIN"),
  upload.single("avatar"),
  convertToWebp("avatars"),
  authController.addAdmin,
);

export default router;
