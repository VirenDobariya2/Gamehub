"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { Plus } from "lucide-react";

/**
 * @typedef {Object} Game
 * @property {string} _id
 * @property {string} title
 * @property {string} category
 * @property {string} status
 * @property {string} createdAt
 */

export default function AdminGamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchGames = async () => {
    try {
      const res = await fetch("/api/admin/games");
      if (!res.ok) throw new Error("Failed to fetch games");
      const data = await res.json();

      // ❌ No sorting — just use as-is (line-by-line as inserted)
     setGames([...data].reverse());
    } catch (err) {
      console.error(err);
      setError("Failed to load games.");
    } finally {
      setLoading(false);
    }
  };
  fetchGames();
}, []);

  const deleteGame = async (id) => {
    try {
      const res = await fetch(`/api/admin/games/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete game");
      setGames((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete game.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/games/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update status");
      }

      const updatedGame = await res.json();

      setGames((prev) =>
        prev.map((g) => (g._id === id ? { ...g, status: updatedGame.status } : g))
      );
    } catch (err) {
      console.error("toggleStatus error:", err);
      setError(err.message || "Failed to update status.");
    }
  };

  const getSize = (id) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`game_size_${id}`) || "small";
    }
    return "small";
  };

  const toggleSize = (id) => {
    const current = getSize(id);
    const sizeCycle = ["small", "medium", "large"];
    const currentIndex = sizeCycle.indexOf(current);
    const newSize = sizeCycle[(currentIndex + 1) % sizeCycle.length];
    localStorage.setItem(`game_size_${id}`, newSize);
    setGames([...games]); // trigger re-render
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Manage Games</h1>
            <Button asChild>
              <Link href="/admin/games/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Game
              </Link>
            </Button>
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <Card className="border text-white">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                {loading ? (
                  <p className="p-6 text-sm text-muted-foreground">Loading...</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-medium">Game</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Status</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Actions</th>
                        <th className="px-6 py-4 text-center text-sm font-medium">Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {games.map((game) => (
                        <tr key={game._id} className="border-b last:border-b-0">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">{game.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {game.category} • {new Date(game.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <Badge
                              variant={game.status === "active" ? "default" : "secondary"}
                              className={game.status === "active" ? "bg-green-600" : "bg-gray-400"}
                              onClick={() => toggleStatus(game._id, game.status)}
                              style={{ cursor: "pointer" }}
                            >
                              {game.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/games/edit/${game._id}`}>Edit</Link>
                              </Button>
                              <span className="text-muted-foreground">|</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => deleteGame(game._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <Badge
                              onClick={() => toggleSize(game._id)}
                              className="cursor-pointer bg-blue-100 text-black"
                            >
                              {getSize(game._id)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
