import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// For static export, simplify middleware to basic auth check
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
