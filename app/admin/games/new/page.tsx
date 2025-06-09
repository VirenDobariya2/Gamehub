"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Plus } from "lucide-react"

export default function NewGamePage() {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    category: "",
    gameUrl: "",
    thumbnailUrl: "",
    instructions: "",
  })

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the game data to your backend
    console.log("Game data:", { ...gameData, tags })
    alert("Game submitted for review!")
  }

  const categories = [
    "Action",
    "Adventure",
    "Puzzle",
    "Strategy",
    "Sports",
    "Racing",
    "Shooter",
    "RPG",
    "Simulation",
    "Arcade",
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
        <div className="container max-w-4xl px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Add New Game</h1>
            <p className="text-muted-foreground">Submit a new game to GameHub for review</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Game Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Game Title *</Label>
                    <Input
                      id="title"
                      value={gameData.title}
                      onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
                      placeholder="Enter game title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={gameData.category}
                      onChange={(e) => setGameData({ ...gameData, category: e.target.value })}
                      className="w-full rounded-md border bg-background px-3 py-2"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={gameData.description}
                    onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                    placeholder="Describe your game..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gameUrl">Game URL *</Label>
                  <Input
                    id="gameUrl"
                    type="url"
                    value={gameData.gameUrl}
                    onChange={(e) => setGameData({ ...gameData, gameUrl: e.target.value })}
                    placeholder="https://example.com/game.html"
                    required
                  />
                  <p className="text-xs text-muted-foreground">URL to your HTML5 game file or embed code</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnailUrl">Thumbnail URL *</Label>
                  <Input
                    id="thumbnailUrl"
                    type="url"
                    value={gameData.thumbnailUrl}
                    onChange={(e) => setGameData({ ...gameData, thumbnailUrl: e.target.value })}
                    placeholder="https://example.com/thumbnail.jpg"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Recommended size: 350x200 pixels</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Game Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={gameData.instructions}
                    onChange={(e) => setGameData({ ...gameData, instructions: e.target.value })}
                    placeholder="How to play your game..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Submit Game
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/games">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
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
