import { useEffect } from 'react'

/**
 * SEO
 * ---------------------------------------------------------------------------
 * A dependency-free replacement for react-helmet: updates the document title,
 * meta description and the Open Graph / Twitter tags whenever a route mounts.
 *
 * Tags declared in index.html are reused when present, and created on demand
 * otherwise, so crawlers that do not run JS still see sensible defaults.
 */
function setMeta(selector, attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function SEO({ title, description, image, url, type = 'website' }) {
  useEffect(() => {
    if (title) document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:image"]', 'property', 'og:image', image)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)

    if (url) {
      let canonical = document.head.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
    }
  }, [title, description, image, url, type])

  return null
}
