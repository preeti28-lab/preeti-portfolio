import { motion } from 'framer-motion'
import { profile } from '../../data/profile'

/**
 * Loader — brand splash shown while the app boots.
 * Kept intentionally short (~1.1s) so it reads as polish, not a delay.
 */
export default function Loader() {
  const initials = profile.name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] grid place-items-center bg-surface-2"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Rotating gradient ring around the monogram */}
        <div className="relative grid h-20 w-20 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-90"
            animate={{ rotate: 360, borderRadius: ['30%', '45%', '30%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative z-10 font-display text-xl font-bold text-white">{initials}</span>
        </div>

        {/* Determinate-looking progress track */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.05, ease: 'easeInOut' }}
          />
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">Loading</p>
      </div>
    </motion.div>
  )
}
