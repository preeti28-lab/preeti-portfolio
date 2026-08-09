import { motion } from 'framer-motion'
import { cn } from '../../utils/helpers'

/**
 * SectionHeading — consistent eyebrow + title + subtitle for every section.
 *
 * @param {string} eyebrow   small label above the title
 * @param {string} title     plain part of the heading
 * @param {string} highlight part rendered in the brand gradient
 * @param {string} subtitle  supporting sentence
 * @param {boolean} centered
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-14', centered && 'mx-auto max-w-2xl text-center', className)}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>

      {subtitle && <p className="mt-4 text-base leading-relaxed text-ink-muted">{subtitle}</p>}
    </motion.header>
  )
}
