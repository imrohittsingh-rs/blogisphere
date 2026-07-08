import express from "express";
import { checkForAuthentication } from "../middlewares/auth.js";
import { handleAllBlogs } from "../controllers/blog.js";

const router = express.Router();

router.get("/", checkForAuthentication, handleAllBlogs);

router.get("/signup", (req, res) => {
  return res.render("signup", { error: null });
});

router.get("/login", (req, res) => {
  return res.render("login", { error: null });
});

export default router;
