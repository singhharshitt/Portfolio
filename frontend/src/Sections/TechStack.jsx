import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiDocker, SiGithub, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { Sparkles } from 'lucide-react';
import LogoLoop from '../components/LogoLoop';
import useReducedMotion from '../hooks/useReducedMotion';
import useScrollReveal from '../hooks/useScrollReveal';
import useInViewport from '../hooks/useInViewport';
import { EASE_PREMIUM, EASE_SMOOTH, DURATION_REVEAL, BREAKPOINTS } from '../utils/animationConstants';

// Warm Parchment palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  sage: '#B7B77A',
  olive: '#6E6B2F',
  parchment: '#E9E2D6',
  cream: '#F5F0E8',
  textDark: '#4A4A3A',
  textSecondary: '#6E6B2F',
  textMuted: '#8A8570',
};

// Flattened tech stack for the orbital animation
const TECH_ITEMS = [
  { name: "React", icon: SiReact, color: "#61DAFB", radius: 150, phase: 0 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", radius: 220, phase: 1.2 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", radius: 280, phase: 2.5 },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", radius: 180, phase: 4.1 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", radius: 250, phase: 5.3 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", radius: 320, phase: 0.8 },
  { name: "Express", icon: SiExpress, color: "#000000", radius: 200, phase: 3.4 },
  { name: "Python", icon: SiPython, color: "#3776AB", radius: 300, phase: 1.9 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", radius: 260, phase: 4.8 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", radius: 160, phase: 3.1 },
  { name: "C++", icon: SiCplusplus, color: "#00599C", radius: 340, phase: 2.2 },
  { name: "Java", icon: SiOpenjdk, color: "#007396", radius: 230, phase: 5.8 },
  { name: "PHP", icon: SiPhp, color: "#777BB4", radius: 290, phase: 0.4 },
  { name: "GitHub", icon: SiGithub, color: "#181717", radius: 350, phase: 3.8 },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", radius: 190, phase: 1.5 },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", radius: 210, phase: 5.1 },
  { name: "C", icon: SiC, color: "#A8B9CC", radius: 310, phase: 4.5 },
];

const SectionHeader = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="text-center mb-16 px-4"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_PREMIUM } }
        }}
        className="text-xs font-mono uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2"
        style={{ color: THEME.olive }}
      >
        <Sparkles className="w-4 h-4" />
        What I Work With
        <Sparkles className="w-4 h-4" />
      </motion.span>

      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { y: "100%" },
            visible: { y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_PREMIUM } }
          }}
          className="text-5xl sm:text-6xl font-serif"
          style={{ color: THEME.textDark, fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Tech <em className="italic" style={{ color: THEME.terracotta }}>Stack</em>
        </motion.h2>
      </div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_PREMIUM } }
        }}
        className="mt-4 text-lg max-w-2xl mx-auto"
        style={{ color: THEME.textMuted }}
      >
        Technologies and tools I use to bring ideas to life.
      </motion.p>
    </motion.div>
  );
};

// Desktop: Orbital Sine Wave animation
const OrbitalStack = ({ isMobile }) => {
  const containerRef = useRef(null);
  const { isInViewport } = useInViewport({ threshold: 0.1 });
  const reduced = useReducedMotion();

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [time, setTime] = useState(0);

  // RAF loop for sine wave float
  useEffect(() => {
    if (reduced || isMobile || !isInViewport) return;

    let rafId;
    let t = 0;
    const loop = () => {
      t += 0.005; // speed
      setTime(t);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [reduced, isMobile, isInViewport]);

  if (isMobile) {
    // Mobile Fallback: Static Grid
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 px-4">
        {TECH_ITEMS.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-white/40 shadow-sm"
              style={{ borderColor: `${tech.color}30` }}
            >
              <Icon className="w-8 h-8" style={{ color: tech.color }} />
              <span className="text-xs font-medium text-center" style={{ color: THEME.textDark }}>{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Desktop/Tablet: Orbital scatter
  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center -z-0"
    >
      {/* Center anchor point (invisible) */}
      <div className="absolute w-4 h-4 rounded-full bg-slate-200/50 blur-sm pointer-events-none" />

      {TECH_ITEMS.map((tech, idx) => {
        const Icon = tech.icon;

        // Scatter around circle
        const angle = (idx / TECH_ITEMS.length) * Math.PI * 2;

        // Sine wave offset using continuous time
        const waveOffset = Math.sin(time * 3 + tech.phase) * 20;

        // Base fixed position in orbital layout
        const baseX = Math.cos(angle) * tech.radius;
        const baseY = Math.sin(angle) * tech.radius;

        const isHovered = hoveredIdx === idx;
        const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;

        return (
          <motion.div
            key={idx}
            className="absolute z-10"
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0, x: 0, y: 0 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, x: baseX, y: baseY }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, type: 'spring', stiffness: 50, damping: 20, delay: idx * 0.05 }}
            style={{
              x: baseX,
              y: reduced ? baseY : baseY + waveOffset,
              zIndex: isHovered ? 50 : 10,
            }}
          >
            <motion.div
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{
                scale: isHovered ? 1.3 : isDimmed ? 0.8 : 1,
                opacity: isDimmed ? 0.3 : 1,
                filter: isDimmed ? 'blur(4px)' : 'blur(0px)',
              }}
              transition={{ duration: 0.3 }}
              className="group relative cursor-pointer flex items-center justify-center p-4 rounded-2xl bg-[#F5F0E8] border shadow-lg backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: `${tech.color}40`,
                color: tech.color,
                boxShadow: isHovered ? `0 20px 40px ${tech.color}30` : `0 8px 24px rgba(110, 107, 47, 0.1)`,
              }}
            >
              <Icon className="w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:-rotate-12" />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, scale: isHovered ? 1 : 0.9 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl pointer-events-none"
                style={{
                  backgroundColor: tech.color,
                  color: '#fff',
                }}
              >
                {tech.name}
                {/* Tooltip arrow */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                  style={{ backgroundColor: tech.color }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function TechStack({ techLogos }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    { stiffness: 100, damping: 30 }
  );

  // Check breakpoint on mount and resize
  useEffect(() => {
    const checkBreakpoints = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    };
    checkBreakpoints();
    window.addEventListener('resize', checkBreakpoints);
    return () => window.removeEventListener('resize', checkBreakpoints);
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.parchment }}
    >
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.gold}20`, y: bgY }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.terracotta}15`, y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto backdrop-blur-sm">
        <SectionHeader />

        {/* Scrolling Logos (Optional integration as requested) */}
        {techLogos && (
          <div className="mb-16 mt-6 mx-4 sm:mx-8 lg:mx-12 overflow-hidden rounded-2xl border px-2 sm:px-4 shadow-lg bg-white/40 backdrop-blur-md"
            style={{ borderColor: `${THEME.sage}40` }}>
            <div className="py-8">
              <LogoLoop logos={techLogos} speed={30} direction="left" logoHeight={88} gap={34} pauseOnHover scaleOnHover fadeOut fadeOutColor="#E9E2D6" />
            </div>
          </div>
        )}

        {/* Desktop Orbital float / Mobile Grid */}
        <OrbitalStack isMobile={isMobile} />
      </div>
    </section>
  );
}