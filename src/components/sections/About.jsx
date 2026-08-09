import { CheckCircle2, Coffee, GraduationCap, Target, Zap } from 'lucide-react'

import { profile } from '../../data/profile'
import { skillCategories } from '../../data/skills'
import Card from '../ui/Card'
import Reveal, { StaggerGroup, StaggerItem } from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

/** Compact "what I work with" chips derived from the skills data. */
const topSkills = skillCategories.map((category) => ({
  title: category.title,
  items: category.skills.slice(0, 3).map((skill) => skill.name),
}))

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About me"
        title="Turning ideas into"
        highlight="shipped products"
        subtitle="A quick introduction to how I work and what I care about as an engineer."
      />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* ------------------------------------------------------ Narrative */}
        <Reveal direction="right">
          <Card className="h-full p-7 sm:p-9">
            <h3 id="about-title" className="flex items-center gap-2.5 text-xl">
              <Zap className="h-5 w-5 text-brand-500" aria-hidden="true" />
              Professional summary
            </h3>

            <p className="mt-4 leading-relaxed text-ink-muted">{profile.summary}</p>

            <p className="mt-4 leading-relaxed text-ink-muted">
              I care about the details users never name but always notice: a layout that does not
              break at 320px, a form that says exactly what went wrong, a component you can reuse
              on the next screen without rewriting it. Most of what I know I learned by building —
              so when I am not working on a project I am usually rebuilding something I have
              already made, just to do it properly the second time.
            </p>

            {/* Highlight bullets */}
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {profile.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Fun facts strip */}
            <div className="mt-8 flex flex-wrap gap-4 border-t border-line pt-6 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <Coffee className="h-4 w-4 text-accent-500" aria-hidden="true" />
                Hindi &amp; English
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-brand-500" aria-hidden="true" />
                B.A., University of Delhi
              </span>
            </div>
          </Card>
        </Reveal>

        {/* ------------------------------------------- Skills + career goals */}
        <div className="flex flex-col gap-8">
          <Reveal direction="left" delay={0.1}>
            <Card className="p-7">
              <h3 className="text-lg">What I work with</h3>
              <StaggerGroup className="mt-5 space-y-4" stagger={0.06}>
                {topSkills.map((group) => (
                  <StaggerItem key={group.title}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      {group.title}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-brand-400 hover:text-brand-500"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Card>
          </Reveal>

          <Reveal direction="left" delay={0.2}>
            <Card className="relative overflow-hidden p-7">
              {/* Decorative corner wash */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gradient opacity-10 blur-2xl"
                aria-hidden="true"
              />
              <h3 className="flex items-center gap-2.5 text-lg">
                <Target className="h-5 w-5 text-accent-500" aria-hidden="true" />
                Career goals
              </h3>
              <ul className="mt-4 space-y-3">
                {profile.goals.map((goal, index) => (
                  <li key={goal} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-brand-500/10 font-mono text-[10px] font-bold text-brand-600 dark:text-brand-300">
                      {index + 1}
                    </span>
                    {goal}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
