"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { AdminRouteGuard } from "@/components/admin-route-guard"
import { TrendingUp, Users, Gamepad2, Clock, Eye } from "lucide-react"

export default function AdminAnalyticsPage() {
  // Mock data - in real app, fetch from API
  const analytics = {
    totalUsers: 35000,
    activeUsers: 12500,
    totalGames: 1250,
    totalPlays: 2500000,
    avgSessionTime: "12m 34s",
    topGames: [
      { name: "Cosmic Clash", plays: 125000, growth: "+15%" },
      { name: "Puzzle Quest", plays: 98000, growth: "+8%" },
      { name: "Racing Rivals", plays: 87000, growth: "+12%" },
      { name: "Strategy Masters", plays: 76000, growth: "+5%" },
      { name: "Word Wizards", plays: 65000, growth: "+18%" },
    ],
    userGrowth: [
      { month: "Jan", users: 28000 },
      { month: "Feb", users: 31000 },
      { month: "Mar", users: 35000 },
    ],
    gameCategories: [
      { category: "Action", percentage: 35, plays: 875000 },
      { category: "Puzzle", percentage: 25, plays: 625000 },
      { category: "Strategy", percentage: 20, plays: 500000 },
      { category: "Sports", percentage: 12, plays: 300000 },
      { category: "Racing", percentage: 8, plays: 200000 },
    ],
  }

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Platform performance and user insights</p>
            </div>

            {/* Key Metrics */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-500">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-500">+8% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Games</CardTitle>
                  <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalGames.toLocaleString()}</div>
                  <p className="text-xs text-green-500">+15 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.avgSessionTime}</div>
                  <p className="text-xs text-green-500">+2m from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Top Games */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Top Performing Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topGames.map((game, index) => (
                      <div key={game.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{game.name}</div>
                            <div className="text-sm text-muted-foreground">{game.plays.toLocaleString()} plays</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-green-500">{game.growth}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Game Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    Game Categories Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.gameCategories.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{category.category}</span>
                          <span className="text-muted-foreground">{category.percentage}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {category.plays.toLocaleString()} total plays
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Growth Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    User Growth Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded bg-secondary/20 flex items-end justify-center gap-8 p-8">
                    {analytics.userGrowth.map((data, index) => (
                      <div key={data.month} className="flex flex-col items-center gap-2">
                        <div className="text-sm font-medium">{data.users.toLocaleString()}</div>
                        <div
                          className="w-16 bg-primary rounded-t transition-all duration-500"
                          style={{ height: `${(data.users / 40000) * 200}px` }}
                        />
                        <div className="text-sm text-muted-foreground">{data.month}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Chart visualization showing user growth over time
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  )
}
