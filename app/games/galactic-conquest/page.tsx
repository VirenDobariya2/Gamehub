import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { FavoriteButton } from "@/components/favorite-button"
import { Star, Play } from "lucide-react"

export const metadata = {
  title: "Galactic Conquest - GameHub",
  description: "Command your fleet in epic space battles across the galaxy. Strategic gameplay meets intense action.",
}

export default function GalacticConquestPage() {
  const game = {
    id: "galactic-conquest",
    title: "Galactic Conquest",
    description:
      "Command your fleet in epic space battles across the galaxy. Build your armada, conquer planets, and establish your dominance in this strategic space warfare game. With deep tactical gameplay and stunning visuals, Galactic Conquest offers endless hours of strategic combat.",
    rating: 4.3,
    reviews: 892,
    ratingDistribution: [
      { stars: 5, percentage: 45 },
      { stars: 4, percentage: 35 },
      { stars: 3, percentage: 12 },
      { stars: 2, percentage: 5 },
      { stars: 1, percentage: 3 },
    ],
    tags: ["Action", "Strategy", "Space", "Multiplayer", "Fleet Combat"],
    image: "/placeholder.svg?height=600&width=1000",
    category: "Action",
    href: "/games/galactic-conquest",
  }

  const recommendedGames = [
    {
      id: "cosmic-clash",
      title: "Cosmic Clash",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/cosmic-clash",
      category: "Action",
      rating: 4.6,
      description: "Epic space battles with customizable spaceships.",
      tags: ["Action", "Multiplayer", "Shooter", "Space"],
    },
    {
      id: "starfall-arena",
      title: "Starfall Arena",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/starfall-arena",
      category: "Multiplayer",
      rating: 4.5,
      description: "Fast-paced multiplayer combat in zero gravity.",
      tags: ["Multiplayer", "Shooter", "Space", "Combat"],
    },
    {
      id: "nebula-wars",
      title: "Nebula Wars",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/nebula-wars",
      category: "Shooter",
      rating: 4.2,
      description: "Intense space shooter with stunning effects.",
      tags: ["Shooter", "Action", "Space", "Arcade"],
    },
    {
      id: "cosmic-strike",
      title: "Cosmic Strike",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/cosmic-strike",
      category: "Space",
      rating: 4.4,
      description: "Strategic space combat with ship customization.",
      tags: ["Space", "Strategy", "Combat", "Customization"],
    },
    {
      id: "interstellar-clash",
      title: "Interstellar Clash",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/interstellar-clash",
      category: "Combat",
      rating: 4.1,
      description: "Real-time strategy meets space simulation.",
      tags: ["Combat", "Strategy", "Space", "Simulation"],
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
          {/* Game Player Area */}
          <div className="mb-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
              <img src={game.image || "/placeholder.svg"} alt={game.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button size="lg" className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                  <Play className="h-8 w-8 text-white" fill="white" />
                  <span className="sr-only">Play Game</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">{game.title}</h1>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{game.description}</p>

            {/* Rating Section */}
            <div className="mb-8 flex items-start gap-8">
              <div className="flex items-center gap-4">
                <div className="text-6xl font-bold">{game.rating}</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= Math.floor(game.rating)
                            ? "fill-primary text-primary"
                            : star === Math.ceil(game.rating) && game.rating % 1 !== 0
                              ? "fill-primary/50 text-primary"
                              : "fill-none text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{game.reviews.toLocaleString()} reviews</div>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {game.ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <span className="w-2 text-sm font-medium">{rating.stars}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-sm text-muted-foreground">{rating.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Share Game</span>
              <Button variant="outline">Share Game</Button>
            </div>

            {/* Tags Section */}
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-bold">Tags</h2>
              <div className="flex flex-wrap gap-3">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/categories/${tag.toLowerCase()}`}
                    className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Games Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Recommended Games</h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                {recommendedGames.map((recommendedGame) => (
                  <div key={recommendedGame.id} className="group relative">
                    <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                      <Link href={recommendedGame.href}>
                        <img
                          src={recommendedGame.image || "/placeholder.svg"}
                          alt={recommendedGame.title}
                          className="aspect-video w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20">
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                              <Play className="h-6 w-6 text-white" fill="white" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <FavoriteButton
                        game={recommendedGame}
                        variant="icon"
                        className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <h3 className="font-semibold text-white transition-colors group-hover:text-primary">
                        <Link href={recommendedGame.href}>{recommendedGame.title}</Link>
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{recommendedGame.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{recommendedGame.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-muted-foreground">{recommendedGame.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
