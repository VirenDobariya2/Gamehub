"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import VantaBackground from "@/components/VantaBackground";
import { Navbar } from "@/components/navbar";

interface Game {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  instructions?: string;
  qaList?: { question: string; answer: string }[];
  qaText?: string;
  _createdAt?: Date;
  rating?: number;
  votes?: number;
  tags?: string[];
  image?: string;
  thumbnailUrl?: string;
  category?: string;
  gameUrl: string;
  developer?: string;
}

interface GameClientProps {
  game: Game;
  recommendedGames: Game[];
}

export default function GameClient({
  game,
  recommendedGames,
}: GameClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<Game>(game);
  const [userReaction, setUserReactionState] = useState<
    "like" | "dislike" | null
  >(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const gameFrameRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const loadReaction = (gameId: string) => {
    const stored = localStorage.getItem(`reaction-${gameId}`);
    if (stored === "like" || stored === "dislike") {
      setUserReactionState(stored);
    } else {
      setUserReactionState(null);
    }
  };

  const setUserReaction = (reaction: "like" | "dislike" | null) => {
    if (reaction) {
      localStorage.setItem(`reaction-${currentGame._id}`, reaction);
    } else {
      localStorage.removeItem(`reaction-${currentGame._id}`);
    }
    setUserReactionState(reaction);
  };

  useEffect(() => {
    loadReaction(currentGame._id);
  }, [currentGame._id]);

  const handleLike = () =>
    setUserReaction(userReaction === "like" ? null : "like");
  const handleDislike = () =>
    setUserReaction(userReaction === "dislike" ? null : "dislike");

  const handleFullscreen = () => {
    const el = gameFrameRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(console.error);
      setIsFullscreen(false);
    }
  };

  const handleGameClick = (rec: Game) => {
    router.push(`/games/${rec.slug}`);
    setCurrentGame(rec);
  };

  const filtered = recommendedGames.filter((g) => g._id !== currentGame._id);
  const mid = Math.ceil(filtered.length / 2);
  const leftGames = filtered.slice(0, mid);
  const rightGames = filtered.slice(mid);

  return (
    <div className="relative w-full">
      <VantaBackground />
      <main className="container mx-auto px-20 py-10">
        <div className="flex flex-col lg:flex-row gap-4 ">
          {/* Left Sidebar */}
          <div className="hidden lg:flex flex-col overflow-y-auto items-center gap-4 z-50">
            <div className="fixed z-50">
              <Navbar onSearchClick={() => setIsSearchOpen(true)} />
            </div>
            <div className="mt-[110px]">
              <div className="grid gap-4">
                {leftGames.map((rec) => (
                  <div
                    key={rec._id}
                    onClick={() => handleGameClick(rec)}
                    className="cursor-pointer rounded-xl overflow-hidden"
                  >
                    <img
                      src={rec.thumbnailUrl}
                      alt={rec.title}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex-1">
            <div
              ref={gameFrameRef}
              className="relative aspect-video w-full  overflow-hidden shadow-lg bg-black"
            >
              <iframe
                key={currentGame._id}
                src={currentGame.gameUrl}
                className="w-full h-full border-none"
                title={`game-${currentGame._id}`}
                allowFullScreen
              />
            </div>

            {/* Bottom Info + Buttons */}
            <div className="flex items-center justify-between bg-white p-4 rounded-b-xl shadow ">
              {/* Left Info */}
              <div className="flex items-center gap-3">
                {currentGame.thumbnailUrl && (
                  <img
                    src={currentGame.thumbnailUrl}
                    alt={currentGame.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                )}
                <div>
                  <h2 className="text-md font-bold text-black">
                    {currentGame.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    by {currentGame.developer || "ChennaiGames"}
                  </p>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-6 text-gray-700 text-sm font-medium">
                <div
                  onClick={handleLike}
                  className={`cursor-pointer flex items-center gap-1 ${
                    userReaction === "like"
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`}
                >
                  👍{" "}
                  <span>
                    {currentGame.votes
                      ? Math.floor(currentGame.votes * 0.85).toLocaleString()
                      : "0"}
                  </span>
                </div>

                <div
                  onClick={handleDislike}
                  className={`cursor-pointer flex items-center gap-1 ${
                    userReaction === "dislike"
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`}
                >
                  👎{" "}
                  <span>
                    {currentGame.votes
                      ? Math.floor(currentGame.votes * 0.15).toLocaleString()
                      : "0"}
                  </span>
                </div>

                <div
                  onClick={() => alert("Report functionality coming soon.")}
                  className="cursor-pointer hover:text-red-500"
                  title="Report game"
                >
                  🚩
                </div>

                <div
                  onClick={handleFullscreen}
                  className="cursor-pointer hover:text-black"
                  title="Fullscreen"
                >
                  ⛶
                </div>
              </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden mt-4">
              <img
                src="/ads-banner.jpg"
                alt="Ad Banner"
                className="w-full h-20 object-cover"
              />
              <div className="text-center py-1 text-gray-600 text-sm">
                Advertisement
              </div>
            </div>
            {/* Mobile Game List */}
            <div className="grid grid-cols-3 gap-2 py-4 lg:hidden">
              {[...leftGames, ...rightGames].map((rec) => (
                <div
                  key={rec._id}
                  onClick={() => handleGameClick(rec)}
                  className="cursor-pointer rounded-xl overflow-hidden shadow"
                >
                  <img
                    src={rec.thumbnailUrl}
                    alt={rec.title}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:flex flex-col sticky top-0 w-52 overflow-y-auto gap-4">
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="/ads-banner.jpg"
                alt="Ad Banner"
                className="w-full h-52 object-cover"
              />
              <div className="text-center py-1 text-gray-600 text-sm">
                Advertisement
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {rightGames.map((rec) => (
                <div
                  key={rec._id}
                  onClick={() => handleGameClick(rec)}
                  className="cursor-pointer overflow-hidden rounded-xl bg-white shadow hover:shadow-md"
                >
                  <img
                    src={rec.thumbnailUrl}
                    alt={rec.title}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      if (e.target instanceof HTMLImageElement)
                        e.target.src = "/";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Description */}
        <div className="bg-white text-gray-800 rounded-xl shadow p-6 mt-4 space-y-4 mb-4">
          {currentGame.thumbnailUrl && (
            <img
              src={currentGame.thumbnailUrl}
              alt={currentGame.title}
              className="w-12 h-12 rounded-xl object-cover"
            />
          )}
          <h1 className="text-2xl font-bold">{currentGame.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-semibold">
              ⭐ {currentGame.rating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-sm text-gray-500">
              ({currentGame.votes?.toLocaleString() || 0} votes)
            </span>
          </div>
          <p className="text-gray-600">
            {currentGame.description || "No description provided."}
          </p>

          {currentGame.instructions ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: currentGame.instructions }}
            />
          ) : (
            <p className="text-sm text-gray-500">No instructions provided.</p>
          )}

          {Array.isArray(currentGame.qaList) &&
            currentGame.qaList.length > 0 && (
              <div className="space-y-2">
                {currentGame.qaList.map((qa, idx) => (
                  <div key={idx}>
                    <p className="font-semibold">{qa.question}</p>
                    <p className="text-sm text-gray-600">{qa.answer}</p>
                  </div>
                ))}
              </div>
            )}

          {Array.isArray(currentGame.tags) && currentGame.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentGame.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
