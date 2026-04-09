import { NextRequest, NextResponse } from 'next/server';
import { sendTrainingSMS, sendBookingConfirmationSMS } from '@/lib/sms/msg91';

const WEBHOOK_SECRET = process.env.SALESHUB_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  // Verify secret to prevent unauthorized calls
  const secret = request.nextUrl.searchParams.get('secret');
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, phone, name, date, time, meet_link } = await request.json();

    if (!phone || !type) {
      return NextResponse.json({ error: 'Missing required fields: type, phone' }, { status: 400 });
    }

    let result;

    if (type === 'training') {
      result = await sendTrainingSMS(phone, name || '');
    } else if (type === 'booking') {
      if (!date || !time || !meet_link) {
        return NextResponse.json({ error: 'Missing booking fields: date, time, meet_link' }, { status: 400 });
      }
      result = await sendBookingConfirmationSMS(phone, date, time, meet_link);
    } else {
      return NextResponse.json({ error: `Unknown SMS type: ${type}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, requestId: result.requestId });
  } catch (error: any) {
    console.error('SMS send error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
