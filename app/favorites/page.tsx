"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { FavoriteButton } from "@/components/favorite-button"
import { useFavorites } from "@/components/favorites-context"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  const sortOptions = ["Recently Added", "Alphabetical", "Highest Rated", "Category"]

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
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              <div>
                <h1 className="text-3xl font-bold">My Favorites</h1>
                <p className="text-muted-foreground">{favorites.length} games in your favorites</p>
              </div>
            </div>
            {favorites.length > 0 && (
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
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">No favorites yet</h2>
              <p className="mb-4 text-muted-foreground">Start adding games to your favorites to see them here</p>
              <Button asChild>
                <Link href="/">Browse Games</Link>
              </Button>
            </div>
          ) : (
            <div className="game-grid">
              {favorites.map((game) => (
                <div key={game.id} className="group relative">
                  <GameCard id={game.id} title={game.title} image={game.image} href={game.href} />
                  <FavoriteButton
                    game={game}
                    variant="icon"
                    className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{game.category}</span>
                    <div className="flex items-center gap-1">
                      <span>★ {game.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
