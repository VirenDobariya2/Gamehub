"use client";

import { use, useEffect, useRef, useState } from "react";
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
  params: Promise<{ id: string }>;
}

export default function GamePage({ params }: GamePageProps) {
  const { id } = use(params);
  const [isStarted, setIsStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );
  const game = games.find((g) => g.id === id);
  const gameFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`reaction-${id}`);
    if (stored === "like" || stored === "dislike") {
      setUserReaction(stored);
    }
  }, [id]);

  useEffect(() => {
    if (userReaction) {
      localStorage.setItem(`reaction-${id}`, userReaction);
    } else {
      localStorage.removeItem(`reaction-${id}`);
    }
  }, [userReaction, id]);

  const handleLike = () => {
    if (userReaction === "like") {
      setLikes((prev) => Math.max(prev - 1, 0));
      setUserReaction(null);
    } else {
      if (userReaction === "dislike") {
        setDislikes((prev) => Math.max(prev - 1, 0));
      }
      setLikes((prev) => prev + 1);
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setDislikes((prev) => Math.max(prev - 1, 0));
      setUserReaction(null);
    } else {
      if (userReaction === "like") {
        setLikes((prev) => Math.max(prev - 1, 0));
      }
      setDislikes((prev) => prev + 1);
      setUserReaction("dislike");
    }
  };

  const handleFullscreen = () => {
    const el = gameFrameRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if ((el as any).webkitRequestFullscreen)
      (el as any).webkitRequestFullscreen();
    else if ((el as any).mozRequestFullScreen)
      (el as any).mozRequestFullScreen();
    else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();
  };

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
    .slice(0, 8);

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
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <UserNav />
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <main className="container px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Game Area Left */}
            <div className="w-full lg:w-3/4">
              <div
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-black"
                ref={gameFrameRef}
              >
                {!isStarted ? (
                  <div className="relative w-full h-full">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
                    >
                      <source src={game.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-32 h-32 object-cover rounded shadow-md mb-4"
                      />
                      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
                        {game.title}
                      </h1>
                      <Button
                        onClick={() => setIsStarted(true)}
                        className="bg-purple-600 hover:bg-purple-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full text-white"
                      >
                        <Play className="mr-2" size={20} /> Play Now
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 mb-4 flex flex-wrap justify-center gap-3 px-4 bg-black/60 backdrop-blur rounded-lg py-2">
                      <Button
                        variant={
                          userReaction === "like" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={handleLike}
                      >
                        👍 ({likes})
                      </Button>
                      <Button
                        variant={
                          userReaction === "dislike" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={handleDislike}
                      >
                        👎 ({dislikes})
                      </Button>
                      <FavoriteButton
                        game={game}
                        variant="outline"
                        className="text-white"
                      />
                      <Button variant="ghost" size="sm">
                        💬
                      </Button>
                      <Button
                        onClick={handleFullscreen}
                        variant="ghost"
                        size="sm"
                      >
                        ⛶
                      </Button>
                    </div>
                  </div>
                ) : (
                  <GameEmbedClient embedWrapper={game.embedWrapper} />
                )}
              </div>

              {/* Game Info and Ads Below */}
              <div className="mt-8 flex flex-col lg:flex-row gap-6">
                <section className="flex-1">
                  <h1 className="mb-2 text-2xl font-bold">{game.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold">{game.rating}</span>
                    <div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${
                              star <= Math.floor(game.rating)
                                ? "fill-primary text-primary"
                                : star === Math.ceil(game.rating) &&
                                  game.rating % 1 !== 0
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
                  <div className="flex flex-col items-start gap-4 mb-4">
                    <span className="text-sm text-muted-foreground">
                      Category:
                      <Link
                        href={`/categories/${game.category.toLowerCase()}`}
                        className="text-primary hover:underline"
                      >
                        {game.category}
                      </Link>
                    </span>
                   <span className="text-sm text-muted-foreground">
                      Release Date:{" "}
                      {game.releaseDate
                        ? new Date(game.releaseDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "Unknown"}
                    </span>
                    
                    <span className="text-sm text-muted-foreground">
                      Developer: {game.developer || "Unknown"}
                    </span> 
                   
                    <span className="text-sm text-muted-foreground">
                      Technology:{game.technology || "Unknown"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Platforms:{" "}
                      {game.platforms?.length
                        ? game.platforms.join(", ")
                        : "Unknown"}
                    </span>
                  </div>   
                  <div className="flex flex-wrap gap-3">
                      Tags:{" "}
                    {game.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/categories/${tag.toLowerCase()}`}
                        className="rounded bg-secondary px-3 py-1 text-sm font-medium"
                      >
                        {tag}
                      </Link>
                    ))}   
                  </div>
                  
                  
                <div className="mt-10">
                  {game.description && (
                    <section className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Description</h2>
                      <p className="text-sm text-muted-foreground">
                        {game.description}
                      </p>
                    </section>
                  )}

                  {/* Game Details */}
                  {Array.isArray(game.howToPlay) &&
                    game.howToPlay.length > 0 && (
                      <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                          How to Play
                        </h2>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {game.howToPlay.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                  {/* Controls */}
                  {Array.isArray(game.controls) && game.controls.length > 0 && (
                    <section className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Controls</h2>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {game.controls.map((ctrl, i) => (
                          <li key={i}>
                            <strong>{ctrl.key}</strong>: {ctrl.action}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Features */}
                  {Array.isArray(game.features) && game.features.length > 0 && (
                    <section className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Features</h2>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {game.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* FAQ */}
                  {Array.isArray(game.faq) && game.faq.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold mb-2">FAQs</h2>
                      {game.faq.map((item, i) => (
                        <div key={i} className="mb-2">
                          <p className="font-medium">{item.question}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </section>
                  )}

                  </div>
                </section>

                {/* Ads Box */}
                <aside className="flex flex-col gap-4 w-full lg:w-1/4">
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
            </div>

            {/* Recommended Games Right */}
            <aside className="w-full lg:w-1/4">
              <h2 className="mb-4 text-lg font-bold">You may also like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
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
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-6 text-center text-sm px-4 text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
