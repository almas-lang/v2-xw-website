const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL;
const SHEETS_WEBHOOK_SECRET = process.env.SHEETS_WEBHOOK_SECRET;

/**
 * Appends a row to the "WaveMakers Connect Submissions" Google Sheet via an
 * Apps Script web app (see docs/SHEETS_WEBHOOK_SETUP.md). Silently no-ops if
 * the webhook env vars aren't configured, and never throws — a Sheets outage
 * must not fail the form submission.
 */
export async function appendToSheet(tab: string, row: Record<string, string>) {
  if (!SHEETS_WEBHOOK_URL || !SHEETS_WEBHOOK_SECRET) return;
  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret: SHEETS_WEBHOOK_SECRET, tab, row }),
    });
    if (!response.ok) {
      console.error('Sheets webhook failed:', response.status, await response.text().catch(() => ''));
    }
  } catch (error) {
    console.error('Failed to append to Google Sheet:', error);
  }
}

export function istTimestamp() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
