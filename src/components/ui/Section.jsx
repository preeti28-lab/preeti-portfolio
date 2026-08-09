import { cn } from '../../utils/helpers'

/**
 * Section — semantic <section> wrapper with the shared vertical rhythm,
 * container width and scroll-margin for anchor navigation.
 *
 * @param {string} id       anchor target, also used by the scroll spy
 * @param {boolean} muted   alternate background to separate adjacent sections
 */
export default function Section({ id, children, className = '', muted = false, ...props }) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn('section relative', muted && 'bg-surface/50', className)}
      {...props}
    >
      <div className="container relative z-10">{children}</div>
    </section>
  )
}
