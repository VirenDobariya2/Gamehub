import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GameHub - Play Free Online Games",
  description:
    "Play thousands of free online games directly in your browser. No downloads, no installs – just play!",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#1a1419] text-white antialiased`}>
        <Provider>{children}</Provider>    
      </body>
    </html>
  )
}
