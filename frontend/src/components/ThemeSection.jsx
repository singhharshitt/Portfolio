import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Warm Parchment palette
const THEME = {
  olive: '#6E6B2F',
  cream: '#F5F0E8',
  gold: '#C9A66B',
  terracotta: '#C2743A',
};

// Cinematic easing
const EASE = [0.16, 1, 0.3, 1];

/**
 * ThemeSection - lightweight wrapper with scroll-driven animations
 * Global theme switching is controlled from the Skills trigger.
 */
export default function ThemeSection({
  children,
  theme = 'light',
  className = '',
  id,
  animateEntry = true,
  parallaxIntensity = 0.1,
  ...props
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Subtle parallax for background depth
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxIntensity]),
    { stiffness: 100, damping: 30 }
  );

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASE,
        staggerChildren: 0.1,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE }
    }
  };

  // Theme-based background decoration
  const bgDecoration = theme === 'dark'
    ? `radial-gradient(circle at 80% 20%, ${THEME.gold}15 0%, transparent 50%)`
    : `radial-gradient(circle at 20% 80%, ${THEME.gold}10 0%, transparent 50%)`;

  return (
    <section
      id={id}
      ref={sectionRef}
      data-theme-section={theme}
      className={`theme-section relative overflow-hidden ${className}`}
      style={{
        minHeight: '400px',
        contain: 'layout style paint',
      }}
      {...props}
    >
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          y: bgY,
          background: bgDecoration,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{
          background: theme === 'dark'
            ? `linear-gradient(90deg, ${THEME.gold}, transparent)`
            : `linear-gradient(90deg, ${THEME.gold}, transparent)`,
          scaleX: isInView ? 1 : 0,
          transition: 'scaleX 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Content wrapper with optional stagger */}
      {animateEntry ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10"
        >
          {/* Wrap children to enable stagger */}
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <motion.div key={index} variants={childVariants}>
                {child}
              </motion.div>
            ))
          ) : (
            <motion.div variants={childVariants}>{children}</motion.div>
          )}
        </motion.div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}

      {/* Bottom fade for theme transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${theme === 'dark' ? THEME.olive : THEME.cream}00, ${theme === 'dark' ? THEME.olive : THEME.cream})`,
          opacity: 0.5,
        }}
      />
    </section>
  );
}