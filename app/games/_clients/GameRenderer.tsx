"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/app/data/games";

interface GameRendererProps
  extends Pick<
    Game,
    "id" | "title" | "image" | "video" | "playerCount" | "category"
  > {
  onPlay?: () => void;
  size?: "small" | "large";
}

export default function GameRenderer({
  id,
  title,
  image,
  video,
  onPlay,
  size = "small",
}: GameRendererProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    videoRef.current
      ?.play()
      .catch(() => console.warn("Video play was interrupted"));
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const sizeClasses =
    size === "large" ? "col-span-2 row-span-0 aspect-square" : "aspect-square";

  return (
       <Link
      href={`/games/${id}`}
      onClick={onPlay}
      className={`group relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${sizeClasses}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full bg-black">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {video && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            src={video}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </div>
      </div>
    </Link>

  );
}
