import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { email, totalScore, label, message, breakdown } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (totalScore === undefined || totalScore === null) {
      return NextResponse.json({ error: 'Missing score' }, { status: 400 });
    }

    // Determine score color
    let scoreColor = '#EF4444'; // red default
    if (totalScore >= 85) scoreColor = '#22C55E'; // green
    else if (totalScore >= 70) scoreColor = '#3B82F6'; // blue
    else if (totalScore >= 55) scoreColor = '#EAB308'; // yellow
    else if (totalScore >= 40) scoreColor = '#F97316'; // orange

    const breakdownHtml = breakdown
      .split('\n')
      .map((line: string) => `<tr><td style="padding: 8px 0; color: #999; font-size: 14px; border-bottom: 1px solid #1a1a1a;">${line}</td></tr>`)
      .join('');

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { name: 'Xperience Wave', email: 'team@xperiencewave.com' },
        to: [{ email }],
        subject: `Your Program Score: ${totalScore}/100 - ${label}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://www.xperiencewave.com/images/xw-logo.png" alt="Xperience Wave" style="height: 40px;" />
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <p style="font-size: 64px; font-weight: 800; color: #1A1A1A; margin: 0; line-height: 1;">${totalScore}</p>
              <p style="font-size: 14px; color: #999; margin: 4px 0 16px;">out of 100</p>
              <p style="font-size: 22px; font-weight: 700; color: ${scoreColor}; margin: 0;">${label}</p>
            </div>

            <p style="color: #666; font-size: 15px; line-height: 1.6; text-align: center; margin-bottom: 28px;">
              ${message}
            </p>

            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
              <p style="font-size: 13px; font-weight: 600; color: #1A1A1A; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Category Breakdown</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${breakdownHtml}
              </table>
            </div>

            <div style="text-align: center; margin-bottom: 28px;">
              <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="display: inline-block; padding: 14px 32px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">
                Walk Through Your Score Together &rarr;
              </a>
            </div>

            <p style="color: #bbb; font-size: 13px; line-height: 1.5; text-align: center;">
              Want to compare programs? <a href="https://www.xperiencewave.com/resources/tools/mentorship-evaluator" style="color: #FF0023;">Re-take the evaluator</a> for another program.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 28px 0;" />
            <p style="color: #ccc; font-size: 12px; text-align: center;">
              Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
            </p>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Evaluator score email error:', error);
    return NextResponse.json({ error: 'Failed to send score email' }, { status: 500 });
  }
}
