import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollThemeMorph() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const background = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.5],
    ['#452215', '#DF6C4F', '#FFF8EE', '#FFFFF0']
  );

  const overlayOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [0.2, 0.12, 0]);
  const vignetteOpacity = useTransform(smoothProgress, [0, 0.25], [0.25, 0]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0"
        style={{ background, zIndex: -10 }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -9, opacity: overlayOpacity, background: '#FF9398' }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -8, opacity: vignetteOpacity, background: '#452215' }}
        aria-hidden="true"
      />
    </>
  );
}
