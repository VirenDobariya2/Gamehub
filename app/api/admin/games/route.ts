import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";

// ✅ Get all games (optional filter by status)
export async function GET(request: Request) {
  try {
    const { db } = await connectToDB();
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const query: any = {};
    if (status) query.status = status;

    const games = await db.collection("games").find(query).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(games);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

// ✅ Add a new game (video is optional)
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const requiredFields = [
      "title",
      "description",
      "category",
      "gameUrl",
      "thumbnailUrl",
      "instructions",
      "status",
      "qaList",
    ];

    for (const field of requiredFields) {
      if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    if (!["active", "inactive"].includes(data.status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const { db } = await connectToDB();

    function formatTitleToSlug(title: string) {
      return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    }

    

    const gameData = {
      title: data.title,
      slug: formatTitleToSlug(data.title), 
      description: data.description,
      category: data.category,
      gameUrl: data.gameUrl,
      thumbnailUrl: data.thumbnailUrl,
      instructions: data.instructions,
      status: data.status,
      qaList: data.qaList,
      tags: Array.isArray(data.tags) ? data.tags : [],
      video: data.video || null,
      createdAt: new Date(),
    };

    const result = await db.collection("games").insertOne(gameData);

    return NextResponse.json(
      { message: "Game added successfully", gameId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
  }
}
