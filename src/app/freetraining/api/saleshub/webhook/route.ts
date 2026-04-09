import { NextRequest, NextResponse } from 'next/server';

const SALESHUB_WEBHOOK_URL = process.env.SALESHUB_WEBHOOK_URL;
const SALESHUB_WEBHOOK_SECRET = process.env.SALESHUB_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!SALESHUB_WEBHOOK_URL || !SALESHUB_WEBHOOK_SECRET) {
    console.error('SalesHub webhook env vars not configured');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      call_booked, booked_at, portfolio_url, resume_url } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Missing required field: email' }, { status: 400 });
    }

    const payload: Record<string, string> = {
      name: name || '',
      email,
      phone: phone || '',
      source: 'freetraining',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      utm_content: utm_content || '',
      utm_term: utm_term || '',
    };

    // Forward optional fields if present
    if (call_booked) payload.call_booked = call_booked;
    if (booked_at) payload.booked_at = booked_at;
    if (portfolio_url) payload.portfolio_url = portfolio_url;
    if (resume_url) payload.resume_url = resume_url;

    const url = `${SALESHUB_WEBHOOK_URL}?key=${SALESHUB_WEBHOOK_SECRET}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('SalesHub webhook error:', response.status, text);
      return NextResponse.json({ success: false, error: 'SalesHub webhook failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SalesHub webhook error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
