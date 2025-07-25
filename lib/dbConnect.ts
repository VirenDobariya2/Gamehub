import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the global object (for hot-reloading in development)
declare global {
  var _mongoose: MongooseGlobal;
}

// Create cache container on global if it doesn't exist
const globalMongoose = globalThis as typeof globalThis & { _mongoose?: MongooseGlobal };

if (!globalMongoose._mongoose) {
  globalMongoose._mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (globalMongoose._mongoose!.conn) return globalMongoose._mongoose!.conn;

  if (!globalMongoose._mongoose!.promise) {
    globalMongoose._mongoose!.promise = mongoose.connect(MONGODB_URI, {
      dbName: "gamehub", // optional
    });
  }

  globalMongoose._mongoose!.conn = await globalMongoose._mongoose!.promise;
  return globalMongoose._mongoose!.conn;
}

export default dbConnect;
