/**
 * profile.js
 * ---------------------------------------------------------------------------
 * Single source of truth for personal details. Change the values here and the
 * whole site (hero, about, contact, footer, SEO tags) updates.
 */

export const profile = {
  name: 'Preeti Kumari',
  firstName: 'Preeti',
  title: 'MERN Stack Developer',
  // Rotated one word at a time in the hero headline.
  roles: ['MERN Stack Developer', 'React.js Developer', 'Next.js Developer', 'Tailwind CSS Specialist'],
  tagline:
    'I turn UI/UX designs into clean, reusable React components that stay fast and readable on every screen.',
  summary:
    'MERN Stack Developer with 1+ year of hands-on experience building responsive, accessible and performance-optimised web applications using React.js, Next.js, JavaScript (ES6+) and Tailwind CSS. I have delivered four live websites across edtech, admissions, healthcare and consulting — including Razorpay payments and Google OAuth sign-in — and I enjoy turning Figma designs into clean, reusable components, improving SEO and Lighthouse performance, and collaborating with cross-functional teams in Git-based workflows.',
  location: 'Dwarka, Delhi, India · Open to remote',
  email: 'preerikumari2922005@gmail.com',
  phone: '+91 99900 23588',
  availability: 'Open to MERN / React developer roles',
  resumeUrl: '/resume.pdf',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'preeti28-lab',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://preeti28-lab.github.io',

  // Quick credibility numbers shown under the hero.
  // TODO: bump these as you ship more work — keep every number defensible.
  stats: [
    { label: 'Years experience', value: 1, suffix: '+' },
    { label: 'Live client websites', value: 4, suffix: '' },
    { label: 'Projects built', value: 10, suffix: '+' },
    { label: 'Technologies used', value: 20, suffix: '+' },
  ],

  // Short bullets for the About section.
  highlights: [
    'MERN Stack Developer at Averno Tech since June 2025, building client-facing web apps.',
    'Delivered 4 live websites across edtech, admissions, healthcare and consulting.',
    'Integrated Razorpay payments and Google OAuth sign-in in a production edtech platform.',
    'Improve SEO and Lighthouse scores with structured data, meta tags, lazy loading and WebP images.',
  ],

  goals: [
    'Grow into a strong React engineer with real depth in state management and performance.',
    'Go deeper on the Node.js / Express / MongoDB side and pick up TypeScript for type-safe apps.',
    'Keep building in public on GitHub and contribute to open source frontend tooling.',
  ],
}

/** Social links — used in the hero, contact section and footer. */
export const socials = [
  { name: 'GitHub', url: 'https://github.com/preeti28-lab', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/preeti-kumari-29983b334', icon: 'Linkedin' },
  { name: 'Email', url: 'mailto:preerikumari2922005@gmail.com', icon: 'Mail' },
]

/** In-page navigation. `href` values must match the section `id`s. */
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'What I Do', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
