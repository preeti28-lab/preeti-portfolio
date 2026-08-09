import { ArrowUp, Github, Heart, Linkedin, Mail, Twitter } from 'lucide-react'
import { navLinks, profile, socials } from '../../data/profile'
import { services } from '../../data/services'
import { scrollToSection } from '../../utils/helpers'

// Icon name (from data) -> component. Keeps the data files free of imports.
const ICONS = { Github, Linkedin, Twitter, Mail }

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNavClick = (event, href) => {
    event.preventDefault()
    scrollToSection(href, 80)
  }

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/* Soft brand glow behind the footer */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* ------------------------------------------------- Brand blurb */}
          <div className="lg:col-span-2 lg:pr-8">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex items-center gap-2.5 font-display text-xl font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-sm text-white">
                {profile.name.split(' ').map((w) => w[0]).join('')}
              </span>
              {profile.firstName}
              <span className="text-gradient">.dev</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              {profile.tagline} Currently {profile.availability.toLowerCase()}.
            </p>

            <ul className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = ICONS[social.icon] ?? Mail
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-2 text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-500 hover:shadow-soft"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ------------------------------------------------- Quick links */}
          <nav aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" className="text-sm font-semibold uppercase tracking-wider text-ink">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="text-sm text-ink-muted transition-colors hover:text-brand-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------------------------------------------- Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">What I Do</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(event) => handleNavClick(event, '#services')}
                    className="text-sm text-ink-muted transition-colors hover:text-brand-500"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-ink-muted transition-colors hover:text-brand-500"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------ Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-center text-sm text-ink-muted sm:text-left">
            © {year} {profile.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-ink-muted">
            Built with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" aria-hidden="true" />
            using React, Vite &amp; Tailwind CSS
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-brand-500"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
