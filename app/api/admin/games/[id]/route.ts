import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/lib/mongodb";

function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

// ✅ Get one game
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const { db } = await connectToDB();
    const game = await db.collection("games").findOne({ _id: new ObjectId(id) });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch game" }, { status: 500 });
  }
}

// ✅ Update game status
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const { status } = await req.json();
    if (!["active", "inactive"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const { db } = await connectToDB();
    const result = await db.collection("games").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!result || !result.value) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(result.value);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
  }
}

// ✅ Delete game
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const { db } = await connectToDB();
    const result = await db.collection("games").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Game deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const data = await req.json();
    delete data._id;

    const { db } = await connectToDB();
    const result = await db.collection("games").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Game updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
  }
}
