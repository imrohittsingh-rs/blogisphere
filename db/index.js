import mongoose, { mongo } from "mongoose";

const connectToDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};

export default connectToDB;
