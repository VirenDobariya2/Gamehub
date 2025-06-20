"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  // { href: "/new-games", label: "New Games" },
  // { href: "/trending", label: "Trending" },
  // { href: "/collections", label: "Collections" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
