/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode is driven by a `.dark` class on <html>, toggled by ThemeContext.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Brand scale (blue -> indigo). Used for the primary gradient.
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598eff',
          500: '#3366ff',
          600: '#1f46f5',
          700: '#1a34e1',
          800: '#1c2eb6',
          900: '#1d2e8f',
          950: '#161d57',
        },
        // Accent scale (violet -> purple). Second half of the gradient.
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Semantic tokens wired to the CSS variables in index.css so both
        // themes share the same class names.
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgb(16 24 40 / 0.06), 0 12px 32px -8px rgb(16 24 40 / 0.10)',
        lift: '0 8px 20px -6px rgb(16 24 40 / 0.12), 0 24px 48px -12px rgb(16 24 40 / 0.18)',
        glow: '0 0 0 1px rgb(99 102 241 / 0.18), 0 12px 40px -12px rgb(99 102 241 / 0.45)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #3366ff 0%, #7c4dff 50%, #a855f7 100%)',
        'brand-gradient-soft':
          'linear-gradient(120deg, rgb(51 102 255 / 0.14) 0%, rgb(168 85 247 / 0.14) 100%)',
        grid: 'linear-gradient(to right, rgb(var(--line)/0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line)/0.5) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '48px 48px' },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 1.6s infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
