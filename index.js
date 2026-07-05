// const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");

// const staticRouter = require("./routes/staticRouter");
// const userRouter = require("./routes/user");
import dotenv from "dotenv";
import app from "./app.js";
import connectToDB from "./db/index.js";
import dns from "node:dns";

// console.log(await dns.getServers());
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port : http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });
