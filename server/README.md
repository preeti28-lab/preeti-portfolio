# Contact form API (optional)

A tiny Express server that receives the portfolio contact form and sends it on
with Nodemailer. **The frontend works without it** — if the API is unreachable
the form tells the visitor to email directly instead.

## Setup

```bash
cd server
npm install
cp .env.example .env    # then fill in your SMTP details
npm run dev             # http://localhost:5000
```

With Vite's dev proxy already pointing `/api` at port 5000, no frontend change
is needed locally.

### Gmail credentials

1. Turn on 2-Step Verification for the Google account.
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Put the 16-character password in `SMTP_PASS` (not your normal password).

## Endpoints

| Method | Path           | Description                                        |
| ------ | -------------- | -------------------------------------------------- |
| `GET`  | `/api/health`  | Liveness check + whether SMTP is configured.       |
| `POST` | `/api/contact` | Accepts `{ name, email, subject, message }` JSON.  |

`POST /api/contact` responses:

- `200` — `{ success: true }`, mail sent (and an auto-reply queued).
- `400` — validation failed, `message` holds the first problem.
- `429` — rate limited (5 requests per IP per 15 minutes).
- `503` — SMTP credentials missing on the server.

## Security notes

- Server-side validation mirrors the client rules — the client is never trusted.
- All user input is HTML-escaped before it reaches the email template.
- A hidden `website` honeypot field silently absorbs bot submissions.
- CORS is restricted to the origins listed in `ALLOWED_ORIGINS`.

## Deploying

Deploy this folder as its own service (Render, Railway, Fly.io, or a Vercel
serverless function). Then set `VITE_API_URL` in the frontend `.env` to the
deployed URL, e.g. `https://portfolio-api.onrender.com`.
