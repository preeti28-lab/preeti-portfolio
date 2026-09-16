import { forwardRef, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { profile } from '../../data/profile'
import { categories, projects } from '../../data/projects'
import { cn } from '../../utils/helpers'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

/* -------------------------------------------------------------------------- */
/* Project card                                                               */
/* -------------------------------------------------------------------------- */

// forwardRef is required: AnimatePresence `mode="popLayout"` measures the
// exiting child, which means it needs a DOM ref on the card element.
const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
  // Projects without a real URL yet still carry the '#' placeholder — treat
  // those as "no link" so we never render a button that goes nowhere.
  const hasLive = Boolean(project.live) && project.live !== '#'
  const hasRepo = Boolean(project.github) && project.github !== '#'

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-brand-400/60 hover:shadow-lift"
    >
      {/* ---------------------------------------------------------- Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          width="1200"
          height="750"
          className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
        />

        {/* Gradient scrim + hover action buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* z-20 lifts these above the card-wide case-study link overlay below,
            otherwise the overlay would swallow their clicks. */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-3 items-center gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {hasLive && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 backdrop-blur transition-transform hover:scale-105"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live demo
              <span className="sr-only"> of {project.title}</span>
            </a>
          )}
          {hasRepo && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-transform hover:scale-105"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Code
              <span className="sr-only"> for {project.title}</span>
            </a>
          )}
        </div>

        {/* Corner badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {project.featured && (
            <Badge tone="brand" className="bg-surface/90 backdrop-blur">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              Featured
            </Badge>
          )}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-muted backdrop-blur">
          {project.year}
        </span>
      </div>

      {/* ----------------------------------------------------------- Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
          {project.category}
        </p>

        <h3 className="mt-2 text-xl">
          {/* Whole-card link target, kept accessible via a real anchor. Once a
              project is deployed the card opens the live app; until then it
              falls back to the case study. */}
          {hasLive ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0"
            >
              {project.title}
              <span className="sr-only"> — open the live site</span>
            </a>
          ) : (
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          )}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          {project.tech.length > 4 && (
            <li>
              <Badge tone="accent">+{project.tech.length - 4}</Badge>
            </li>
          )}
        </ul>

        {/* z-20 + relative lifts this above the card-wide overlay so the case
            study stays reachable even when the card itself opens the live app. */}
        <Link
          to={`/projects/${project.slug}`}
          className="relative z-20 mt-5 inline-flex items-center gap-1 self-start text-sm font-medium text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-300"
        >
          Case study
          <span className="sr-only"> for {project.title}</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  )
})

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  )

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected"
        highlight="work"
        subtitle="Seven projects that show the range — full stack products, focused APIs and interface work. Every one has a live demo and public source."
      />

      {/* ------------------------------------------------------- Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap items-center justify-center gap-2"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category
          const count =
            category === 'All'
              ? projects.length
              : projects.filter((project) => project.category === category).length

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200',
                isActive ? 'text-white' : 'text-ink-muted hover:text-ink',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-brand-gradient shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {category}
              <span className={cn('ml-1.5 text-xs', isActive ? 'text-white/70' : 'text-ink-muted/60')}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ------------------------------------------------------------- Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 text-center">
        <Button
          href={`https://github.com/${profile.githubUsername}?tab=repositories`}
          variant="secondary"
          size="lg"
          icon={Github}
          iconPosition="left"
        >
          See everything on GitHub
        </Button>
      </div>
    </Section>
  )
}
