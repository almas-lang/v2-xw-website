import { NextRequest, NextResponse } from 'next/server';

const SALESHUB_LEAD_UPDATE_URL = process.env.SALESHUB_LEAD_UPDATE_URL;
const SALESHUB_WEBHOOK_SECRET = process.env.SALESHUB_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!SALESHUB_LEAD_UPDATE_URL || !SALESHUB_WEBHOOK_SECRET) {
    console.error('SalesHub lead-update env vars not configured');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { email, portfolio_url, resume_url } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Missing required field: email' }, { status: 400 });
    }

    const payload: Record<string, string> = { email };
    if (portfolio_url) payload.portfolio_url = portfolio_url;
    if (resume_url) payload.resume_url = resume_url;

    const url = `${SALESHUB_LEAD_UPDATE_URL}?key=${SALESHUB_WEBHOOK_SECRET}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('SalesHub lead-update error:', response.status, text);
      return NextResponse.json({ success: false, error: 'SalesHub update failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SalesHub lead-update error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
