/**
 * projects.js
 * ---------------------------------------------------------------------------
 * `slug` powers the /projects/:slug detail route, so keep it URL-safe & unique.
 * `featured: true` pins a project to the top of the grid.
 *
 * TODO before publishing:
 *  1. Replace every `live` / `github` placeholder ('#') with the real URL.
 *  2. Swap the Unsplash placeholder images for real screenshots dropped in
 *     `public/projects/` (e.g. `image: '/projects/crm-application.webp'`).
 *  3. Confirm the `year` on each project — these default to 2025.
 */

export const categories = ['All', 'React App', 'Business Website', 'Portfolio']

export const projects = [
  {
    slug: 'railoo',
    title: 'Railoo',
    category: 'React App',
    featured: true,
    year: '2026',
    tagline: 'Train booking interface with a live fare engine and a carbon-saving calculator.',
    description:
      'A train ticket booking app where every number on screen is derived, not hardcoded. A single BookingProvider context holds the journey — stations, seat class, date and passenger count — and a dedicated journey engine turns that into distance, fare and eco impact on the fly, so the booking stepper, fare card and CO₂ panel always agree with each other.',
    highlights: [
      'Centralised booking state in a Context provider, with fare, distance and eco impact derived through useMemo.',
      'Fare engine that layers class rate, haversine distance with a rail-curvature factor, weekend surcharge, GST and booking fees.',
      'Eco impact panel comparing train emissions against car and flight, expressed as trees, kilometres and percentage saved.',
      'Theme switching that respects system preference, syncs across tabs via storage events and crossfades with the View Transition API.',
    ],
    tech: ['React', 'React Router', 'Tailwind CSS', 'Framer Motion', 'Context API', 'Vite'],
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=70',
    live: 'https://railoo-delta.vercel.app',
    github: 'https://github.com/preeti28-lab/Railoo',
  },
  {
    slug: 'crm-application',
    title: 'CRM Application',
    category: 'React App',
    featured: true,
    year: '2025',
    tagline: 'Full-featured CRM with Redux Toolkit state that survives navigation and refreshes.',
    description:
      'A customer relationship manager built around Redux Toolkit slices for leads, employees, customers, follow-ups and tasks. Filter state was migrated out of local component state and into Redux so a user’s view persists as they move between screens, and redux-persist keeps everything intact across page reloads.',
    highlights: [
      'Modelled leads, employees, customers, follow-ups and tasks as separate Redux Toolkit slices.',
      'Migrated filter state from local component state into Redux so filters persist across navigation.',
      'Built a global Navbar search across every slice, with debouncing and keyboard shortcuts.',
      'Configured redux-persist with a custom localStorage adapter for Vite compatibility.',
    ],
    tech: ['React', 'Redux Toolkit', 'Redux-Persist', 'React Router', 'Tailwind CSS'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
    // Root URL, not /login — the CRM deployment has no SPA rewrite, so a direct
    // hit on a client-side route returns Vercel's 404. React Router redirects
    // to the login screen on its own once index.html loads.
    live: 'https://crm-panel-8a9y.vercel.app/',
    github: '#', // TODO: add repository URL
  },
  {
    slug: 'tech-shashtra-solutions',
    title: 'Tech Shashtra Solutions',
    category: 'Business Website',
    featured: true,
    year: '2025',
    tagline: 'Multi-page site for an engineering consultancy, themed like a technical inspection report.',
    description:
      'A multi-page website for an engineering and business consulting firm. The visual language borrows from precision engineering — blueprint grid backgrounds and a dark navy palette — and the blog reads like an inspection report rather than a typical marketing page.',
    highlights: [
      'Navbar with a dropdown blog menu and animated blog listing cards.',
      'BlogDetails page styled as an engineering inspection report with a sticky table of contents.',
      'Blueprint grid backgrounds and a dark navy palette for a precision-engineering feel.',
      'IntersectionObserver-based scroll reveals paired with Framer Motion page transitions.',
    ],
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router', 'IntersectionObserver'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=70',
    live: 'https://tech-shastra.vercel.app/',
    github: '#', // TODO: add repository URL
  },
  {
    slug: 'deepak-printer',
    title: 'Deepak Printer',
    category: 'Business Website',
    featured: true,
    year: '2025',
    tagline: 'Single-page printing business site with scroll navigation and reusable reveal patterns.',
    description:
      'A single-page website for a printing business, built around React Router scroll navigation so the whole site reads as one continuous page. Includes a responsive ContactHero and a contact form with an embedded Google Map.',
    highlights: [
      'React Router-based scroll navigation across a single-page layout.',
      'Responsive ContactHero plus a contact form with a Google Maps embed.',
      'Reusable `useScrollReveal` hook and a `RevealOnScroll` wrapper component.',
      'Route-level lazy loading and a ScrollToTop helper for smooth route transitions.',
    ],
    tech: ['React', 'React Router', 'Tailwind CSS', 'Custom Hooks', 'Lazy Loading'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=70',
    live: '#', // TODO: add live demo URL
    github: '#', // TODO: add repository URL
  },
  {
    slug: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    category: 'Portfolio',
    featured: false,
    year: '2025',
    tagline: 'Fully responsive personal portfolio built from reusable React components.',
    description:
      'A personal portfolio designed and built from scratch with reusable React components and smooth in-page navigation, deployed on GitHub Pages.',
    highlights: [
      'Component-driven layout so each section is independently reusable.',
      'Smooth in-page navigation between sections.',
      'Fully responsive from small phones up to wide desktops.',
      'Deployed on GitHub Pages.',
    ],
    tech: ['React', 'Tailwind CSS', 'GitHub Pages'],
    image:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1200&q=70',
    live: 'https://preeti-portfolio-wheat.vercel.app/',
    github: '#', // TODO: add repository URL
  },
]

/** Helper used by the detail route. */
export const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug)
