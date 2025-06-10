"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { Search, UserPlus, MoreHorizontal, Shield, Ban, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in real app, fetch from API
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-03-15",
      gamesPlayed: 45,
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@gamehub.com",
      username: "admin",
      role: "admin",
      status: "active",
      joinDate: "2024-01-01",
      lastActive: "2024-03-15",
      gamesPlayed: 12,
    },
    {
      id: "3",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      username: "sarahw",
      role: "user",
      status: "active",
      joinDate: "2024-02-20",
      lastActive: "2024-03-14",
      gamesPlayed: 23,
    },
    {
      id: "4",
      name: "Mike Johnson",
      email: "mike@example.com",
      username: "mikej",
      role: "user",
      status: "banned",
      joinDate: "2024-01-30",
      lastActive: "2024-03-10",
      gamesPlayed: 67,
    },
    {
      id: "5",
      name: "Emily Chen",
      email: "emily@example.com",
      username: "emilyc",
      role: "user",
      status: "inactive",
      joinDate: "2024-03-01",
      lastActive: "2024-03-05",
      gamesPlayed: 8,
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "inactive":
        return "bg-yellow-600"
      case "banned":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRoleColor = (role) => {
    return role === "admin" ? "bg-orange-600" : "bg-blue-600"
  }

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage users and their permissions</p>
              </div>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>

            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name, email, or username..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Export</Button>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>Users ({filteredUsers.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-medium">User</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Games Played</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Last Active</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b last:border-b-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">@{user.username}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm">{user.gamesPlayed}</td>
                          <td className="px-6 py-4 text-sm">{user.lastActive}</td>
                          <td className="px-6 py-4 text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status !== "banned" ? (
                                  <DropdownMenuItem className="text-red-600">
                                    <Ban className="mr-2 h-4 w-4" />
                                    Ban User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Unban User</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  )
}
