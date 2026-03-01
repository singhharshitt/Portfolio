import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Strict color palette
const THEME = {
  malachite: '#15484C',
  cream: '#F5F0E8',
  terracotta: '#B54A3F',
  gold: '#F7B05B',
  lagoon: '#30B8B2',
};

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  dramatic: [0.87, 0, 0.13, 1],
};

export default function ThemeWipe({ sectionIds = [], variant = 'center' }) {
  const [isWiping, setIsWiping] = useState(false);
  const [wipeColor, setWipeColor] = useState(THEME.malachite);
  const [wipeDirection, setWipeDirection] = useState('down');
  const prevSection = useRef(null);
  const wipeQueue = useRef([]);
  const isProcessing = useRef(false);

  // Process wipe queue to prevent overlapping animations
  const processQueue = useCallback(() => {
    if (isProcessing.current || wipeQueue.current.length === 0) return;
    
    isProcessing.current = true;
    const { color, direction } = wipeQueue.current.shift();
    
    setWipeColor(color);
    setWipeDirection(direction);
    setIsWiping(true);

    setTimeout(() => {
      setIsWiping(false);
      setTimeout(() => {
        isProcessing.current = false;
        processQueue();
      }, 100);
    }, 800);
  }, []);

  // Queue a new wipe
  const queueWipe = useCallback((color, direction) => {
    wipeQueue.current.push({ color, direction });
    processQueue();
  }, [processQueue]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observers = [];

    sectionIds.forEach((sectionId, index) => {
      const el = document.getElementById(sectionId.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && prevSection.current !== sectionId.id) {
            const prevIndex = sectionIds.findIndex(s => s.id === prevSection.current);
            const direction = index > prevIndex ? 'down' : 'up';
            
            // Only wipe when transitioning between different themed sections
            if (prevSection.current !== null) {
              const prevTheme = sectionIds.find(s => s.id === prevSection.current)?.theme;
              if (prevTheme !== sectionId.theme) {
                const color = sectionId.theme === 'dark' 
                  ? THEME.malachite 
                  : THEME.cream;
                queueWipe(color, direction);
              }
            }
            prevSection.current = sectionId.id;
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [sectionIds, queueWipe]);

  // Variant-based animation configurations
  const variants = {
    center: {
      initial: { scaleY: 0 },
      animate: { scaleY: 1 },
      exit: { scaleY: 0 },
      style: { transformOrigin: 'center' },
    },
    top: {
      initial: { scaleY: 0 },
      animate: { scaleY: 1 },
      exit: { scaleY: 0 },
      style: { transformOrigin: 'top' },
    },
    bottom: {
      initial: { scaleY: 0 },
      animate: { scaleY: 1 },
      exit: { scaleY: 0 },
      style: { transformOrigin: 'bottom' },
    },
    left: {
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      exit: { scaleX: 0 },
      style: { transformOrigin: 'left' },
    },
    right: {
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      exit: { scaleX: 0 },
      style: { transformOrigin: 'right' },
    },
    circle: {
      initial: { scale: 0, borderRadius: '50%' },
      animate: { scale: 3, borderRadius: '0%' },
      exit: { scale: 0, borderRadius: '50%' },
      style: { transformOrigin: 'center' },
    },
  };

  const currentVariant = variants[variant] || variants.center;

  return (
    <AnimatePresence mode="wait">
      {isWiping && (
        <>
          {/* Primary wipe layer */}
          <motion.div
            key="primary-wipe"
            className="fixed inset-0 z-9999 pointer-events-none"
            style={{
              backgroundColor: wipeColor,
              ...currentVariant.style,
            }}
            initial={currentVariant.initial}
            animate={currentVariant.animate}
            exit={currentVariant.exit}
            transition={{ duration: 0.6, ease: EASE.smooth }}
          />

          {/* Secondary accent line */}
          <motion.div
            key="accent-line"
            className="fixed z-9998 pointer-events-none"
            style={{
              backgroundColor: THEME.gold,
              ...(variant === 'left' || variant === 'right'
                ? { top: 0, bottom: 0, width: '4px', left: variant === 'left' ? 0 : 'auto', right: variant === 'right' ? 0 : 'auto' }
                : { left: 0, right: 0, height: '4px', top: wipeDirection === 'down' ? 0 : 'auto', bottom: wipeDirection === 'up' ? 0 : 'auto' }
              ),
            }}
            initial={{ scale: variant === 'left' || variant === 'right' ? 1 : 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: variant === 'left' || variant === 'right' ? 1 : 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE.smooth }}
          />

          {/* Particle burst effect */}
          <div className="fixed inset-0 z-9997 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: THEME.lagoon,
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 8) * Math.PI * 2) * 200,
                  y: Math.sin((i / 8) * Math.PI * 2) * 200,
                  opacity: [1, 0.5, 0],
                }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE.smooth }}
              />
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}