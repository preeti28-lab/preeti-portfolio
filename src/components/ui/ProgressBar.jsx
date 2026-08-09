import { motion } from 'framer-motion'

/**
 * ProgressBar — animated skill meter.
 * Fills only once scrolled into view, and exposes proper ARIA so screen
 * readers announce "React, 93 percent".
 *
 * @param {string} label
 * @param {number} value  0–100
 * @param {number} delay  stagger delay in seconds
 */
export default function ProgressBar({ label, value, delay = 0 }) {
  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="font-mono text-xs tabular-nums text-ink-muted">{value}%</span>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10"
      >
        <motion.div
          className="h-full rounded-full bg-brand-gradient"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
