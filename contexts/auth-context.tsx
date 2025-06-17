"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { useRouter } from "next/navigation"

// ---------- Types ---------- //
export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  username?: string
}

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  login: (token: string, userData: User) => void
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

// ---------- Context ---------- //
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ---------- Provider ---------- //
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error("Failed to parse stored user", err)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }

    setIsLoading(false)
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ---------- Hook ---------- //
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
