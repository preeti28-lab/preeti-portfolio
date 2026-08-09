/**
 * experience.js
 * ---------------------------------------------------------------------------
 * Rendered as a vertical timeline. Keep entries newest-first.
 * `type` drives the badge colour: 'work' | 'internship' | 'education'.
 */

export const experiences = [
  {
    id: 'koncept-frontend-intern',
    role: 'Frontend Developer Intern',
    company: 'Koncept Software Solutions',
    type: 'internship',
    // TODO: replace with the exact months, e.g. 'Jan 2025 — Jun 2025'.
    duration: 'Internship',
    location: 'Delhi, India',
    description:
      'Built and maintained responsive, mobile-first web pages for client projects, working alongside the design team.',
    achievements: [
      'Built responsive, mobile-first pages with HTML5, CSS3 and modern JavaScript (ES6+), keeping performance consistent across devices and browsers.',
      'Developed reusable, modular React.js UI components styled with Tailwind CSS to hold a consistent design system across multiple client projects.',
      'Partnered with UI/UX designers to turn wireframes and mockups into pixel-perfect, production-ready interfaces.',
      'Used Git and GitHub for version control and collaborative code reviews; optimised page performance and resolved cross-browser issues.',
    ],
    tech: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
  },
  {
    id: 'ba-delhi-university',
    role: 'Bachelor of Arts (B.A.)',
    company: 'University of Delhi — Deen Dayal Upadhyaya College',
    type: 'education',
    duration: '2022 — 2026',
    location: 'Dwarka, Delhi, India',
    description:
      'Pursuing a B.A. at the University of Delhi while building frontend skills through self-study and hands-on projects.',
    achievements: [
      'Learned React.js, modern JavaScript and Tailwind CSS alongside the degree.',
      'Shipped four self-directed frontend projects, from a Redux Toolkit CRM to multi-page business websites.',
      'Completed an industry frontend internship during the course.',
    ],
    tech: ['Self-taught Frontend', 'React.js', 'Tailwind CSS', 'Git & GitHub'],
  },
  {
    id: 'cbse-schooling',
    role: 'Class XII & Class X — CBSE Board',
    company: 'Central Board of Secondary Education',
    type: 'education',
    duration: '2020 — 2022',
    location: 'Delhi, India',
    description: 'Completed secondary (2020) and senior secondary (2022) schooling under the CBSE board.',
    achievements: ['Class XII — CBSE Board, 2022', 'Class X — CBSE Board, 2020'],
    tech: [],
  },
]

/**
 * Certifications / awards shown beside the timeline.
 * TODO: add real certifications here (e.g. a React or frontend course) — the
 * block is hidden automatically while this array is empty.
 */
export const certifications = []

/** Short "at a glance" facts rendered in the timeline sidebar. */
export const quickFacts = [
  { label: 'Degree', value: 'B.A. — University of Delhi (2022 – 2026)' },
  { label: 'Based in', value: 'Dwarka, Delhi, India · open to remote' },
  { label: 'Languages', value: 'Hindi (Native) · English (Professional)' },
  { label: 'Core stack', value: 'React.js · JavaScript (ES6+) · Tailwind CSS' },
]
