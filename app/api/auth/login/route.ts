import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface LoginRequestBody {
  email: string
  password: string
}

interface User {
  _id: string
  email: string
  username: string
  password: string
  role: string
  [key: string]: any
}

interface LoginResponse {
  message: string
  user: Omit<User, "password">
  token: string
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, password }: LoginRequestBody = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db()
    const usersCollection = db.collection<User>("users")

    // Find user by email or username
    const user: User | null = await usersCollection.findOne({
      $or: [{ email }, { username: email }],
    })

    if (!user) {
      await client.close()
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid: boolean = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      await client.close()
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token: string = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" })

    await client.close()

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json<LoginResponse>({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
