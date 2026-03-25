import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function createDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return null;
  }
  const sql = neon(dbUrl);
  return drizzle(sql, { schema });
}
