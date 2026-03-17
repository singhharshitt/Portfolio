import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const THEME = {
  accent: '#DF6C4F',
  textDark: '#452215',
};

const EASE = [0.16, 1, 0.3, 1];

export default function SectionHeading({
  text,
  className = '',
  accent = THEME.accent,
  showLine = true,
  stagger = 0,
  as: Tag = 'h2',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: stagger },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.3 + stagger, ease: EASE },
    },
  };

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <Tag
        className="m-4 mb-8 ml-6 mt-10 overflow-hidden text-3xl sm:ml-12 sm:text-4xl lg:text-6xl"
        style={{ color: THEME.textDark, fontFamily: "'GTSuperDisplay-Light', Georgia, serif" }}
      >
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="inline-flex flex-wrap items-baseline"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words.map((word, index) => (
            <motion.span key={index} variants={wordVariants} className="mr-[0.3em] inline-block overflow-hidden">
              <span className="inline-block">{word}</span>
            </motion.span>
          ))}

          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{ color: accent }}
            whileHover={{ scale: 1.3, rotate: 180, transition: { duration: 0.3 } }}
          >
            .
          </motion.span>
        </motion.span>
      </Tag>

      {showLine && (
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="absolute bottom-4 left-6 h-0.5 origin-left rounded-full sm:left-12"
          style={{ width: '60px', background: accent }}
        />
      )}

      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 0.1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="pointer-events-none absolute -left-2 -top-4 hidden select-none text-8xl lg:block"
        style={{ color: accent, fontFamily: "'GTSuperDisplay-Light', Georgia, serif" }}
      >
        {String(words.length).padStart(2, '0')}
      </motion.span>
    </div>
  );
}
