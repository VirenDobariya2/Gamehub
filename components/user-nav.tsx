"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Upload, User, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { NotificationDropdown } from "@/components/notifications"

export function UserNav() {
  // In a real app, you would check if the user is authenticated and their role
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false) // Only admins can upload games

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/favorites">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </Link>
        </Button>
        <NotificationDropdown />
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <User className="h-5 w-5" />
            <span className="sr-only">Login</span>
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/favorites">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Favorites</span>
        </Link>
      </Button>
      <NotificationDropdown />
      {/* Only show upload button for admins */}
      {isAdmin && (
        <Button variant="default" asChild>
          <Link href="/admin/games/new">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <img src="/placeholder.svg?height=32&width=32" alt="User" className="h-8 w-8 rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Username</p>
              <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
              {isAdmin && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Shield className="h-3 w-3" />
                  Admin
                </div>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/collections">My Collections</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/games">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
