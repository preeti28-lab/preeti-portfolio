import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/helpers'

/**
 * ThemeToggle — animated light/dark switch.
 * The icon cross-fades and rotates; state is persisted by ThemeContext.
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl',
        'border border-line bg-surface text-ink-muted shadow-soft',
        'transition-all duration-300 ease-smooth hover:border-brand-400 hover:text-brand-500',
        'active:scale-95',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: 14, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 14, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
