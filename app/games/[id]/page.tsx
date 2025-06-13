"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import { FavoriteButton } from "@/components/favorite-button";
import { Star, Play } from "lucide-react";

import { games } from "@/app/data/games";
import SkyRidersWrapper from "../_embed/SkyRidersWrapper";

interface GamePageProps {
  params: Promise<{ id: string }>;
}

export default function GamePage({ params }: GamePageProps) {
  const { id } = use(params);
  const [isStarted, setIsStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const game = games.find((g) => g.id === id);
  if (!game) return notFound();

  const recommended = games
    .filter((g) => g.id !== game.id)
    .map((g) => {
      let score = g.category === game.category ? 3 : 0;
      game.tags.forEach((tag) => {
        if (g.tags.includes(tag)) score += 1;
      });
      return { ...g, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

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
             <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <UserNav />
            </div>
          </div>
        </header>

        <main className="container flex-1 px-4 py-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                {!isStarted ? (
                  <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
                    >
                      <source src={game.video} type="video/mp4" />
                    </video>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-64 h-40 object-cover rounded shadow-lg mb-6"
                      />
                      <h1 className="text-4xl font-bold text-white drop-shadow mb-4">
                        {game.title}
                      </h1>
                      <Button
                        onClick={() => setIsStarted(true)}
                        className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg rounded-full text-white"
                      >
                        <Play className="mr-2" size={20} /> Play Now
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-4 py-3 flex justify-between items-center flex-wrap gap-3 z-10">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">👍 Like</Button>
                        <Button variant="ghost" size="sm">👎 Dislike</Button>
                        <FavoriteButton game={game} className="text-white" variant="outline" />
                        <Button variant="ghost" size="sm">💬 Feedback</Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">🎮 Controls</Button>
                        <Button variant="ghost" size="sm">📱 Mobile</Button>
                        <Button variant="ghost" size="sm">⛶ Fullscreen</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-start">
                    <div className="relative aspect-video w-full  rounded-lg overflow-hidden shadow-xl">
                      <SkyRidersWrapper />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <aside className="mx-auto w-full max-w-xs lg:mx-0 lg:w-64">
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

              <div>
                <h2 className="mb-4 text-lg font-bold">You may also like</h2>
                <div className="grid grid-cols-2 gap-4">
                  {recommended.map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/games/${rec.id}`}
                      className="relative group overflow-hidden rounded-lg border bg-background shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="h-24 w-full object-cover group-hover:brightness-50 transition duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-semibold bg-black/70 px-2 py-1 rounded">
                          {rec.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-10">
            <h1 className="mb-4 text-3xl font-bold">{game.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{game.description}</p>

            <div className="mb-8 flex flex-wrap gap-8">
              <div className="flex items-center gap-4">
                <span className="text-6xl font-bold">{game.rating}</span>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= Math.floor(game.rating)
                            ? "fill-primary text-primary"
                            : star === Math.ceil(game.rating) && game.rating % 1 !== 0
                            ? "fill-primary/50 text-primary"
                            : "fill-none text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {game.reviews?.toLocaleString?.() || "0"} reviews
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2 min-w-[200px]">
                {game.ratingDistribution.map((rd) => (
                  <div key={rd.stars} className="flex items-center gap-2">
                    <span className="w-4 text-sm font-medium">{rd.stars}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${rd.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm text-muted-foreground">
                      {rd.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 flex items-center gap-4">
              <Button variant="outline">Share Game</Button>
            </div>

            <div className="mb-12">
              <h2 className="mb-4 text-xl font-bold">Tags</h2>
              <div className="flex flex-wrap gap-3">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/categories/${tag.toLowerCase()}`}
                    className="rounded-lg bg-secondary px-4 py-1.5 text-sm font-medium"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <aside className="mx-auto w-auto h-auto mt-8">
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
