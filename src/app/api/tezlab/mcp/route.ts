import { NextRequest, NextResponse } from "next/server";
import { callTool, refreshAccessToken } from "@/lib/tezlab-mcp";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("tezlab_access_token")?.value;
  const refreshToken = cookieStore.get("tezlab_refresh_token")?.value;
  const clientId = cookieStore.get("tezlab_client_id")?.value;

  if (!accessToken) {
    if (refreshToken && clientId) {
      try {
        const tokens = await refreshAccessToken({ refreshToken, clientId });
        accessToken = tokens.access_token;

        const response = NextResponse.json({ error: "token_refreshed" }, { status: 401 });
        const cookieOptions = {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "lax" as const,
        };
        response.cookies.set("tezlab_access_token", tokens.access_token, {
          ...cookieOptions,
          maxAge: tokens.expires_in || 3600,
        });
        if (tokens.refresh_token) {
          response.cookies.set("tezlab_refresh_token", tokens.refresh_token, {
            ...cookieOptions,
            maxAge: 60 * 60 * 24 * 30,
          });
        }
      } catch {
        return NextResponse.json({ error: "auth_required" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: "auth_required" }, { status: 401 });
    }
  }

  try {
    const body = await request.json();
    const { tool, args } = body as { tool: string; args?: Record<string, unknown> };

    if (!tool) {
      return NextResponse.json({ error: "Missing 'tool' in request body" }, { status: 400 });
    }

    const result = await callTool(accessToken, tool, args || {});
    return NextResponse.json({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message.includes("401") || message.includes("unauthorized")) {
      return NextResponse.json({ error: "auth_expired" }, { status: 401 });
    }

    console.error("MCP call error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
