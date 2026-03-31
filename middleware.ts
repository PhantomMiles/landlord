import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

// Routes that don't need authentication
const PUBLIC_ROUTES = ["/login", "/register", "/"];

// Routes that require specific roles
const LANDLORD_ROUTES = /^\/landlord/;
const TENANT_ROUTES = /^\/tenant/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and static assets through
  const isPublic = PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith("/api/auth"));
  if (isPublic) return NextResponse.next();

  // Allow Next.js internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  const user = await getUserFromRequest(req);

  // ── Not logged in → redirect to login ──────────────────────────────────────
  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Logged-in user hits /login or /register → redirect to dashboard ─────────
  if (pathname === "/login" || pathname === "/register") {
    const dest =
      user.role === "TENANT" ? "/tenant/dashboard" : "/landlord/dashboard";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // ── Role enforcement ────────────────────────────────────────────────────────
  if (LANDLORD_ROUTES.test(pathname) && user.role !== "LANDLORD" && user.role !== "ADMIN") {
    // Tenant trying to access landlord routes
    return NextResponse.redirect(new URL("/tenant/dashboard", req.url));
  }

  if (TENANT_ROUTES.test(pathname) && user.role !== "TENANT" && user.role !== "ADMIN") {
    // Landlord trying to access tenant routes
    return NextResponse.redirect(new URL("/landlord/dashboard", req.url));
  }

  // ── Pass user info to headers for server components ─────────────────────────
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", user.id);
  requestHeaders.set("x-user-role", user.role);
  requestHeaders.set("x-user-name", user.name);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    /*
     * Match all routes EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
