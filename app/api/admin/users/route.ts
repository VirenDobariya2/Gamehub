// import { connectToDatabase } from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub"

export async function GET() {

  try {
     const client = new MongoClient(MONGODB_URI)
       await client.connect()
   
       const db = client.db()
       
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json({
      users,
      count: users.length,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


