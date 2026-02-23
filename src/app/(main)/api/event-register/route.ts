import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const EVENT_LIST_ID = 55;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  profession: string;
  company?: string;
  hearAbout?: string;
  joiningFor?: string[];
}

// Send confirmation email to registrant
async function sendConfirmationEmail(data: RegistrationData) {
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
        to: [{ email: data.email, name: data.name }],
        subject: "You're In! WaveMakers Connect Edition #4 🎉",
        htmlContent: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0118; color: #ffffff; padding: 40px 30px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 8px 0;">You're Registered! 🎉</h1>
              <p style="color: #a5b4fc; font-size: 16px; margin: 0;">WaveMakers Connect Edition #4</p>
            </div>

            <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #e0e7ff; font-size: 14px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Event Details</p>
              <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 16px 0;">AI Threatening Specialists</h2>
              <table style="width: 100%; color: #c7d2fe;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">📅 Date</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">Sunday, Feb 15, 2025</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">⏰ Time</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">11 AM onwards</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">📍 Venue</td>
                  <td style="padding: 8px 0; text-align: right;">Its Brown and Roasted, Singasandra, Bangalore</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 24px;">
              <p style="color: #c7d2fe; font-size: 15px; line-height: 1.6;">
                Hi ${data.name.split(' ')[0]},<br><br>
                Thanks for registering! We're excited to have you join us.<br><br>
                We'll add you to our WhatsApp community closer to the event date where we'll share updates, the exact venue location, and connect you with other attendees.
              </p>
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=WaveMakers%20Connect%20Edition%20%234&dates=20250215T053000Z/20250215T083000Z&details=Join%20us%20for%20WaveMakers%20Connect%20-%20a%20free%20design%20%26%20tech%20meetup%20in%20Bangalore.&location=Its%20Brown%20and%20Roasted%2C%20Singasandra%2C%20Bangalore"
                 style="display: inline-block; background: #4f46e5; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Add to Calendar
              </a>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">
                Questions? Reply to this email or reach out on Instagram <a href="https://instagram.com/xperience_wave" style="color: #818cf8;">@xperience_wave</a>
              </p>
              <p style="color: #4b5563; font-size: 12px; margin: 16px 0 0 0;">
                © 2025 Xperience Wave. All rights reserved.
              </p>
            </div>
          </div>
        `,
      }),
    });
    const result = await response.json().catch(() => ({}));
    console.log('Confirmation email response:', response.status, result);
    if (!response.ok) {
      console.error('Confirmation email failed:', result);
    }
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

// Send notification email to team
async function sendTeamNotification(data: RegistrationData) {
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
        subject: `🎟️ New Event Registration: ${data.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 16px;">New Event Registration</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
              Someone just registered for WaveMakers Connect Edition #4:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; width: 120px;">Name</td>
                <td style="padding: 10px 0; color: #1A1A1A; font-weight: 600;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Email</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Phone</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Profession</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.profession}</td>
              </tr>
              ${data.company ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Company</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.company}</td>
              </tr>
              ` : ''}
              ${data.linkedin ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">LinkedIn</td>
                <td style="padding: 10px 0; color: #1A1A1A;"><a href="${data.linkedin}">${data.linkedin}</a></td>
              </tr>
              ` : ''}
              ${data.hearAbout ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Heard About</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.hearAbout}</td>
              </tr>
              ` : ''}
              ${data.joiningFor && data.joiningFor.length > 0 ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Joining For</td>
                <td style="padding: 10px 0; color: #1A1A1A;">${data.joiningFor.join(', ')}</td>
              </tr>
              ` : ''}
            </table>
            <p style="color: #999; font-size: 13px;">
              This contact has been added to Brevo list #${EVENT_LIST_ID}.
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Failed to send team notification:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (!data.email || !data.name || !data.phone || !data.profession) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Add contact to Brevo (simplified - just email and list)
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        email: data.email,
        listIds: [EVENT_LIST_ID],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: data.name.split(' ')[0],
          LASTNAME: data.name.split(' ').slice(1).join(' ') || '',
        },
      }),
    });

    console.log('Brevo response status:', response.status);
    const responseData = await response.json().catch(() => ({}));
    console.log('Brevo response:', responseData);

    if (response.status === 201 || response.status === 204) {
      // Send emails in parallel
      await Promise.all([
        sendConfirmationEmail(data),
        sendTeamNotification(data),
      ]);
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact
    if (response.status === 400) {
      if (responseData.code === 'duplicate_parameter') {
        // Still send confirmation for duplicate (maybe they want to re-register)
        await Promise.all([
          sendConfirmationEmail(data),
          sendTeamNotification(data),
        ]);
        return NextResponse.json({ success: true, message: 'Already registered' });
      }
      console.error('Brevo error:', responseData);
      return NextResponse.json({ error: responseData.message || 'Registration failed' }, { status: 400 });
    }

    console.error('Brevo unexpected error:', responseData);
    return NextResponse.json(
      { error: 'Failed to register. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
