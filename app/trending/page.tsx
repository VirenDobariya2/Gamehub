"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FlameIcon as Fire } from "lucide-react"

type TimeFilter = "Today" | "This Week" | "This Month" | "All Time"

export default function TrendingPage() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("Today")

  // Mock data for different time periods
  const gamesByPeriod = {
    Today: Array.from({ length: 12 }).map((_, i) => ({
      id: `today-game-${i + 1}`,
      title: `Today's Hit ${i + 1}`,
      image: `/gamethub.webp`,
      href: `/games/today-game-${i + 1}`,
      playCount: Math.floor(Math.random() * 5000) + 1000,
      trendingRank: i + 1,
      category: ["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"][i % 6],
      isHot: i < 3,
    })),
    "This Week": Array.from({ length: 18 }).map((_, i) => ({
      id: `week-game-${i + 1}`,
      title: `Weekly Trending ${i + 1}`,
      image: `/gamethub.webp`,
      href: `/games/week-game-${i + 1}`,
      playCount: Math.floor(Math.random() * 25000) + 5000,
      trendingRank: i + 1,
      category: ["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"][i % 6],
      isHot: i < 3,
    })),
    "This Month": Array.from({ length: 24 }).map((_, i) => ({
      id: `month-game-${i + 1}`,
      title: `Monthly Popular ${i + 1}`,
      image: `/gamethub.webp`,
      href: `/games/month-game-${i + 1}`,
      playCount: Math.floor(Math.random() * 100000) + 10000,
      trendingRank: i + 1,
      category: ["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"][i % 6],
      isHot: i < 3,
    })),
    "All Time": Array.from({ length: 30 }).map((_, i) => ({
      id: `alltime-game-${i + 1}`,
      title: `All-Time Classic ${i + 1}`,
      image: `/placeholder.svg?height=200&width=350`,
      href: `/games/alltime-game-${i + 1}`,
      playCount: Math.floor(Math.random() * 500000) + 50000,
      trendingRank: i + 1,
      category: ["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"][i % 6],
      isHot: i < 3,
    })),
  }

  const timeFilters: TimeFilter[] = ["Today", "This Week", "This Month", "All Time"]
  const currentGames = gamesByPeriod[activeFilter]

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
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Trending Games</h1>
            </div>
            <p className="text-muted-foreground">The most popular games for {activeFilter.toLowerCase()}</p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <Button
                key={filter}
                variant={filter === activeFilter ? "default" : "secondary"}
                className="rounded-full"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {currentGames.length} trending games for {activeFilter.toLowerCase()}
          </div>

          <div className="game-grid">
            {currentGames.map((game) => (
              <div key={game.id} className="relative">
                {game.isHot && (
                  <Badge className="absolute left-2 top-2 z-10 bg-orange-500 text-white">
                    <Fire className="mr-1 h-3 w-3" />
                    HOT
                  </Badge>
                )}
                <div className="absolute right-2 top-2 z-10 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                  #{game.trendingRank}
                </div>
                <GameCard id={game.id} title={game.title} image={game.image} href={game.href} />
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{game.category}</span>
                  <span>{game.playCount.toLocaleString()} plays</span>
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
