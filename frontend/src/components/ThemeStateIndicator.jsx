import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Strict color palette
const THEME = {
  malachite: '#15484C',
  cream: '#F5F0E8',
  gold: '#F7B05B',
  lagoon: '#30B8B2',
};

// Cinematic easing
const EASE = [0.16, 1, 0.3, 1];

export default function ThemeStateIndicator({ isDarkTheme = false }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation on theme change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [isDarkTheme]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border"
      style={{
        backgroundColor: isDarkTheme ? 'rgba(21, 72, 76, 0.8)' : 'rgba(245, 240, 232, 0.8)',
        borderColor: isDarkTheme ? 'rgba(48, 184, 178, 0.3)' : 'rgba(166, 72, 10, 0.2)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: EASE }}
      aria-live="polite"
      aria-label={isDarkTheme ? 'Dark theme active' : 'Light theme active'}
    >
      {/* Animated dot */}
      <motion.span
        className="relative w-3 h-3 rounded-full"
        style={{
          backgroundColor: isDarkTheme ? THEME.lagoon : THEME.gold,
        }}
        animate={{
          scale: isAnimating ? [1, 1.5, 1] : 1,
          boxShadow: isAnimating
            ? [
                `0 0 0 0 ${isDarkTheme ? THEME.lagoon : THEME.gold}00`,
                `0 0 0 8px ${isDarkTheme ? THEME.lagoon : THEME.gold}40`,
                `0 0 0 0 ${isDarkTheme ? THEME.lagoon : THEME.gold}00`,
              ]
            : `0 0 0 0 ${isDarkTheme ? THEME.lagoon : THEME.gold}00`,
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: isDarkTheme ? THEME.lagoon : THEME.gold,
          }}
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.span>

      {/* Label with slide animation */}
      <div className="relative overflow-hidden h-5">
        <AnimatePresence mode="wait">
          <motion.span
            key={isDarkTheme ? 'dark' : 'light'}
            className="block text-xs font-mono font-bold tracking-widest"
            style={{
              color: isDarkTheme ? THEME.cream : THEME.malachite,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {isDarkTheme ? 'DARK' : 'LIGHT'}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute -left-12 top-1/2 h-px w-10 origin-right"
        style={{
          backgroundColor: isDarkTheme ? THEME.lagoon : THEME.gold,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
      />
    </motion.div>
  );
}