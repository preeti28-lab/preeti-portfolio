import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/helpers'

/**
 * Button
 * ---------------------------------------------------------------------------
 * One component for three renderings, chosen automatically:
 *   - `to`   -> react-router <Link>
 *   - `href` -> <a>
 *   - else   -> <button>
 *
 * @param {'primary'|'secondary'|'ghost'|'outline'} variant
 * @param {'sm'|'md'|'lg'} size
 */
const VARIANTS = {
  primary:
    'bg-brand-gradient bg-[length:200%_200%] text-white shadow-glow hover:bg-[position:100%_50%] hover:shadow-lift active:scale-[0.98]',
  secondary:
    'bg-surface text-ink border border-line shadow-soft hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-300 active:scale-[0.98]',
  outline:
    'border border-brand-500/60 text-brand-600 dark:text-brand-300 hover:bg-brand-500 hover:text-white active:scale-[0.98]',
  ghost: 'text-ink-muted hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-300',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    to,
    href,
    icon: Icon,
    iconPosition = 'right',
    fullWidth = false,
    ...props
  },
  ref,
) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-xl font-medium',
    'transition-all duration-300 ease-smooth',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )

  // Internal route
  if (to) {
    return (
      <Link ref={ref} to={to} className={cn('group', classes)} {...props}>
        {content}
      </Link>
    )
  }

  // External / anchor link — open new tabs safely.
  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        ref={ref}
        href={href}
        className={cn('group', classes)}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={cn('group', classes)} {...props}>
      {content}
    </button>
  )
})

export default Button
