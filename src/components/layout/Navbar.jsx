import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { navLinks, profile } from '../../data/profile'
import { EMPTY_SECTIONS, useScrollSpy } from '../../hooks/useScrollSpy'
import { cn, scrollToSection } from '../../utils/helpers'
import Button from '../ui/Button'
import ThemeToggle from './ThemeToggle'

/**
 * Navbar
 * ---------------------------------------------------------------------------
 * Sticky, glassmorphic header with:
 *   - a scroll-progress bar along the bottom edge
 *   - active-link highlighting driven by IntersectionObserver
 *   - an animated mobile drawer that traps nothing but locks body scroll
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  // Section ids are stable — memoise so the observer is not rebuilt each render.
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace('#', '')), [])
  // Only spy on sections while the landing page is mounted.
  const activeSection = useScrollSpy(isHome ? sectionIds : EMPTY_SECTIONS, 96)

  // Scroll-progress indicator.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Add the elevated/frosted treatment once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close the drawer on Escape.
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /**
   * In-page links scroll smoothly. When the visitor is on a sub-route
   * (e.g. /projects/crm-application) we navigate home first, then scroll.
   */
  const handleNavClick = useCallback(
    (event, href) => {
      event.preventDefault()
      setMenuOpen(false)

      if (!isHome) {
        navigate('/', { state: { scrollTo: href } })
        return
      }
      scrollToSection(href, 80)
    },
    [isHome, navigate],
  )

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth',
        scrolled ? 'glass shadow-soft' : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]" aria-label="Main">
        {/* ---------------------------------------------------------- Logo */}
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          className="group flex shrink-0 items-center gap-2.5 font-display text-lg font-bold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-sm text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            {profile.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </span>
          <span className="hidden sm:inline">
            {profile.firstName}
            <span className="text-gradient">.dev</span>
          </span>
        </a>

        {/* ------------------------------------------------- Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = isHome && activeSection === id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-brand-600 dark:text-brand-300' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {link.label}
                  {isActive && (
                    // Shared layout id makes the pill slide between links.
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-brand-500/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* ------------------------------------------------------- Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            href={profile.resumeUrl}
            download
            size="sm"
            variant="primary"
            icon={Download}
            iconPosition="left"
            className="hidden md:inline-flex"
          >
            Resume
          </Button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-ink shadow-soft transition-colors hover:border-brand-400 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-brand-gradient"
        aria-hidden="true"
      />

      {/* -------------------------------------------------- Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-16 -z-10 bg-ink/20 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line bg-surface lg:hidden"
            >
              <ul className="container flex flex-col gap-1 py-4">
                {navLinks.map((link, index) => {
                  const id = link.href.replace('#', '')
                  const isActive = isHome && activeSection === id
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <a
                        href={link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        className={cn(
                          'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                            : 'text-ink-muted hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5',
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  )
                })}

                <li className="mt-2">
                  <Button
                    href={profile.resumeUrl}
                    download
                    icon={Download}
                    iconPosition="left"
                    fullWidth
                  >
                    Download Resume
                  </Button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
