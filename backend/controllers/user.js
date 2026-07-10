import User from "../models/user.js";
import { generateTokenForUser } from "../utils/authentication.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const handleUserSignUp = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already registered")
  }

  const user = await User.create({
    fullname,
    email,
    password,
  })

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"))
})

const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const isMatched = await user.isPasswordCorrect(password);
  if (!isMatched) {
    throw new ApiError(401, "Incorrect password")
  }

  const token = generateTokenForUser(user);
  res.cookie(process.env.COOKIE_NAME, token);

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"))
})

const handleUserSignOut = asyncHandler(async (req, res) => {
  res.clearCookie("uid");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"))
})

export { handleUserSignUp, handleUserLogin, handleUserSignOut, getCurrentUser };
