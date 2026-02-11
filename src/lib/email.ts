import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export function applicationConfirmationEmail(name: string, tourTitle: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>UniQer</h1>
        </div>
        <div class="content">
          <h2>Здравствуйте, ${name}!</h2>
          <p>Спасибо за вашу заявку на кампус-тур <strong>"${tourTitle}"</strong>.</p>
          <p>Мы получили вашу заявку и свяжемся с вами в ближайшее время для подтверждения участия.</p>
          <p>Если у вас есть вопросы, свяжитесь с нами:</p>
          <ul>
            <li>WhatsApp: +7 (XXX) XXX-XX-XX</li>
            <li>Email: info@uniqer.kz</li>
          </ul>
          <p>С уважением,<br>Команда UniQer</p>
        </div>
        <div class="footer">
          © 2024 UniQer. Все права защищены.
        </div>
      </div>
    </body>
    </html>
  `
}

export function newApplicationNotification(
  applicantName: string,
  applicantPhone: string,
  applicantRole: string,
  tourTitle: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .info-row { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .label { font-weight: bold; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Новая заявка!</h1>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">Тур:</span> ${tourTitle}
          </div>
          <div class="info-row">
            <span class="label">Имя:</span> ${applicantName}
          </div>
          <div class="info-row">
            <span class="label">Телефон:</span> ${applicantPhone}
          </div>
          <div class="info-row">
            <span class="label">Роль:</span> ${applicantRole}
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
