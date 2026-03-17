import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THEME = {
  strong: '#452215',
  light: '#FFFFF0',
  accent: '#DF6C4F',
  highlight: '#FF9398',
};

const EASE = [0.16, 1, 0.3, 1];

export default function ThemeStateIndicator({ isDarkTheme = false }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [isDarkTheme]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-md"
      style={{
        backgroundColor: isDarkTheme ? 'rgba(153,0,0,0.84)' : 'rgba(244,242,241,0.88)',
        borderColor: isDarkTheme ? 'rgba(250,138,60,0.35)' : 'rgba(219,64,12,0.18)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, ease: EASE }}
      aria-live="polite"
      aria-label={isDarkTheme ? 'Dark theme active' : 'Light theme active'}
    >
      <motion.span
        className="relative h-3 w-3 rounded-full"
        style={{ backgroundColor: THEME.highlight }}
        animate={{
          scale: isAnimating ? [1, 1.5, 1] : 1,
          boxShadow: isAnimating
            ? [`0 0 0 0 ${THEME.highlight}00`, `0 0 0 8px ${THEME.highlight}40`, `0 0 0 0 ${THEME.highlight}00`]
            : `0 0 0 0 ${THEME.highlight}00`,
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: THEME.highlight }}
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.span>

      <div className="relative h-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={isDarkTheme ? 'dark' : 'light'}
            className="font-mono-ui block text-xs tracking-widest"
            style={{ color: isDarkTheme ? THEME.light : THEME.strong }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {isDarkTheme ? 'DARK' : 'LIGHT'}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute -left-12 top-1/2 h-px w-10 origin-right"
        style={{ backgroundColor: THEME.highlight }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
      />
    </motion.div>
  );
}
