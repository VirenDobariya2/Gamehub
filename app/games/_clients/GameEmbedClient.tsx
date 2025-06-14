"use client";

import dynamic from "next/dynamic";
import { Suspense, forwardRef } from "react";

interface GameEmbedClientProps {
  embedWrapper: string;
}

// Wrap in forwardRef so the parent can trigger fullscreen on it
const GameEmbedClient = forwardRef<HTMLDivElement, GameEmbedClientProps>(
  ({ embedWrapper }, ref) => {
    const DynamicWrapper = dynamic(() => import(`../_embed/${embedWrapper}`), {
      ssr: false,
      loading: () => <p className="p-8 text-white">Loading game...</p>,
    });

    return (
      <div ref={ref} className="w-full h-full" id="fullscreen-game">
        <Suspense fallback={<p className="p-8 text-white">Loading game...</p>}>
          <DynamicWrapper />
        </Suspense>
      </div>
    );
  }
);

GameEmbedClient.displayName = "GameEmbedClient";
export default GameEmbedClient;
