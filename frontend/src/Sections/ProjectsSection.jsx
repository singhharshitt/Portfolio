import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
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
import { ExternalLink, ArrowUpRight, FolderOpen } from 'lucide-react';

// Strict color palette
const THEME = {
  bubblegum: '#F66483',
  marigold: '#C877BF',
  lagoon: '#30B8B2',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  sand: {
    100: '#F5E5CA',
    200: '#F5EDE6',
  },
  charcoal: '#1A1A1A',
  orange: '#F97316', // Keeping your orange accent
};

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
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
    accentColor: THEME.lagoon,
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
    accentColor: THEME.bubblegum,
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
    accentColor: THEME.marigold,
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
    accentColor: THEME.lagoon,
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
    accentColor: THEME.bubblegum,
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
    accentColor: THEME.marigold,
  },
];

// Individual project card with MAI-style depth
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: 8,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: index * 0.12,
        ease: EASE.smooth,
      },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.4, ease: EASE.smooth },
      }}
      className="group relative flex flex-col h-full"
      style={{ perspective: '1000px' }}
    >
      {/* Glow backdrop on hover */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{ backgroundColor: `${project.accentColor}30` }}
      />

      {/* Main card - preserving your retro design */}
      <div
        className="relative h-full bg-[#F5E5CA] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 transition-all duration-500 flex flex-col"
        style={{ borderColor: THEME.orange }}
      >
        {/* Animated border frame on hover */}
        <motion.div
          className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20"
          style={{
            borderColor: project.accentColor,
            margin: '12px',
          }}
        />

        {/* Top accent line with color shift */}
        <motion.div
          className="absolute top-0 left-6 right-6 h-0.5 origin-left z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
            transform: 'scaleX(0)',
          }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: EASE.smooth }}
        />

        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* Category badge with dynamic color */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.12 + 0.2, duration: 0.5 }}
            className="mb-3"
          >
            <span
              className="inline-block px-3 py-1 text-xs font-bold border rounded-full transition-colors duration-300"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}60`,
                backgroundColor: `${project.accentColor}10`,
              }}
            >
              {project.category}
            </span>
          </motion.div>

          {/* Title with hover color shift */}
          <h3
            className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-(--title-color)"
            style={{ color: THEME.charcoal, '--title-color': project.accentColor }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4 grow line-clamp-3" style={{ color: `${THEME.charcoal}B3` }}>
            {project.description}
          </p>

          {/* Tech stack with icon colors */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={techIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.12 + techIndex * 0.05 + 0.3, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: `${tech.color}15`,
                    color: tech.color,
                  }}
                  title={tech.name}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-medium">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-3 border-t mt-auto" style={{ borderColor: `${THEME.charcoal}15` }}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 relative overflow-hidden group/btn"
              style={{
                color: THEME.orange,
                border: `2px solid ${THEME.orange}`,
                backgroundColor: 'transparent',
              }}
              whileHover={{
                backgroundColor: THEME.orange,
                color: 'white',
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
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: project.accentColor,
                  color: 'white',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 10px 30px ${project.accentColor}40`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-lg opacity-50 cursor-not-allowed" style={{ backgroundColor: `${THEME.charcoal}15`, color: THEME.charcoal }}>
                <FolderOpen className="w-4 h-4" />
                Coming Soon
              </div>
            )}
          </div>
        </div>

        {/* Bottom label - preserving your design */}
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all duration-500 px-2 py-0.5 rounded-full z-20"
          style={{
            color: project.accentColor,
            backgroundColor: '#F5E5CA',
          }}
        >
          Project
        </span>

        {/* Decorative corner accent */}
        <div
          className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
          style={{ backgroundColor: `${project.accentColor}30` }}
        />
      </div>
    </motion.article>
  );
};

// Section header
const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE.smooth }}
      >
        <span
          className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
          style={{ color: THEME.brownSugar }}
        >
          Featured Work
        </span>
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : { y: '100%' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
          className="text-5xl sm:text-6xl font-serif"
          style={{ color: THEME.charcoal, fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Selected <em className="italic" style={{ color: THEME.lagoon }}>Projects</em>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE.smooth }}
        className="mt-4 text-lg max-w-2xl mx-auto"
        style={{ color: `${THEME.charcoal}99` }}
      >
        A collection of projects that showcase my skills in full-stack development, UI/UX design, and problem-solving.
      </motion.p>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.sand[200] }}
    >
      {/* Background elements */}
      <motion.div

        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.lagoon}25`, y: bgY}}
      />
      <motion.div

        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.bubblegum}25`, y: useTransform(scrollYProgress, [0, 1], [0, -80])  }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE.smooth }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/singhharshitt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-medium transition-all duration-300 border-2"
            style={{
              borderColor: THEME.orange,
              color: THEME.orange,
            }}
            whileHover={{
              backgroundColor: THEME.orange,
              color: 'white',
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