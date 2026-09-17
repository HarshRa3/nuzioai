import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server/auth';
import { db } from '@/lib/server/db';
import { INITIAL_USER } from '@/lib/newsData';

export async function GET() {
  const user = await getAuthUser();
  if (user) {
    return NextResponse.json({
      authenticated: true,
      user,
    });
  }

  // Fallback default demo user
  const defaultUser = db.getUserById(INITIAL_USER.id) || INITIAL_USER;
  return NextResponse.json({
    authenticated: true,
    user: defaultUser,
  });
}
