"use client";

import Link from "next/link";
import React, { useState, use } from "react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import { games } from "@/app/data/games";
import GameRenderer from "@/app/games/_clients/GameRenderer";

export default function CategoryPageClient({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(
    (game) =>
      game.category.toLowerCase() === category.toLowerCase() &&
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-200 via-blue-200 to-sky-100 text-black">
      <header className="sticky top-0 z-40 border-b bg-white/30 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-black">
              <span className="text-xl">GameHub</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">{formattedCategory} Games</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameRenderer
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.image}
                  video={game.video ?? ""}
                  category={game.category}
                />
              ))
            ) : (
              <p className="text-muted-foreground">No games found in this category.</p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-white/30 backdrop-blur">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
