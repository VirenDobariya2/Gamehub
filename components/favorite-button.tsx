"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites } from "@/components/favorites-context"
import { useToast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  game: {
    id: string
    title: string
    image: string
    href: string
    category: string
    rating: number
  }
  variant?: "default" | "icon"
  className?: string
}

export function FavoriteButton({ game, variant = "default", className }: FavoriteButtonProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()
  const isGameFavorite = isFavorite(game.id)

  const handleToggleFavorite = () => {
    if (isGameFavorite) {
      removeFromFavorites(game.id)
      toast({
        title: "Removed from favorites",
        description: `${game.title} has been removed from your favorites.`,
      })
    } else {
      addToFavorites(game)
      toast({
        title: "Added to favorites",
        description: `${game.title} has been added to your favorites.`,
      })
    }
  }

  if (variant === "icon") {
    return (
      <Button variant="ghost" size="icon" onClick={handleToggleFavorite} className={`transition-colors ${className}`}>
        <Heart className={`h-5 w-5 ${isGameFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        <span className="sr-only">{isGameFavorite ? "Remove from favorites" : "Add to favorites"}</span>
      </Button>
    )
  }

  return (
    <Button onClick={handleToggleFavorite} className={`flex items-center gap-2 ${className}`}>
      <Heart className={`h-4 w-4 ${isGameFavorite ? "fill-red-500 text-red-500" : ""}`} />
      {isGameFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  )
}
