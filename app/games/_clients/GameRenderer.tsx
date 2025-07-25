"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export type GameRendererProps = {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  video?: string;
  onPlay?: () => void;
  type?: string;
  size?: "small" | "medium" | "large";
  category?: string;
  playerCount?: number;
};

export default function GameRenderer({
  id,
  title,
  slug,
  thumbnailUrl,
  video,
  onPlay,
  type = "admin",
  size = "small",
}: GameRendererProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (!slug) {
      console.warn(`Slug is undefined for game:`, { id, title });
      return;
    }
    onPlay?.();
    router.push(`/games/${slug}`);
  };

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  // Responsive grid span based on size
  const getGridSpanClass = () => {
    switch (size) {
      case "large":
        return "col-span-3 row-span-3 aspect-square";
      case "medium":
        return "col-span-2 row-span-2 aspect-square";
      default:
        return "col-span-1 row-span-1 aspect-square";
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer group ${getGridSpanClass()}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={thumbnailUrl || "/placeholder.svg"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 group-hover:opacity-0"
      />
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
      )}
      <div className="absolute bottom-1 text-white font-bold text-sm shadow-sm px-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none text-center z-20">
        {title}
      </div>
    </div>
  );
}
