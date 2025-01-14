import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/mock-api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await registerUser(body);
    
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 400 }
    );
  }
}