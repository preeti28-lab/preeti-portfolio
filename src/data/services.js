/**
 * services.js
 * ---------------------------------------------------------------------------
 * Capability cards for the "What I Do" section — what I can contribute to a
 * team, not a price list.
 * `icon` maps to a lucide-react icon name resolved in the Services section.
 */

export const services = [
  {
    id: 'react-interfaces',
    title: 'React Interfaces',
    icon: 'Code2',
    description:
      'Component-driven React apps built from small, reusable pieces — with hooks, routing and state handled properly rather than bolted on.',
    features: [
      'Reusable, modular components',
      'React Hooks & React Router',
      'Redux Toolkit state management',
      'Component-based architecture',
    ],
  },
  {
    id: 'responsive-ui',
    title: 'Responsive UI',
    icon: 'PenTool',
    description:
      'Mobile-first layouts in Tailwind CSS that hold their shape from a small phone up to a wide desktop, without a separate mobile build.',
    features: [
      'Mobile-first Tailwind CSS layouts',
      'Flexbox & CSS Grid',
      'Cross-browser compatibility',
      'Semantic, accessible markup',
    ],
  },
  {
    id: 'design-to-code',
    title: 'Design to Code',
    icon: 'Rocket',
    description:
      'Turning Figma mockups and wireframes into pixel-perfect, production-ready interfaces, working closely with designers through hand-off.',
    features: [
      'Figma & wireframe hand-off',
      'Pixel-perfect implementation',
      'Consistent design systems',
      'Framer Motion interactions',
    ],
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    icon: 'Server',
    description:
      'Wiring interfaces to real data — fetching from REST endpoints and handling loading, empty and error states so the UI never leaves a user guessing.',
    features: [
      'REST API integration',
      'Loading & error state handling',
      'Form validation',
      'Performance optimisation',
    ],
  },
]

/** The "how I work" strip under the capability cards. */
export const workProcess = [
  {
    step: '01',
    title: 'Understand',
    description:
      'Read the design and the requirement properly first — who uses this screen, and what has to happen on it.',
  },
  {
    step: '02',
    title: 'Structure',
    description:
      'Break the screen into reusable components and decide upfront what belongs in local state and what belongs in the store.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Write it mobile-first in React and Tailwind, checking each breakpoint and browser as I go rather than at the end.',
  },
  {
    step: '04',
    title: 'Polish',
    description:
      'Tidy up performance, accessibility and edge cases, then push through Git with a clear commit history ready for review.',
  },
]
