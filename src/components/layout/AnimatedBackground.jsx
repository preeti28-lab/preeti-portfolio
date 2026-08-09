/**
 * AnimatedBackground
 * ---------------------------------------------------------------------------
 * Fixed decorative layer behind all content: a faint grid plus three slow
 * gradient blobs. Implemented with CSS only (no canvas, no JS loop) so it
 * costs nothing on the main thread, and it is hidden from assistive tech.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Grid, faded out towards the bottom */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)] dark:opacity-20" />

      {/* Gradient blobs */}
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] animate-float rounded-full bg-brand-500/20 blur-[100px] dark:bg-brand-600/20" />
      <div
        className="absolute -right-24 top-1/4 h-[24rem] w-[24rem] animate-float rounded-full bg-accent-500/20 blur-[100px] dark:bg-accent-600/15"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] animate-float rounded-full bg-brand-400/15 blur-[100px] dark:bg-accent-700/15"
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle vignette that keeps text contrast high in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-2/80" />
    </div>
  )
}
