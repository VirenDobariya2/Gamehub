"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function ResetPasswordClient() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [valid, setValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (token) {
      // Optionally: call your backend API to validate token
      setValid(true) // Replace with actual validation
    } else {
      setValid(false)
    }
  }, [token])

  if (valid === null) return <p>Validating...</p>

  if (!token || !valid) {
    return <p className="text-red-600">Invalid or missing token</p>
  }

  return (
    <form className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Reset Your Password</h1>
      <input type="password" placeholder="New Password" className="p-2 border rounded" />
      <input type="password" placeholder="Confirm Password" className="p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Submit
      </button>
    </form>
  )
}
