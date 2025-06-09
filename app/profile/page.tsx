import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { SearchBar } from "@/components/search-bar"
import { GameCard } from "@/components/game-card"

export const metadata: Metadata = {
  title: "My Games - GameHub",
  description: "View your played games, favorites, and settings on GameHub.",
}

export default function ProfilePage() {
  // In a real app, you would fetch the user's games
  const recentlyPlayed = [
    {
      id: "cosmic-clash",
      title: "Cosmic Clash",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/cosmic-clash",
    },
    {
      id: "mystic-run",
      title: "Mystic Run",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/mystic-run",
    },
    {
      id: "puzzle-quest",
      title: "Puzzle Quest",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/puzzle-quest",
    },
    {
      id: "speed-racer",
      title: "Speed Racer",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/speed-racer",
    },
    {
      id: "dragon-slayer",
      title: "Dragon Slayer",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/dragon-slayer",
    },
    {
      id: "galaxy-wars",
      title: "Galaxy Wars",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/galaxy-wars",
    },
  ]

  const allPlayed = [
    ...recentlyPlayed,
    {
      id: "space-invaders",
      title: "Space Invaders",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/space-invaders",
    },
    {
      id: "alien-attack",
      title: "Alien Attack",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/alien-attack",
    },
    {
      id: "robot-rumble",
      title: "Robot Rumble",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/robot-rumble",
    },
    {
      id: "knights-quest",
      title: "Knight's Quest",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/knights-quest",
    },
    {
      id: "wizards-duel",
      title: "Wizard's Duel",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/wizards-duel",
    },
    {
      id: "jungle-adventure",
      title: "Jungle Adventure",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/jungle-adventure",
    },
  ]

  const favorites = [
    {
      id: "cosmic-clash",
      title: "Cosmic Clash",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/cosmic-clash",
    },
    {
      id: "speed-racer",
      title: "Speed Racer",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/speed-racer",
    },
    {
      id: "dragon-slayer",
      title: "Dragon Slayer",
      image: "/placeholder.svg?height=200&width=350",
      href: "/games/dragon-slayer",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-card px-4 py-6 md:flex">
          <div className="mb-6 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="text-xl">GameHub</span>
            </Link>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            <Link href="/" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <Link href="/categories" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Categories
            </Link>
            <Link href="/new-games" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              New Games
            </Link>
            <Link href="/trending" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                <path d="m13 12-3 5h4l-3 5" />
              </svg>
              Top Games
            </Link>
            <Link href="/profile" className="sidebar-link active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              My Games
            </Link>
          </nav>

          <div className="mt-auto">
            <Link href="/settings" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur md:hidden">
            <div className="container flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2 font-bold">
                  <span className="text-xl">GameHub</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <SearchBar />
                <UserNav />
              </div>
            </div>
          </header>

          <main className="container px-4 py-6">
            <h1 className="mb-6 text-3xl font-bold">My Games</h1>

            <Tabs defaultValue="played" className="mb-8">
              <TabsList className="mb-4 border-b pb-px">
                <TabsTrigger
                  value="played"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Played
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Favorites
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="played" className="space-y-8">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Recently Played</h2>
                  <div className="game-grid">
                    {recentlyPlayed.map((game) => (
                      <GameCard key={game.id} id={game.id} title={game.title} image={game.image} href={game.href} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-xl font-semibold">All Played</h2>
                  <div className="game-grid">
                    {allPlayed.map((game) => (
                      <GameCard key={game.id} id={game.id} title={game.title} image={game.image} href={game.href} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="favorites">
                <div className="game-grid">
                  {favorites.map((game) => (
                    <GameCard key={game.id} id={game.id} title={game.title} image={game.image} href={game.href} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        Username
                      </label>
                      <Input id="username" defaultValue="username" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" defaultValue="user@example.com" />
                    </div>

                    <Button>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
