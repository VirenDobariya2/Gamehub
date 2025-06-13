import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
// import { AdminRouteGuard } from "@/components/admin-route-guard"
import { Plus } from "lucide-react"
import { games } from "@/app/data/games"

export default function AdminGamesPage() {
  // Mock data - in real app, fetch from API
  return (
 
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Manage Games</h1>
              <Button asChild>
                <Link href="/admin/games/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Game
                </Link>
              </Button>
            </div>

            <Card className="bg-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-medium">Game</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Status</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {games.map((game) => (
                        <tr key={game.id} className="border-b last:border-b-0">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{game.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {game.category} • {game.createdAt}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Badge
                              variant={game.status === "published" ? "default" : "secondary"}
                              className={game.status === "published" ? "bg-green-600" : ""}
                            >
                              {game.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <span className="text-muted-foreground">|</span>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                Delete
                              </Button>
                            </div>
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
 
  )
}
