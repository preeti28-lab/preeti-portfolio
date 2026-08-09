import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — router side-effect.
 * Browsers keep the scroll position across client-side navigations, which
 * makes a fresh page open half-way down. This resets it, while leaving hash
 * links (#projects) alone so anchor navigation still works.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])

  return null
}
