import { useEffect, useState } from 'react'

/**
 * useMediaQuery — subscribe to a CSS media query from React.
 * @param {string} query e.g. '(min-width: 1024px)'
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (event) => setMatches(event.matches)
    setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/** True when the visitor has asked the OS to reduce motion. */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export default useMediaQuery
