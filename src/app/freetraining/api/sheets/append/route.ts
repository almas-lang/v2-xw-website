import { NextRequest, NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

interface LeadData {
  email: string;
  name?: string;
  phone?: string;
  employmentStatus?: string;
  yearsOfExperience?: string;
  monthlySalary?: string;
  qualified?: boolean;
  qualificationReason?: string;
  qualificationCategory?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  linkedinUrl?: string;
  currentRole?: string;
  currentCompany?: string;
  targetRole?: string;
  targetSalary?: string;
  blockingIssue?: string;
  whyImportant?: string;
  investmentReadiness?: string;
  timeline?: string;
  applyQualified?: boolean;
  applyQualificationReason?: string;
  hasBooked?: boolean;
  bookingDate?: string;
  stage?: string;
  bookedAt?: string;
}

async function getAccessToken(): Promise<string> {
  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials not configured');
  }

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const claimSet = Buffer.from(JSON.stringify({
    iss: GOOGLE_SHEETS_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const unsignedToken = `${header}.${claimSet}`;

  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(GOOGLE_SHEETS_PRIVATE_KEY, 'base64url');

  const jwt = `${unsignedToken}.${signature}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    throw new Error('Failed to get access token: ' + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

async function sheetsGet(accessToken: string, range: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  return res.json();
}

async function sheetsAppend(accessToken: string, range: string, values: string[][]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values }),
  });
  return res.json();
}

async function sheetsUpdate(accessToken: string, range: string, values: string[][]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values }),
  });
  return res.json();
}

async function findRowByEmail(accessToken: string, email: string): Promise<number | null> {
  const data = await sheetsGet(accessToken, 'Sheet1!A:A');
  const values = data.values;
  if (!values) return null;
  const rowIndex = values.findIndex((row: string[]) => row[0]?.toLowerCase() === email.toLowerCase());
  return rowIndex >= 0 ? rowIndex + 1 : null;
}

function buildRow(leadData: LeadData, existingRow?: string[]): string[] {
  const e = existingRow || [];
  const timestamp = new Date().toISOString();
  return [
    leadData.email || e[0] || '',
    leadData.name !== undefined ? (leadData.name || '') : (e[1] || ''),
    leadData.phone !== undefined ? (leadData.phone || '') : (e[2] || ''),
    leadData.employmentStatus !== undefined ? (leadData.employmentStatus || '') : (e[3] || ''),
    leadData.yearsOfExperience !== undefined ? (leadData.yearsOfExperience || '') : (e[4] || ''),
    leadData.monthlySalary !== undefined ? (leadData.monthlySalary || '') : (e[5] || ''),
    leadData.qualified !== undefined ? (leadData.qualified ? 'yes' : 'no') : (e[6] || ''),
    leadData.qualificationReason !== undefined ? (leadData.qualificationReason || '') : (e[7] || ''),
    leadData.qualificationCategory !== undefined ? (leadData.qualificationCategory || '') : (e[8] || ''),
    leadData.utm_source !== undefined ? (leadData.utm_source || '') : (e[9] || ''),
    leadData.utm_medium !== undefined ? (leadData.utm_medium || '') : (e[10] || ''),
    leadData.utm_campaign !== undefined ? (leadData.utm_campaign || '') : (e[11] || ''),
    leadData.utm_content !== undefined ? (leadData.utm_content || '') : (e[12] || ''),
    leadData.utm_term !== undefined ? (leadData.utm_term || '') : (e[13] || ''),
    leadData.linkedinUrl !== undefined ? (leadData.linkedinUrl || '') : (e[14] || ''),
    leadData.currentRole !== undefined ? (leadData.currentRole || '') : (e[15] || ''),
    leadData.currentCompany !== undefined ? (leadData.currentCompany || '') : (e[16] || ''),
    leadData.targetRole !== undefined ? (leadData.targetRole || '') : (e[17] || ''),
    leadData.targetSalary !== undefined ? (leadData.targetSalary || '') : (e[18] || ''),
    leadData.blockingIssue !== undefined ? (leadData.blockingIssue || '') : (e[19] || ''),
    leadData.whyImportant !== undefined ? (leadData.whyImportant || '') : (e[20] || ''),
    leadData.investmentReadiness !== undefined ? (leadData.investmentReadiness || '') : (e[21] || ''),
    leadData.timeline !== undefined ? (leadData.timeline || '') : (e[22] || ''),
    leadData.applyQualified !== undefined ? (leadData.applyQualified ? 'yes' : 'no') : (e[23] || ''),
    leadData.applyQualificationReason !== undefined ? (leadData.applyQualificationReason || '') : (e[24] || ''),
    leadData.hasBooked !== undefined ? (leadData.hasBooked ? 'yes' : 'no') : (e[25] || ''),
    leadData.bookingDate || leadData.bookedAt || e[26] || '',
    leadData.stage !== undefined ? (leadData.stage || '') : (e[27] || 'lead'),
    e[28] || timestamp,
    timestamp,
  ];
}

export async function POST(request: NextRequest) {
  if (!SPREADSHEET_ID || !GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY) {
    return NextResponse.json({ success: false, skipped: true, reason: 'Google Sheets not configured' });
  }

  try {
    const { action, data } = await request.json() as { action: 'create' | 'update'; data: LeadData };

    if (!data.email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    if (action === 'create') {
      const existingRowIndex = await findRowByEmail(accessToken, data.email);
      if (existingRowIndex) {
        const existingData = await sheetsGet(accessToken, `Sheet1!A${existingRowIndex}:AD${existingRowIndex}`);
        const existingRow = existingData.values?.[0] || [];
        await sheetsUpdate(accessToken, `Sheet1!A${existingRowIndex}:AD${existingRowIndex}`, [buildRow(data, existingRow)]);
        return NextResponse.json({ success: true, message: 'Lead updated successfully', action: 'updated' });
      } else {
        await sheetsAppend(accessToken, 'Sheet1!A:AD', [buildRow(data)]);
        return NextResponse.json({ success: true, message: 'Lead created successfully', action: 'created' });
      }
    } else if (action === 'update') {
      const existingRowIndex = await findRowByEmail(accessToken, data.email);
      if (existingRowIndex) {
        const existingData = await sheetsGet(accessToken, `Sheet1!A${existingRowIndex}:AD${existingRowIndex}`);
        const existingRow = existingData.values?.[0] || [];
        await sheetsUpdate(accessToken, `Sheet1!A${existingRowIndex}:AD${existingRowIndex}`, [buildRow(data, existingRow)]);
        return NextResponse.json({ success: true, message: 'Lead updated successfully', action: 'updated' });
      } else {
        return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ success: false, error: "Invalid action. Must be 'create' or 'update'" }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Google Sheets error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
