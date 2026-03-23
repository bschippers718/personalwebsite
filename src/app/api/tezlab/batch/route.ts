import { NextRequest, NextResponse } from "next/server";
import { callToolsBatch, refreshAccessToken } from "@/lib/tezlab-mcp";
import { cookies } from "next/headers";

interface RefreshedTokens {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("tezlab_access_token")?.value;
  const refreshToken = cookieStore.get("tezlab_refresh_token")?.value;
  const clientId = cookieStore.get("tezlab_client_id")?.value;

  let refreshedTokens: RefreshedTokens | null = null;

  if (!accessToken) {
    if (refreshToken && clientId) {
      try {
        refreshedTokens = await refreshAccessToken({ refreshToken, clientId });
        accessToken = refreshedTokens.access_token;
      } catch {
        return NextResponse.json({ error: "auth_required" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: "auth_required" }, { status: 401 });
    }
  }

  try {
    const body = await request.json();
    const { calls } = body as { calls: Array<{ tool: string; args?: Record<string, unknown> }> };

    if (!calls || !Array.isArray(calls)) {
      return NextResponse.json({ error: "Missing 'calls' array" }, { status: 400 });
    }

    const results = await callToolsBatch(accessToken, calls);
    const response = NextResponse.json({ results });

    if (refreshedTokens) {
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax" as const,
      };
      response.cookies.set("tezlab_access_token", refreshedTokens.access_token, {
        ...cookieOptions,
        maxAge: refreshedTokens.expires_in || 3600,
      });
      if (refreshedTokens.refresh_token) {
        response.cookies.set("tezlab_refresh_token", refreshedTokens.refresh_token, {
          ...cookieOptions,
          maxAge: 60 * 60 * 24 * 30,
        });
      }
    }

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("MCP batch error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
