import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Code, Star } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import useScrollReveal from '../hooks/useScrollReveal';
import { EASE_PREMIUM, EASE_SMOOTH, DURATION_REVEAL, STAGGER_CHILDREN } from '../utils/animationConstants';

// Warm Parchment palette
const THEME = {
  olive: '#6E6B2F',
  gold: '#C9A66B',
  terracotta: '#C2743A',
  sage: '#B7B77A',
  cream: '#F5F0E8',
  textDark: '#4A4A3A',
  parchment: '#E9E2D6',
};

const TIMELINE_DATA = [
  {
    year: "2023",
    date: "2023 — Present",
    title: "B.Tech Computer Science",
    subtitle: "Lovely Professional University",
    description: "Pursuing B.Tech in CSE with a focus on Full Stack Development, DSA, and Cyber Security. Current CGPA: 7.45.",
    type: "Education",
    icon: GraduationCap,
    color: THEME.gold,
  },
  {
    year: "2025",
    date: "June — Aug 2025",
    title: "Full Stack Training",
    subtitle: "Code Tantra",
    description: "Intensive training in React & Node.js. Built a digital reading platform, implemented CRUD APIs, and developed an admin dashboard.",
    type: "Training",
    icon: Briefcase,
    color: THEME.terracotta,
  },
  {
    year: "2025",
    date: "Nov — Dec 2025",
    title: "GrabDesk E-commerce",
    subtitle: "MERN Stack Project",
    description: "Developed a marketplace with a behavioral recommendation engine, JWT RBAC authentication, and a real-time admin dashboard.",
    type: "Project",
    icon: Code,
    color: THEME.gold,
  },
  {
    year: "2025",
    date: "July 2025",
    title: "Inkdrop Platform",
    subtitle: "E-Book System",
    description: "Created a full-stack book downloader with secure auth and cloud file handling, improving performance by 30%.",
    type: "Project",
    icon: Code,
    color: THEME.gold,
  },
  {
    year: "2025",
    date: "March — April 2025",
    title: "MoviesMagic Chatbot",
    subtitle: "AI Application",
    description: "Built an AI-powered movie recommendation assistant with real-time chat interface and session handling.",
    type: "Project",
    icon: Code,
    color: THEME.gold,
  },
  {
    year: "2024",
    date: "Dec 2024",
    title: "Network Communication",
    subtitle: "Coursera Certification",
    description: "Completed Fundamentals of Network Communication, strengthening core CS networking concepts.",
    type: "Certification",
    icon: Award,
    color: THEME.sage,
  },
  {
    year: "2024",
    date: "2024 — Present",
    title: "Problem Solving",
    subtitle: "Achievements",
    description: "Achieved 4-Star rating on HackerRank (Java, C, C++, Python) and LeetCode Contest Rank 3400.",
    type: "Achievement",
    icon: Star,
    color: THEME.olive,
  },
];

// Timeline item component
const TimelineItem = ({ data, index }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const Icon = data.icon;
  const isEven = index % 2 === 0;

  // Intersection observer to track active state
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const isVisible = useInView(ref, { margin: "-20%" });

  return (
    <div ref={ref} className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center md:items-start group mb-12 lg:mb-24 last:mb-0">

      {/* Mobile-only spacer for the vertical line */}
      <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-white/10 -z-10" />

      {/* Left side (Content or empty) */}
      <div className={`w-full md:w-5/12 pl-16 md:pl-0 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start lg:hidden hidden'}`}>
        {isEven && (
          <TimelineCard data={data} isActive={isInView} reduced={reduced} isVisible={isVisible} align="right" />
        )}
      </div>

      {/* Center timeline node */}
      <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-12 h-12 flex items-center justify-center top-0 md:top-6 z-20">
        <motion.div
          animate={reduced ? {} : {
            scale: isInView ? 1.2 : 1,
            backgroundColor: isInView ? data.color : 'transparent',
            borderColor: isInView ? data.color : 'rgba(255, 255, 255, 0.3)',
            boxShadow: isInView ? `0 0 20px ${data.color}60` : 'none',
          }}
          transition={{ duration: 0.3, ease: EASE_SMOOTH }}
          className="w-4 h-4 rounded-full border-2 relative z-10 transition-colors duration-300"
        >
          {/* Pulse ring when active */}
          {!reduced && isInView && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${data.color}`, transform: 'scale(2)' }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 2.5 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
          )}
        </motion.div>

        {/* Connection line from dot to card */}
        <div
          className={`hidden md:block absolute h-px top-1/2 -translate-y-1/2 w-8 lg:w-16 
            ${isEven ? '-left-8 lg:-left-16' : '-right-8 lg:-right-16'} transition-colors duration-500`}
          style={{ backgroundColor: isInView ? data.color : 'rgba(255,255,255,0.1)' }}
        />
      </div>

      {/* Right side (Content or empty) */}
      <div className={`w-full md:w-5/12 pl-16 md:pl-12 flex ${!isEven ? 'md:justify-start' : 'lg:hidden hidden'}`}>
        {!isEven && (
          <TimelineCard data={data} isActive={isInView} reduced={reduced} isVisible={isVisible} align="left" />
        )}
      </div>

      {/* Mobile rendering fallback for even indices (since left block handles desktop) */}
      <div className="w-full pl-16 md:hidden flex mt-2">
        {isEven && (
          <TimelineCard data={data} isActive={isInView} reduced={reduced} isVisible={isVisible} align="left" />
        )}
      </div>
    </div>
  );
};

// Card contents extracted for reuse
const TimelineCard = ({ data, isActive, reduced, isVisible, align }) => {
  const Icon = data.icon;

  return (
    <motion.div
      initial={reduced ? {} : {
        opacity: 0,
        x: align === 'right' ? 40 : -40,
        y: 20
      }}
      animate={reduced ? {} : {
        opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
        x: isVisible ? 0 : (align === 'right' ? 40 : -40),
        y: isVisible ? 0 : 20,
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative ${align === 'right' ? 'md:text-right text-left' : 'text-left'}`}
      style={{
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isActive ? data.color : 'rgba(255, 255, 255, 0.1)'}`,
        transition: 'border-color 0.5s ease',
      }}
    >
      {/* Card Header area */}
      <div
        className="p-6 relative overflow-hidden"
        style={{ background: `linear-gradient(to bottom, ${data.color}20, transparent)` }}
      >
        <div className={`flex items-center gap-4 ${align === 'right' ? 'md:flex-row-reverse flex-row' : ''}`}>
          <div
            className="p-3 rounded-xl backdrop-blur-md"
            style={{ backgroundColor: `${data.color}20`, color: data.color }}
          >
            <Icon size={24} />
          </div>
          <div className={align === 'right' ? 'md:pr-1' : ''}>
            <span
              className="text-xs font-bold tracking-wider px-2.5 py-1 rounded-full border mb-2 inline-block transition-colors duration-300"
              style={{
                color: isActive ? '#fff' : data.color,
                borderColor: `${data.color}40`,
                backgroundColor: isActive ? data.color : `${data.color}15`,
              }}
            >
              {data.type}
            </span>
            <p className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {data.date}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-serif leading-tight">
          {data.title}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: THEME.gold }}>
          {data.subtitle}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {data.description}
        </p>
      </div>

      {/* Glow on active */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none blur-3xl"
        style={{
          opacity: isActive ? 0.3 : 0,
          background: `radial-gradient(circle at center, ${data.color}40 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
};

const SectionHeader = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.1 } }
      }}
      className="text-center mb-24 px-4 relative z-10"
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_PREMIUM } }
        }}
        className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
        style={{ color: THEME.gold }}
      >
        My Journey
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { y: "100%" },
            visible: { y: 0, transition: { duration: DURATION_REVEAL, ease: EASE_PREMIUM } }
          }}
          className="text-5xl sm:text-6xl font-serif text-white"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Experi<em className="italic" style={{ color: THEME.gold }}>ence</em>
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default function ScrollTimeline() {
  const containerRef = useRef(null);

  // Track scroll for vertical timeline progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Subtle background movement
  const { scrollYProgress: bgProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(bgProgress, [0, 1], [0, 150]);
  const bgY2 = useTransform(bgProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="w-full flex justify-center overflow-hidden relative py-32"
      style={{ backgroundColor: THEME.olive }}
    >
      {/* Background orbs */}
      <motion.div
        className="absolute top-0 left-10 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ backgroundColor: THEME.gold, y: bgY1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ backgroundColor: THEME.terracotta, y: bgY2 }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader />

        <div className="relative py-10">
          {/* Main vertical line background */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Animated vertical progress line */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-[3px] rounded-full -translate-x-1/2 origin-top shimmer-line z-10"
            style={{
              height: '100%',
              scaleY: progressHeight,
              background: `linear-gradient(to bottom, ${THEME.gold}, ${THEME.terracotta})`
            }}
          />

          {/* Timeline Nodes */}
          {TIMELINE_DATA.map((item, index) => (
            <TimelineItem key={index} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}