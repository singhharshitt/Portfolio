import { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// Strict color palette
const THEME = {
  malachite: '#15484C',
  cream: '#F5F0E8',
  gold: '#F7B05B',
  lagoon: '#30B8B2',
  bubblegum: '#F66483',
  marigold: '#C877BF',
  brownSugar: '#A6480A',
  deepRed: '#3E000D',
};

// Cinematic easing
const EASE = [0.16, 1, 0.3, 1];

/**
 * SectionHeading — Reusable animated section title with MAI-style polish
 * Props:
 *   text — heading text
 *   className — extra classes
 *   accent — custom accent color (defaults to gold)
 *   showLine — show animated underline (default: true)
 *   stagger — delay between words (default: 0)
 */
export default function SectionHeading({ 
  text, 
  className = '',
  accent = THEME.gold,
  showLine = true,
  stagger = 0,
  as: Tag = 'h2',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split text for staggered animation
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3 + stagger,
        ease: EASE,
      },
    },
  };

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <Tag
        className="text-3xl sm:text-4xl lg:text-6xl font-bold m-4 mt-10 ml-6 sm:ml-12 mb-8 overflow-hidden"
        style={{ 
          color: THEME.deepRed,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="inline-flex flex-wrap items-baseline"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-[0.3em] overflow-hidden"
            >
              <span className="inline-block">{word}</span>
            </motion.span>
          ))}
          
          {/* Accent period */}
          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{ color: accent }}
            whileHover={{ 
              scale: 1.3, 
              rotate: 180,
              transition: { duration: 0.3 }
            }}
          >
            .
          </motion.span>
        </motion.span>
      </Tag>

      {/* Animated underline */}
      {showLine && (
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="absolute bottom-4 left-6 sm:left-12 h-0.5 origin-left rounded-full"
          style={{
            width: '60px',
            background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
          }}
        />
      )}

      {/* Decorative number indicator */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 0.1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute -top-4 -left-2 text-8xl font-bold pointer-events-none select-none hidden lg:block"
        style={{ 
          color: accent,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        {String(words.length).padStart(2, '0')}
      </motion.span>
    </div>
  );
}