import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getTokenRole } from "./utils/auth/helpers";

const REFRESH_TOKEN = "eduaipro:refresh-token";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  // Protected routes - require authentication
  const protectedRoutes = ["/dashboard", "/school", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !refreshToken) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login?redirect=" + pathname, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Auth routes - redirect if already authenticated
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && refreshToken) {
    // Decode token and redirect based on role
    try {
      const role = getTokenRole(refreshToken);
      const dashboardUrl =
        role === "TEACHER" || role === "USER"
          ? "/dashboard"
          : role === "ADMIN"
          ? "/admin"
          : "/school";
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    } catch (error) {
      console.log({ error });
      // If token is invalid, let them access auth pages
      return NextResponse.next();
    }
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
