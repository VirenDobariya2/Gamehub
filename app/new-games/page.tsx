// app/games/new/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import { games } from "@/app/data/games";
import GameRenderer from "../games/_clients/GameRenderer";


export default function NewGamesPage() {
  const newGames = games.filter((game) => game.isNew);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = newGames.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortOptions = ["Newest First", "Oldest First", "Most Popular", "Highest Rated"];

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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">New Games</h1>
              <p className="text-muted-foreground">Discover the latest games added to GameHub</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="rounded-md border bg-background px-3 py-1 text-sm">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredGames.map((game) => (
                <div key={game.id} className="relative">
                  {game.isNew && (
                    <Badge className="absolute left-2 top-2 z-10 bg-primary text-primary-foreground">
                      NEW
                    </Badge>
                  )}
                  <GameRenderer
                    id={game.id}
                    title={game.title}
                    image={game.image}
                    video={game.video || ""}
                  />
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{game.category}</span>
                    {/* <span>{game.addedDate}</span> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No games found.</p>
          )}
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
