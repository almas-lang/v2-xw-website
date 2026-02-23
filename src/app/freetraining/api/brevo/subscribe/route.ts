import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.FT_BREVO_LIST_ID || '49', 10);

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  employmentStatus?: string;
  yearsOfExperience?: string;
  monthlySalary?: string;
  qualified?: boolean;
  qualificationReason?: string;
  qualificationCategory?: string;
  applyQualified?: boolean;
  applyQualificationReason?: string;
  applyQualificationCategory?: string;
  stage?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export async function POST(request: NextRequest) {
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not configured');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json() as RequestBody;
    const { name, email, phone, employmentStatus, yearsOfExperience, monthlySalary, qualified, qualificationReason, qualificationCategory, applyQualified, applyQualificationReason, applyQualificationCategory, stage, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    if (!email || !name || !phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const tempLeadId = email.split('@')[0] + '_' + Date.now();
    const baseUrl = 'https://xperiencewave.com/freetraining';
    const watchLink = `${baseUrl}/watch?lead_id=${tempLeadId}`;

    const attributes: Record<string, any> = {
      FIRSTNAME: name.trim(),
      SMS: phone.trim(),
      whatsapp: phone.trim(),
      WATCH_LINK: watchLink,
      UTM_SOURCE: utm_source || '',
      UTM_MEDIUM: utm_medium || '',
      UTM_CAMPAIGN: utm_campaign || '',
      UTM_CONTENT: utm_content || '',
      UTM_TERM: utm_term || '',
    };

    if (employmentStatus) attributes.EMPLOYMENT_STATUS = employmentStatus;
    if (yearsOfExperience) attributes.YEARS_OF_EXPERIENCE = yearsOfExperience;
    if (monthlySalary) attributes.MONTHLY_SALARY = monthlySalary;
    if (qualified !== undefined) attributes.LEAD_QUALIFIED = qualified ? 'yes' : 'no';
    if (qualificationReason) attributes.LEAD_QUALIFICATION_REASON = qualificationReason;
    if (qualificationCategory) attributes.LEAD_QUALIFICATION_CATEGORY = qualificationCategory;
    if (applyQualified !== undefined) attributes.APPLY_QUALIFIED = applyQualified ? 'yes' : 'no';
    if (applyQualificationReason) attributes.APPLY_QUALIFICATION_REASON = applyQualificationReason;
    if (applyQualificationCategory) attributes.APPLY_QUALIFICATION_CATEGORY = applyQualificationCategory;
    if (stage) attributes.FUNNEL_STAGE = stage;

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (brevoResponse.status === 204) {
      return NextResponse.json({ success: true, leadId: tempLeadId, watchLink, message: 'Contact updated successfully' });
    }

    const responseText = await brevoResponse.text();
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error('Invalid response from Brevo API');
    }

    if (!brevoResponse.ok) {
      if (brevoResponse.status === 400 && data.code === 'duplicate_parameter') {
        return NextResponse.json({ success: true, leadId: tempLeadId, watchLink, message: 'Contact already exists, updated successfully' });
      }
      throw new Error(data.message || 'Brevo API failed');
    }

    const leadId = data.id?.toString() || tempLeadId;
    const finalWatchLink = data.id ? `${baseUrl}/watch?lead_id=${data.id}` : watchLink;

    return NextResponse.json({ success: true, leadId, watchLink: finalWatchLink, message: 'Contact added successfully' });
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
