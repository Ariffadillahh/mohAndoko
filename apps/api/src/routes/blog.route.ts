import { Router } from "express";
import { BlogController } from "../controllers/blog.controller.js";
import { authenticateToken, authorizeRole } from "../middlewares/auth.middleware.js";
import { uploadBlogThumbnail, uploadBlogEditor } from "../middlewares/upload-blog.middleware.js";

const router: Router = Router();
const blogController = new BlogController();


router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);

router.get("/slug/:slug", blogController.getBySlug);


router.post(
  "/upload-editor-image",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  uploadBlogEditor.single("image"), 
  blogController.uploadEditorImage
);

router.post(
  "/",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  uploadBlogThumbnail.single("thumbnailUrl"),
  blogController.create
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  uploadBlogThumbnail.single("thumbnailUrl"),
  blogController.update
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("ADMIN", "SUPERADMIN"),
  blogController.delete
);

export default router;