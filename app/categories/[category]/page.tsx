"use client";

import Link from "next/link";
import React, { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import GameRenderer from "@/app/games/_clients/GameRenderer";
import { games } from "@/app/data/games";

export default function CategoryPageClient({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(
    (game) =>
      game.category.toLowerCase() === category.toLowerCase() &&
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filters = ["All", "Racing", "Driving", "Car", "Drifting", "Multiplayer"];

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
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{formattedCategory} Games</h1>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={filter === formattedCategory ? "default" : "secondary"}
                  className="rounded-full"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameRenderer
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.image}
                  video={game.video ?? ""}
                />
              ))
            ) : (
              <p className="text-muted-foreground">No games found.</p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
