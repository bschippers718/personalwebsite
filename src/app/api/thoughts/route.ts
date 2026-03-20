import { NextRequest, NextResponse } from "next/server";
import { getThoughts, createThought } from "@/lib/thoughts";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const thoughts = await getThoughts();
    return NextResponse.json(thoughts);
  } catch {
    return NextResponse.json({ error: "Failed to fetch thoughts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await request.json();
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    const thought = await createThought(content.trim());
    return NextResponse.json(thought, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create thought" }, { status: 500 });
  }
}
