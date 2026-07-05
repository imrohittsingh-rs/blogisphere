import express from "express";
import staticRouter from "./routes/staticRouter";
import userRouter from "./routes/user";
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// public routes
app.use("/", staticRouter);
app.use("/user", userRouter);
