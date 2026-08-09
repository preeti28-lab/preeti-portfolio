import { cn } from '../../utils/helpers'

const TONES = {
  brand: 'bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-500/20',
  accent: 'bg-accent-500/10 text-accent-700 dark:text-accent-300 border-accent-500/20',
  neutral: 'bg-ink/5 text-ink-muted border-line dark:bg-white/5',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
}

/** Small pill used for tech tags, section eyebrows and status chips. */
export default function Badge({ children, tone = 'neutral', className = '', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
