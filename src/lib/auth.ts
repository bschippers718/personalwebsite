import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "auth_session";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value === process.env.AUTH_COOKIE_SECRET;
}

export function isAuthenticatedFromRequest(request: NextRequest): boolean {
  const cookie = request.cookies.get(COOKIE_NAME);
  return cookie?.value === process.env.AUTH_COOKIE_SECRET;
}

export function setAuthCookie(response: Response): Response {
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${process.env.AUTH_COOKIE_SECRET}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  );
  return response;
}

export function clearAuthCookie(response: Response): Response {
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`
  );
  return response;
}
