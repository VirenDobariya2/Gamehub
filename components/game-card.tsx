"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { FavoriteButton } from "@/components/favorite-button"
import { games } from "@/app/data/games"
import { useRef } from "react"

interface GameCardProps {
  id: string
  title: string
  image: string
  className?: string
  showFavoriteButton?: boolean
  category?: string
  rating?: number
}

export function GameCard({
  id,
  title,
  image,
  className,
  showFavoriteButton = false,
  category = "Action",
  rating = 4.5,
}: GameCardProps) {
  const gameFrameRef = useRef<HTMLDivElement>(null)

  const game = {
    id,
    title,
    image,
    category,
    rating,
    href: `/games/${id}`, // ✅ Add missing `href` to satisfy FavoriteButton's prop
  }

  return (
    <div className={cn("game-card group", className)}>
      <div className="relative overflow-hidden rounded-lg" ref={gameFrameRef}>
        <Link href={`/games/${id}`}>
          <img
            src={image}
            alt={title}
            className="game-card-image transition-transform duration-300 hover:scale-105"
          />
        </Link>
        {showFavoriteButton && (
          <FavoriteButton
            game={game}
            variant="icon"
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
      <Link href={`/games/${id}`}>
        <h3 className="game-card-title hover:text-primary">{title}</h3>
      </Link>
    </div>
  )
}
