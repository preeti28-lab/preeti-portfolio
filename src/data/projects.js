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

export const categories = ['All', 'Web Platform', 'React App', 'Business Website', 'Portfolio']

export const projects = [
  {
    slug: 'codiva-academy',
    title: 'Codiva Academy',
    category: 'Web Platform',
    featured: true,
    year: '2026',
    tagline: 'Online coding institute platform with Razorpay enrolment, Google sign-in and certificate verification.',
    description:
      'A full-featured edtech platform for live, mentor-led coding courses. Students browse Courses, Course Details, Certification, Blog and Contact pages backed by a REST API, enrol through Razorpay checkout, sign in with Google and track progress from their own dashboard — while admins manage everything from a dedicated panel.',
    highlights: [
      'Courses, Course Details, Certification, Blog and Contact pages connected to a REST API backend.',
      'Razorpay checkout for course enrolment and Google OAuth sign-in.',
      'Student dashboard, admin panel and certificate verification by certificate number.',
      'City-wise landing pages, JSON-LD structured data and Open Graph / Twitter meta tags for SEO.',
      'Content Security Policy for hardening and non-blocking font loading for faster first paint.',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Razorpay', 'Google OAuth', 'REST API'],
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=70',
    live: 'https://codivaacademy.com',
    github: '#', // TODO: add repository URL
  },
  {
    slug: 'admissionhub',
    title: 'AdmissionHub',
    category: 'Web Platform',
    featured: true,
    year: '2026',
    tagline: 'Admission guidance platform helping students compare and apply to UGC-approved universities.',
    description:
      'A multi-page Next.js platform — Home, About, Universities, Courses, Counseling, Blog and Contact — that helps students explore UGC-approved universities, compare courses side by side and reach a counsellor in a couple of clicks.',
    highlights: [
      'Multi-page Next.js site covering universities, courses, counseling, blog and contact.',
      'Reusable university and course cards showing fees, placement, average salary and duration for quick comparison.',
      'Lead-capture counseling forms with course-interest selection and WhatsApp / call CTAs.',
      'A 4-step admission process, FAQs and testimonials to drive enquiries.',
      'SEO and Open Graph metadata on every page.',
    ],
    tech: ['Next.js', 'React'],
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=70',
    live: 'https://admissionhubs-main.vercel.app',
    github: '#', // TODO: add repository URL
  },
  {
    slug: 'al-mustafa-medical-tourism',
    title: 'Al Mustafa Medical Tourism',
    category: 'Business Website',
    featured: true,
    year: '2026',
    tagline: 'Patient-focused healthcare website connecting international patients with top hospitals in India.',
    description:
      'A responsive website for a medical tourism service that connects international patients with top hospitals and experienced doctors across India. The layout is clean and mobile-friendly, putting personalised care front and centre to build patient trust.',
    highlights: [
      'Responsive, patient-focused layout designed to build trust with international visitors.',
      'Clear presentation of hospitals, doctors and personalised care services.',
      'SEO meta descriptions and Open Graph metadata for search visibility and social sharing.',
    ],
    tech: ['React', 'Tailwind CSS'],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=70',
    live: 'https://al-mustafamedicaltourism-nu.vercel.app',
    github: '#', // TODO: add repository URL
  },
  {
    slug: 'customer-support-dashboard',
    title: 'Helpdesk',
    category: 'React App',
    featured: true,
    year: '2026',
    tagline:
      'Support ticket dashboard with optimistic updates, a shareable slide-over detail route and full keyboard control.',
    description:
      'A dashboard a support team can work out of all day: filter, search and sort a ticket queue, then open any ticket in a slide-over panel without losing the list behind it. The panel is a real route, so every ticket has a shareable URL and the back button behaves. Ticket updates are optimistic — the UI moves immediately and rolls back with an error toast if the write fails — and the mock API persists changes to localStorage so they survive a reload.',
    highlights: [
      'Zustand stores for tickets, filters and request state, with stats, tab counts and the filtered list all derived through useMemo rather than stored.',
      'One generic optimistic `updateTicket` action behind both status changes and assignment, with automatic rollback and an error toast on failure.',
      'Slide-over ticket detail at /tickets/:ticketId — activity timeline, reply vs internal-note composer, previous/next navigation and copy link.',
      'Keyboard shortcuts throughout (/ to search, J/K between tickets, Ctrl+Enter to send) plus ARIA listbox dropdowns rendered in a portal so they are never clipped.',
      'Semantic theme tokens as CSS variables instead of per-component `dark:` classes, defaulting to the system setting with no flash on load.',
    ],
    tech: ['React', 'Zustand', 'React Router', 'Tailwind CSS', 'lucide-react', 'Vite'],
    image:
      'https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&w=1200&q=70',
    live: 'https://customer-support-dashboard-seven.vercel.app',
    github: 'https://github.com/preeti28-lab/customer-support-dashboard',
  },
  {
    slug: 'qrsmart',
    title: 'QRSmart',
    category: 'React App',
    featured: true,
    year: '2026',
    tagline: 'QR code platform with ~20 code types, a shared design studio and bulk Excel generation.',
    description:
      'A QR code generator platform that treats every code type as its own guided builder — vCard, WiFi, restaurant menu, coupon, event, product, playlist, PDF, video and more — while funnelling all of them through one shared Content → Design → Download flow. A separate bulk mode turns an uploaded Excel sheet into a whole batch of codes under a single design, and the dashboard side of the app covers saved codes, plans and scan statistics.',
    highlights: [
      'Around twenty QR builders — static (URL, WiFi, email, SMS, WhatsApp, vCard) and dynamic (menu, coupon, event, business, list of links) — sharing one builder shell and step flow.',
      'Shared design studio with colour pickers, corner and dot styles, logo upload, CTA frames and selectable error-correction level, exporting a PNG built with qr-code-styling.',
      'Bulk generator that reads an uploaded Excel sheet and applies one design across every row.',
      'Redux Toolkit store over an axios API layer, with Auth0 / Google sign-in and an ApexCharts statistics dashboard.',
    ],
    tech: [
      'React',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS',
      'Material UI',
      'qr-code-styling',
      'Auth0',
      'Vite',
    ],
    image:
      'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1200&q=70',
    live: 'https://qr-smart-6ijn.vercel.app',
    github: 'https://github.com/preeti28-lab/Qr-Smart',
  },
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
    tagline: 'Multi-page site for a quality management and engineering consultancy, themed like a technical inspection report.',
    description:
      'A multi-page website for a quality management, engineering and business consultancy firm. Every service page is driven by a single centralised services data source, the visual language borrows from precision engineering — blueprint grids and a dark navy palette — and the blog reads like an inspection report rather than a typical marketing page.',
    highlights: [
      'Service pages generated from one centralised services data source.',
      'Multi-level navbar with hover dropdowns on desktop and an accordion on mobile.',
      'Blog detail pages styled as engineering inspection reports with a sticky table of contents.',
      'Dark-navy blueprint theme built on Tailwind design tokens, with IntersectionObserver and Framer Motion scroll animations.',
      'Performance tuned through Lighthouse audits, WebP images, React.lazy and LCP preloading.',
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
