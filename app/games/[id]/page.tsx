import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { FavoriteButton } from "@/components/favorite-button"
import { Star, Play } from "lucide-react"

interface GamePageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: GamePageProps): Metadata {
  return {
    title: `Cosmic Clash - GameHub`,
    description: `Play Cosmic Clash online for free on GameHub. Engage in epic space battles, customize your spaceship, and conquer the galaxy.`,
  }
}

export default function GamePage({ params }: GamePageProps) {
  // In a real app, you would fetch the game data based on the ID
  const game = {
    id: params.id,
    title: "Cosmic Clash",
    description:
      "Engage in epic space battles in Cosmic Clash, a thrilling multiplayer shooter. Customize your spaceship, team up with friends, and conquer the galaxy. With stunning visuals and intense gameplay, Cosmic Clash offers endless hours of interstellar combat.",
    rating: 4.6,
    reviews: 1234,
    ratingDistribution: [
      { stars: 5, percentage: 50 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 5 },
      { stars: 1, percentage: 5 },
    ],
    tags: ["Action", "Multiplayer", "Shooter", "Space", "Combat"],
    image: "/placeholder.svg?height=600&width=1000",
    category: "Action",
    href: `/games/${params.id}`,
  }

  // Replace the static recommendedGames array with this dynamic one
  const recommendedGames = [
    {
      id: "galactic-conquest",
      title: "Galactic Conquest",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/galactic-conquest",
      category: "Action",
      rating: 4.3,
      description: "Command your fleet in epic space battles across the galaxy.",
      tags: ["Action", "Strategy", "Space", "Multiplayer"],
    },
    {
      id: "starfall-arena",
      title: "Starfall Arena",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/starfall-arena",
      category: "Multiplayer",
      rating: 4.5,
      description: "Fast-paced multiplayer combat in zero gravity environments.",
      tags: ["Multiplayer", "Shooter", "Space", "Combat"],
    },
    {
      id: "nebula-wars",
      title: "Nebula Wars",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/nebula-wars",
      category: "Shooter",
      rating: 4.2,
      description: "Intense space shooter with stunning visual effects.",
      tags: ["Shooter", "Action", "Space", "Arcade"],
    },
    {
      id: "cosmic-strike",
      title: "Cosmic Strike",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/cosmic-strike",
      category: "Space",
      rating: 4.4,
      description: "Strategic space combat with customizable ships.",
      tags: ["Space", "Strategy", "Combat", "Customization"],
    },
    {
      id: "interstellar-clash",
      title: "Interstellar Clash",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/interstellar-clash",
      category: "Combat",
      rating: 4.1,
      description: "Real-time strategy meets space combat simulation.",
      tags: ["Combat", "Strategy", "Space", "Simulation"],
    },
    {
      id: "space-raiders",
      title: "Space Raiders",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/space-raiders",
      category: "Action",
      rating: 4.0,
      description: "Raid enemy bases in this action-packed space adventure.",
      tags: ["Action", "Adventure", "Space", "Combat"],
    },
  ]

  // Filter recommended games based on current game's tags and category
  const getRecommendedGames = (
    currentGame: typeof game,
    allGames: typeof recommendedGames
  ) => {
    return allGames
      .filter((g) => g.id !== currentGame.id) // Exclude current game
      .map((g) => {
        // Calculate relevance score based on matching tags and category
        let score = 0
        if (g.category === currentGame.category) score += 3
        currentGame.tags.forEach((tag) => {
          if (g.tags.includes(tag)) score += 1
        })
        return { ...g, relevanceScore: score }
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
      .slice(0, 5) // Take top 5
  }

  const filteredRecommendedGames = getRecommendedGames(game, recommendedGames)

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
              {/* Rating Score and Stars */}
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

              {/* Rating Distribution */}
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
              <FavoriteButton game={game} />
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {filteredRecommendedGames.map((recommendedGame) => (
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
                      <div className="flex flex-wrap gap-1">
                        {recommendedGame.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-secondary/50 px-1.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
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
