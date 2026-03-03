import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

function scrollTo(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

const HERO_STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
];

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionSpan = motion.span;
const MotionParagraph = motion.p;
const MotionButton = motion.button;

export default function Hero() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 30, mass: 0.3 });
  const y = useTransform(smoothScrollY, [0, 500], [0, 90]);
  const opacity = useTransform(smoothScrollY, [0, 360], [1, 0.25]);

  return (
    <MotionSection
      id="hero"
      className="hero"
      style={{ y, opacity }}
    >
      <MotionDiv
        className="hero-orb orb-a"
        animate={{
          x: [0, 18, 0],
          y: [0, -16, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionDiv
        className="hero-orb orb-b"
        animate={{
          x: [0, -20, 0],
          y: [0, 18, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      <MotionDiv
        className="hero-orb orb-c"
        animate={{
          x: [0, 12, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />

      <div className="hero-content">
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="hero-greeting">Full Stack Developer and UI Engineer</p>
        </MotionDiv>

        <MotionH1
          className="hero-name"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <MotionSpan
            className="first"
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Harshit
          </MotionSpan>
          <MotionSpan
            className="last"
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            Singh
          </MotionSpan>
        </MotionH1>

        <MotionParagraph
          className="hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          I design clean interfaces and build reliable, high-performance web products with
          modern frontend and backend engineering.
        </MotionParagraph>

        <MotionDiv
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MotionButton
            type="button"
            onClick={() => scrollTo('projects-showcase')}
            className="cta-primary"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hero-cta-label">
              View Projects
              <ArrowRight size={18} />
            </span>
          </MotionButton>

          <MotionButton
            type="button"
            onClick={() => scrollTo('connect')}
            className="cta-secondary"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hero-cta-label">
              Let&apos;s Connect
              <ArrowRight size={18} />
            </span>
          </MotionButton>
        </MotionDiv>

        <MotionDiv
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {HERO_STATS.map((stat, index) => (
            <MotionDiv
              key={stat.label}
              className="hero-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>

      <MotionButton
        type="button"
        onClick={() => scrollTo('about')}
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to About section"
      >
        <span>Scroll</span>
        <MotionDiv
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </MotionDiv>
      </MotionButton>
    </MotionSection>
  );
}
