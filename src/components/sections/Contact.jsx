import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from 'lucide-react'

import { profile, socials } from '../../data/profile'
import { cn } from '../../utils/helpers'
import { rules, validateField, validateForm } from '../../utils/validators'
import Card from '../ui/Card'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

const ICONS = { Github, Linkedin, Twitter, Mail }
const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

// Base URL for the optional Express backend. In dev the Vite proxy handles
// `/api`, so an empty value is the right default.
const API_URL = import.meta.env.VITE_API_URL || ''

/* -------------------------------------------------------------------------- */
/* Field                                                                      */
/* -------------------------------------------------------------------------- */

function Field({ label, name, error, touched, children, hint }) {
  const showError = Boolean(touched && error)
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={name} className="text-sm font-medium">
          {label} <span className="text-red-500">*</span>
        </label>
        {hint && <span className="font-mono text-[11px] text-ink-muted">{hint}</span>}
      </div>

      {children}

      {/* Errors are announced politely rather than interrupting the user. */}
      <AnimatePresence>
        {showError && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState('')
  // Hidden anti-spam field: real visitors never see it, bots fill everything.
  const [honeypot, setHoneypot] = useState('')

  const inputClasses = (field) =>
    cn(
      'w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60',
      'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40',
      touched[field] && errors[field]
        ? 'border-red-500/60 focus:border-red-500'
        : 'border-line focus:border-brand-500',
    )

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Re-validate live, but only after the field has been blurred once, so we
    // do not shout at someone still typing their email.
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateForm(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setStatusMessage('Please fix the highlighted fields and try again.')
      return
    }

    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `website` is the honeypot — the server drops anything that fills it.
        body: JSON.stringify({ ...values, website: honeypot }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || 'The server rejected the message.')
      }

      setStatus('success')
      setStatusMessage("Thanks for reaching out — I'll get back to you soon.")
      setValues(EMPTY_FORM)
      setTouched({})
    } catch {
      // The backend is optional, so failing over to the visitor's mail client
      // means the form is never a dead end.
      setStatus('error')
      setStatusMessage(
        `Could not reach the mail server. Email me directly at ${profile.email} instead.`,
      )
    }
  }

  const contactDetails = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: profile.location, href: null },
  ]

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work"
        highlight="together"
        subtitle="Have a role, a project or just a question? Send a message and I will get back to you as soon as I can."
      />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* --------------------------------------------------- Contact info */}
        <Reveal direction="right" className="flex flex-col gap-6">
          <Card className="p-7">
            <h3 className="text-lg">Get in touch</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              I am currently {profile.availability.toLowerCase()}. The fastest way to reach me is
              email.
            </p>

            <ul className="mt-6 space-y-4">
              {contactDetails.map((detail) => {
                const Icon = detail.icon
                const content = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 ring-1 ring-inset ring-brand-500/20 dark:text-brand-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-ink-muted">
                        {detail.label}
                      </span>
                      <span className="block truncate text-sm font-medium">{detail.value}</span>
                    </span>
                  </>
                )

                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="flex items-center gap-3.5 rounded-xl p-1 transition-colors hover:text-brand-500"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3.5 p-1">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-wider text-ink-muted">Find me online</p>
              <ul className="mt-3 flex gap-2.5">
                {socials.map((social) => {
                  const Icon = ICONS[social.icon] ?? Mail
                  return (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target={social.url.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-500"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Card>

          {/* Availability callout */}
          <Card className="relative overflow-hidden bg-brand-gradient p-7 text-white">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
            <div className="relative">
              <p className="flex items-center gap-2 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Open to opportunities
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Freelance projects, contract work and full-time roles. Remote-first, comfortable
                across time zones.
              </p>
            </div>
          </Card>
        </Reveal>

        {/* --------------------------------------------------------- Form */}
        <Reveal direction="left" delay={0.1}>
          <Card className="p-7 sm:p-9">
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from users and from screen readers. */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name} touched={touched.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jordan Lee"
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                    className={inputClasses('name')}
                  />
                </Field>

                <Field label="Email" name="email" error={errors.email} touched={touched.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jordan@company.com"
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    className={inputClasses('email')}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Subject" name="subject" error={errors.subject} touched={touched.subject}>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Project enquiry — e-commerce rebuild"
                    aria-invalid={Boolean(touched.subject && errors.subject)}
                    aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
                    className={inputClasses('subject')}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  label="Message"
                  name="message"
                  error={errors.message}
                  touched={touched.message}
                  hint={`${values.message.length}/${rules.message.max}`}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={rules.message.max}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about the project, the timeline and what success looks like…"
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                    className={cn(inputClasses('message'), 'resize-y')}
                  />
                </Field>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className={cn(
                  'group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5',
                  'bg-brand-gradient bg-[length:200%_200%] font-medium text-white shadow-glow',
                  'transition-all duration-300 ease-smooth hover:bg-[position:100%_50%] hover:shadow-lift',
                  'active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70',
                )}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              {/* Status banner — aria-live so the result is announced. */}
              <div aria-live="polite" className="mt-4">
                <AnimatePresence mode="wait">
                  {status !== 'idle' && status !== 'sending' && statusMessage && (
                    <motion.p
                      key={status + statusMessage}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={cn(
                        'flex items-start gap-2 rounded-xl border px-4 py-3 text-sm',
                        status === 'success'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                          : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
                      )}
                    >
                      {status === 'success' ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      )}
                      {statusMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <p className="mt-4 text-center text-xs text-ink-muted">
                Your details are only used to reply to this message.
              </p>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
