import { verifyAuth } from "@/apps/web/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Paths that don't require authentication
const publicPaths = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const verifiedToken = await verifyAuth(token);

    // Check role-based access
    if (pathname.startsWith("/admin") && verifiedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify(verifiedToken));

    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
