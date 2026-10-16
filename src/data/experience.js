/**
 * experience.js
 * ---------------------------------------------------------------------------
 * Rendered as a vertical timeline. Keep entries newest-first.
 * `type` drives the badge colour: 'work' | 'internship' | 'education'.
 */

export const experiences = [
  {
    id: 'averno-tech-mern',
    role: 'MERN Stack Developer',
    company: 'Averno Tech',
    type: 'work',
    duration: 'Jun 2025 — Present',
    location: 'Delhi, India',
    description:
      'Building and maintaining responsive, production-ready web applications for client projects across edtech, admissions, healthcare and consulting.',
    achievements: [
      'Built and maintained responsive, mobile-first web interfaces with HTML5, CSS3 and ES6+ JavaScript, ensuring consistent performance across devices and browsers.',
      'Developed reusable, modular React.js components styled with Tailwind CSS, establishing a consistent design system across multiple client projects.',
      'Partnered with UI/UX designers to translate wireframes and mockups into pixel-perfect, production-ready interfaces.',
      'Used Git and GitHub for version control and code reviews; improved page performance and resolved cross-browser compatibility issues.',
    ],
    tech: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Razorpay', 'Google OAuth', 'Git'],
  },
  {
    id: 'ba-delhi-university',
    role: 'Bachelor of Arts (B.A.)',
    company: 'University of Delhi — Deen Dayal Upadhyaya College',
    type: 'education',
    duration: '2022 — 2026',
    location: 'Dwarka, Delhi, India',
    description:
      'Pursuing a B.A. at the University of Delhi while working as a developer and building projects alongside the degree.',
    achievements: [
      'Learned React.js, Next.js, modern JavaScript and Tailwind CSS alongside the degree.',
      'Shipped four live client websites and several self-directed React projects.',
    ],
    tech: ['React.js', 'Next.js', 'Tailwind CSS', 'Git & GitHub'],
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
  { label: 'Current role', value: 'MERN Stack Developer — Averno Tech' },
  { label: 'Degree', value: 'B.A. — University of Delhi (2022 – 2026)' },
  { label: 'Based in', value: 'Dwarka, Delhi, India · open to remote' },
  { label: 'Languages', value: 'Hindi (Native) · English (Professional)' },
  { label: 'Core stack', value: 'React.js · Next.js · JavaScript (ES6+) · Tailwind CSS' },
]
