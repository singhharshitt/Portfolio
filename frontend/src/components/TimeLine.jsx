import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase, Award, Code, Star } from 'lucide-react';

// Strict color palette
const THEME = {
  malachite: '#15484C',
  lagoon: '#30B8B2',
  bubblegum: '#F66483',
  brownSugar: '#A6480A',
  gold: '#F7B05B',
  cream: '#F5F0E8',
  charcoal: '#1A1A1A',
  sand: '#ECE2D0',
};

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
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
    color: THEME.lagoon,
  },
  {
    year: "2025",
    date: "June — Aug 2025",
    title: "Full Stack Training",
    subtitle: "Code Tantra",
    description: "Intensive training in React & Node.js. Built a digital reading platform, implemented CRUD APIs, and developed an admin dashboard.",
    type: "Training",
    icon: Briefcase,
    color: THEME.bubblegum,
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
    color: THEME.marigold,
  },
  {
    year: "2024",
    date: "2024 — Present",
    title: "Problem Solving",
    subtitle: "Achievements",
    description: "Achieved 4-Star rating on HackerRank (Java, C, C++, Python) and LeetCode Contest Rank 3400.",
    type: "Achievement",
    icon: Star,
    color: THEME.brownSugar,
  },
];

// Navigation button with magnetic effect
const NavButton = ({ onClick, disabled, direction, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 400, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    x.set((e.clientX - centerX) * 0.2);
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      style={{ x }}
      className={`absolute ${direction}-4 md:${direction}-10 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border backdrop-blur-md transition-all duration-300 ${
        disabled 
          ? 'opacity-30 cursor-not-allowed border-white/5 bg-white/5' 
          : 'border-white/10 bg-white/5 hover:bg-[#30B8B2] hover:border-[#30B8B2] hover:scale-110'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Timeline card with enhanced animations
const TimelineCard = ({ data }) => {
  const Icon = data.icon;
  
  return (
    <motion.div
      key={data.title}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -40, scale: 0.9, rotateX: -10 }}
      transition={{ duration: 0.7, ease: EASE.smooth }}
      className="w-[90%] max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
      style={{
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient header */}
      <div 
        className="h-36 relative overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${data.color}40 0%, ${data.color}20 100%)`,
        }}
      >
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="p-5 rounded-2xl relative z-10"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: data.color,
          }}
        >
          <Icon size={32} />
        </motion.div>

        {/* Decorative circles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
          style={{ backgroundColor: `${data.color}20` }}
        />
      </div>

      {/* Card content */}
      <div className="p-8 text-center relative">
        {/* Type badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4 border"
          style={{
            color: data.color,
            borderColor: `${data.color}40`,
            backgroundColor: `${data.color}10`,
          }}
        >
          {data.type}
        </motion.div>

        {/* Title with text reveal */}
        <div className="overflow-hidden mb-2">
          <motion.h3
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE.smooth }}
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {data.title}
          </motion.h3>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-sm mb-4 font-medium"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          {data.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm leading-relaxed"
          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          {data.description}
        </motion.p>
      </div>

      {/* Connector line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute -bottom-12 left-1/2 w-px h-12 origin-top"
        style={{
          background: `linear-gradient(to bottom, ${data.color}, transparent)`,
        }}
      />
    </motion.div>
  );
};

// Timeline dot with pulse animation
const TimelineDot = ({ isActive, color, onClick, index }) => {
  return (
    <motion.div
      onClick={onClick}
      className="relative cursor-pointer group"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Pulse ring for active */}
      {isActive && (
        <motion.div
          layoutId="pulseRing"
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${color}`,
            transform: 'scale(1.5)',
          }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
        />
      )}

      {/* Main dot */}
      <motion.div
        animate={{
          scale: isActive ? 1.4 : 1,
          backgroundColor: isActive ? color : 'transparent',
          borderColor: isActive ? color : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{ duration: 0.3, ease: EASE.smooth }}
        className="w-4 h-4 rounded-full border-2 relative z-10"
        style={{
          boxShadow: isActive ? `0 0 20px ${color}60` : 'none',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"
        style={{ backgroundColor: `${color}40` }}
      />
    </motion.div>
  );
};

const InteractiveTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), { stiffness: 100, damping: 30 });

  // Scroll selected item into view
  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, TIMELINE_DATA.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleDateClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const activeData = TIMELINE_DATA[activeIndex];

  return (
    <section
      className="min-h-200 w-full flex flex-col items-center justify-center overflow-hidden relative py-24"
      style={{ backgroundColor: THEME.malachite }}
    >
      {/* Background elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.lagoon}30`,y: bgY }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.bubblegum}30` , y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />

      {/* Section header */}
      <div className="text-center mb-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE.smooth }}
        >
          <span
            className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
            style={{ color: THEME.lagoon }}
          >
            My Journey
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
            className="text-5xl sm:text-6xl font-serif text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Experi<em className="italic" style={{ color: THEME.gold }}>ence</em>
          </motion.h2>
        </div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-7xl h-150 flex flex-col justify-end pb-16">
        
        {/* Navigation buttons */}
        <NavButton
          onClick={handlePrev}
          disabled={activeIndex === 0}
          direction="left"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </NavButton>

        <NavButton
          onClick={handleNext}
          disabled={activeIndex === TIMELINE_DATA.length - 1}
          direction="right"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </NavButton>

        {/* Card display area */}
        <div className="absolute top-0 left-0 w-full h-95 flex justify-center items-end pb-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <TimelineCard data={activeData} />
          </AnimatePresence>
        </div>

        {/* Timeline strip */}
        <div className="w-full overflow-x-auto no-scrollbar" ref={containerRef}>
          <div className="flex items-center min-w-max px-[50vw] py-12 relative">
            {/* Base line */}
            <div 
              className="absolute left-0 right-0 h-px top-22 mx-10 md:mx-20"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />

            {/* Active line segment */}
            <motion.div
              className="absolute h-px top-22 mx-10 md:mx-20"
              style={{
                backgroundColor: activeData.color,
                left: `${(activeIndex / (TIMELINE_DATA.length - 1)) * 100}%`,
                width: '100px',
              }}
              animate={{
                left: `${(activeIndex / (TIMELINE_DATA.length - 1)) * 80 + 10}%`,
              }}
              transition={{ duration: 0.5, ease: EASE.smooth }}
            />

            {TIMELINE_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              const isVisible = distance <= 2;

              return (
                <motion.div
                  key={index}
                  ref={el => itemRefs.current[index] = el}
                  onClick={() => handleDateClick(index)}
                  className="relative flex flex-col items-center mx-6 md:mx-10"
                  style={{ width: '80px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0.3, 
                    y: 0,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  {/* Year label */}
                  <motion.p
                    animate={{
                      y: isActive ? -8 : 0,
                      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                    }}
                    className="text-lg font-bold mb-6 transition-colors"
                  >
                    {item.year}
                  </motion.p>

                  {/* Dot */}
                  <div className="pt-2">
                    <TimelineDot
                      isActive={isActive}
                      color={item.color}
                      onClick={() => handleDateClick(index)}
                      index={index}
                    />
                  </div>

                  {/* Date label */}
                  <motion.p
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 10,
                    }}
                    className="text-xs mt-4 whitespace-nowrap absolute top-20"
                    style={{ color: item.color }}
                  >
                    {item.date}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default InteractiveTimeline;