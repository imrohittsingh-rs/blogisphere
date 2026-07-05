const express = require("express");
const { checkUserAuthentication } = require("../middlewares/auth");

const router = express.Router();

router.get("/add-new", checkUserAuthentication, (req, res) => {
  return res.render("addBlog", { user: req.user, error: null });
});

router.get("/update", checkUserAuthentication, (req, res) => {
  return res.render("updateBlog", { user: req.user, error: null });
});

router.get("/delete", checkUserAuthentication, (req, res) => {
  return res.render("deleteBlog", { user: req.user, error: null });
});

module.exports = router;