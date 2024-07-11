import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from config.env file
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const uri = process.env.ATLAS_URI || "";
let client;
let db;

// MongoDB connection using MongoClient
const connectMongoClient = async () => {
  if (!db) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      db = client.db("employees");
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

// MongoDB connection using Mongoose
const connectMongoose = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongoose connected to MongoDB');
  } catch (err) {
    console.error('Mongoose connection error:', err);
    throw err;
  }
};

const connectDB = async () => {
  await connectMongoClient();
  await connectMongoose();
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

export { connectDB, getDB };
