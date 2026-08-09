/**
 * profile.js
 * ---------------------------------------------------------------------------
 * Single source of truth for personal details. Change the values here and the
 * whole site (hero, about, contact, footer, SEO tags) updates.
 */

export const profile = {
  name: 'Preeti Kumari',
  firstName: 'Preeti',
  title: 'Frontend Developer',
  // Rotated one word at a time in the hero headline.
  roles: ['Frontend Developer', 'React.js Developer', 'UI Engineer', 'Tailwind CSS Specialist'],
  tagline:
    'I turn UI/UX designs into clean, reusable React components that stay fast and readable on every screen.',
  summary:
    'Frontend Developer with hands-on experience building responsive, accessible and performance-optimised web interfaces using React.js, JavaScript (ES6+) and Tailwind CSS. I enjoy translating designs into reusable components and working with cross-functional teams to ship pixel-perfect, cross-browser compatible products — backed by a solid foundation in modern frontend tooling, version control and a continuous-learning mindset.',
  location: 'Dwarka, Delhi, India · Open to remote',
  email: 'preerikumari2922005@gmail.com',
  phone: '+91 99900 23588',
  availability: 'Open to frontend developer roles',
  resumeUrl: '/resume.pdf',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'preeti28-lab',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://preeti28-lab.github.io',

  // Quick credibility numbers shown under the hero.
  // TODO: bump these as you ship more work — keep every number defensible.
  stats: [
    { label: 'Projects built', value: 4, suffix: '+' },
    { label: 'Technologies used', value: 15, suffix: '+' },
    { label: 'Mobile-first builds', value: 100, suffix: '%' },
    { label: 'Industry internship', value: 1, suffix: '' },
  ],

  // Short bullets for the About section.
  highlights: [
    'Completed a frontend internship at Koncept Software Solutions building client-facing UI.',
    'Built 4 React projects including a Redux Toolkit CRM and two multi-page business websites.',
    'Convert wireframes and Figma mockups into pixel-perfect, production-ready components.',
    'Mobile-first layouts, semantic HTML and cross-browser compatibility on every build.',
  ],

  goals: [
    'Grow into a strong React engineer with real depth in state management and performance.',
    'Pick up TypeScript and Next.js to ship type-safe, SEO-friendly production apps.',
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
