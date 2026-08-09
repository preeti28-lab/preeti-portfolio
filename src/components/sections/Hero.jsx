import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles, Twitter } from 'lucide-react'

import { profile, socials } from '../../data/profile'
import { techMarquee } from '../../data/skills'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { scrollToSection } from '../../utils/helpers'
import Button from '../ui/Button'
import profileIllustration from '../../assets/profile.svg'

const ICONS = { Github, Linkedin, Twitter, Mail }

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

/** Types out each role, pauses, deletes, moves to the next one. */
function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, pause = 1800 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0])
      return undefined
    }

    const current = words[index % words.length]

    // Finished typing -> wait, then start deleting.
    if (!deleting && text === current) {
      const timer = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(timer)
    }

    // Finished deleting -> advance to the next word.
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return undefined
    }

    const timer = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? deleteSpeed : typeSpeed,
    )
    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reducedMotion])

  return text
}

/** Counts 0 -> value once on mount. */
function CountUp({ value, suffix = '', duration = 1400 }) {
  const [display, setDisplay] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value)
      return undefined
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo keeps the number lively at the start, settled at the end.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration, reducedMotion])

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pt-32"
      aria-label="Introduction"
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* ------------------------------------------------------- Copy */}
          <div className="text-center lg:text-left">
            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-muted lg:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 font-mono text-sm text-brand-600 dark:text-brand-300"
            >
              &lt;/&gt; Hello, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mt-2 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {profile.name}
            </motion.h1>

            {/* Typewriter role line — aria-live keeps it quiet for screen readers,
                which get the static title from the visually hidden text below. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 flex min-h-[2.75rem] items-center justify-center gap-1 text-2xl font-display font-semibold sm:text-3xl lg:min-h-[3.5rem] lg:justify-start lg:text-4xl"
            >
              <span className="sr-only">{profile.title}</span>
              <span className="text-gradient" aria-hidden="true">
                {typed}
              </span>
              <span
                className="ml-0.5 inline-block h-7 w-[3px] animate-pulse rounded-full bg-brand-500 lg:h-9"
                aria-hidden="true"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg lg:mx-0"
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-4 flex items-center justify-center gap-1.5 text-sm text-ink-muted lg:justify-start"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Button
                size="lg"
                icon={ArrowRight}
                onClick={() => scrollToSection('#projects')}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={Mail}
                iconPosition="left"
                onClick={() => scrollToSection('#contact')}
              >
                Contact Me
              </Button>
              <Button
                size="lg"
                variant="ghost"
                href={profile.resumeUrl}
                download
                icon={Download}
                iconPosition="left"
              >
                Resume
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
            >
              {socials.map((social) => {
                const Icon = ICONS[social.icon] ?? Mail
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-ink-muted shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:text-brand-500 hover:shadow-lift"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </motion.ul>
          </div>

          {/* ------------------------------------------------ Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            {/* Glow behind the portrait */}
            <div
              className="absolute inset-6 rounded-full bg-brand-gradient opacity-25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative aspect-square animate-float">
              {/* Rotating dashed ring */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] border-2 border-dashed border-brand-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />

              <div className="glass absolute inset-4 overflow-hidden rounded-[2rem] shadow-lift">
                <img
                  src={profileIllustration}
                  alt={`${profile.name}, ${profile.title}`}
                  width="512"
                  height="512"
                  loading="eager"
                  // lowercase: React 18 does not map the camelCase form
                  fetchpriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating stat chips */}
              <motion.div
                className="glass absolute -left-3 top-10 rounded-2xl px-4 py-2.5 shadow-lift sm:-left-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-display text-lg font-bold text-gradient">React</p>
                <p className="text-[11px] text-ink-muted">Core stack</p>
              </motion.div>

              <motion.div
                className="glass absolute -right-3 bottom-14 rounded-2xl px-4 py-2.5 shadow-lift sm:-right-6"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="font-display text-lg font-bold text-gradient">4+</p>
                <p className="text-[11px] text-ink-muted">Projects</p>
              </motion.div>

              <motion.div
                className="glass absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 shadow-lift"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <Sparkles className="h-4 w-4 text-accent-500" aria-hidden="true" />
                <span className="text-xs font-medium">React + Tailwind</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------- Stats row */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass mt-16 grid grid-cols-2 gap-6 rounded-2xl px-6 py-7 shadow-soft sm:gap-4 lg:grid-cols-4"
        >
          {profile.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-ink-muted sm:text-sm">{stat.label}</p>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* ------------------------------------------------------- Tech marquee */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden overflow-hidden border-t border-line/60 bg-surface/40 py-3 backdrop-blur-sm lg:block">
        <div className="mask-fade-x flex">
          {/* Duplicated list so the -50% translation loops seamlessly. */}
          <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden="true">
            {[...techMarquee, ...techMarquee].map((tech, index) => (
              <li
                key={`${tech}-${index}`}
                className="whitespace-nowrap font-mono text-sm text-ink-muted/70"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
