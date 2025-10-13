import { MongoClient } from "mongodb";
//import dotenv from "dotenv";

//console.log("Before dotenv.config()");
//dotenv.config();
//console.log("After dotenv.config()");

const uri = process.env.MONGODB_URI;
//console.log("MONGO_URI:", uri);
//console.log("Is MONGO_URI defined?", !!uri);
const DB_NAME = "FundFilmDB";
const COLLECTION_NAME = "updateData";

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  try {
    //console.log("Attempting to connect to MongoDB...");
    await client.connect();
    db = client.db(DB_NAME).collection(COLLECTION_NAME);
    //console.log("MongoDB connected!");
    //console.log("Connected to database:", db.databaseName);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.error("Error details:", err.message);
  }
}

export function getDB() {
  if (!db) throw new Error("Database not connected");
  return db;
}
