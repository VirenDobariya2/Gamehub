import Link from "next/link"
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "New Games - GameHub",
  description: "Discover the latest games added to GameHub. Play new and exciting games for free.",
}

export default function NewGamesPage() {
  // In a real app, you would fetch new games from your database
  const newGames = Array.from({ length: 24 }).map((_, i) => ({
    id: `new-game-${i + 1}`,
    title: `New Game ${i + 1}`,
    image: `/placeholder.svg?height=200&width=350`,
    href: `/games/new-game-${i + 1}`,
    addedDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    category: ["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"][i % 6],
    isNew: i < 6,
  }))

  const sortOptions = ["Newest First", "Oldest First", "Most Popular", "Highest Rated"]

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
              <h1 className="text-3xl font-bold">New Games</h1>
              <p className="text-muted-foreground">Discover the latest games added to GameHub</p>
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

          <div className="game-grid">
            {newGames.map((game) => (
              <div key={game.id} className="relative">
                {game.isNew && (
                  <Badge className="absolute left-2 top-2 z-10 bg-primary text-primary-foreground">NEW</Badge>
                )}
                <GameCard id={game.id} title={game.title} image={game.image} href={game.href} />
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{game.category}</span>
                  <span>{game.addedDate}</span>
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
