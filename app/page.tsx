// app/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import GameRenderer from "./games/_clients/GameRenderer";
import { games } from "./data/games";
import Script from "next/script";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
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
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 ">
        <section className="container px-4 py-6">
          <div className="relative mb-10 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
           <video
              className="h-[400px] w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="/thumbnail.png"
              src="/playgame.mp4"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-8">
              <h1 className="mb-4 text-4xl font-bold">
                Play the best free games online
              </h1>
              <p className="mb-6 max-w-md text-lg text-muted-foreground">
                Thousands of free games to play directly in your browser. No
                downloads, no installs.
              </p>
              <Button size="lg" asChild>
                <Link href="/categories">Browse Games</Link>
              </Button>
            </div>
            <aside className="mx-auto w-full  lg:mx-0 mt-5">
              <div className="rounded bg-white p-4 shadow">
                <h2 className="mb-2 text-lg font-semibold">Sponsored</h2>
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

          <div className="mb-10">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameRenderer
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    image={game.thumbnail ?? game.image}
                    video={game.video}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">No games found.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
}
