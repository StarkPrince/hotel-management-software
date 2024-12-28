import { AUTH_COOKIE_NAME } from "@/apps/web/lib/auth/constants";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  // Clear the auth cookie
  response.cookies.delete(AUTH_COOKIE_NAME);

  return response;
}
