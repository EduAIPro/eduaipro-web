import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { UserRoles } from "./types/auth";

const REFRESH_TOKEN = "eduaipro:refresh-token";
// Written by setRoleCookie() at login/signup (utils/auth/index.ts) — this is
// the role LoginForm resolves (user.role === "ADMIN" ? "ADMIN" : staff.role),
// not whatever role the access/refresh token itself carries.
const ROLE_COOKIE = "eduaipro:role";

// Each role has exactly one home section; a role trying to browse into
// another role's section gets bounced back to its own.
function getRoleHome(role: UserRoles) {
  if (role === "TEACHER" || role === "USER") return "/dashboard";
  if (role === "ADMIN") return "/admin";
  return "/school"; // OWNER
}

const ROLE_SECTIONS = ["/dashboard", "/school", "/admin"] as const;

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  // Maintenance mode - block access to login and dashboard pages
  const maintenanceRoutes = ["/login", "/dashboard"];
  const isMaintenanceRoute = maintenanceRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (process.env.MAINTENANCE_MODE === "true" && isMaintenanceRoute) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Protected routes - require authentication
  const protectedRoutes = ["/dashboard", "/school", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !refreshToken) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login?redirect=" + pathname, request.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = request.cookies.get(ROLE_COOKIE)?.value as UserRoles | undefined;

  if (isProtectedRoute && refreshToken) {
    // Each role only belongs in its own section — editing the URL to wander
    // into another role's section (e.g. a school owner typing /dashboard,
    // or a teacher typing /school or /admin) bounces back to that role's home.
    const currentSection = ROLE_SECTIONS.find((section) =>
      pathname.startsWith(section),
    );

    if (currentSection) {
      if (!role) {
        // Refresh token exists but the role cookie is missing (e.g. a
        // session from before this cookie existed) — safest is to send
        // them back through login so it gets set.
        const loginUrl = new URL("/login?redirect=" + pathname, request.url);
        return NextResponse.redirect(loginUrl);
      }

      const roleHome = getRoleHome(role);
      if (currentSection !== roleHome) {
        return NextResponse.redirect(new URL(roleHome, request.url));
      }
    }
  }

  // Auth routes - redirect if already authenticated
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && refreshToken && role) {
    return NextResponse.redirect(new URL(getRoleHome(role), request.url));
  }

  return NextResponse.next();
}

// Specify which routes should trigger the middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/school/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
