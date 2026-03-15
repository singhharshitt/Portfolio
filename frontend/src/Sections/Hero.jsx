import { motion, useScroll, useSpring, useTransform } from '../utils/motion';
import { ArrowRight } from 'lucide-react';

function scrollTo(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionSpan = motion.span;
const MotionParagraph = motion.div;
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
        animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <MotionDiv
        className="hero-orb orb-b"
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <MotionDiv
        className="hero-orb orb-c"
        animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />

      {/* ═══ ZONE 1 — Eyebrow + Full-bleed editorial headline ═══ */}
      <div className="relative z-[2] w-full" style={{ paddingInline: '4vw' }}>

        {/* Eyebrow labels */}
        <MotionDiv
          className="flex items-center gap-3 mb-[clamp(1rem,2vw,1.8rem)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* text-[clamp(0.65rem,1vw,0.8rem)] */}
          <span className="font-mono-ui  uppercase tracking-[0.22em] text-[#FF9398] text-2xl">Hey,</span>
          <span className="font-mono-ui  uppercase tracking-[0.22em] text-[#FFF8EE] opacity-60 text-2xl">I Am</span>
        </MotionDiv>

        {/* ── Headline — full viewport width, staggered like reference image ── */}
        <MotionH1
          className="m-0 p-0 font-fliege font-normal text-[#FFFFF0]"
          style={{
            fontSize: 'clamp(3.8rem, 14.5vw, 13.5rem)',
            lineHeight: 0.84,
            letterSpacing: '-0.04em',
            width: '100%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* Line 1 — left-aligned, fills left side of viewport */}
          <MotionSpan
            className="block text-left ml-10"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Harshit
          </MotionSpan>
          {/* Line 2 — right-aligned, fills right side — mirrors the reference image stagger */}
          <MotionSpan
            className="block text-right italic text-[#FF9398] mr-10"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            Singh
          </MotionSpan>
        </MotionH1>
      </div>

      {/* ═══ ZONE 2 — Role · Description · Buttons ═══ */}
      {/* marginTop: 'clamp(2.5rem, -2vw, 3.5rem)' */}
      <div
        className="relative z-[2] w-full"
        style={{ paddingInline: '4vw', marginTop: '-80px' }}
      >
        {/* Typewriter role text */}
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52 }}
        >
          <span
            className="font-ui block uppercase text-[#FFF8EE]"
            style={{ fontSize: '40px ', letterSpacing: '3px', marginBottom: 'clamp(1rem,1.8vw,1.4rem)'}}
          >
            {"Full Stack Developer".split("").map((char, i) => (
              <MotionSpan
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.04, delay: 0.68 + i * 0.042 }}
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </MotionSpan>
            ))}
          </span>
        </MotionDiv>

        {/* Description */}
        <MotionParagraph
          className="font-bodycopy text-[#FFFFF0]"
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
            lineHeight: 1.72,
            maxWidth: '50ch',
            marginBottom: 'clamp(1.8rem, 3vw, 2.6rem)',
            marginTop: 0,
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.82 }}
        >
          I design clean interfaces and build reliable, high-performance web products with
          modern frontend and backend engineering.
        </MotionParagraph>

        {/* CTA Buttons */}
        <MotionDiv
          className="flex flex-wrap gap-[14px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.98 }}
        >
          <MotionButton
            type="button"
            onClick={() => scrollTo('projects-showcase')}
            className="font-ui inline-flex items-center justify-center rounded-full border border-[#DF6C4F] bg-[#DF6C4F] px-[30px] py-[15px] text-[0.95rem] tracking-[0.08em] text-[#FFFFF0] transition-all duration-[.4s] hover:border-[#FF9398] hover:bg-[#FF9398] hover:text-[#452215]"
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
            className="font-ui inline-flex items-center justify-center rounded-full border border-[#FFF8EE] bg-[#FFFFF0] px-[30px] py-[15px] text-[0.95rem] tracking-[0.08em] text-[#452215] transition-all duration-[.4s] hover:border-[#49C5B6] hover:bg-[#FFF8EE] hover:text-[#DF6C4F]"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center gap-[10px]">
              Let&apos;s Connect
              <ArrowRight size={18} />
            </span>
          </MotionButton>
        </MotionDiv>
      </div>

    </MotionSection>
  );
}
