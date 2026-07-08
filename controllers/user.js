import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateTokenForUser } from "../utils/authentication.js";

async function handleUserSignUp(req, res) {
  const { fullname, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res.render("signup", {
      error: "Email already registered",
    });

  await User.create({
    fullname,
    email,
    password,
  });

  return res.redirect("/user/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("signup", {
      error: "Email not registered, please sign up first",
    });
  }

  const isMatched = await user.isPasswordCorrect(password);
  if (!isMatched) {
    return res.render("login", {
      error: "Incorrect password, please try again",
    });
  }

  const token = generateTokenForUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

function handleUserSignOut(req, res) {
  res.clearCookie("uid");
  return res.render("signout");
}

export { handleUserSignUp, handleUserLogin, handleUserSignOut };
