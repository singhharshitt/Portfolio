import React from 'react';
import { motion } from 'framer-motion';

// Warm Parchment palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  olive: '#6E6B2F',
  textDark: '#4A4A3A',
  cream: '#F5F0E8',
};

export function HamburgerButton({ isOpen, onClick, isScrolled }) {
  // Line animation variants
  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      x: 0,
      backgroundColor: isScrolled ? THEME.textDark : THEME.cream,
    },
    open: {
      rotate: 45,
      y: -2,
      x: 2,
      backgroundColor: THEME.cream,
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      scaleX: 1,
      backgroundColor: isScrolled ? THEME.textDark : THEME.cream,
    },
    open: {
      opacity: 0,
      scaleX: 0,
      backgroundColor: THEME.cream,
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      x: 0,
      backgroundColor: isScrolled ? THEME.textDark : THEME.cream,
    },
    open: {
      rotate: -45,
      y: 2,
      x: 2,
      backgroundColor: THEME.cream,
    },
  };

  // Spring physics for organic feel
  const lineTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  };

  return (
    <motion.button
      onClick={onClick}
      className="relative z-50 w-12 h-12 flex items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2"
      style={{
        backgroundColor: isOpen
          ? 'transparent'
          : isScrolled
            ? 'rgba(245, 240, 232, 0.1)'
            : 'transparent',
        border: isOpen
          ? 'none'
          : `1px solid ${isScrolled ? 'rgba(74, 74, 58, 0.1)' : 'rgba(245, 240, 232, 0.2)'}`,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: isOpen
          ? 'transparent'
          : isScrolled
            ? 'rgba(26, 26, 26, 0.05)'
            : 'rgba(245, 240, 232, 0.1)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div
        className="relative w-6 h-5 flex flex-col justify-between"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Top line */}
        <motion.span
          className="block h-0.5 w-full rounded-full origin-left"
          variants={topLineVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          transition={lineTransition}
          style={{ willChange: 'transform' }}
        />

        {/* Middle line */}
        <motion.span
          className="block h-0.5 rounded-full origin-center"
          variants={middleLineVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          transition={lineTransition}
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Bottom line */}
        <motion.span
          className="block h-0.5 w-full rounded-full origin-left"
          variants={bottomLineVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          transition={lineTransition}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Subtle ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isOpen ? { scale: 1.5, opacity: 0 } : { scale: 0.8, opacity: 0 }}
        whileTap={{ scale: 1.2, opacity: 0.3, backgroundColor: THEME.gold }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}