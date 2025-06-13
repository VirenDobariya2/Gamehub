"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mail, MoreHorizontal, Shield } from "lucide-react"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users") 
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users)
        } else {
          console.error("Failed to fetch users")
        }
      } catch (err) {
        console.error("Error fetching users:", err)
      }
    }

    fetchUsers()
  }, [])

  const getStatusColor = (status: string) => {
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

  const getRoleColor = (role: string) => {
    return role === "admin" ? "bg-orange-600" : "bg-blue-600"
  }

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

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
                <p className="text-muted-foreground">Search and view users</p>
              </div>
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Total: {filteredUsers.length}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-4 text-left">User</th>
                        <th className="px-6 py-4 text-left">Role</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr className="border-b" key={user._id}>
                            <td className="px-6 py-4">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                @{user.username} <br />
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getRoleColor(user.role)}>
                                {user.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                                {user.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getStatusColor(user.status || "active")}>
                                {user.status || "active"}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-6 text-muted-foreground">
                            No users found.
                          </td>
                        </tr>
                      )}
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
