"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import GameRenderer from "../games/_clients/GameRenderer";

import { Navbar } from "@/components/navbar";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // const filteredGames = games.filter((game) =>
  //   game.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filters = [
    "All",
    "Racing",
    "Driving",
    "Car",
    "Drifting",
    "Multiplayer",
  ];

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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-6">
          {/* <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={filter === "All" ? "default" : "secondary"}
                  className="rounded-full"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameRenderer
                  {...game}
                  video={game.video ?? ""}
                  size={getCardSize(game.id)}
                  thumbnailUrl={game.image}                 
                />  
              ))
            ) : (
              <p className="text-muted-foreground">No games found.</p>
            )}
          </div> */}
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
