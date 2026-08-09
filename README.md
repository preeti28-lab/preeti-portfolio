# Preeti Kumari — Frontend Developer Portfolio

Personal portfolio of **Preeti Kumari**, Frontend Developer (React.js), built with
**React + Vite + Tailwind CSS + Framer Motion**. Fully responsive, light/dark themed, accessible
and SEO-optimised.

All content is driven from `src/data/` and sourced from `public/resume.pdf`.

![Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

> Scaffolding from scratch instead? `npm create vite@latest my-portfolio -- --template react`,
> then copy `src/`, `public/`, and the config files from this repo.

### Optional contact-form backend

The site works without it — the form falls back to "email me directly" if the API is unreachable.

```bash
cd server
npm install
cp .env.example .env    # add your SMTP credentials
npm run dev             # http://localhost:5000
```

Vite already proxies `/api` → `localhost:5000` in development. See [`server/README.md`](server/README.md).

---

## Make it yours

Almost everything lives in **`src/data/`** — you rarely need to touch a component.

| File                  | What to change                                             |
| --------------------- | ---------------------------------------------------------- |
| `data/profile.js`     | Name, title, tagline, bio, stats, socials, nav links        |
| `data/skills.js`      | Skill categories and proficiency levels                     |
| `data/projects.js`    | Projects, tech stacks, live + GitHub links, case-study copy |
| `data/experience.js`  | Jobs, internships, education, certifications                |
| `data/services.js`    | "What I Do" capability cards and the work-process strip     |

### Still to do

Search the repo for `TODO` — every open item is marked inline.

1. **`src/data/projects.js`** — replace the `'#'` placeholders in `live` / `github` with real URLs,
   add real screenshots to `public/projects/`, and confirm each project `year`.
2. **`src/data/experience.js`** — set the exact internship dates (currently just "Internship").
3. **`index.html`, `public/robots.txt`, `public/sitemap.xml`, `.env.example`** — swap
   `https://preeti28-lab.github.io` for the real deployed domain once it is live.
4. **`src/assets/profile.svg`** — swap for a real photo (`profile.jpg`/`.webp` works too; just
   update the import in `Hero.jsx`).

Brand colours live in `tailwind.config.js` (`brand` and `accent` scales); light/dark surface tokens
are the CSS variables at the top of `src/index.css`.

---

## Project structure

```
Portfolio/
├── public/                     # Static assets served as-is
│   ├── favicon.svg
│   ├── og-image.svg            # Social share preview
│   ├── resume.pdf              # Preeti_Kumari_Resume.pdf
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── _redirects              # Netlify SPA fallback
├── server/                     # Optional Express + Nodemailer API
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── src/
│   ├── assets/
│   │   └── profile.svg
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Loader, SEO, ThemeToggle…
│   │   ├── sections/           # Hero, About, Skills, Projects, Contact…
│   │   └── ui/                 # Button, Card, Badge, ProgressBar, Reveal…
│   ├── context/
│   │   └── ThemeContext.jsx    # Light/dark state + localStorage persistence
│   ├── data/                   # ← all your content lives here
│   ├── hooks/                  # useTheme, useScrollSpy, useGitHubRepos…
│   ├── pages/                  # Home, ProjectDetail, NotFound
│   ├── utils/                  # validators, helpers
│   ├── App.jsx                 # Routes + layout shell
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind layers + design tokens
├── index.html
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## Sections

| # | Section        | Highlights                                                              |
| - | -------------- | ----------------------------------------------------------------------- |
| 1 | **Hero**       | Typewriter role cycling, animated counters, tech marquee, 3 CTAs        |
| 2 | **About**      | Summary, achievement bullets, skill chips, career goals                 |
| 3 | **Skills**     | Four categories with animated progress bars (ARIA `progressbar`)        |
| 4 | **Projects**   | Filterable grid, hover overlays, per-project case-study route           |
| 5 | **Experience** | Animated vertical timeline + "at a glance" sidebar                      |
| 6 | **What I Do**  | Capability cards, 4-step approach, gradient CTA                         |
| 7 | **Open source** | Live GitHub API feed with skeleton loaders and 1-hour caching          |
| 8 | **Contact**    | Validated form, honeypot, status banners, direct contact details        |
| — | **Footer**     | Quick links, capabilities, socials, back-to-top                         |

---

## Features

**Theming**
- Light/dark toggle persisted in `localStorage` (`portfolio-theme`)
- Follows the OS preference until the visitor chooses explicitly
- Syncs across open tabs via the `storage` event
- Inline bootstrap script in `index.html` prevents a flash of the wrong theme

**Performance**
- Route-level code splitting (`ProjectDetail`, `NotFound` are lazy)
- Vendor chunks split for long-term caching (react / motion / icons)
- Non-blocking font loading, lazy images with explicit `width`/`height`
- CSS-only animated background — no canvas, no JS animation loop
- GitHub API responses cached for an hour to dodge rate limits

**Accessibility**
- Skip-to-content link, semantic landmarks, one `<main>` per page
- Visible focus rings, `aria-current` nav state, labelled icon buttons
- `aria-live` regions for form results and status banners
- Full `prefers-reduced-motion` support (animations and typewriter disabled)

**SEO**
- Per-route `<title>`, description, canonical, Open Graph and Twitter tags
- JSON-LD `Person` structured data
- `robots.txt` + `sitemap.xml`

---

## Deployment

**Vercel** — import the repo; `vercel.json` already handles SPA rewrites and asset caching.

**Netlify** — build `npm run build`, publish `dist`. `public/_redirects` handles SPA routing.

**GitHub Pages** — add `base: '/<repo-name>/'` to `vite.config.js`, then deploy `dist`.

Set `VITE_API_URL` to your deployed backend URL if you are using the contact API
(see `.env.example`).

---

## Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Dev server with HMR                  |
| `npm run build`      | Production build → `dist/`           |
| `npm run preview`    | Serve the production build locally   |
| `npm run lint`       | ESLint over the whole project        |
| `npm run server`     | Start the contact API                |
| `npm run server:dev` | Contact API with file watching       |

---

## License

MIT — use it, change it, ship it.
