import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"
import { X } from "lucide-react"

interface SearchPageProps {
  searchParams: { q?: string }
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  return {
    title: `Search: ${searchParams.q || ""} - GameHub`,
    description: `Search results for "${searchParams.q || ""}" on GameHub.`,
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  // In a real app, you would fetch search results based on the query
  const searchResults = Array.from({ length: 10 }).map((_, i) => ({
    id: `search-result-${i + 1}`,
    title: `Search Result ${i + 1}`,
    image: `/placeholder.svg?height=200&width=350`,
    href: `/games/search-result-${i + 1}`,
  }))

  const filters = ["All", "Racing", "Driving", "Car", "Drifting", "Multiplayer"]

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
            <div className="relative mb-4">
              <Input type="search" placeholder="Search for games" className="pr-10" defaultValue={query} />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0" asChild>
                <Link href="/search">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button key={filter} variant={filter === "All" ? "default" : "secondary"} className="rounded-full">
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="game-grid">
            {searchResults.map((result) => (
              <GameCard key={result.id} id={result.id} title={result.title} image={result.image} href={result.href} />
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
