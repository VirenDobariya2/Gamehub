// ✅ HomePage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import { games as originalGames } from "./data/games";
import GameRenderer from "./games/_clients/GameRenderer";
import VantaBackground from "@/components/VantaBackground";

// Extend Game type locally to include size
export type Game = {
  id: string;
  title: string;
  image: string;
  category: string;
  tags?: string[];
  playerCount?: number;
  size?: "small" | "large";
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [user, setUser] = useState<{ _id: string; email: string; role?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (!user || !user.role) return;
    const recentKey = `recentGames_${user.role}_${user._id}`;
    const stored = localStorage.getItem(recentKey);
    if (stored) {
      setRecentGames(JSON.parse(stored) as Game[]);
    }
  }, [user]);

  const handleRecentGame = (game: Game) => {
    if (!user || !user.role) return;
    const recentKey = `recentGames_${user.role}_${user._id}`;
    const current = JSON.parse(localStorage.getItem(recentKey) || "[]") as Game[];
    const updated = [game, ...current.filter((g) => g.id !== game.id)].slice(0, 6);
    localStorage.setItem(recentKey, JSON.stringify(updated));
    setRecentGames(updated);
  };

 const filteredGames = originalGames
  .map((game, i) => ({
    ...game,
   size: (i % 3 === 1 ? "large" : "small") as "large" | "small",
  }))
  .filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossOrigin="anonymous"
      />
      <div className="relative min-h-screen flex flex-col overflow-hidden text-white bg-gradient-to-br from-cyan-200 via-blue-200 to-sky-100">
        <VantaBackground />

        <header className="sticky top-0 z-40 border-b bg-white/20 backdrop-blur">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-black">
                GameHub
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <UserNav />
            </div>
          </div>
        </header>

        <main className="flex-1 relative z-10">
          <section className="container px-4 py-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[1fr]">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameRenderer
                    key={game.id}
                    {...game}
                    onPlay={() => handleRecentGame(game)}
                  />
                ))
              ) : (
                <p className="text-center col-span-full text-black">No games found.</p>
              )}
            </div>
            <aside className="mx-auto w-full lg:mx-0 mt-5">
              <div className="rounded bg-white p-4 shadow">
                <h2 className="mb-2 text-lg font-semibold text-black">Sponsored</h2>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="1234567890"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </aside>
          </section>
        </main>

        <footer className="border-t py-6 bg-white/20 backdrop-blur text-black relative z-10">
          <div className="container px-4 text-center text-sm">
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
            <p>©2025 GameHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
