import { Home, Search } from 'lucide-react'

import SEO from '../components/layout/SEO'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    // A <div>, not <main> — App already renders the page's single <main>.
    <div className="grid min-h-[80svh] place-items-center px-5 pt-24">
      <SEO title="Page not found — 404" description="This page does not exist." />

      <div className="text-center">
        <p className="font-display text-[7rem] font-extrabold leading-none text-gradient sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl">This page took a wrong turn</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">
          The link may be broken, or the page may have been moved. Let us get you back to something
          that exists.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg" icon={Home} iconPosition="left">
            Back home
          </Button>
          <Button to="/#projects" size="lg" variant="secondary" icon={Search} iconPosition="left">
            Browse projects
          </Button>
        </div>
      </div>
    </div>
  )
}
