import { motion, useScroll, useTransform, useSpring } from '../utils/motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.0005,
  });

  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.8, 0.45, 0.2]);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-100 h-0.5 origin-left"
        style={{
          scaleX,
          background: '#DF6C4F',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="fixed left-0 right-0 top-0 z-101 h-0.5 origin-left"
        style={{
          scaleX,
          opacity: glowOpacity,
          background: '#FF9398',
          filter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none fixed left-0 right-0 top-0 z-99 h-4"
        style={{
          background: '#FFFFF0',
          opacity: useTransform(scrollYProgress, [0, 0.05], [0.45, 0]),
        }}
        aria-hidden="true"
      />
    </>
  );
}
