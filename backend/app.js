import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import { checkForAuthentication } from "./middlewares/auth.js";

import rateLimit from "express-rate-limit";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
console.log("CORS origin:", corsOrigin);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Globle rate limiter
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use("/api", rateLimiter);

// Strict rate limiter for login and register routes
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "Too many login/register attempts, please try again after 15 minutes",
  },
});

app.use("/api/users/register", authRateLimiter);
app.use("/api/users/login", authRateLimiter);

// Base routes
app.get("/", (req, res) => {
  return res.send("Welcome to the BlogiSphere API");
});

// Authentication middleware
app.use(checkForAuthentication);

// public routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/favicon.ico", (req, res) => res.sendStatus(204));

// Global Error Handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
