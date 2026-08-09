import { useEffect, useState } from 'react'

const CACHE_KEY = 'portfolio-github-cache'
const CACHE_TTL = 1000 * 60 * 60 // 1 hour — GitHub rate-limits anonymous calls

/**
 * useGitHubRepos
 * ---------------------------------------------------------------------------
 * Fetches a user's public repositories from the GitHub REST API, sorted by
 * stars. Results are cached in localStorage for an hour because unauthenticated
 * requests are limited to 60/hour per IP.
 *
 * @param {string} username  GitHub handle
 * @param {number} limit     how many repos to keep
 * @returns {{repos: Array, loading: boolean, error: string|null}}
 */
export function useGitHubRepos(username, limit = 6) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      return undefined
    }

    const controller = new AbortController()

    // ---- 1. Serve from cache when it is still fresh ------------------------
    try {
      const cached = JSON.parse(window.localStorage.getItem(`${CACHE_KEY}:${username}`) || 'null')
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setRepos(cached.repos.slice(0, limit))
        setLoading(false)
        return () => controller.abort()
      }
    } catch {
      /* corrupt cache — just refetch */
    }

    // ---- 2. Otherwise hit the API ----------------------------------------
    async function fetchRepos() {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } },
        )

        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? 'GitHub rate limit reached. Please try again later.'
              : `GitHub responded with ${response.status}`,
          )
        }

        const data = await response.json()

        const normalised = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
            updatedAt: repo.updated_at,
          }))

        try {
          window.localStorage.setItem(
            `${CACHE_KEY}:${username}`,
            JSON.stringify({ timestamp: Date.now(), repos: normalised.slice(0, 12) }),
          )
        } catch {
          /* storage full or blocked — non-fatal */
        }

        setRepos(normalised.slice(0, limit))
        setError(null)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
    return () => controller.abort()
  }, [username, limit])

  return { repos, loading, error }
}

export default useGitHubRepos
