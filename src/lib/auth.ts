import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const COOKIE_NAME = "landlord_token";
const EXPIRES_IN = "7d";

export type JWTPayload = {
  id: string;
  email: string;
  name: string;
  role: "LANDLORD" | "TENANT" | "VENDOR" | "ADMIN";
};

// ─── Sign a JWT ──────────────────────────────────────────────────────────────
export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(SECRET);
}

// ─── Verify a JWT string ─────────────────────────────────────────────────────
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// ─── Set auth cookie (server action / route handler) ─────────────────────────
export async function setAuthCookie(payload: JWTPayload) {
  const token = await signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// ─── Clear auth cookie (logout) ───────────────────────────────────────────────
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ─── Get current user from cookie (server components / actions) ───────────────
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ─── Get current user from request (middleware / API routes) ──────────────────
export async function getUserFromRequest(req: NextRequest): Promise<JWTPayload | null> {
  const token =
    req.cookies.get(COOKIE_NAME)?.value ??
    req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;
  return verifyToken(token);
}

// ─── requireAuth — use in API route handlers ──────────────────────────────────
// Returns the user or throws a 401 response.
// Usage: const user = await requireAuth(req);
export async function requireAuth(req: NextRequest): Promise<JWTPayload> {
  const user = await getUserFromRequest(req);
  if (!user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return user;
}

// ─── requireRole — use in API route handlers to enforce role ──────────────────
export async function requireRole(
  req: NextRequest,
  ...roles: JWTPayload["role"][]
): Promise<JWTPayload> {
  const user = await requireAuth(req);
  if (!roles.includes(user.role)) {
    throw new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  return user;
}
