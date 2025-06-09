import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  return {
    title: `${category} Games - GameHub`,
    description: `Play the best ${params.category} games online for free on GameHub. Browse our collection of ${params.category} games.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  // In a real app, you would fetch games based on the category
  const games = Array.from({ length: 12 }).map((_, i) => ({
    id: `${params.category}-game-${i + 1}`,
    title: `${category} Game ${i + 1}`,
    image: `/placeholder.svg?height=200&width=350`,
    href: `/games/${params.category}-game-${i + 1}`,
  }))

  const filters = ["All", category, "Driving", "Car", "Drifting", "Multiplayer"]

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
            <h1 className="text-3xl font-bold">{category} Games</h1>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Button key={filter} variant={filter === category ? "default" : "secondary"} className="rounded-full">
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <GameCard key={game.id} id={game.id} title={game.title} image={game.image} href={game.href} />
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
