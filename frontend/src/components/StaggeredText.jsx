import { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
  dramatic: [0.87, 0, 0.13, 1],
};

const EASE_MAP = {
  smooth: EASE.smooth,
  entrance: EASE.entrance,
  dramatic: EASE.dramatic,
};

export default function StaggeredText({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.08,
  duration = 0.8,
  once = true,
  splitBy = 'line',
  ease = 'smooth',
  yOffset = 60,
  rotateX = 15,
  scrub = false,
  highlightWords = [],
  highlightClass = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  // Split text based on mode
  const segments = splitBy === 'char' 
    ? text.split('')
    : splitBy === 'word' 
      ? text.split(' ')
      : text.split('\n');

  // Container variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  // Item variants with 3D rotation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      rotateX: rotateX,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: EASE_MAP[ease] || EASE.smooth,
      },
    },
  };

  // Character-specific variants for tighter timing
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration * 0.6, ease: EASE_MAP[ease] || EASE.smooth },
    },
  };

  const renderContent = (segment, index) => {
    // Check if this segment should be highlighted
    const isHighlighted = highlightWords.some(word => 
      segment.toLowerCase().includes(word.toLowerCase())
    );

    const content = splitBy === 'word' ? (
      <>{segment}{index < segments.length - 1 ? '\u00A0' : ''}</>
    ) : (
      segment
    );

    return (
      <Tag
        className={`inline-block ${isHighlighted ? highlightClass : ''}`}
        style={{ 
          margin: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {content}
      </Tag>
    );
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={splitBy === 'char' ? charVariants : itemVariants}
          className="block overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {renderContent(segment, index)}
        </motion.span>
      ))}
    </motion.div>
  );
}