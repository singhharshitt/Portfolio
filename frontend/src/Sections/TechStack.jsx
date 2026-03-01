import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiDocker, SiGithub, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { Sparkles, Zap, Server, Code2 } from 'lucide-react';
import LogoLoop from '../components/LogoLoop';
import AnimatedFile from '../components/AnimatedFile';

// Strict color palette
const THEME = {
  bubblegum: '#F66483',
  marigold: '#C877BF',
  lagoon: '#30B8B2',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  sand: {
    100: '#F5E5CA',
    200: '#F0E7D5',
  },
  charcoal: '#1A1A1A',
};

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
};

// Section header with text reveal
const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE.smooth }}
      >
        <span
          className="text-xs font-mono uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2"
          style={{ color: THEME.brownSugar }}
        >
          <Sparkles className="w-4 h-4" />
          What I Work With
          <Sparkles className="w-4 h-4" />
        </span>
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
          className="text-5xl sm:text-6xl font-serif"
          style={{
            color: THEME.charcoal,
            fontFamily: "'Playfair Display', Georgia, serif"
          }}
        >
          Tech <em className="italic" style={{ color: THEME.lagoon }}>Stack</em>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE.smooth }}
        className="mt-4 text-lg max-w-2xl mx-auto"
        style={{ color: `${THEME.charcoal}99` }}
      >
        Technologies and tools I use to bring ideas to life.
      </motion.p>
    </div>
  );
};

// Animated category heading with icon
const CategoryHeading = ({ children, icon: Icon, color, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay, duration: 0.6, ease: EASE.smooth }}
      className="flex items-center gap-3 mb-4"
    >
      <motion.div
        className="p-2 rounded-lg"
        style={{ backgroundColor: `${color}15` }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </motion.div>
      <h3
        className="text-xl sm:text-2xl font-semibold tracking-wide"
        style={{ color: THEME.charcoal }}
      >
        {children}
      </h3>
      <motion.div
        className="h-px grow origin-left"
        style={{ backgroundColor: `${color}30` }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.8, ease: EASE.smooth }}
      />
    </motion.div>
  );
};

// Tech folder container with enhanced animations
const TechFolder = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 5 }}
      transition={{ delay, duration: 0.8, ease: EASE.smooth }}
      className="relative group"
      style={{ perspective: '1000px' }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
        style={{ backgroundColor: `${THEME.lagoon}10` }}
      />

      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

// Logo loop container with enhanced presentation
const LogoLoopContainer = ({ techLogos }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
      transition={{ duration: 0.8, ease: EASE.smooth }}
      className="mt-6 mx-4 sm:mx-8 lg:mx-12 relative overflow-hidden rounded-2xl border bg-[#F5E5CA] px-2 sm:px-4 shadow-lg"
      style={{
        borderColor: `${THEME.brownSugar}20`,
        boxShadow: `0 20px 60px ${THEME.malachite}10`,
      }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 origin-left"
        style={{
          background: `linear-gradient(90deg, ${THEME.lagoon}, ${THEME.bubblegum}, ${THEME.marigold})`,
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: EASE.smooth }}
      />

      <div className="py-8 sm:py-10">
        {/* Your LogoLoop component */}
        {techLogos && (
          <LogoLoop
            logos={techLogos}
            speed={30}
            direction="left"
            logoHeight={88}
            gap={34}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#F0E7D5"
            ariaLabel="Technology partners"
          />
        )}
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {[THEME.lagoon, THEME.bubblegum, THEME.marigold].map((color, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function TechStack({ techLogos }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.sand[200] }}
    >
      {/* Background elements */}
      <motion.div

        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.lagoon}20`, y: bgY }}
      />
      <motion.div

        className="absolute bottom-20 left-20 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.bubblegum}20`, y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto backdrop-blur-sm">
        <SectionHeader />

        {/* Scrolling Logos */}
        <LogoLoopContainer techLogos={techLogos} />

        {/* Tech Folders Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 px-4 sm:px-8 lg:px-12 pb-12">
          {/* Left Column */}
          <div className="flex flex-col gap-12">
            <TechFolder delay={0.1}>
              <CategoryHeading icon={Zap} color={THEME.lagoon} delay={0.2}>
                FRONTEND
              </CategoryHeading>
              <div className="flex justify-center md:justify-start">
                <AnimatedFile
                  title="Frontend"
                  type="frontend"
                  cards={[
                    { name: "React", icon: SiReact, color: "#61DAFB" },
                    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
                    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
                    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
                    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
                    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
                  ]}
                />
              </div>
            </TechFolder>

            <TechFolder delay={0.2}>
              <CategoryHeading icon={Server} color={THEME.bubblegum} delay={0.3}>
                BACKEND
              </CategoryHeading>
              <div className="flex justify-center md:justify-start">
                <AnimatedFile
                  title="Backend"
                  type="backend"
                  cards={[
                    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
                    { name: "Express", icon: SiExpress, color: "#000000" },
                    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
                    { name: "PHP", icon: SiPhp, color: "#777BB4" },
                    { name: "Python", icon: SiPython, color: "#3776AB" },
                  ]}
                />
              </div>
            </TechFolder>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12">
            <TechFolder delay={0.15}>
              <CategoryHeading icon={Code2} color={THEME.marigold} delay={0.25}>
                DEVOPS & TOOLS
              </CategoryHeading>
              <div className="flex justify-center md:justify-start">
                <AnimatedFile
                  title="DevOps"
                  type="devops"
                  cards={[
                    { name: "Docker", icon: SiDocker, color: "#2496ED" },
                    { name: "GitHub", icon: SiGithub, color: "#181717" },
                  ]}
                />
              </div>
            </TechFolder>

            <TechFolder delay={0.25}>
              <CategoryHeading icon={Sparkles} color={THEME.brownSugar} delay={0.35}>
                CORE LANGUAGES
              </CategoryHeading>
              <div className="flex justify-center md:justify-start">
                <AnimatedFile
                  title="Languages"
                  type="core"
                  cards={[
                    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
                    { name: "Java", icon: SiOpenjdk, color: "#007396" },
                    { name: "C++", icon: SiCplusplus, color: "#00599C" },
                    { name: "C", icon: SiC, color: "#A8B9CC" },
                  ]}
                />
              </div>
            </TechFolder>
          </div>
        </div>
      </div>
    </section>
  );
}