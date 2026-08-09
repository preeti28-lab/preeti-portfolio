/**
 * server/index.js
 * ---------------------------------------------------------------------------
 * Optional Express backend for the portfolio contact form.
 *
 *   cd server && npm install && npm run dev
 *
 * The frontend posts to POST /api/contact. If this server is not running the
 * form degrades gracefully and tells the visitor to email directly instead —
 * so the site works fine without it.
 */

import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 5000

/* -------------------------------------------------------------------------- */
/* Middleware                                                                  */
/* -------------------------------------------------------------------------- */

app.use(express.json({ limit: '16kb' })) // small body cap = cheap DoS guard

// Only allow the origins you actually deploy from.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin / curl requests have no Origin header.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
  }),
)

// Five messages per IP per 15 minutes is plenty for a real visitor.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again in 15 minutes.' },
})

/* -------------------------------------------------------------------------- */
/* Validation (mirrors src/utils/validators.js — never trust the client)       */
/* -------------------------------------------------------------------------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function validate({ name, email, subject, message }) {
  const errors = []
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.')
  if (!email || !EMAIL_PATTERN.test(email)) errors.push('A valid email address is required.')
  if (!subject || subject.trim().length < 3) errors.push('Subject must be at least 3 characters.')
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.')
  if (message && message.length > 1000) errors.push('Message must be under 1000 characters.')
  return errors
}

/** Strips HTML-significant characters before interpolating into the email. */
const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/* -------------------------------------------------------------------------- */
/* Mail transport                                                              */
/* -------------------------------------------------------------------------- */

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true only for port 465
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

const transporter = createTransporter()

/* -------------------------------------------------------------------------- */
/* Routes                                                                      */
/* -------------------------------------------------------------------------- */

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mailConfigured: Boolean(transporter), uptime: process.uptime() })
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, subject, message, website } = req.body || {}

  // Honeypot: bots fill hidden fields, humans never see them. Return 200 so
  // the bot believes it succeeded and does not retry.
  if (website) return res.json({ success: true, message: 'Message sent.' })

  const errors = validate({ name, email, subject, message })
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors })
  }

  if (!transporter) {
    return res.status(503).json({
      success: false,
      message: 'Mail service is not configured on the server.',
    })
  }

  try {
    // 1. Notify the portfolio owner.
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      replyTo: email, // hitting "Reply" answers the visitor directly
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
          <div style="background:linear-gradient(120deg,#3366ff,#a855f7);padding:20px;border-radius:12px 12px 0 0">
            <h2 style="margin:0;color:#fff;font-size:18px">New portfolio message</h2>
          </div>
          <div style="border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px;padding:20px">
            <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <div style="background:#f8fafc;border-radius:8px;padding:16px;white-space:pre-wrap">${escapeHtml(
              message,
            )}</div>
          </div>
        </div>`,
    })

    // 2. Send the visitor a confirmation (best-effort — never block on it).
    transporter
      .sendMail({
        from: `"${process.env.OWNER_NAME || 'Alex Morgan'}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thanks for getting in touch',
        html: `
          <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto;padding:20px">
            <h2 style="color:#3366ff">Thanks, ${escapeHtml(name)}!</h2>
            <p>Your message reached me and I will reply within 24 hours.</p>
            <blockquote style="border-left:3px solid #a855f7;margin:16px 0;padding-left:14px;color:#475569;white-space:pre-wrap">${escapeHtml(
              message,
            )}</blockquote>
            <p style="color:#64748b;font-size:13px">— ${escapeHtml(
              process.env.OWNER_NAME || 'Alex Morgan',
            )}</p>
          </div>`,
      })
      .catch((error) => console.warn('Auto-reply failed:', error.message))

    return res.json({ success: true, message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Contact form error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Could not send the message. Please email directly.' })
  }
})

// Fallback error handler (catches the CORS rejection above).
app.use((error, _req, res, _next) => {
  console.error(error.message)
  res.status(500).json({ success: false, message: 'Server error.' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
  if (!transporter) {
    console.warn('SMTP not configured — set SMTP_USER and SMTP_PASS in server/.env')
  }
})
