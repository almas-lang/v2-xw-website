import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PIXEL_ID = process.env.FB_PIXEL_ID || '1406183214178910';
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || '';

function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(request: NextRequest) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json({ success: false, skipped: true, reason: 'FB_ACCESS_TOKEN not configured' });
  }

  try {
    const { event_name, email, phone, fbp, fbc, event_source_url, custom_data } = await request.json();

    const event: any = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        client_ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || '',
        client_user_agent: request.headers.get('user-agent') || '',
      },
      event_source_url: event_source_url || 'https://xperiencewave.com/freetraining',
      action_source: 'website',
    };

    if (fbp) event.user_data.fbp = fbp;
    if (fbc) event.user_data.fbc = fbc;
    if (email) event.user_data.em = hashData(email);
    if (phone) event.user_data.ph = hashData(phone);
    if (custom_data) event.custom_data = custom_data;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [event] }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook Conversion API Error:', result);
      throw new Error('Failed to send conversion event');
    }

    return NextResponse.json({ success: true, facebook_response: result });
  } catch (error: any) {
    console.error('Conversion API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
