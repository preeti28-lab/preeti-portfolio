import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'

import AnimatedBackground from './components/layout/AnimatedBackground'
import BackToTop from './components/layout/BackToTop'
import Footer from './components/layout/Footer'
import Loader from './components/layout/Loader'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'

// Secondary routes are code-split — the landing page ships without them.
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Minimal fallback while a lazy route chunk downloads. */
function RouteFallback() {
  return (
    <div className="grid min-h-[70svh] place-items-center" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand-500" />
    </div>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)

  // Brand splash. Kept short and skipped entirely for repeat visitors in the
  // same tab session, so navigation never feels padded.
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('portfolio-splash-seen')
    if (alreadySeen) {
      setBooting(false)
      return undefined
    }

    const timer = setTimeout(() => {
      setBooting(false)
      sessionStorage.setItem('portfolio-splash-seen', '1')
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Splash screen */}
      <AnimatePresence>{booting && <Loader />}</AnimatePresence>

      {/* Keyboard users can jump straight past the nav. */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
