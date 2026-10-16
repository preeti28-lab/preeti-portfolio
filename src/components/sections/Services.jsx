import { ArrowRight, Check, Code2, PenTool, Rocket, Server } from 'lucide-react'

import { services, workProcess } from '../../data/services'
import { scrollToSection } from '../../utils/helpers'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

const ICONS = { Code2, PenTool, Server, Rocket }

export default function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I do"
        title="What I bring to"
        highlight="your team"
        subtitle="The work I am set up to take on from day one — and how I go about it."
      />

      {/* ---------------------------------------------------- Service cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = ICONS[service.icon] ?? Code2

          return (
            <Reveal key={service.id} delay={index * 0.08} className="h-full">
              <Card hover gradient className="group flex h-full flex-col p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-lg">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-end border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('#contact')}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-300"
                  >
                    Get in touch
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only"> about {service.title}</span>
                  </button>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>

      {/* ------------------------------------------------------ Work process */}
      <div className="mt-20">
        <Reveal className="mb-10 text-center">
          <h3 className="text-2xl sm:text-3xl">
            How I <span className="text-gradient">approach</span> a build
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            The same four steps whether it is a single component or a full page.
          </p>
        </Reveal>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.1} as="li" className="relative">
              <Card className="h-full p-6 pt-8">
                {/* Oversized step number as a watermark */}
                <span
                  className="absolute right-4 top-2 font-display text-5xl font-bold text-brand-500/10"
                  aria-hidden="true"
                >
                  {step.step}
                </span>

                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient-soft font-mono text-xs font-bold text-brand-600 ring-1 ring-inset ring-brand-500/20 dark:text-brand-300">
                  {step.step}
                </span>

                <h4 className="mt-4 text-base font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </Card>

              {/* Connector arrow between steps (large screens only) */}
              {index < workProcess.length - 1 && (
                <ArrowRight
                  className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-400/50 lg:block"
                  aria-hidden="true"
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ------------------------------------------------------------- CTA */}
      <Reveal delay={0.2} className="mt-16">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient bg-[length:200%_200%] p-8 text-center shadow-lift sm:p-12">
          <div
            className="pointer-events-none absolute inset-0 bg-grid opacity-20"
            aria-hidden="true"
          />
          <div className="relative">
            <h3 className="text-2xl text-white sm:text-3xl">Hiring a React / MERN developer?</h3>
            <p className="mx-auto mt-3 max-w-lg text-white/80">
              I am open to MERN stack and React developer positions and happy to walk you through any of the
              projects above. Send a message and I will get back to you quickly.
            </p>
            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              className="mt-7"
              onClick={() => scrollToSection('#contact')}
            >
              Start a conversation
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
