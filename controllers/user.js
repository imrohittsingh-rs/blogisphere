import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handleUserSignUp(req, res) {
  const { fullname, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.render("signup", { error: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("signup", {
      error: "Email not registered, please sign up first",
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.render("login", {
      error: "Incorrect password, please try again",
    });
  }

  const payload = {
    id: user._id,
    email: user.email,
    name: user.fullname,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
