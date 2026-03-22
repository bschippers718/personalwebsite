import { NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/tezlab-mcp";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${origin}/battery-tamagotchi?error=${encodeURIComponent(error)}`,
    );
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get("tezlab_state")?.value;
  const codeVerifier = cookieStore.get("tezlab_code_verifier")?.value;
  const clientId = cookieStore.get("tezlab_client_id")?.value;
  const redirectUri = cookieStore.get("tezlab_redirect_uri")?.value;

  if (!code || !codeVerifier || !clientId || !redirectUri) {
    return NextResponse.redirect(
      `${origin}/battery-tamagotchi?error=missing_params`,
    );
  }

  if (state !== storedState) {
    return NextResponse.redirect(
      `${origin}/battery-tamagotchi?error=state_mismatch`,
    );
  }

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      clientId,
      redirectUri,
      codeVerifier,
    });

    const response = NextResponse.redirect(`${origin}/battery-tamagotchi`);

    const cookieOptions = {
      httpOnly: true,
      secure: origin.startsWith("https"),
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
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    response.cookies.set("tezlab_client_id", clientId, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });

    // Clean up flow cookies
    response.cookies.delete("tezlab_code_verifier");
    response.cookies.delete("tezlab_state");
    response.cookies.delete("tezlab_redirect_uri");

    return response;
  } catch (err) {
    console.error("TezLab callback error:", err);
    return NextResponse.redirect(
      `${origin}/battery-tamagotchi?error=token_exchange_failed`,
    );
  }
}
