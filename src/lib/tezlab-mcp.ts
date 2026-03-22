const MCP_SERVER = "https://mcp.tezlabapp.com";

// ─── PKCE Helpers ────────────────────────────────────────────────────────────

function base64URLEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array.buffer);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64URLEncode(digest);
}

// ─── Dynamic Client Registration ─────────────────────────────────────────────

export async function registerClient(redirectUri: string): Promise<{ client_id: string }> {
  const res = await fetch(`${MCP_SERVER}/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      redirect_uris: [redirectUri],
      client_name: "Battery Tamagotchi",
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Client registration failed: ${res.status} ${text}`);
  }

  return res.json();
}

// ─── Authorization URL ───────────────────────────────────────────────────────

export function buildAuthorizationUrl(params: {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  state: string;
}): string {
  const url = new URL(`${MCP_SERVER}/oauth/authorize`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", params.clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("scope", "mcp");
  url.searchParams.set("state", params.state);
  return url.toString();
}

// ─── Token Exchange ──────────────────────────────────────────────────────────

export async function exchangeCodeForTokens(params: {
  code: string;
  clientId: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<{
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
}> {
  const res = await fetch(`${MCP_SERVER}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      client_id: params.clientId,
      redirect_uri: params.redirectUri,
      code_verifier: params.codeVerifier,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json();
}

// ─── Token Refresh ───────────────────────────────────────────────────────────

export async function refreshAccessToken(params: {
  refreshToken: string;
  clientId: string;
}): Promise<{
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
}> {
  const res = await fetch(`${MCP_SERVER}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: params.refreshToken,
      client_id: params.clientId,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed: ${res.status} ${text}`);
  }

  return res.json();
}

// ─── MCP JSON-RPC Call ───────────────────────────────────────────────────────

let rpcId = 0;

export async function mcpCall(
  accessToken: string,
  method: string,
  params?: Record<string, unknown>,
  sessionId?: string,
): Promise<{ result?: unknown; error?: { code: number; message: string }; sessionId?: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
    Authorization: `Bearer ${accessToken}`,
  };

  if (sessionId) {
    headers["Mcp-Session-Id"] = sessionId;
  }

  const res = await fetch(MCP_SERVER, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: ++rpcId,
      method,
      params: params || {},
    }),
  });

  const newSessionId = res.headers.get("Mcp-Session-Id") || undefined;

  if (!res.ok) {
    const text = await res.text();
    return { error: { code: res.status, message: text }, sessionId: newSessionId };
  }

  const json = await res.json();
  return { result: json.result, error: json.error, sessionId: newSessionId };
}

// ─── High-Level: Initialize + Call Tool ──────────────────────────────────────

export async function callTool(
  accessToken: string,
  toolName: string,
  toolArgs: Record<string, unknown> = {},
): Promise<unknown> {
  const init = await mcpCall(accessToken, "initialize", {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "battery-tamagotchi", version: "1.0.0" },
  });

  const sessionId = init.sessionId;

  if (sessionId) {
    await mcpCall(accessToken, "notifications/initialized", {}, sessionId);
  }

  const result = await mcpCall(
    accessToken,
    "tools/call",
    { name: toolName, arguments: toolArgs },
    sessionId,
  );

  if (result.error) {
    throw new Error(`MCP tool error: ${JSON.stringify(result.error)}`);
  }

  return result.result;
}
