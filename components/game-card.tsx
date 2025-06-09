"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { FavoriteButton } from "@/components/favorite-button"

interface GameCardProps {
  id: string
  title: string
  image: string
  href: string
  className?: string
  showFavoriteButton?: boolean
  category?: string
  rating?: number
}

export function GameCard({
  id,
  title,
  image,
  href,
  className,
  showFavoriteButton = false,
  category = "Action",
  rating = 4.5,
}: GameCardProps) {
  const gameData = {
    id,
    title,
    image,
    href,
    category,
    rating,
  }

  return (
    <div className={cn("game-card group", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <Link href={href}>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="game-card-image transition-transform duration-300 hover:scale-105"
          />
        </Link>
        {showFavoriteButton && (
          <FavoriteButton
            game={gameData}
            variant="icon"
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
      <Link href={href}>
        <h3 className="game-card-title hover:text-primary">{title}</h3>
      </Link>
    </div>
  )
}
