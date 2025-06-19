"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import { games } from "./data/games";
import GameRenderer from "./games/_clients/GameRenderer";

type Game = {
  id: string;
  title: string;
  image: string;
  category: string;
  tags?: string[];
  playerCount?: number;
};

const categories = [
  "All",
  "Racing",
  "Action",
  "Multiplayer",
  "Shooting",
  "Puzzle",
  "Strategy",
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [user, setUser] = useState<{ _id: string; email: string; role?: string } | null>(null);

  const allTags = Array.from(new Set(games.flatMap((game) => game.tags || [])));

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

  const filteredGames = games.filter((game: Game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    const matchesTag = !selectedTag || game.tags?.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossOrigin="anonymous"
      />
      <div className="flex min-h-screen flex-col bg-background text-white">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold">GameHub</Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <UserNav />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="container px-4 py-6">
            <div className="mb-5 flex flex-row gap-5 items-center">
              <h1 className="text-white font-medium text-lg max-w-28 px-4 object-cover border border-transparent hover:border-purple-600 cursor-pointer transition duration-200">
                Recently played <span className="text-center">:</span>
              </h1>
              {user && recentGames.length > 0 && (
                <div className="hidden lg:flex items-center gap-2">
                  {recentGames.map((game) => (
                    <Link href={`/games/${game.id}`} key={game.id}>
                      <img
                        src={game.image}
                        alt={game.title}
                        title={game.title}
                        className="h-16 w-20 rounded object-cover border-2 border-transparent hover:border-purple-600 cursor-pointer transition duration-200"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-gray-600 w-full mb-5"></div>

            <div className="mb-10 flex flex-col lg:flex-row gap-6">
              <div className="relative w-full lg:w-3/4 overflow-hidden rounded-lg">
                <img
                  src="/thubnail.png"
                  alt="Game Banner"
                  className="h-[400px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
                <div className="absolute inset-0 flex flex-col items-start justify-center p-8 z-10">
                  <h1 className="mb-4 text-4xl font-bold text-white">Explore the Best Free Online Games</h1>
                  <p className="mb-6 max-w-md text-lg text-white">
                    Dive into a world of endless fun with our curated collection of top-rated games.
                  </p>
                  <Button size="lg" className="bg-purple-600 text-white">Play Now</Button>
                </div>
              </div>

              <aside className="w-full lg:w-1/4 mt-4 lg:mt-0">
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
            </div>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {searchQuery ? `Results for "${searchQuery}"` : "All Games"}
                </h2>
                {!searchQuery && (
                  <Button variant="link" asChild>
                    <Link href="/categories">View Categories</Link>
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <GameRenderer
                      key={game.id}
                      {...game}
                      onPlay={() => handleRecentGame(game)}
                      category={selectedCategory}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground">No games found.</p>
                )}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold">
                {selectedTag ? `Recommended - "${selectedTag}"` : "Top Recommendations"}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {(selectedTag ? games.filter((g: Game) => g.tags?.includes(selectedTag)) : games)
                  .slice(0, 3)
                  .map((game) => (
                    <div key={game.id} className="rounded-lg bg-muted p-3 hover:shadow-lg transition">
                      <img src={game.image} alt={game.title} className="rounded mb-2" />
                      <h3 className="text-lg font-semibold">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">{game.playerCount || "0"} players</p>
                    </div>
                  ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={tag === selectedTag ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSelectedTag((prev) => (prev === tag ? null : tag))}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </section>

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

        <footer className="border-t py-6">
          <div className="container px-4 text-center text-sm text-muted-foreground">
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
