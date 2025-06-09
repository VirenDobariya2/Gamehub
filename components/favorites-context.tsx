"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface FavoriteGame {
  id: string
  title: string
  image: string
  href: string
  category: string
  rating: number
  addedDate: string
}

interface FavoritesContextType {
  favorites: FavoriteGame[]
  addToFavorites: (game: FavoriteGame) => void
  removeFromFavorites: (gameId: string) => void
  isFavorite: (gameId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteGame[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("gamehub-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("gamehub-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (game: FavoriteGame) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === game.id)) {
        return prev // Already in favorites
      }
      return [...prev, { ...game, addedDate: new Date().toISOString() }]
    })
  }

  const removeFromFavorites = (gameId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== gameId))
  }

  const isFavorite = (gameId: string) => {
    return favorites.some((fav) => fav.id === gameId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
