"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { SearchModal } from "@/components/SearchModal";
import VantaBackground from "@/components/VantaBackground";
import GameRenderer from "./games/_clients/GameRenderer";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  interface GameApiType {
    _id: string;
    title: string;
    slug: string;
    thumbnailUrl: string;
    video?: string;
    gameUrl: string;
  }

  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/games?status=active")
      .then((res) => res.json())
      .then((data: GameApiType[]) => {
        const mapped = data.map((game: GameApiType) => ({
          id: game._id,
          title: game.title,
          slug: game.slug,
          thumbnailUrl: game.thumbnailUrl,
          video: game.video,
          size: localStorage.getItem(`game_size_${game._id}`) || "small",
          gameUrl: game.gameUrl,
        }));
       setGames([...mapped].reverse());
      });
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      />
      <div className="relative w-full min-h-screen p-4">
        <VantaBackground />

        <div className="container mx-auto px-20 py-10">
          <div className="relative flex">
            <div className="fixed top-12 ">
              <Navbar onSearchClick={() => setIsSearchOpen(true)} />
            </div>

            <main className=" ml-28 w-full">
              <div className="grid auto-rows-[100px] grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
                {filteredGames.map((game) => (
                  <GameRenderer
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    slug={game.slug}
                    thumbnailUrl={game.thumbnailUrl}
                    video={game.video}
                    size={game.size}
                    type="home"
                  />
                ))}
              </div>
            </main>
          </div>
        </div>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <footer className="mt-16 py-6 bg-white/20 backdrop-blur text-black text-center">
          <div className="max-w-screen-xl mx-auto px-4 text-sm">
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
