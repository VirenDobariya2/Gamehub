"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface GameRendererProps {
  id: string;
  title: string;
  image: string;
  video?: string;
}

export default function GameRenderer({ id, title, image, video }: GameRendererProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Link
      href={`/games/${id}`}
      className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200"
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.play().catch((err) => console.warn("Video play interrupted:", err));
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* ✅ Only render video if provided */}
        {video && (
          <video
            ref={videoRef}
            muted
            loop
            preload="none"
            src={video}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
          />
        )}
      </div>

      <div className="p-3 bg-white dark:bg-zinc-800">
        <h2 className="text-sm font-semibold line-clamp-1">{title}</h2>
      </div>
    </Link>
  );
}
