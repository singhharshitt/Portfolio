// src/lib/animations.js
// Premium animation system matching Microsoft AI reference video

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  entrance: [0.22, 1, 0.36, 1],
  exit: [0.4, 0, 0.2, 1],
  magnetic: [0.68, -0.55, 0.265, 1.55],
  cinematic: [0.645, 0.045, 0.355, 1],
};

export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
  ambient: 8,
};

export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  cinematic: 0.2,
};

// Framer Motion Variants
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.entrance,
      delay: custom * stagger.normal,
    },
  }),
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
      delay: custom * stagger.fast,
    },
  }),
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.entrance,
      delay: custom * stagger.normal,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easings.entrance,
    },
  },
};

export const blurRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(10px)',
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.slow,
      ease: easings.entrance,
      delay: custom * stagger.slow,
    },
  }),
};

// Hover interactions
export const subtleScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: durations.fast, ease: easings.smooth }
  },
  tap: { scale: 0.98 },
};

export const liftOnHover = {
  rest: { y: 0 },
  hover: { 
    y: -4,
    transition: { duration: durations.fast, ease: easings.smooth }
  },
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5, ease: easings.smooth }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: easings.exit }
  },
};