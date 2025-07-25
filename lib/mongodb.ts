// import { NextResponse } from "next/server"
// import { MongoClient } from "mongodb"
// import bcrypt from "bcryptjs"

// // ✅ Declare custom global variable inline (TypeScript fix)
// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined
// }

// // ✅ MongoDB URI fallback
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub"

// export async function POST(request: Request) {
//   try {
//     const { username, email, password } = await request.json()

//     if (!username || !email || !password) {
//       return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 })
//     }

//     if (password.length < 6) {
//       return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
//     }

//     // ✅ Create or reuse MongoDB client promise
//     if (!global._mongoClientPromise) {
//       const client = new MongoClient(MONGODB_URI)
//       global._mongoClientPromise = client.connect()
//     }

//     const client = await global._mongoClientPromise
//     const db = client.db()
//     const usersCollection = db.collection("users")

//     // ✅ Check if user already exists
//     const existingUser = await usersCollection.findOne({
//       $or: [{ email }, { username }],
//     })

//     if (existingUser) {
//       return NextResponse.json({ message: "User with this email or username already exists" }, { status: 409 })
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 12)

//     // ✅ Create new user
//     const newUser = {
//       username,
//       email,
//       password: hashedPassword,
//       role: "user",
//       createdAt: new Date(),
//       isActive: true,
//     }

//     const result = await usersCollection.insertOne(newUser)

//     return NextResponse.json({
//       message: "User created successfully",
//       userId: result.insertedId,
//     })
//   } catch (error) {
//     console.error("Signup error:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }


import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub";
const DB_NAME = "gamehub";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDB() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return { client, db };
}



