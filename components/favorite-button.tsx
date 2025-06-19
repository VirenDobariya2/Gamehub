"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites-context";
import { useToast } from "@/hooks/use-toast";

type Variant = "default" | "icon";

interface Game {
  id: string;
  title: string;
  image: string;
  href?: string;
  category: string;
  rating: number;
}

interface FavoriteButtonProps {
  game: Game;
  variant?: Variant;
  className?: string;
}

export function FavoriteButton({
  game,
  variant = "default",
  className = "",
}: FavoriteButtonProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const isGameFavorite = isFavorite(game.id);

  const handleToggleFavorite = () => {
    if (isGameFavorite) {
      removeFromFavorites(game.id);
      toast({
        title: "Removed from favorites",
        description: `${game.title} has been removed from your favorites.`,
      });
    } else {
      addToFavorites({
        ...game,
        href: game.href ?? `/games/${game.id}`,
        addedDate: new Date().toISOString(),
      });
      toast({
        title: "Added to favorites",
        description: `${game.title} has been added to your favorites.`,
      });
    }
  };

  if (variant === "icon") {
    return (
      <div className="relative group inline-block">
        <button
          onClick={handleToggleFavorite}
          className={`p-2 rounded-full border border-transparent bg-transparent hover:bg-transparent focus:outline-none ${className}`}
        >
          <Heart
            className={`h-5 w-5 transition ${
              isGameFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Tooltip label */}
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
          {isGameFavorite ? "Unfavorite" : "Favorite"}
        </span>
      </div>
    );
  }

  // Default variant
  return (
    <div className="relative group inline-block">
      <button onClick={handleToggleFavorite} className={`${className}`}>
        <Heart
          className={`h-5 w-5 transition ${
            isGameFavorite
              ? "fill-red-500 text-red-500"
              : "text-muted-foreground"
          }`}
        />

        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
          {isGameFavorite ? "Unfavorite" : "Favorite"}
        </span>
      </button>
    </div>
  );
}
