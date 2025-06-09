import { NextResponse } from "next/server"
import { NextRequest } from 'next/server'
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db()
    const usersCollection = db.collection("users")

    // Find user with valid reset token
    const user = await usersCollection.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Token hasn't expired
    })

    await client.close()

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    return NextResponse.json({ message: "Token is valid" })
  } catch (error) {
    console.error("Verify reset token error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
