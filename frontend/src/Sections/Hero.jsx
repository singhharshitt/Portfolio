import { motion, useScroll, useSpring, useTransform } from '../utils/motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

function scrollTo(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

const HERO_STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '7+', label: 'Projects Delivered' },
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
      {/* Orb A */}
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

      {/* Orb B */}
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

      {/* Orb C */}
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

      {/* Hero Content */}
      <div className="text-center max-w-[980px] px-10 relative z-[2]">
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
        </MotionDiv>

        <MotionH1
          className="m-0 font-[var(--font-display)] text-[clamp(3.2rem,9.7vw,7.6rem)] font-medium leading-[.9] tracking-[-0.02em] text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <MotionSpan
            className="block font-fliege"
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Harshit
          </MotionSpan>
          <MotionSpan
            className="block text-[var(--cherry-red)] italic font-fliege"
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            Singh
          </MotionSpan>
        </MotionH1>

        <MotionParagraph
          className="mt-[1.4rem] mx-auto mb-[2.6rem] max-w-[700px] SNPro-Book text-[clamp(1.04rem,2.1vw,1.28rem)] leading-[1.72] ]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-2xl md:xl ">Full Stack Developer</p>
          I design clean interfaces and build reliable, high-performance web products with
          modern frontend and backend engineering.
        </MotionParagraph>

        <MotionDiv
          className="flex justify-center flex-wrap gap-[14px] mb-[2.6rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MotionButton
            type="button"
            onClick={() => scrollTo('projects-showcase')}
            className="inline-flex items-center justify-center px-[30px] py-[15px] rounded-full cursor-pointer font-[var(--font-body)] text-[.95rem] font-semibold tracking-[.01em] border border-transparent bg-[var(--cherry-red)] text-[var(--text-inverse)] shadow-[0_10px_24px_rgba(158,27,45,.2)] transition-all duration-[.4s] hover:bg-[var(--cherry-red-light)] hover:shadow-[0_16px_34px_rgba(158,27,45,.28)]"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-[10px]">
              View Projects
              <ArrowRight size={18} />
            </span>
          </MotionButton>

          <MotionButton
            type="button"
            onClick={() => scrollTo('connect')}
            className="inline-flex items-center justify-center px-[30px] py-[15px] rounded-full cursor-pointer font-[var(--font-body)] text-[.95rem] font-semibold tracking-[.01em] border-[1.4px] border-[rgba(122,21,36,.45)] bg-[rgba(255,255,255,.46)] text-[var(--text-primary)] transition-all duration-[.4s] hover:border-[var(--cherry-red)] hover:text-[var(--cherry-red)] hover:bg-[rgba(255,255,255,.68)]"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-[10px]">
              Let&apos;s Connect
              <ArrowRight size={18} />
            </span>
          </MotionButton>
        </MotionDiv>

        <MotionDiv
          className="grid grid-cols-3 gap-[14px] max-w-[760px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {HERO_STATS.map((stat, index) => (
            <MotionDiv
              key={stat.label}
              className="p-[18px_16px] border border-[rgba(131,125,94,.22)] rounded-[14px] bg-[rgba(255,255,255,.58)] backdrop-blur-[8px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <span className="block font-[var(--font-display)] text-[clamp(1.7rem,3.2vw,2.35rem)] leading-[1] text-[var(--cherry-red-dark)]">{stat.value}</span>
              <span className="block mt-[6px] font-[var(--font-mono)] text-[.62rem] tracking-[.12em] uppercase text-[var(--text-muted)]">{stat.label}</span>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>

      {/* Scroll Indicator — keeps bounceY CSS animation */}
      <MotionButton
        type="button"
        onClick={() => scrollTo('about')}
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to About section"
      >
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
