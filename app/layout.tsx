import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameHub - Play Free Online Games",
  description:
    "Play thousands of free online games directly in your browser. No downloads, no installs – just play!",
};

// ✅ Add ChunkError logic here directly
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const message = event?.reason?.message || "";
    if (
      event?.reason?.name === "ChunkLoadError" ||
      message.includes("Loading chunk") ||
      message.includes("ChunkLoadError")
    ) {
      console.warn("⚠️ ChunkLoadError detected. Reloading page...");
      window.location.reload();
    }
  });
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#1a1419] text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
