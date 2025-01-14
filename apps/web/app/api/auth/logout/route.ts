import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/constants';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  // Clear the auth cookie
  response.cookies.delete(AUTH_COOKIE_NAME);
  
  return response;
}