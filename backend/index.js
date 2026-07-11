import "dotenv/config";

import app from "./app.js";
import connectToDB from "./db/index.js";
import dns from "node:dns";

// console.log(await dns.getServers());
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Load environment variables
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });
