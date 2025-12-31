import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
}

export async function sendContractNotification(
  to: string,
  contractTitle: string,
  action: string,
  details?: string
) {
  const subject = `Contract Update: ${contractTitle}`;
  const html = `
    <h1>Contract Notification</h1>
    <p><strong>Contract:</strong> ${contractTitle}</p>
    <p><strong>Action:</strong> ${action}</p>
    ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
    <p><a href="${process.env.NEXTAUTH_URL}/contracts">View Contracts</a></p>
  `;

  await sendEmail(to, subject, html);
}