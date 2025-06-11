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
import GameEmbedClient from "../_clients/GameEmbedClient";

interface GamePageProps {
  params: {
    id: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = games.find((g) => g.id === params.id);
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
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <span className="text-xl">GameHub</span>
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              <UserNav />
            </div>
          </div>
        </header>

        <main className="container flex-1 px-4 py-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Game Embed */}
            <div className="flex-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <GameEmbedClient embedWrapper={game.embedWrapper} />
              </div>

              {/* Game Highlight Video */}
              {game.video && (
                <div className="mt-6">
                  <h2 className="mb-2 text-xl font-bold">Game Highlight</h2>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      className="h-full w-full"
                      src={game.video}
                      title="Game Highlight Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Ad */}
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
            </aside>
          </div>

          {/* Game Info */}
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

              {/* Rating Distribution */}
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
              <FavoriteButton game={game} className="text-red-500"  variant="outline" />
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

          {/* Recommended */}
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold">You may also like</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {recommended.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/games/${rec.id}`}
                  className="overflow-hidden rounded-lg border bg-background shadow-sm transition hover:shadow-md"
                >
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">{rec.category}</p>
                    <p className="font-semibold">{rec.title}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-2xl">
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
