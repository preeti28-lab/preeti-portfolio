import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import SEO from '../components/layout/SEO'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import Experience from '../components/sections/Experience'
import GitHubRepos from '../components/sections/GitHubRepos'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Services from '../components/sections/Services'
import Skills from '../components/sections/Skills'
import { profile } from '../data/profile'
import { scrollToSection } from '../utils/helpers'

/**
 * Home — the single-page portfolio.
 * Sections are ordered to answer a recruiter's questions in sequence:
 * who → what they know → proof → track record → how to hire → how to reach.
 */
export default function Home() {
  const location = useLocation()

  // When another route navigates here with `state.scrollTo` (e.g. the navbar
  // from a project detail page), jump to that section after mount.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    // rAF gives the DOM one frame to lay the sections out first.
    const frame = requestAnimationFrame(() => scrollToSection(target, 80))
    return () => cancelAnimationFrame(frame)
  }, [location.state])

  return (
    <>
      <SEO
        title={`${profile.name} — ${profile.title}`}
        description={profile.summary.slice(0, 160)}
        url={profile.siteUrl}
      />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <GitHubRepos />
      <Contact />
    </>
  )
}
