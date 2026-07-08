import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import staticRouter from "./routes/staticRouter.js";
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
app.use(checkForAuthentication);
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// public routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

export default app;
