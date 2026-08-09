import { AlertCircle, GitFork, Github, Star } from 'lucide-react'

import { profile } from '../../data/profile'
import { useGitHubRepos } from '../../hooks/useGitHubRepos'
import { formatDate } from '../../utils/helpers'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

/** Skeleton card shown while the API request is in flight. */
function RepoSkeleton() {
  return (
    <Card className="relative overflow-hidden p-6">
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-2/3 rounded bg-ink/10 dark:bg-white/10" />
        <div className="h-3 w-full rounded bg-ink/10 dark:bg-white/10" />
        <div className="h-3 w-4/5 rounded bg-ink/10 dark:bg-white/10" />
        <div className="h-5 w-24 rounded-full bg-ink/10 dark:bg-white/10" />
      </div>
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/5"
        aria-hidden="true"
      />
    </Card>
  )
}

/**
 * GitHubRepos — live "open source" strip.
 * Pulls the visitor-visible repos straight from the GitHub REST API, so the
 * section stays current without a redeploy.
 */
export default function GitHubRepos() {
  const { repos, loading, error } = useGitHubRepos(profile.githubUsername, 6)

  return (
    <Section id="open-source">
      <SectionHeading
        eyebrow="Open source"
        title="Straight from"
        highlight="GitHub"
        subtitle="Live data from the GitHub API — my public repositories, pulled fresh on every visit."
      />

      {/* --------------------------------------------------------- Loading */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RepoSkeleton key={index} />
          ))}
        </div>
      )}

      {/* ----------------------------------------------------------- Error */}
      {!loading && error && (
        <Card className="mx-auto max-w-md p-8 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-amber-500" aria-hidden="true" />
          <p className="mt-4 text-sm text-ink-muted">{error}</p>
          <Button
            href={`https://github.com/${profile.githubUsername}`}
            variant="secondary"
            size="sm"
            icon={Github}
            iconPosition="left"
            className="mt-5"
          >
            Open GitHub profile
          </Button>
        </Card>
      )}

      {/* ------------------------------------------------------------ Data */}
      {!loading && !error && repos.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, index) => (
            <Reveal key={repo.id} delay={(index % 3) * 0.08} className="h-full">
              <Card hover gradient className="group flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 text-base font-semibold">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate transition-colors hover:text-brand-500 after:absolute after:inset-0"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <Github
                    className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-brand-500"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-muted">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-brand-gradient"
                        aria-hidden="true"
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" aria-hidden="true" />
                    {repo.stars}
                    <span className="sr-only"> stars</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                    {repo.forks}
                    <span className="sr-only"> forks</span>
                  </span>
                  <span className="ml-auto">Updated {formatDate(repo.updatedAt)}</span>
                </div>

                {repo.topics.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <li key={topic}>
                        <Badge>{topic}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      )}

      {/* --------------------------------------------------------- Empty */}
      {!loading && !error && repos.length === 0 && (
        <p className="text-center text-sm text-ink-muted">
          No public repositories found for @{profile.githubUsername}.
        </p>
      )}
    </Section>
  )
}
