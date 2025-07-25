import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/gamehub";
const dbName = "gamehub";

function formatTitleToSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

async function fixSlugs() {
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);
  const collection = db.collection("games");

  const missingSlugs = await collection.find({ slug: { $exists: false } }).toArray();

  for (const game of missingSlugs) {
    const newSlug = formatTitleToSlug(game.title);
    await collection.updateOne(
      { _id: game._id },
      { $set: { slug: newSlug } }
    );
    console.log(`Updated: ${game.title} → ${newSlug}`);
  }

  console.log("✅ Slugs updated successfully.");
  client.close();
}

fixSlugs();
