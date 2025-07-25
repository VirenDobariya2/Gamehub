"use client";

import Link from "next/link";
import React, { useState, use } from "react";
import { games } from "@/app/data/games";
import GameRenderer from "@/app/games/_clients/GameRenderer";
import { Navbar } from "@/components/navbar";

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

  const getCardSize = (gameId: string): "small" | "medium" | "large" => {
    if (typeof window === "undefined") return "small";
    return (
      (localStorage.getItem(`game_size_${gameId}`) as
        | "small"
        | "medium"
        | "large") || "small"
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-200 via-blue-200 to-sky-100 text-black">
      <main className="flex-1">
        <div className="container px-4 py-6">
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <h1 className="text-3xl font-bold mb-6">{formattedCategory} Games</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameRenderer
                  {...game}
                  video={game.video ?? ""}
                  size={getCardSize(game.id)}
                />
              ))
            ) : (
              <p className="text-muted-foreground">
                No games found in this category.
              </p>
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
