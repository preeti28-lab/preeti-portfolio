/**
 * skills.js
 * ---------------------------------------------------------------------------
 * `level` is a self-assessed proficiency percentage rendered as a progress bar.
 * Keep the list honest — recruiters do ask about anything above 80%.
 */

export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'The fundamentals every interface is built on.',
    icon: 'Layout',
    skills: [
      { name: 'HTML5 & Semantics', level: 90 },
      { name: 'CSS3', level: 88 },
      { name: 'JavaScript (ES6+)', level: 85 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    description: 'Component-driven React and Next.js work, state included.',
    icon: 'Server',
    skills: [
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 78 },
      { name: 'React Hooks', level: 85 },
      { name: 'React Router', level: 84 },
      { name: 'Redux Toolkit', level: 78 },
      { name: 'Zustand', level: 75 },
      { name: 'Framer Motion', level: 72 },
    ],
  },
  {
    id: 'styling',
    title: 'Styling & Layout',
    description: 'Responsive interfaces that hold up on every screen.',
    icon: 'Database',
    skills: [
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Responsive Web Design', level: 88 },
      { name: 'Flexbox & CSS Grid', level: 86 },
      { name: 'Bootstrap', level: 75 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    description: 'The day-to-day kit that keeps delivery smooth.',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', level: 84 },
      { name: 'VS Code', level: 90 },
      { name: 'Vercel & Vite', level: 82 },
      { name: 'Chrome DevTools', level: 80 },
      { name: 'Razorpay & Google OAuth', level: 72 },
      { name: 'Figma (basics)', level: 62 },
    ],
  },
]

/**
 * Concepts listed on the resume that are not "percentage" skills — rendered as
 * plain chips rather than progress bars.
 */
export const concepts = [
  'REST API Integration',
  'Component-Based Architecture',
  'UI/UX Principles',
  'Cross-Browser Compatibility',
  'Performance Optimization',
  'SEO Basics',
  'Agile / Scrum Basics',
  'AI Tools — Claude, ChatGPT',
]

/** Logos strip under the hero — plain text keeps the bundle tiny. */
export const techMarquee = [
  'React',
  'Next.js',
  'JavaScript',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'React Router',
  'Redux Toolkit',
  'Zustand',
  'Framer Motion',
  'Bootstrap',
  'Razorpay',
  'Google OAuth',
  'Git',
  'GitHub',
  'Vercel',
  'Vite',
  'npm',
  'Figma',
]
