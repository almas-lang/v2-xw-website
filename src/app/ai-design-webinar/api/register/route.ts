import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

const SALESHUB_WEBHOOK_URL = process.env.SALESHUB_WEBHOOK_URL;
const SALESHUB_WEBHOOK_SECRET = process.env.SALESHUB_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  // Vercel BotID: reject requests not verified as a real human browser
  // session. Bots get a fake success so they don't retry or adapt.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ success: true });
  }

  if (!SALESHUB_WEBHOOK_URL || !SALESHUB_WEBHOOK_SECRET) {
    console.error('SalesHub webhook env vars not configured');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, current_role,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Missing required field: email' }, { status: 400 });
    }

    const payload: Record<string, string> = {
      name: name || '',
      email,
      phone: phone || '',
      source: 'ai-webinar',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      utm_content: utm_content || '',
      utm_term: utm_term || '',
    };

    if (current_role) payload.current_role = current_role;

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
