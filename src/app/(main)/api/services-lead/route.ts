import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SERVICES_LIST_ID = 62;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

interface ServicesLeadData {
  name: string;
  email: string;
  productUrl: string;
  role: string;
  whatsNotWorking?: string;
  source: string;
}

// Send notification email to team
async function sendNotificationEmail(data: ServicesLeadData) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Xperience Wave', email: 'team@xperiencewave.com' },
        to: NOTIFICATION_EMAILS.map(email => ({ email })),
        subject: '🎯 New Free UX Audit Request',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #6366F1; margin-bottom: 16px;">New Free UX Audit Request</h2>

            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Name</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
                    <a href="mailto:${data.email}" style="color: #6366F1;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Product URL</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
                    <a href="${data.productUrl}" style="color: #6366F1;" target="_blank">${data.productUrl}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Role</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${data.role}</td>
                </tr>
                ${data.whatsNotWorking ? `
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">What's not working</td>
                  <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${data.whatsNotWorking}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <p style="color: #64748b; font-size: 12px; margin-top: 16px;">
              Source: ${data.source}
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notification email failed:', errorData);
    }
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

export async function POST(request: NextRequest) {
  // Vercel BotID: reject requests not verified as a real human browser
  // session. Bots get a fake success so they don't retry or adapt.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ success: true });
  }

  try {
    const data: ServicesLeadData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.productUrl || !data.role) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(data.productUrl);
    } catch {
      return NextResponse.json(
        { error: 'Please provide a valid product URL' },
        { status: 400 }
      );
    }

    // Add contact to Brevo list
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email: data.email,
        listIds: [BREVO_SERVICES_LIST_ID],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: data.name.split(' ')[0],
          LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
          LEAD_SOURCE: data.source,
          PRODUCT_URL: data.productUrl,
          ROLE: data.role,
          WHATS_NOT_WORKING: data.whatsNotWorking || '',
        },
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API error:', errorData);
      // Continue even if Brevo fails - we still want to send notification
    }

    // Send notification to team
    await sendNotificationEmail(data);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll review your product and send you the audit within 2-3 business days.',
    });

  } catch (error) {
    console.error('Services lead error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
