import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchBar } from "@/components/search-bar";
import GameRenderer from "./games/_clients/GameRenderer";
import { games } from "./data/games";


export const metadata: Metadata = {
  title: "GameHub - Play Free Online Games",
  description:
    "Play thousands of free games directly in your browser. No downloads, no installs – just play!",
};

export default function HomePage() {
  return (
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

      {/* Main */}
      <main className="flex-1">
        <section className="container px-4 py-6">
          {/* Hero */}
          <div className="relative mb-10 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
            <img
              src="/thubnail.png"
              alt="Hero Banner"
              className="h-[400px] w-full object-cover"
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
          </div>

          {/* Grid of games */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Games</h2>
              <Button variant="link" asChild>
                <Link href="/categories">View Categories</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <GameRenderer
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={(game as any).thumbnail ?? (game as any).image}
                  video={game.video}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 GameHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}