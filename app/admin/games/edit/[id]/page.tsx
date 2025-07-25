"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditGamePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState({
    title: "",
    category: "",
    description: "",
    gameUrl: "",
    thumbnailUrl: "",
    video: "",
    instructions: "",
    status: "active",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [qaList, setQaList] = useState([{ question: "", answer: "" }]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`/api/admin/games/${id}`);
        if (!res.ok) throw new Error("Failed to fetch game");
        const data = await res.json();

        // Avoid setting _id
        setGameData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          gameUrl: data.gameUrl || "",
          thumbnailUrl: data.thumbnailUrl || "",
          video: data.video || "",
          instructions: data.instructions || "",
          status: data.status || "active",
        });

        setTags(data.tags || []);
        setQaList(data.qaList || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGame();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...gameData,
      instructions: gameData.instructions.trim(),
      tags,
      qaList,
    };

    console.log("Sending update payload:", payload);

    try {
      const res = await fetch(`/api/admin/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      router.push("/admin/games");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Game</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* All game fields (same as new page, just using gameData state) */}
        <div>
          <Label>Game Title</Label>
          <Input
            value={gameData.title}
            onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            value={gameData.category}
            onChange={(e) => setGameData({ ...gameData, category: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={gameData.description}
            onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>
        <div>
          <Label>Instructions</Label>
          <Textarea
            value={gameData.instructions}
            onChange={(e) => setGameData({ ...gameData, instructions: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>
        <div>
          <Label>Thumbnail URL</Label>
          <Input
            value={gameData.thumbnailUrl}
            onChange={(e) => setGameData({ ...gameData, thumbnailUrl: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>
        <div>
          <Label>Video URL</Label>
          <Input
            value={gameData.video}
            onChange={(e) => setGameData({ ...gameData, video: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>
        <div>
          <Label>Game URL</Label>
          <Input
            value={gameData.gameUrl}
            onChange={(e) => setGameData({ ...gameData, gameUrl: e.target.value })}
            className="bg-black text-white border border-gray-700"
          />
        </div>

        {/* Tags */}
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newTag && !tags.includes(newTag)) {
                    setTags([...tags, newTag]);
                    setNewTag("");
                  }
                }
              }}
              className="bg-black text-white border border-gray-700"
              placeholder="Add tag & press Enter"
            />
            <Button
              type="button"
              onClick={() => {
                if (newTag && !tags.includes(newTag)) {
                  setTags([...tags, newTag]);
                  setNewTag("");
                }
              }}
            >
              Add Tag
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded bg-gray-800 text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Q&A */}
        <div>
          <Label>Q&A</Label>
          {qaList.map((qa, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-900">
              <Input
                value={qa.question}
                onChange={(e) => {
                  const updated = [...qaList];
                  updated[index].question = e.target.value;
                  setQaList(updated);
                }}
                placeholder="Question"
                className="mb-2 bg-black text-white border border-gray-700"
              />
              <Textarea
                value={qa.answer}
                onChange={(e) => {
                  const updated = [...qaList];
                  updated[index].answer = e.target.value;
                  setQaList(updated);
                }}
                placeholder="Answer"
                className="bg-black text-white border border-gray-700"
              />
            </div>
          ))}
          <Button type="button" onClick={() => setQaList([...qaList, { question: "", answer: "" }])}>
            ➕ Add More Q&A
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Update Game
        </Button>
      </form>
    </div>
  );
}
