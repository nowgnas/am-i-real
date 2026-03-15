import { NextRequest, NextResponse } from 'next/server';
import { createShare } from '@/lib/shareStore';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { resultKey } = body as { resultKey?: string };

  if (!resultKey || typeof resultKey !== 'string') {
    return NextResponse.json({ error: 'Invalid resultKey' }, { status: 400 });
  }

  const id = createShare(resultKey);
  return NextResponse.json({ id });
}
