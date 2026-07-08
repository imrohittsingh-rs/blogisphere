import { Router } from "express";
import { checkUserAuthentication } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import {
  handleCreateBlog,
  handleGetBlogById,
  handleUpdateBlog,
  showUpdateBlogPage,
  showDeleteBlogPage,
  handleDeleteBlog,
} from "../controllers/blog.js";

const router = Router();

router.get("/new", checkUserAuthentication, (req, res) => {
  return res.render("addBlog", { error: null });
});

router.post(
  "/",
  checkUserAuthentication,
  upload.single("coverImage"),
  handleCreateBlog,
);

router.get("/update/:id", checkUserAuthentication, showUpdateBlogPage);

router.post(
  "/update/:id",
  checkUserAuthentication,
  upload.single("coverImage"),
  handleUpdateBlog,
);

router.get("/delete/:id", checkUserAuthentication, showDeleteBlogPage);

router.post("/delete/:id", checkUserAuthentication, handleDeleteBlog);

router.get("/:id", checkUserAuthentication, handleGetBlogById);

export default router;
