import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Github, Tag } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import SEO from '../components/layout/SEO'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Reveal from '../components/ui/Reveal'
import { getProjectBySlug, projects } from '../data/projects'
import { profile } from '../data/profile'

/**
 * ProjectDetail — case-study page for a single project (/projects/:slug).
 * Unknown slugs redirect to the 404 route rather than rendering an empty page.
 */
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/404" replace />

  // Wrap around the list so there is always a "next project" to explore.
  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <article className="pb-24 pt-28 lg:pt-32">
      <SEO
        title={`${project.title} — ${profile.name}`}
        description={project.tagline}
        image={project.image}
        url={`${profile.siteUrl}/projects/${project.slug}`}
        type="article"
      />

      <div className="container">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-brand-500"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>

        {/* ------------------------------------------------------- Header */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {project.category}
            </Badge>
            <Badge>
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {project.year}
            </Badge>
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">{project.tagline}</p>

          {/* '#' is the not-deployed-yet placeholder — skip the button entirely
              rather than render one that goes nowhere. */}
          <div className="mt-7 flex flex-wrap gap-3">
            {project.live && project.live !== '#' && (
              <Button href={project.live} size="lg" icon={ExternalLink}>
                View live site
              </Button>
            )}
            {project.github && project.github !== '#' && (
              <Button
                href={project.github}
                size="lg"
                variant="secondary"
                icon={Github}
                iconPosition="left"
              >
                Source code
              </Button>
            )}
          </div>
        </Reveal>

        {/* -------------------------------------------------------- Cover */}
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-line shadow-lift">
            <img
              src={project.image}
              alt={`${project.title} interface`}
              width="1200"
              height="750"
              loading="eager"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Reveal>

        {/* --------------------------------------------------- Case study */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal direction="right">
            <h2 className="text-2xl">Overview</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{project.description}</p>

            <h2 className="mt-10 text-2xl">Key contributions</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 leading-relaxed text-ink-muted">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <Card className="p-7 lg:sticky lg:top-28">
              <h2 className="text-lg">Tech stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Badge tone="brand">{tech}</Badge>
                  </li>
                ))}
              </ul>

              <dl className="mt-7 space-y-4 border-t border-line pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Role</dt>
                  <dd className="font-medium">Full Stack Developer</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Year</dt>
                  <dd className="font-medium">{project.year}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Category</dt>
                  <dd className="font-medium">{project.category}</dd>
                </div>
              </dl>
            </Card>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- Next project */}
        <Reveal delay={0.15} className="mt-16">
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-lift"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">Next project</p>
              <p className="mt-1 font-display text-xl font-semibold">{nextProject.title}</p>
            </div>
            <ArrowRight
              className="h-6 w-6 text-brand-500 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
