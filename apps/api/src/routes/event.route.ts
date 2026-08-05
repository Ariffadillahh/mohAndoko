import { Router } from "express";
import { EventController } from "../controllers/event.controller.js";
import { upload, convertToWebp } from "../middlewares/upload.middleware.js"; // Import dari file middleware Anda
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/auth.middleware.js";

const router: Router = Router();
const eventController = new EventController();

router.get("/", eventController.getAll);
router.get("/:id", eventController.getById);
router.get("/:slug", eventController.getBySlug);
router.delete("/:id", eventController.delete);

router.post(
  "/",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  upload.single("thumbnailUrl"),
  convertToWebp("events"),
  eventController.create,
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  upload.single("thumbnailUrl"),
  convertToWebp("events"),
  eventController.update,
);

export default router;
