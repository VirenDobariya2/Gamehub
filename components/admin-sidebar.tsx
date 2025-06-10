"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Gamepad2, Users, BarChart3, Settings, HelpCircle, ExternalLink } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Games",
    href: "/admin/games",
    icon: Gamepad2,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Support",
    href: "/admin/support",
    icon: HelpCircle,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold">GameHub Admin</h2>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-secondary text-white" : "text-muted-foreground hover:bg-secondary hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Site
          </Link>
        </Button>
      </div>
    </div>
  )
}
