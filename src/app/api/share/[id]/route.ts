import { NextRequest, NextResponse } from 'next/server';
import { getShare, getRemainingMs } from '@/lib/shareStore';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const entry = getShare(params.id);
  if (!entry) {
    return NextResponse.json({ error: 'Expired or not found' }, { status: 404 });
  }
  return NextResponse.json({
    resultKey: entry.resultKey,
    remainingMs: getRemainingMs(params.id),
  });
}
