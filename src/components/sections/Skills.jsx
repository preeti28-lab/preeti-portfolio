import { Database, Layout, Server, Wrench } from 'lucide-react'

import { concepts, skillCategories } from '../../data/skills'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

// Data files store icon names as strings; resolve them here so the data layer
// stays free of React imports.
const ICONS = { Layout, Server, Database, Wrench }

export default function Skills() {
  return (
    <Section id="skills" muted>
      <SectionHeading
        eyebrow="Skills"
        title="The stack I"
        highlight="build with"
        subtitle="Self-assessed proficiency across the tools I use day to day. Percentages reflect how independently I can ship with each one."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = ICONS[category.icon] ?? Layout

          return (
            <Reveal key={category.id} delay={categoryIndex * 0.08} className="h-full">
              <Card hover gradient className="h-full p-7">
                <header className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 ring-1 ring-inset ring-brand-500/20 dark:text-brand-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg">{category.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{category.description}</p>
                  </div>
                </header>

                <div className="mt-7 space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <ProgressBar
                      key={skill.name}
                      label={skill.name}
                      value={skill.level}
                      delay={skillIndex * 0.08}
                    />
                  ))}
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>

      {/* Concepts are not progress-bar skills — show them as plain chips. */}
      <Reveal delay={0.24} className="mt-8">
        <Card className="p-7">
          <h3 className="text-lg">Concepts I work with</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {concepts.map((concept) => (
              <li
                key={concept}
                className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:border-brand-400 hover:text-brand-500"
              >
                {concept}
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </Section>
  )
}
