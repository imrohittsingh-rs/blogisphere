import { Router } from "express";
import { checkUserAuthentication } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import {
  handleAllBlogs,
  handleCreateBlog,
  handleGetBlogById,
  handleUpdateBlog,
  handleDeleteBlog,
} from "../controllers/blog.js";

const router = Router();

router.get("/", handleAllBlogs);

router.get("/:id", handleGetBlogById);

router.post(
  "/",
  checkUserAuthentication,
  upload.single("coverImage"),
  handleCreateBlog,
);

router.patch(
  "/:id",
  checkUserAuthentication,
  upload.single("coverImage"),
  handleUpdateBlog,
);

router.delete("/:id", checkUserAuthentication, handleDeleteBlog);

export default router;
