import { createDb } from "@/db";
import { thoughts, type Thought } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getThoughts(): Promise<Thought[]> {
  const db = createDb();
  if (!db) return [];
  return db.select().from(thoughts).orderBy(desc(thoughts.createdAt));
}

export async function createThought(content: string): Promise<Thought> {
  const db = createDb();
  if (!db) throw new Error("DATABASE_URL is not configured");
  const [thought] = await db.insert(thoughts).values({ content }).returning();
  return thought;
}

export async function deleteThought(id: number): Promise<void> {
  const db = createDb();
  if (!db) throw new Error("DATABASE_URL is not configured");
  await db.delete(thoughts).where(eq(thoughts.id, id));
}
