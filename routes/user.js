import express from "express";
import { handleUserSignUp, handleUserLogin, handleUserSignOut } from "../controllers/user.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup", { error: null });
});

router.get("/login", (req, res) => {
  return res.render("login", { error: null });
});

router.get("/signout", handleUserSignOut);

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);

export default router;
