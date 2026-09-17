import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { signToken } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user = db.getUserByEmail(email);

    // If user doesn't exist yet, auto-provision for smooth testing experience
    if (!user) {
      const userId = `usr_${Date.now()}`;
      user = db.createUser({
        id: userId,
        name: email.split('@')[0].toUpperCase(),
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        preferences: {
          topics: ['Tech & AI', 'Startups', 'Markets & Finance', 'Science'],
          briefingDuration: 7,
          preferredHostId: 'alex-tech',
          profession: 'Software Engineer & Founder',
          language: 'English (US)',
          deliverySchedule: '08:00 AM (Morning)',
          autoPlay: true,
        },
        listeningStreakDays: 1,
        totalListeningMinutes: 15,
        passwordHash: `${password}_hash`,
      });
    }

    const token = signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        preferences: user.preferences,
        listeningStreakDays: user.listeningStreakDays,
        totalListeningMinutes: user.totalListeningMinutes,
      },
    });

    response.cookies.set('nuzio_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 86400,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
