import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get("tezlab_access_token")?.value;
  const hasRefresh = !!cookieStore.get("tezlab_refresh_token")?.value;

  return NextResponse.json({
    connected: hasToken || hasRefresh,
    hasAccessToken: hasToken,
    hasRefreshToken: hasRefresh,
  });
}
