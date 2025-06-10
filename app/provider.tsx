"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { FavoritesProvider } from "@/components/favorites-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <FavoritesProvider>
          {children}
          <Toaster />
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
