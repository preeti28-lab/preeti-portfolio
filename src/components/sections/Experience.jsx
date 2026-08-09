import { motion } from 'framer-motion'
import { Award, Briefcase, Calendar, GraduationCap, MapPin, Sparkle } from 'lucide-react'

import { certifications, experiences, quickFacts } from '../../data/experience'
import { cn } from '../../utils/helpers'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

// Visual treatment per entry type.
const TYPE_META = {
  work: { icon: Briefcase, tone: 'brand', label: 'Full-time' },
  internship: { icon: Sparkle, tone: 'accent', label: 'Internship' },
  education: { icon: GraduationCap, tone: 'success', label: 'Education' },
}

export default function Experience() {
  return (
    <Section id="experience" muted>
      <SectionHeading
        eyebrow="Experience"
        title="Where I have"
        highlight="worked & learned"
        subtitle="An industry frontend internship, a degree in progress, and a lot of self-directed building in between."
      />

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        {/* ---------------------------------------------------- Timeline */}
        <ol className="relative space-y-8">
          {/* The vertical rail — drawn once, animated as the section enters. */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute bottom-4 left-[19px] top-4 w-px origin-top bg-gradient-to-b from-brand-500 via-accent-500 to-transparent sm:left-[23px]"
          />

          {experiences.map((item, index) => {
            const meta = TYPE_META[item.type] ?? TYPE_META.work
            const Icon = meta.icon

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 sm:pl-[4.5rem]"
              >
                {/* Node marker */}
                <span
                  className={cn(
                    'absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface shadow-soft sm:h-12 sm:w-12',
                    item.type === 'education' ? 'text-emerald-500' : 'text-brand-500',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <Card hover className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg leading-snug">{item.role}</h3>
                      <p className="mt-1 font-medium text-brand-600 dark:text-brand-300">
                        {item.company}
                      </p>
                    </div>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.description}</p>

                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                      >
                        <span
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient"
                          aria-hidden="true"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {item.tech.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.li>
            )
          })}
        </ol>

        {/* ------------------------------------- Quick facts + certifications */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="left">
            <Card className="p-7">
              <h3 className="flex items-center gap-2.5 text-lg">
                <Award className="h-5 w-5 text-accent-500" aria-hidden="true" />
                At a glance
              </h3>

              <dl className="mt-5 space-y-4">
                {quickFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Hidden until there is at least one real certification to show. */}
              {certifications.length > 0 && (
                <>
                  <h4 className="mt-8 border-t border-line pt-6 text-sm font-semibold uppercase tracking-wider text-ink-muted">
                    Certifications
                  </h4>
                  <ul className="mt-4 space-y-4">
                    {certifications.map((certification) => (
                      <li
                        key={certification.name}
                        className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors duration-300 hover:border-line hover:bg-surface-2"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-gradient-soft text-brand-600 ring-1 ring-inset ring-brand-500/20 dark:text-brand-300">
                          <Award className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-snug">{certification.name}</p>
                          <p className="mt-0.5 text-xs text-ink-muted">
                            {certification.issuer} · {certification.year}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-6 rounded-xl bg-brand-gradient-soft p-4 text-sm leading-relaxed text-ink-muted ring-1 ring-inset ring-brand-500/15">
                Always learning — currently going deeper on React performance, and picking up
                TypeScript and Next.js next.
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
