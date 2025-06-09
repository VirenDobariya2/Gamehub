import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Star, Heart, Share } from "lucide-react"

interface CollectionPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  return {
    title: `Collection - GameHub`,
    description: `Browse games in this collection on GameHub.`,
  }
}

export default function CollectionDetailPage({ params }: CollectionPageProps) {
  // Mock collection data - in real app, fetch based on params.id
  const collection = {
    id: params.id,
    title: "Staff Picks",
    description: "Games handpicked by our team for their exceptional quality and fun factor",
    gameCount: 25,
    isOfficial: true,
    creator: "GameHub Team",
    createdDate: "January 2025",
    games: Array.from({ length: 25 }).map((_, i) => ({
      id: `staff-pick-${i + 1}`,
      title: `Staff Pick Game ${i + 1}`,
      image: `/placeholder.svg?height=200&width=350`,
      href: `/games/staff-pick-${i + 1}`,
      category: ["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"][i % 6],
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0-5.0
      playCount: Math.floor(Math.random() * 100000) + 10000,
    })),
  }

  const sortOptions = ["Recently Added", "Most Popular", "Highest Rated", "Alphabetical"]

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
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/collections">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Collections
              </Link>
            </Button>
          </div>

          {/* Collection header */}
          <div className="mb-8 rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{collection.title}</h1>
                  {collection.isOfficial && (
                    <Badge variant="secondary">
                      <Star className="mr-1 h-3 w-3" />
                      Official
                    </Badge>
                  )}
                </div>
                <p className="mb-4 text-muted-foreground">{collection.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {collection.gameCount} games
                  </span>
                  <span>Created by {collection.creator}</span>
                  <span>{collection.createdDate}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="mr-2 h-4 w-4" />
                  Follow
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Filters and sorting */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Showing {collection.games.length} games</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="rounded-md border bg-background px-3 py-1 text-sm">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Games grid */}
          <div className="game-grid">
            {collection.games.map((game) => (
              <div key={game.id} className="relative">
                <GameCard id={game.id} title={game.title} image={game.image} href={game.href} />
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{game.category}</span>
                  <div className="flex items-center gap-2">
                    <span>★ {game.rating}</span>
                    <span>{Number.parseInt(game.playCount.toString()).toLocaleString()} plays</span>
                  </div>
                </div>
              </div>
            ))}
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
