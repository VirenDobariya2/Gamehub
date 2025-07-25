import { MongoClient } from "mongodb";
import { notFound } from "next/navigation";
import GameClient from "../[id]/GameClient"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub";
const DB_NAME = "gamehub";

function mapGame(game) {
  return {
    _id: game._id.toString(),
    title: game.title,
    slug: game.slug,
    gameUrl: game.gameUrl,
    thumbnailUrl: game.thumbnailUrl,
    category: game.category,
    tags: game.tags || [],
    description: game.description || "",
    rating: game.rating || 0,
    votes: game.votes || 0,
    instructions: game.instructions || "",
    qaList: game.qaList || [],
    qaText: game.qaText || "",
    image: game.image || "",
    createdAt: game.createdAt,
  };
}

async function getGameBySlug(slug) {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  const game = await db.collection("games").findOne({ slug });
  return game ? mapGame(game) : null;
}

async function getAllGames() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  const games = await db.collection("games").find({ status: "active" }).toArray();
  return games.map(mapGame);
}

export default async function Page({ params }) {
  const game = await getGameBySlug(params.slug);
  if (!game) return notFound();

  const recommendedGames = await getAllGames();

  return <GameClient key={game._id} game={game} recommendedGames={recommendedGames} />;
}
