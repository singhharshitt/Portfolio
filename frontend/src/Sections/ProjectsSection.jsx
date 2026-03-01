import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiGithub,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiPython,
  SiDocker,
} from 'react-icons/si';
import { ExternalLink, ArrowUpRight, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  EASE_PREMIUM,
  EASE_SMOOTH,
  DURATION_REVEAL,
  STAGGER_CHILDREN,
  SPRING_BOUNCE,
  BREAKPOINTS,
} from '../utils/animationConstants';

// Warm Parchment palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  sage: '#B7B77A',
  olive: '#6E6B2F',
  parchment: '#E9E2D6',
  cream: '#F5F0E8',
  textDark: '#4A4A3A',
  textMuted: '#8A8570',
};

const projects = [
  {
    id: 1,
    title: 'GRABDESK - E-Commerce Platform',
    description: 'A full-stack MERN e-commerce platform with real-time features, admin dashboard, analytics, and payment integration.',
    tech: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Express', icon: SiExpress, color: '#000000' },
    ],
    github: 'https://github.com/singhharshitt/grabdesk',
    liveDemo: null,
    category: 'Full Stack',
    accentColor: THEME.terracotta,
  },
  {
    id: 2,
    title: 'SKY-X Currency Converter',
    description: 'Smart currency exchange application supporting both fiat and cryptocurrency conversions with real-time rates.',
    tech: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'API', icon: SiNodedotjs, color: '#339933' },
    ],
    github: 'https://github.com/singhharshitt/sky-x',
    liveDemo: 'https://sky-x-demo.vercel.app',
    category: 'Frontend',
    accentColor: THEME.gold,
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website showcasing projects and skills with smooth animations and dark mode support.',
    tech: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Motion', icon: SiReact, color: '#FF0055' },
    ],
    github: 'https://github.com/singhharshitt/portfolio',
    liveDemo: 'https://harshitsingh.dev',
    category: 'Frontend',
    accentColor: THEME.sage,
  },
  {
    id: 4,
    title: 'Task Management System',
    description: 'Collaborative task management tool with real-time updates, team collaboration features, and project tracking.',
    tech: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
    github: 'https://github.com/singhharshitt/task-manager',
    liveDemo: null,
    category: 'Full Stack',
    accentColor: THEME.olive,
  },
  {
    id: 5,
    title: 'AI Chat Application',
    description: 'Intelligent chatbot application powered by AI with context-aware responses and multi-language support.',
    tech: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    ],
    github: 'https://github.com/singhharshitt/ai-chat',
    liveDemo: null,
    category: 'AI/ML',
    accentColor: THEME.terracotta,
  },
  {
    id: 6,
    title: 'DevOps Pipeline Automation',
    description: 'Automated CI/CD pipeline setup with Docker containerization, automated testing, and deployment workflows.',
    tech: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
    ],
    github: 'https://github.com/singhharshitt/devops-pipeline',
    liveDemo: null,
    category: 'DevOps',
    accentColor: THEME.gold,
  },
];

// ─── Enhanced Project Card ─────────────────────────────────
const ProjectCard = ({ project, index, isCenter }) => {
  const cardRef = useRef(null);
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: reduced ? {} : { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: DURATION_REVEAL,
        delay: index * 0.1,
        ease: EASE_PREMIUM,
      },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col snap-center shrink-0"
      style={{
        width: 'min(70vw, 900px)',
        minHeight: '500px',
        perspective: '1000px',
        willChange: 'transform',
      }}
    >
      {/* Glassmorphism card */}
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(145deg, rgba(245,240,232,0.95) 0%, rgba(233,226,214,0.9) 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${THEME.sage}40`,
          boxShadow: isHovered
            ? `0 25px 60px rgba(110,107,47,0.15), 0 0 0 1px ${project.accentColor}30`
            : `0 8px 30px rgba(110,107,47,0.08)`,
          transition: 'box-shadow 0.5s ease, transform 0.5s ease',
          transform: isHovered ? 'translateY(-8px) translateZ(30px)' : 'translateY(0) translateZ(0)',
        }}
      >
        {/* Top gradient accent strip */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}60, transparent)`,
          }}
        />

        {/* Card number watermark */}
        <span
          className="absolute top-6 right-6 font-serif text-7xl font-bold pointer-events-none select-none transition-colors duration-500"
          style={{ color: isHovered ? `${project.accentColor}20` : `${THEME.textDark}08` }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative z-10 p-8 flex flex-col h-full">
          {/* Category badge */}
          <motion.div className="mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider border rounded-full transition-all duration-300"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}50`,
                backgroundColor: isHovered ? `${project.accentColor}15` : `${project.accentColor}08`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <h3
            className="text-2xl sm:text-3xl font-serif font-bold mb-4 transition-colors duration-300 leading-tight"
            style={{
              color: isHovered ? project.accentColor : THEME.textDark,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-base leading-relaxed mb-6 grow" style={{ color: THEME.textMuted }}>
            {project.description}
          </p>

          {/* Tech stack with glow */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {project.tech.map((tech, techIndex) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={techIndex}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl cursor-default transition-all duration-300"
                  style={{
                    backgroundColor: `${tech.color}12`,
                    color: tech.color,
                    border: `1px solid ${tech.color}20`,
                    boxShadow: isHovered ? `0 2px 12px ${tech.color}15` : 'none',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t mt-auto" style={{ borderColor: `${THEME.sage}30` }}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative overflow-hidden"
              style={{
                color: THEME.terracotta,
                border: `2px solid ${THEME.terracotta}`,
              }}
              whileHover={{
                backgroundColor: THEME.terracotta,
                color: '#F5F0E8',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <SiGithub className="w-4 h-4 relative z-10" />
              <span className="relative z-10">GitHub</span>
            </motion.a>

            {project.liveDemo ? (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: project.accentColor,
                  color: '#F5F0E8',
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 12px 35px ${project.accentColor}40`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
            ) : (
              <div
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-xl opacity-50 cursor-not-allowed"
                style={{ backgroundColor: `${THEME.sage}30`, color: THEME.textMuted }}
              >
                <FolderOpen className="w-4 h-4" />
                Coming Soon
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

// ─── Progress Bar ──────────────────────────────────────────
const ScrollProgressBar = ({ progress }) => (
  <div className="flex justify-center mt-8 gap-2 items-center px-4">
    <div className="w-full max-w-xs h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: `${THEME.sage}30` }}>
      <motion.div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${THEME.terracotta}, ${THEME.gold}, ${THEME.olive})`,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
    <span className="text-xs font-mono" style={{ color: THEME.textMuted }}>
      {Math.round(progress)}%
    </span>
  </div>
);

// ─── Section Header ────────────────────────────────────────
const SectionHeader = () => {
  const { ref, controls } = useScrollReveal();

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_PREMIUM } },
  };

  return (
    <motion.div
      ref={ref}
      variants={headerVariants}
      initial="hidden"
      animate={controls}
      className="text-center mb-16 px-4"
    >
      <motion.span
        variants={childVariants}
        className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
        style={{ color: THEME.olive }}
      >
        Featured Work
      </motion.span>

      <div className="overflow-hidden">
        <motion.h2
          variants={childVariants}
          className="text-5xl sm:text-6xl font-serif"
          style={{ color: THEME.textDark, fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Selected <em className="italic" style={{ color: THEME.terracotta }}>Projects</em>
        </motion.h2>
      </div>

      <motion.p
        variants={childVariants}
        className="mt-4 text-lg max-w-2xl mx-auto"
        style={{ color: THEME.textMuted }}
      >
        A collection of projects that showcase my skills in full-stack development, UI/UX design, and problem-solving.
      </motion.p>
    </motion.div>
  );
};

// ─── Main Section ──────────────────────────────────────────
const ProjectsSection = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive — detect mobile for vertical stack
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Track scroll position for progress bar + active card
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const progress = (el.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);

    // Determine which card is centered
    const cardWidth = el.children[0]?.offsetWidth || 0;
    const gap = 32; // 2rem
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, projects.length - 1));
  }, []);

  // ResizeObserver to recalculate on window resize
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isMobile) return;

    const observer = new ResizeObserver(() => handleScroll());
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleScroll, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    if (isMobile) return;
    const onKeyDown = (e) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = el.children[0]?.offsetWidth || 0;
      const gap = 32;
      if (e.key === 'ArrowRight') {
        el.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        el.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile]);

  const scrollTo = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.children[0]?.offsetWidth || 0;
    el.scrollBy({ left: dir * (cardWidth + 32), behavior: 'smooth' });
  };

  return (
    <section
      id="projects-showcase"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.parchment }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.gold}25` }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.terracotta}15` }}
      />

      <div className="relative z-10">
        <SectionHeader />

        {isMobile ? (
          /* ── Mobile: Vertical card stack ── */
          <div className="grid grid-cols-1 gap-6 px-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isCenter={false} />
            ))}
          </div>
        ) : (
          /* ── Desktop/Tablet: Horizontal CSS scroll-snap gallery ── */
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={() => scrollTo(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
              style={{
                backgroundColor: `${THEME.cream}90`,
                borderColor: `${THEME.sage}40`,
                color: THEME.textDark,
              }}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
              style={{
                backgroundColor: `${THEME.cream}90`,
                borderColor: `${THEME.sage}40`,
                color: THEME.textDark,
              }}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto px-[15vw] pb-4"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isCenter={index === activeIndex}
                />
              ))}
            </div>

            {/* Right fade hint */}
            <div
              className="absolute top-0 right-0 w-24 h-full pointer-events-none z-10"
              style={{
                background: `linear-gradient(to left, ${THEME.parchment}, transparent)`,
              }}
            />
            {/* Left fade hint */}
            <div
              className="absolute top-0 left-0 w-24 h-full pointer-events-none z-10"
              style={{
                background: `linear-gradient(to right, ${THEME.parchment}, transparent)`,
              }}
            />

            {/* Progress bar */}
            <ScrollProgressBar progress={scrollProgress} />

            {/* Hide scrollbar */}
            <style>{`
              div[style*="scroll-snap-type"]::-webkit-scrollbar { display: none; }
            `}</style>
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_SMOOTH }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/singhharshitt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-medium transition-all duration-300 border-2"
            style={{
              borderColor: THEME.terracotta,
              color: THEME.terracotta,
            }}
            whileHover={{
              backgroundColor: THEME.terracotta,
              color: '#F5F0E8',
              scale: 1.03,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <SiGithub className="w-5 h-5" />
            <span>View All on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;