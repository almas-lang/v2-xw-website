import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function POST(request: NextRequest) {
  // Vercel BotID: reject requests not verified as a real human browser
  // session. Bots get a fake success so they don't retry or adapt.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ success: true });
  }

  try {
    const { email, totalScore, label, message, breakdown } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (totalScore === undefined || totalScore === null) {
      return NextResponse.json({ error: 'Missing score' }, { status: 400 });
    }

    // Determine score color
    let scoreColor = '#EF4444';
    if (totalScore >= 85) scoreColor = '#22C55E';
    else if (totalScore >= 70) scoreColor = '#3B82F6';
    else if (totalScore >= 55) scoreColor = '#EAB308';
    else if (totalScore >= 40) scoreColor = '#F97316';

    const breakdownRows = breakdown
      .split('\n')
      .map((line: string) => {
        const parts = line.split(': ');
        const cat = parts[0] || line;
        const score = parts[1] || '';
        return `<tr>
          <td style="padding: 10px 0; color: #444444; font-size: 14px; border-bottom: 1px solid #eee;">${cat}</td>
          <td style="padding: 10px 0; color: #1A1A1A; font-size: 14px; font-weight: 700; border-bottom: 1px solid #eee; text-align: right;">${score}</td>
        </tr>`;
      })
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
          <style>@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700;800&display=swap');</style>
          <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px 32px;">
            <div style="text-align: center;">
              <img src="https://www.xperiencewave.com/images/xw-logo-mobile.png" alt="Xperience Wave" style="height: 36px; margin-bottom: 32px;" />

              <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 64px; font-weight: 800; color: #1A1A1A; margin: 0; line-height: 1;">${totalScore}</p>
              <p style="font-size: 13px; color: #999999; margin: 6px 0 16px;">out of 100</p>
              <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; font-weight: 700; color: ${scoreColor}; margin: 0 0 12px;">${label}</p>
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 28px;">
                ${message}
              </p>
            </div>

            <div style="background: #f8f8f8; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
              <p style="font-size: 11px; font-weight: 600; color: #999999; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 1px;">Category Breakdown</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${breakdownRows}
              </table>
            </div>

            <div style="text-align: center;">
              <a href="https://calendly.com/team-xperiencewave/xw-strategy" style="display: inline-block; padding: 14px 36px; background: #FF0023; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 15px;">
                Walk Through Your Score &rarr;
              </a>
              <p style="color: #999999; font-size: 13px; line-height: 1.5; margin: 20px 0 0;">
                <a href="https://www.xperiencewave.com/resources/tools/mentorship-evaluator" style="color: #FF0023; text-decoration: none;">Score another program</a>
              </p>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 16px; margin-top: 28px;">
              <p style="color: #bbbbbb; font-size: 11px; text-align: center; margin: 0;">
                Xperience Wave &middot; UX Mentorship &amp; Career Development &middot; Bangalore
              </p>
            </div>
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
