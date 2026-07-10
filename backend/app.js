import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import { checkForAuthentication } from "./middlewares/auth.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.static(path.join(__dirname, "public")));

app.use(checkForAuthentication);

// public routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;
