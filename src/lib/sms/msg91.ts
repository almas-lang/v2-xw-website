const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_BASE_URL = 'https://control.msg91.com/api/v5';

export const MSG91_TEMPLATES = {
  TRAINING_DELIVERY: process.env.MSG91_TRAINING_TEMPLATE_ID || '',
  BOOKING_CONFIRMATION: process.env.MSG91_BOOKING_TEMPLATE_ID || '',
};

export const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'XPWAVE';

/**
 * Send SMS via MSG91 Flow API.
 * Used as fallback when WhatsApp delivery fails.
 *
 * Template 1 — Training Delivery:
 *   vars: { var1: name, var2: watchUrl }
 *
 * Template 2 — Booking Confirmation:
 *   vars: { var1: date, var2: time, var3: meetLink }
 */
export async function sendSMS_MSG91(req: {
  templateId: string;
  phone: string;
  vars: Record<string, string>;
}) {
  if (!MSG91_AUTH_KEY) {
    throw new Error('MSG91_AUTH_KEY not configured');
  }

  if (!req.templateId) {
    throw new Error('MSG91 template ID not provided');
  }

  // Build recipient object with DLT template variables
  const recipient: Record<string, string> = { mobiles: req.phone };
  Object.values(req.vars).forEach((value, index) => {
    recipient[`var${index + 1}`] = value;
  });

  const response = await fetch(`${MSG91_BASE_URL}/flow/`, {
    method: 'POST',
    headers: {
      'authkey': MSG91_AUTH_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id: req.templateId,
      short_url: '0',
      recipients: [recipient],
    }),
  });

  const data = await response.json();
  if (data.type !== 'success') {
    throw new Error(`MSG91 SMS failed: ${data.message}`);
  }

  return { success: true, requestId: data.request_id };
}

/**
 * Send training link SMS (Template 1).
 * Triggered as fallback when WhatsApp delivery of training link fails.
 */
export async function sendTrainingSMS(phone: string, name: string) {
  const watchUrl = 'https://xperiencewave.com/freetraining/watch';
  return sendSMS_MSG91({
    templateId: MSG91_TEMPLATES.TRAINING_DELIVERY,
    phone,
    vars: { var1: name, var2: watchUrl },
  });
}

/**
 * Send booking confirmation SMS (Template 2).
 * Triggered as fallback when WhatsApp delivery of booking confirmation fails.
 */
export async function sendBookingConfirmationSMS(
  phone: string,
  date: string,
  time: string,
  meetLink: string,
) {
  return sendSMS_MSG91({
    templateId: MSG91_TEMPLATES.BOOKING_CONFIRMATION,
    phone,
    vars: { var1: date, var2: time, var3: meetLink },
  });
}
