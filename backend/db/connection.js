import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environmental variables
dotenv.config();

const uri = process.env.ATLAS_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 设置连接超时时间为5秒
    });
    console.log("Successfully connected to MongoDB using mongoose!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw new Error("Failed to connect to MongoDB");
  }
};

const getDB = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return mongoose.connection.db;
};

export { connectDB, getDB };
