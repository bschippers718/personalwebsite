import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const response = NextResponse.redirect(`${origin}/battery-tamagotchi`);

  response.cookies.delete("tezlab_access_token");
  response.cookies.delete("tezlab_refresh_token");
  response.cookies.delete("tezlab_client_id");

  return response;
}
