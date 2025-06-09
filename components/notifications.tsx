"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Heart, Plus, Star } from "lucide-react"

interface Notification {
  id: string
  type: "new_game" | "favorite_update" | "achievement" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  gameId?: string
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_game",
      title: "New Game Added",
      message: "Cosmic Adventure 2 is now available to play!",
      timestamp: "2 hours ago",
      read: false,
      gameId: "cosmic-adventure-2",
    },
    {
      id: "2",
      type: "favorite_update",
      title: "Favorite Game Updated",
      message: "Mystic Run has received a major update with new levels!",
      timestamp: "1 day ago",
      read: false,
      gameId: "mystic-run",
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've played 50 different games! Keep exploring!",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: "4",
      type: "system",
      title: "Weekly Roundup",
      message: "Check out this week's most popular games",
      timestamp: "3 days ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_game":
        return <Plus className="h-4 w-4 text-green-500" />
      case "favorite_update":
        return <Heart className="h-4 w-4 text-red-500" />
      case "achievement":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full px-1 text-xs">{unreadCount}</Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer flex-col items-start p-4"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
