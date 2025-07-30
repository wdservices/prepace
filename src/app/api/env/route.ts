import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  // Only allow this endpoint in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    env: {
      GOOGLE_API_KEY: env.GOOGLE_API_KEY ? '✅ Set' : '❌ Missing',
      NODE_ENV: env.NODE_ENV,
    },
    // Don't expose the actual key in the response
    isConfigured: !!env.GOOGLE_API_KEY,
  });
}
