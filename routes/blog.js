import { Router } from "express";
import { checkUserAuthentication } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import {
  handleCreateBlog,
  handleGetBlogById,
  handleUpdateBlog,
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

router.get("/:id", checkUserAuthentication, handleGetBlogById);

router.get("/update/:id", checkUserAuthentication, (req, res) => {
  return res.render("updateBlog", { error: null, blogId: req.params.id });
});
router.post("/update/:id", checkUserAuthentication, handleUpdateBlog);

router.post("/delete/:id", checkUserAuthentication, handleDeleteBlog);

export default router;
