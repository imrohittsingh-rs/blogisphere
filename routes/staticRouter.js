const express = require("express");
const { checkForAuthentication } = require("../middlewares/auth");

const router = express.Router();

router.get("/", checkForAuthentication, (req, res) => {
  return res.render("home", { user: req.user });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { error: null });
});

router.get("/login", (req, res) => {
  return res.render("login", { error: null });
});

module.exports = router;
