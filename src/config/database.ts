import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let connected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MongoDB already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

export default connectDB;
