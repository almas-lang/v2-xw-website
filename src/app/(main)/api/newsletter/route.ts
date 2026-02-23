import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 54;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

// Send notification email to team
async function sendNotificationEmail(subscriberEmail: string) {
  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Xperience Wave', email: 'team@xperiencewave.com' },
        to: NOTIFICATION_EMAILS.map(email => ({ email })),
        subject: '🎉 New Newsletter Subscriber!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Newsletter Subscriber</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 12px;">
              Someone just subscribed to the Xperience Wave newsletter:
            </p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <strong style="color: #1A1A1A; font-size: 18px;">${subscriberEmail}</strong>
            </div>
            <p style="color: #999; font-size: 14px;">
              This subscriber has been added to your Brevo contact list #${BREVO_LIST_ID}.
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    // Log but don't fail the subscription if notification fails
    console.error('Failed to send notification email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email: email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true, // Update if contact already exists
      }),
    });

    if (response.status === 201 || response.status === 204) {
      // Send notification email to team
      await sendNotificationEmail(email);
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact (already subscribed)
    if (response.status === 400) {
      const data = await response.json();
      if (data.code === 'duplicate_parameter') {
        return NextResponse.json({ success: true, message: 'Already subscribed' });
      }
      return NextResponse.json({ error: data.message || 'Subscription failed' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
