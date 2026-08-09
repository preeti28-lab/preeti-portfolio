import { motion } from 'framer-motion'

/**
 * Reveal — scroll-triggered entrance animation used across the site.
 * Wrapping repeated markup in one component keeps timings consistent and
 * avoids re-declaring variants in every section.
 *
 * @param {'up'|'down'|'left'|'right'|'none'} direction
 * @param {number} delay     seconds
 * @param {number} distance  px travelled
 */
const OFFSETS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  amount = 0.25,
  className = '',
  as = 'div',
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div
  const offset = OFFSETS[direction] ?? OFFSETS.up

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

/** Parent wrapper that staggers its <Reveal> children. */
export function StaggerGroup({ children, className = '', stagger = 0.1, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Child of <StaggerGroup>. */
export function StaggerItem({ children, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
