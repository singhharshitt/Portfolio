import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from '../utils/motion';
import { Briefcase, GraduationCap, Rocket, Target, Sparkles } from 'lucide-react';

const MILESTONES = [
  {
    date: 'Mar 2021',
    title: 'Matriculation Completed',
    subtitle: 'Jeevandeep Public School, Varanasi',
    description: 'Completed Matriculation with 80% (April 2020 - March 2021).',
    status: 'completed',
    icon: GraduationCap,
    color: '#9FB2AC',
  },
  {
    date: 'Mar 2023',
    title: 'Intermediate Completed',
    subtitle: 'Jeevandeep Public School, Varanasi',
    description: 'Completed Intermediate with 76% (April 2022 - March 2023).',
    status: 'completed',
    icon: GraduationCap,
    color: '#6B7A3D',
  },
  {
    date: 'Aug 2023',
    title: 'B.Tech CSE Started',
    subtitle: 'Lovely Professional University, Phagwara',
    description: 'Started B.Tech in Computer Science and Engineering (CGPA: 7.45, expected completion May 2027).',
    status: 'completed',
    icon: Rocket,
    color: '#C67C4E',
  },
  {
    date: '2025',
    title: 'Training and Live Project Delivery',
    subtitle: 'Code Tantra + Deployed Portfolio Projects',
    description: 'Completed Full Stack training (June-August 2025) and delivered projects including MoviesMagicChatbot (Mar-Apr 2025), Inkdrop (Jul 2025), and GrabDesk (Nov-Dec 2025).',
    status: 'current',
    featured: true,
    icon: Briefcase,
    color: '#5D0D18',
  },
  {
    date: 'May 2027',
    title: 'Expected B.Tech Graduation',
    subtitle: 'Lovely Professional University',
    description: 'Target graduation milestone for B.Tech in Computer Science and Engineering.',
    status: 'upcoming',
    icon: Target,
    color: '#9FB2AC',
  },
];

export default function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(3);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Line draw animation
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const newIndex = Math.min(Math.floor(v * MILESTONES.length), MILESTONES.length - 1);
      if (newIndex < 0) return;
      setActiveIndex((current) => (newIndex === current ? current : newIndex));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <section 
      id="timeline" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Year */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.span 
          className="text-[20vw] font-bold text-[#5D0D18]/5 font-fliege tracking-tighter"
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
        >
          {MILESTONES[activeIndex]?.date}
        </motion.span>
      </motion.div>

      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#9FB2AC]/10 blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#5D0D18]/5 blur-3xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-[#9FB2AC]" />
            Journey
            <span className="w-8 h-px bg-[#9FB2AC]" />
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Milestones Along{' '}
            <span className="text-[#5D0D18] italic">The Climb</span>
          </motion.h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line with Draw Animation */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-[#5D0D18]/10" />
            
            {/* Animated progress line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-linear-to-b from-[#5D0D18] via-[#9FB2AC] to-[#5D0D18]"
              style={{ height: lineHeight }}
            />
            
            {/* Glowing tip */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#5D0D18] shadow-lg shadow-[#5D0D18]/30"
              style={{ top: lineHeight }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#5D0D18]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Mobile Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#5D0D18]/20 lg:hidden">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-[#5D0D18]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-24">
            {MILESTONES.map((item, index) => {
              const isActive = index === activeIndex;
              const isLeft = index % 2 === 0;
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.date}
                  className={`relative flex items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Content Card */}
                  <motion.div 
                    className={`flex-1 lg:text-${isLeft ? 'right' : 'left'} pl-20 lg:pl-0`}
                    animate={{ 
                      scale: isActive ? 1.02 : 1,
                      opacity: isActive ? 1 : 0.6
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.article 
                      className={`relative p-6 lg:p-8 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                        isActive 
                          ? 'bg-white/80 border-[#5D0D18]/20 shadow-xl shadow-[#5D0D18]/5' 
                          : 'bg-white/40 border-[#5D0D18]/10 hover:bg-white/60'
                      }`}
                      whileHover={{ y: -5 }}
                    >
                      {/* Status Badge */}
                      <motion.span 
                        className={`absolute -top-3 ${isLeft ? 'right-6' : 'left-6'} px-3 py-1 text-xs font-medium rounded-full capitalize ${
                          item.status === 'completed' ? 'bg-[#6B7A3D]/10 text-[#6B7A3D]' :
                          item.status === 'current' ? 'bg-[#5D0D18] text-[#FFFBEB]' :
                          'bg-[#9FB2AC]/20 text-[#9FB2AC]'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {item.status}
                      </motion.span>

                      {/* Date */}
                      <motion.span 
                        className="text-[#9FB2AC] text-sm font-medium tracking-wider block mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {item.date}
                      </motion.span>

                      {/* Title with Icon */}
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'lg:justify-end' : ''}`}>
                        <motion.div
                          className={`p-2 rounded-lg ${isActive ? 'bg-[#5D0D18]/10' : 'bg-[#5D0D18]/5'}`}
                          animate={{ rotate: isActive ? [0, -10, 10, 0] : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={20} className={isActive ? 'text-[#5D0D18]' : 'text-[#5D0D18]/50'} />
                        </motion.div>
                        <h3 className={`text-xl lg:text-2xl font-bold ${isActive ? 'text-[#5D0D18]' : 'text-[#1a1a1a]'}`}>
                          {item.title}
                        </h3>
                      </div>

                      {/* Subtitle */}
                      <p className="text-[#9FB2AC] font-medium mb-3">{item.subtitle}</p>

                      {/* Description */}
                      <p className="text-[#1a1a1a]/70 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Featured Indicator */}
                      {item.featured && (
                        <motion.div 
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-[#5D0D18] text-[#FFFBEB] text-xs rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
                        >
                          <Sparkles size={12} />
                          Current
                        </motion.div>
                      )}

                      {/* Hover gradient */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#9FB2AC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.article>
                  </motion.div>

                  {/* Center Node */}
                  <motion.div 
                    className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 z-20"
                    animate={{ scale: isActive ? 1.3 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.button
                      className={`relative w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                        isActive 
                          ? 'bg-[#5D0D18] border-[#5D0D18]' 
                          : 'bg-[#FFFBEB] border-[#5D0D18]/30 hover:border-[#5D0D18]'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#5D0D18]"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#1a1a1a]/60 mb-4">The journey continues...</p>
          <motion.div 
            className="inline-flex items-center gap-2 text-[#5D0D18] font-medium"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-12 h-px bg-[#5D0D18]" />
            Scroll to explore more
            <span className="w-12 h-px bg-[#5D0D18]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
