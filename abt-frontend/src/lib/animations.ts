import type { MotionProps } from 'framer-motion'

export const fadeInView: MotionProps = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.35, ease: 'easeOut' },
}
