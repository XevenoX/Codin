import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environmental variables
dotenv.config({ path: "./.env" });

const uri = process.env.ATLAS_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Successfully connected to MongoDB using mongoose!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw new Error("Failed to connect to MongoDB");
  }
};

const getDB = () => {
  if (mongoose.connection.readyState !== 1) {
    return null;
  }
  return mongoose.connection.db;
};

export { connectDB, getDB };
