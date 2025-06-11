import Link from 'next/link'
import { games } from '@/data/games'

export const metadata = { title: 'All Games – GameHub' }

export default function GamesList() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Games</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((g) => (
          <Link
            key={g.id}
            href={`/games/${g.id}`}
            className="rounded-lg border hover:shadow-lg transition"
          >
            <img src={g.thumb} alt={g.title} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-3 space-y-1">
              <h2 className="font-semibold">{g.title}</h2>
              <p className="text-xs text-muted-foreground line-clamp-2">{g.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
