"use client";

import { use, useEffect, useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";
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
import VantaBackground from "@/components/VantaBackground";

export default function GamePage() {
  const params = useParams();
  const id = String(params?.id);
  const [isStarted, setIsStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDislikeModal, setShowDislikeModal] = useState(false);
  const [showLoginSidebar, setShowLoginSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [feedback, setFeedback] = useState("");
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

  const handleDislikeClick = () => {
    if (isLoggedIn) {
      setShowDislikeModal(true);
    } else {
      setShowLoginSidebar(true);
    }
  };

  const handleTellUsWhy = () => {
    if (isLoggedIn) {
      setShowDislikeModal(false);
      setShowFeedbackBox(true);
    } else {
      setShowDislikeModal(false);
      setShowLoginSidebar(true);
    }
  };

  const handleFullscreen = () => {
    const el = gameFrameRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen", err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!game) return notFound();

  // Split games for left and right columns
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

  const mid = Math.ceil(recommended.length / 2);
  const leftGames = recommended.slice(0, mid);
  const rightGames = recommended.slice(mid);

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

          {/* Main Game Area */}
          <main className="relative z-10 px-2 py-4 lg:px-6 lg:py-10">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Sidebar */}
              <aside className="hidden lg:block w-1/6">
                <h2 className="text-sm font-semibold mb-2 text-white">
                  Popular Games
                </h2>
                <div className="flex flex-col gap-4">
                  {leftGames.map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/games/${rec.id}`}
                      className="overflow-hidden rounded-lg bg-white shadow hover:shadow-md"
                    >
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-24 object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </aside>

              {/* Center Game */}
              <section className="w-full lg:w-2/3">
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
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0 filter blur-sm"
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
                    </div>
                  ) : (
                    <GameEmbedClient embedWrapper={game.embedWrapper} />
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                    <div
                      onClick={handleLike}
                      className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${
                        userReaction === "like"
                          ? "bg-green-600 text-white"
                          : "hover:bg-green-100 hover:text-green-700"
                      }`}
                    >
                      👍 {likes.toLocaleString()}
                    </div>
                    <div
                      onClick={handleDislikeClick}
                      className={`cursor-pointer px-3 py-1 rounded-full border text-sm ${
                        userReaction === "dislike"
                          ? "bg-red-600 text-white"
                          : "hover:bg-red-100 hover:text-red-700"
                      }`}
                    >
                      👎 {dislikes}
                    </div>
                    <FavoriteButton
                      game={game}
                      variant="icon"
                      className="cursor-pointer px-3 py-1 rounded-full border text-sm"
                    />
                    <div
                      onClick={handleFullscreen}
                      className="cursor-pointer px-3 py-1 rounded-full border text-sm hover:bg-gray-200 hover:text-black"
                    >
                      ⛶
                    </div>
                  </div>
                </div>

                <div className="mt-6 w-full max-w-5xl bg-white rounded shadow p-4">
                  <h2 className="text-lg font-semibold mb-2">Sponsored</h2>
                  <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                    data-ad-slot="1234567890"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  />
                </div>
              </section>

              {/* Right Sidebar */}
              <aside className="hidden lg:block w-1/6">
                <h2 className="text-sm font-semibold mb-2 text-white">
                  You May Also Like
                </h2>
                <div className="flex flex-col gap-4">
                  {rightGames.map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/games/${rec.id}`}
                      className="overflow-hidden rounded-lg bg-white shadow hover:shadow-md"
                    >
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-24 object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </aside>
            </div>

            <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col md:flex-row-reverse gap-6 items-start mt-5">
              <img
                src={game.image}
                alt={game.title}
                className="w-96 h-96 object-cover rounded"
              />

              <div className="flex-1">
                <h1 className="text-xl font-bold mb-2">{game.title}</h1>

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

                <p className="text-sm text-gray-700 mb-4">{game.description}</p>
                <p>
                  <strong>Category:</strong> {game.category}
                </p>
                <p>
                  <strong>Release Date:</strong> {game.releaseDate || "Unknown"}
                </p>
                <p>
                  <strong>Developer:</strong> {game.developer || "Unknown"}
                </p>
                <p>
                  <strong>Technology:</strong> {game.technology || "Unknown"}
                </p>
                <p>
                  <strong>Platforms:</strong>{" "}
                  {game.platforms?.join(", ") || "Unknown"}
                </p>
              </div>
            </div>

            {showDislikeModal && (
              <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#2c2c34] text-white p-4 rounded-xl z-50 shadow-lg">
                <p className="mb-2 font-medium">Don't like this game?</p>
                <button
                  onClick={handleTellUsWhy}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
                >
                  Tell us why
                </button>
              </div>
            )}

            {showFeedbackBox && (
              <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-96 bg-white text-black p-4 rounded-xl shadow-xl z-50">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-24 p-2 border rounded mb-2"
                  placeholder="Tell us what you didn’t like..."
                />
                <Button
                  onClick={() => {
                    handleDislike();
                    setShowFeedbackBox(false);
                    alert("Thanks for your feedback!");
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Submit
                </Button>
              </div>
            )}

            {showLoginSidebar && (
              <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-6 z-50">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <Button
                  className="w-full bg-blue-600 text-white"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setShowLoginSidebar(false);
                  }}
                >
                  Simulate Login
                </Button>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="border-t py-6 text-center text-sm px-4 text-muted-foreground">
            <p>© 2025 GameHub. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
