import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 61;
const NOTIFICATION_EMAILS = [
  'team@xperiencewave.com',
  'shaikroc@gmail.com',
  'murad@xperiencewave.com',
];

// Send notification email to team
async function sendNotificationEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
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
        subject: `New Contact Form Submission: ${formData.subject}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #FF0023; margin-bottom: 16px;">New Contact Form Submission</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
              Someone reached out via the contact form:
            </p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${formData.name}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
              ${formData.phone ? `<p style="margin: 0 0 12px 0;"><strong>Phone:</strong> ${formData.phone}</p>` : ''}
              <p style="margin: 0 0 12px 0;"><strong>Subject:</strong> ${formData.subject}</p>
              <p style="margin: 0 0 12px 0;"><strong>Message:</strong></p>
              <p style="margin: 0; padding: 12px; background: #fff; border-radius: 4px; white-space: pre-wrap;">${formData.message}</p>
            </div>
            <p style="color: #999; font-size: 14px;">
              This contact has been added to Brevo list #${BREVO_LIST_ID}.
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

// Send confirmation email to user
async function sendConfirmationEmail(name: string, email: string) {
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
        to: [{ email, name }],
        subject: 'We received your message!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #FF0023; margin-bottom: 16px;">Thanks for reaching out, ${name}!</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              We've received your message and will get back to you as soon as possible.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Our team typically responds within 24-48 hours during business days.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              In the meantime, feel free to explore our <a href="https://xperiencewave.com/programs" style="color: #FF0023;">mentorship programs</a> or check out our <a href="https://xperiencewave.com/resources/blogs" style="color: #FF0023;">blog</a>.
            </p>
            <p style="color: #666; font-size: 14px;">
              — The Xperience Wave Team
            </p>
          </div>
        `,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Confirmation email failed:', errorData);
    }
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { name, email, phone, subject, message } = formData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        attributes: {
          FIRSTNAME: name.split(' ')[0],
          LASTNAME: name.split(' ').slice(1).join(' ') || '',
          PHONE: phone || '',
          CONTACT_SUBJECT: subject,
          CONTACT_MESSAGE: message,
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 204) {
      // Send emails
      await Promise.all([
        sendNotificationEmail(formData),
        sendConfirmationEmail(name, email),
      ]);
      return NextResponse.json({ success: true });
    }

    const data = await response.json();
    return NextResponse.json(
      { error: data.message || 'Submission failed. Please try again.' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
