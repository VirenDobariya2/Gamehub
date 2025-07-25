"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Users, Gamepad2, DollarSign, UserPlus, Activity } from "lucide-react"

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/login")
    }
  }, [user, isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null // Will redirect in useEffect
  }

  // Mock data - in real app, fetch from API
  const stats = {
    totalGames: 1250,
    activeUsers: 35000,
    revenue: 120000,
    dailyActiveUsers: 3500,
    newUsers: 500,
  }

  const recentChanges = [
    {
      date: "2024-03-15",
      user: "Alex Johnson",
      action: "Game Upload",
      details: "Uploaded 'Cosmic Racers'",
    },
    {
      date: "2024-03-14",
      user: "Sarah Lee",
      action: "User Registration",
      details: "New user registered",
    },
    {
      date: "2024-03-14",
      user: "Admin",
      action: "Game Update",
      details: "Updated 'Mystic Quest'",
    },
    {
      date: "2024-03-13",
      user: "David Chen",
      action: "Game Removal",
      details: "Removed 'Alien Invasion'",
    },
    {
      date: "2024-03-12",
      user: "Emily White",
      action: "User Ban",
      details: "Banned user for policy violation",
    },
  ]

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Games</CardTitle>
                <Gamepad2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalGames.toLocaleString()}</div>
                <p className="text-xs text-green-500">+10%</p>
              </CardContent>
            </Card>

            <Card className="border text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-green-500">+5%</p>
              </CardContent>
            </Card>

            <Card className="border text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
                <p className="text-xs text-green-500">+8%</p>
              </CardContent>
            </Card>
          </div>

          {/* User Activity Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">User Activity</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Daily Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.dailyActiveUsers.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">
                    Last 7 Days <span className="text-green-500">+5%</span>
                  </p>
                  <div className="mt-4 h-32 rounded bg-secondary/20 flex items-end justify-center">
                    <div className="text-sm text-muted-foreground">Chart visualization would go here</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    New Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.newUsers}</div>
                  <p className="text-sm text-muted-foreground">
                    Last 7 Days <span className="text-green-500">+10%</span>
                  </p>
                  <div className="mt-4 h-32 rounded bg-secondary/20 flex items-end justify-center">
                    <div className="text-sm text-muted-foreground">Chart visualization would go here</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Changes */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Recent Changes</h2>
            <Card className="border text-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">User</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentChanges.map((change, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="px-6 py-4 text-sm">{change.date}</td>
                          <td className="px-6 py-4 text-sm">{change.user}</td>
                          <td className="px-6 py-4 text-sm">{change.action}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{change.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
