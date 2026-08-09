import { cn } from '../../utils/helpers'

/**
 * Card — the shared surface for every panel on the site.
 *
 * @param {boolean} hover     adds the lift-on-hover interaction
 * @param {boolean} glass     frosted background instead of a solid surface
 * @param {boolean} gradient  animated gradient border on hover
 */
export default function Card({
  children,
  className = '',
  hover = false,
  glass = false,
  gradient = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={cn(
        'relative rounded-2xl transition-all duration-300 ease-smooth',
        glass ? 'glass shadow-soft' : 'border border-line bg-surface shadow-soft',
        hover && 'hover:-translate-y-1 hover:shadow-lift',
        gradient && 'gradient-border',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
