"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Star, Lock } from "lucide-react"

export default function CollectionsPage() {
  // Mock authentication state - in real app, get from auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const publicCollections = [
    {
      id: "staff-picks",
      title: "Staff Picks",
      description: "Games handpicked by our team",
      gameCount: 25,
      image: "/placeholder.svg?height=200&width=350",
      isOfficial: true,
      games: Array.from({ length: 6 }).map((_, i) => ({
        id: `staff-pick-${i}`,
        title: `Staff Pick ${i + 1}`,
        image: `/placeholder.svg?height=150&width=200`,
        href: `/games/staff-pick-${i}`,
      })),
    },
    {
      id: "multiplayer-madness",
      title: "Multiplayer Madness",
      description: "Best games to play with friends",
      gameCount: 18,
      image: "/placeholder.svg?height=200&width=350",
      isOfficial: true,
      games: Array.from({ length: 6 }).map((_, i) => ({
        id: `multiplayer-${i}`,
        title: `Multiplayer Game ${i + 1}`,
        image: `/placeholder.svg?height=150&width=200`,
        href: `/games/multiplayer-${i}`,
      })),
    },
  ]

  const userCollections = [
    {
      id: "my-favorites",
      title: "My Favorites",
      description: "Games I love to play",
      gameCount: 12,
      image: "/placeholder.svg?height=200&width=350",
      isOfficial: false,
      games: Array.from({ length: 6 }).map((_, i) => ({
        id: `favorite-${i}`,
        title: `Favorite Game ${i + 1}`,
        image: `/placeholder.svg?height=150&width=200`,
        href: `/games/favorite-${i}`,
      })),
    },
    {
      id: "puzzle-collection",
      title: "Puzzle Masters",
      description: "Mind-bending puzzle games",
      gameCount: 8,
      image: "/placeholder.svg?height=200&width=350",
      isOfficial: false,
      games: Array.from({ length: 6 }).map((_, i) => ({
        id: `puzzle-${i}`,
        title: `Puzzle Game ${i + 1}`,
        image: `/placeholder.svg?height=150&width=200`,
        href: `/games/puzzle-${i}`,
      })),
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="text-xl">GameHub</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Game Collections</h1>
              <p className="text-muted-foreground">Curated collections of the best games</p>
            </div>
            {isAuthenticated ? (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Collection
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <Lock className="mr-2 h-4 w-4" />
                  Login to Create
                </Link>
              </Button>
            )}
          </div>

          <div className="space-y-8">
            {/* Public Collections */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Featured Collections</h2>
              <div className="space-y-6">
                {publicCollections.map((collection) => (
                  <div key={collection.id} className="rounded-lg border bg-card p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="text-xl font-bold">{collection.title}</h3>
                          {collection.isOfficial && (
                            <Badge variant="secondary">
                              <Star className="mr-1 h-3 w-3" />
                              Official
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{collection.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {collection.gameCount} games
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/collections/${collection.id}`}>View All</Link>
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                      {collection.games.map((game) => (
                        <GameCard key={game.id} id={game.id} title={game.title} image={game.image} href={game.href} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Collections - Only show if authenticated */}
            {isAuthenticated && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">My Collections</h2>
                <div className="space-y-6">
                  {userCollections.map((collection) => (
                    <div key={collection.id} className="rounded-lg border bg-card p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-xl font-bold">{collection.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{collection.description}</p>
                          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {collection.gameCount} games
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/collections/${collection.id}`}>View All</Link>
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                        {collection.games.map((game) => (
                          <GameCard key={game.id} id={game.id} title={game.title} image={game.image} href={game.href} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Login prompt for non-authenticated users */}
            {!isAuthenticated && (
              <div className="rounded-lg border bg-card p-8 text-center">
                <Lock className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">Create Your Own Collections</h3>
                <p className="mb-4 text-muted-foreground">
                  Sign in to create and manage your personal game collections
                </p>
                <div className="flex justify-center gap-2">
                  <Button asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/signup">Create Account</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
