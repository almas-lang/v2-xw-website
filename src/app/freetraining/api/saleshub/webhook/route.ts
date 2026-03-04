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
    const { name, email, phone, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields: name, email, phone' }, { status: 400 });
    }

    const payload = {
      name,
      email,
      phone,
      source: 'ft-landing-page',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      utm_content: utm_content || '',
      utm_term: utm_term || '',
    };

    const url = `${SALESHUB_WEBHOOK_URL}?secret=${SALESHUB_WEBHOOK_SECRET}`;

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
