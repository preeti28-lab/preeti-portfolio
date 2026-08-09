import { useEffect, useState } from 'react'

// Stable reference for the "nothing to watch" case, so callers can pass
// `condition ? ids : EMPTY` without re-running the effect on every render.
export const EMPTY_SECTIONS = []

/**
 * useScrollSpy
 * ---------------------------------------------------------------------------
 * Returns the id of the section currently in view so the navbar can highlight
 * the matching link. Uses IntersectionObserver (cheap, no scroll listener).
 *
 * @param {string[]} sectionIds  ids to watch, in document order
 * @param {number} offset        px offset for the sticky navbar
 * @returns {string} the active section id
 */
export function useScrollSpy(sectionIds = [], offset = 96) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return undefined

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null)

    if (!elements.length) return undefined

    // Track visibility for every section, then pick the topmost visible one.
    const visibility = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestId = ''
        let bestRatio = 0
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId) setActiveId(bestId)
      },
      {
        // Shrink the viewport from the top by the navbar height so a section
        // only counts as "active" once it clears the nav.
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    )

    elements.forEach((element) => observer.observe(element))

    // Anything at the very bottom of the page should activate the last link.
    const handleBottom = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) setActiveId(sectionIds[sectionIds.length - 1])
    }
    window.addEventListener('scroll', handleBottom, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleBottom)
    }
  }, [sectionIds, offset])

  return activeId
}

export default useScrollSpy
