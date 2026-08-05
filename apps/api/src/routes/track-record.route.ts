import { Router } from "express";
import { TrackRecordController } from "../controllers/track-record.controller.js";
import { convertToWebp, upload } from "../middlewares/upload.middleware.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/auth.middleware.js";

const router: Router = Router();
const trackRecordController = new TrackRecordController();

router.get("/", trackRecordController.getAll);
router.get("/:id", trackRecordController.getById);

router.post(
  "/",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  upload.single("thumbnailUrl"),
  convertToWebp("track-records"),
  trackRecordController.create,
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  upload.single("thumbnailUrl"),
  convertToWebp("track-records"),
  trackRecordController.update,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  trackRecordController.delete,
);

export default router;
