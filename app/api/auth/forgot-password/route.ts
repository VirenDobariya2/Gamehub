import { NextResponse } from "next/server"
import { NextRequest } from 'next/server'
import { MongoClient } from "mongodb"
import crypto from "crypto"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub"

// In a real application, you would use a proper email service like SendGrid, Mailgun, etc.
async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`

  // For development, we'll just log the reset URL
  // In production, replace this with actual email sending logic
  console.log(`Password reset email for ${email}:`)
  console.log(`Reset URL: ${resetUrl}`)
  console.log(`Token expires in 1 hour`)

  // Example email content that would be sent:
  const emailContent = {
    to: email,
    subject: "Reset Your GameHub Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>You requested a password reset for your GameHub account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p><strong>This link will expire in 1 hour.</strong></p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">GameHub Team</p>
      </div>
    `,
  }

  // TODO: Replace with actual email service
  // await emailService.send(emailContent)

  return true
}

export async function POST(request : NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db()
    const usersCollection = db.collection("users")

    // Check if user exists
    const user = await usersCollection.findOne({ email })

    // Always return success to prevent email enumeration attacks
    // But only send email if user actually exists
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex")
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

      // Save reset token to user document
      await usersCollection.updateOne(
        { email },
        {
          $set: {
            resetToken,
            resetTokenExpiry,
          },
        },
      )

      // Send password reset email
      await sendPasswordResetEmail(email, resetToken)
    }

    await client.close()

    return NextResponse.json({
      message: "If an account with that email exists, we've sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
