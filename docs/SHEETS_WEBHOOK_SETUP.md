# Google Sheets Submissions Webhook

Event registrations and speaker applications are appended as rows to the
"WaveMakers Connect Submissions" Google Sheet:
https://docs.google.com/spreadsheets/d/16mCH41EABq95gnx5gf1oQPZGSwquug5eRQf4K9lhUKY/edit

The sheet gets two tabs, created automatically on first submission:
- **Registrations** — from `/community/register` (`/api/event-register`)
- **Speaker Applications** — from `/community/apply` (`/api/speaker-apply`)

The server posts each submission to a Google Apps Script web app attached to
the sheet (`src/lib/sheets.ts`). If the webhook is down or unconfigured, the
form still works — emails and Brevo are unaffected.

## One-time setup (done in the browser, ~2 minutes)

1. Open the sheet (link above) while signed in as its owner (murad@xperiencewave.com).
2. Menu: **Extensions → Apps Script**. Delete any code in the editor and paste:

```javascript
const SECRET = 'eb5ec7ca3cfc4d3cf7e945882a1aa70d';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) {
    return ContentService.createTextOutput('forbidden');
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(data.tab);
  const headers = Object.keys(data.row);
  if (!sheet) {
    sheet = ss.insertSheet(data.tab);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(headers.map(function (h) { return data.row[h] || ''; }));
  return ContentService.createTextOutput('ok');
}
```

3. Click **Deploy → New deployment**.
4. Click the gear icon next to "Select type" and choose **Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy**.
   ("Anyone" only means anyone can POST to the URL; the SECRET check rejects
   anything that isn't from our server. Nobody can read the sheet through it.)
6. Authorize when prompted (Advanced → Go to project if Google warns about an
   unverified app — it's your own script).
7. Copy the **Web app URL** (ends in `/exec`).

## Wiring the URL

Set these env vars locally (`.env.local`) and in Vercel for the
v2-xw-website project (Production + Preview):

```
SHEETS_WEBHOOK_URL=<the /exec URL from step 7>
SHEETS_WEBHOOK_SECRET=eb5ec7ca3cfc4d3cf7e945882a1aa70d
```

## Notes

- If the script code is ever changed, redeploy via **Deploy → Manage
  deployments → edit (pencil) → Version: New version** — otherwise the URL
  keeps serving the old code.
- Rows are append-only from the site; editing/sorting the sheet manually is
  safe (new rows always append at the bottom of the tab).
