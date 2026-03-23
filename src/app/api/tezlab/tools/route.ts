import { NextResponse } from "next/server";
import { mcpCall } from "@/lib/tezlab-mcp";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("tezlab_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "auth_required" }, { status: 401 });
  }

  try {
    const init = await mcpCall(accessToken, "initialize", {
      protocolVersion: "2025-03-26",
      capabilities: {},
      clientInfo: { name: "battery-tamagotchi", version: "1.0.0" },
    });

    const sessionId = init.sessionId;

    if (sessionId) {
      await mcpCall(accessToken, "notifications/initialized", {}, sessionId);
    }

    const result = await mcpCall(accessToken, "tools/list", {}, sessionId);
    return NextResponse.json({ tools: result.result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
