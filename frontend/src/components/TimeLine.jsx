import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase, Award, Code, Star } from 'lucide-react';

// --- Configuration & Data ---

const THEME = {
  bg: 'bg-[#0f172a]', // Dark Slate background
  line: '#945600',
  dot: '#F17300',
  text: '#ffffff',
  cardBg: '#1e293b',
  accent: '#F17300'
};

const TIMELINE_DATA = [
  {
    year: "2023",
    date: "2023 — Present",
    title: "B.Tech Computer Science",
    subtitle: "Lovely Professional University",
    description: "Pursuing B.Tech in CSE with a focus on Full Stack Development, DSA, and Cyber Security. Current CGPA: 7.45.",
    type: "Education",
    icon: <GraduationCap size={24} />
  },
  {
    year: "2025",
    date: "June — Aug 2025",
    title: "Full Stack Training",
    subtitle: "Code Tantra",
    description: "Intensive training in React & Node.js. Built a digital reading platform, implemented CRUD APIs, and developed an admin dashboard.",
    type: "Training",
    icon: <Briefcase size={24} />
  },
  {
    year: "2025",
    date: "Nov — Dec 2025",
    title: "GrabDesk E-commerce",
    subtitle: "MERN Stack Project",
    description: "Developed a marketplace with a behavioral recommendation engine, JWT RBAC authentication, and a real-time admin dashboard.",
    type: "Project",
    icon: <Code size={24} />
  },
  {
    year: "2025",
    date: "July 2025",
    title: "Inkdrop Platform",
    subtitle: "E-Book System",
    description: "Created a full-stack book downloader with secure auth and cloud file handling, improving performance by 30%.",
    type: "Project",
    icon: <Code size={24} />
  },
  {
    year: "2025",
    date: "March — April 2025",
    title: "MoviesMagic Chatbot",
    subtitle: "AI Application",
    description: "Built an AI-powered movie recommendation assistant with real-time chat interface and session handling.",
    type: "Project",
    icon: <Code size={24} />
  },
  {
    year: "2024",
    date: "Dec 2024",
    title: "Network Communication",
    subtitle: "Coursera Certification",
    description: "Completed Fundamentals of Network Communication, strengthening core CS networking concepts.",
    type: "Certification",
    icon: <Award size={24} />
  },
  {
    year: "2024",
    date: "2024 — Present",
    title: "Problem Solving",
    subtitle: "Achievements",
    description: "Achieved 4-Star rating on HackerRank (Java, C, C++, Python) and LeetCode Contest Rank 3400.",
    type: "Achievement",
    icon: <Star size={24} />
  }
];

const InteractiveTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  // Scroll the selected item into view
  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, TIMELINE_DATA.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDateClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={`min-h-[700px] w-full  flex flex-col items-center justify-center overflow-hidden relative font-sans selection:bg-orange-500 selection:text-white`}>

    
      

      {/* Main Timeline Container */}
      <div className="relative w-full max-w-7xl h-[580px] flex flex-col justify-end pb-16">

        {/* Navigation Controls */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-[#F17300] hover:border-[#F17300] hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:cursor-not-allowed group`}
        >
          <ChevronLeft className="text-white w-6 h-6 group-hover:text-white" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex === TIMELINE_DATA.length - 1}
          className={`absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-[#F17300] hover:border-[#F17300] hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-transparent disabled:cursor-not-allowed group`}
        >
          <ChevronRight className="text-white w-6 h-6 group-hover:text-white" />
        </button>

        {/* Content Display Area (The Card) */}
        <div className="absolute top-0 left-0 w-full h-[350px] flex justify-center items-end pb-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-[90%] max-w-md bg-[#1e293b] rounded-xl overflow-hidden shadow-2xl border border-white/10 pointer-events-auto relative"
            >
              {/* Card Image/Header Background */}
              <div className="h-32 bg-gradient-to-r from-[#F17300] to-[#945600] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30 text-white"
                >
                  {TIMELINE_DATA[activeIndex].icon}
                </motion.div>
              </div>

              {/* Card Content */}
              <div className="p-6 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-[#F17300] text-xs font-bold tracking-wider mb-3 border border-[#F17300]/20">
                  {TIMELINE_DATA[activeIndex].type}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{TIMELINE_DATA[activeIndex].title}</h3>
                <p className="text-gray-400 text-sm mb-4 font-medium">{TIMELINE_DATA[activeIndex].subtitle}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {TIMELINE_DATA[activeIndex].description}
                </p>
              </div>

              {/* Connector Line (Visual only) */}
              <div className="absolute -bottom-[40px] left-1/2 w-px h-[40px] bg-gradient-to-b from-[#F17300] to-transparent"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dates Strip */}
        <div className="w-full overflow-x-auto no-scrollbar mask-gradient" ref={containerRef}>
          <div className="flex items-center min-w-max px-[50vw] py-10">
            {/* The Horizontal Line */}
            <div className="absolute left-0 right-0 h-[2px] bg-[#945600]/30 top-[70px] mx-10 md:mx-20"></div>

            {TIMELINE_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              const isSibling = Math.abs(index - activeIndex) === 1;

              return (
                <div
                  key={index}
                  ref={el => itemRefs.current[index] = el}
                  onClick={() => handleDateClick(index)}
                  className="relative flex flex-col items-center cursor-pointer group mx-4 md:mx-8"
                  style={{ width: '100px' }} // Fixed width for spacing
                >

                  <div className="relative flex flex-col items-center pt-8">

                    {/* Year Text */}
                    <motion.p
                      animate={{
                        scale: isActive ? 1.3 : isSibling ? 0.9 : 0.7,
                        opacity: isActive ? 1 : isSibling ? 0.6 : 0.4,
                        y: isActive ? -10 : 0
                      }}
                      className={`text-xl font-black mb-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}
                    >
                      {item.year}
                    </motion.p>

                    {/* The Dot */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.5 : 1,
                        backgroundColor: isActive ? THEME.dot : '#1e293b',
                        borderColor: isActive ? '#fff' : THEME.line
                      }}
                      whileHover={{ scale: 1.8 }}
                      className="w-4 h-4 rounded-full border-2 z-10 shadow-[0_0_15px_rgba(241,115,0,0.5)]"
                    />

                    {/* Active Indicator Ring */}
                    {isActive && (
                      <motion.div
                        layoutId="activeRing"
                        className="absolute top-[72px] w-8 h-8 rounded-full border-2 border-[#F17300] -z-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollbar utilities via index.css: .no-scrollbar and .mask-gradient */}
    </div>
  );
};

export default InteractiveTimeline;