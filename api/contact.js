const { Resend } = require('resend');
const CONTACT_TO_EMAIL = 'bmj1015@gmail.com';
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_SERVICES_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  return body;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return res.status(500).json({ ok: false, error: 'Email service is not configured' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = parseBody(req.body);
  if (!body) {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }

  const name = getString(body.name);
  const email = getString(body.email);
  const services = getString(body.services) || 'None selected';
  const message = getString(body.message);
  const website = getString(body.website);

  // Silently accept bot submissions that fill the hidden field.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    services.length > MAX_SERVICES_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ ok: false, error: 'Form submission is too long' });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address' });
  }

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Services: ${services}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend email error:', {
      name: error.name,
      statusCode: error.statusCode,
      message: error.message,
    });

    return res.status(error.statusCode || 500).json({
      ok: false,
      error: error.message || 'Unable to send email right now',
    });
  }

  return res.status(200).json({ ok: true });
};
