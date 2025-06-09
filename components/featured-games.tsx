"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GameCard } from "@/components/game-card"

export function FeaturedGames() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const featuredGames = [
    { id: "game-1", title: "Game 1", image: "/placeholder.svg?height=400&width=800", href: "/games/game-1" },
    { id: "game-2", title: "Game 2", image: "/placeholder.svg?height=400&width=800", href: "/games/game-2" },
    { id: "game-3", title: "Game 3", image: "/placeholder.svg?height=400&width=800", href: "/games/game-3" },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === featuredGames.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredGames.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredGames.map((game) => (
          <div key={game.id} className="min-w-full">
            <GameCard id={game.id} title={game.title} image={game.image} href={game.href} className="h-full w-full" />
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-background/50"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
