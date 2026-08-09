/**
 * helpers.js — tiny shared utilities.
 */

/** Merge conditional class names: cn('a', cond && 'b') -> 'a b' */
export const cn = (...classes) => classes.filter(Boolean).join(' ')

/** 'Preeti Kumari' -> 'PK' (avatar fallback) */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

/**
 * Smoothly scrolls to an element id, accounting for the sticky navbar.
 * Falls back to an instant jump when the visitor prefers reduced motion.
 */
export function scrollToSection(hash, offset = 80) {
  const id = hash.replace('#', '')
  const element = document.getElementById(id)
  if (!element) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = element.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  // Keep the URL shareable without triggering the browser's own jump.
  window.history.replaceState(null, '', `#${id}`)
}

/** '2025-01-14T…' -> 'Jan 2025' */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
