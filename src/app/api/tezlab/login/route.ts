import { NextResponse } from "next/server";
import {
  registerClient,
  generateCodeVerifier,
  generateCodeChallenge,
  buildAuthorizationUrl,
} from "@/lib/tezlab-mcp";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/tezlab/callback`;

  try {
    const { client_id } = await registerClient(redirectUri);

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    const authUrl = buildAuthorizationUrl({
      clientId: client_id,
      redirectUri,
      codeChallenge,
      state,
    });

    const response = NextResponse.redirect(authUrl);

    const cookieOptions = {
      httpOnly: true,
      secure: origin.startsWith("https"),
      path: "/",
      maxAge: 600, // 10 minutes for the auth flow
      sameSite: "lax" as const,
    };

    response.cookies.set("tezlab_code_verifier", codeVerifier, cookieOptions);
    response.cookies.set("tezlab_client_id", client_id, cookieOptions);
    response.cookies.set("tezlab_state", state, cookieOptions);
    response.cookies.set("tezlab_redirect_uri", redirectUri, cookieOptions);

    return response;
  } catch (err) {
    console.error("TezLab login error:", err);
    return NextResponse.redirect(`${origin}/battery-tamagotchi?error=login_failed`);
  }
}
