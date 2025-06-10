import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { CategoryCard } from "@/components/category-card"

export const metadata: Metadata = {
  title: "GameHub - Play Free Online Games",
  description: "Play thousands of free online games directly in your browser. No downloads, no installs - just play!",
}

export default function HomePage() {
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
        <section className="container px-4 py-6">
          <div className="relative mb-10 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20"></div>
            <img
              src="/gamethub.webp"
              alt="Hero Banner"
              className="h-[400px] w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-8">
              <h1 className="mb-4 text-4xl font-bold">Play the best free games online</h1>
              <p className="mb-6 max-w-md text-lg text-muted-foreground">
                Thousands of free games to play directly in your browser. No downloads, no installs.
              </p>
              <Button size="lg" asChild>
                <Link href="/categories">Browse Games</Link>
              </Button>
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending Games</h2>
              <Button variant="link" asChild>
                <Link href="/trending">View All</Link>
              </Button>
            </div>
            <div className="game-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <GameCard
                  key={i}
                  id={`game-${i + 1}`}
                  title={`Game ${i + 1}`}
                  image={`/gamethub.webp`}
                  href={`/games/game-${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Popular Games</h2>
              <Button variant="link" asChild>
                <Link href="/popular">View All</Link>
              </Button>
            </div>
            <div className="game-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <GameCard
                  key={i}
                  id={`game-${i + 7}`}
                  title={`Game ${i + 7}`}
                  image={`/placeholder.svg?height=200&width=350`}
                  href={`/games/game-${i + 7}`}
                />
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Categories</h2>
              <Button variant="link" asChild>
                <Link href="/categories">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {["Action", "Adventure", "Puzzle", "Strategy", "Sports", "Racing"].map((category) => (
                <CategoryCard
                  key={category}
                  title={category}
                  image={`/placeholder.svg?height=150&width=250`}
                  href={`/categories/${category.toLowerCase()}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
