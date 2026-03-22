import { useState, useRef, useEffect, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from '../utils/motion';
import { Briefcase, GraduationCap, Rocket, Target, Sparkles, Star, Calendar, MapPin, Award } from 'lucide-react';

const MILESTONES = [
  {
    date: 'Mar 2021',
    title: 'Matriculation Completed',
    subtitle: 'Jeevandeep Public School, Varanasi',
    description: 'Completed Matriculation with 80% (April 2020 - March 2021).',
    status: 'completed',
    icon: GraduationCap,
    color: '#FF9398',
    location: 'Varanasi, UP',
    score: '80%',
  },
  {
    date: 'Mar 2023',
    title: 'Intermediate Completed',
    subtitle: 'Jeevandeep Public School, Varanasi',
    description: 'Completed Intermediate with 76% (April 2022 - March 2023).',
    status: 'completed',
    icon: GraduationCap,
    color: '#FF9398',
    location: 'Varanasi, UP',
    score: '76%',
  },
  {
    date: 'Aug 2023',
    title: 'B.Tech CSE Started',
    subtitle: 'Lovely Professional University, Phagwara',
    description: 'Started B.Tech in Computer Science and Engineering (CGPA: 7.45, expected completion May 2027).',
    status: 'completed',
    icon: Rocket,
    color: '#DF6C4F',
    location: 'Phagwara, Punjab',
    score: 'CGPA 7.45',
  },
  {
    date: '2025',
    title: 'Training and Live Project Delivery',
    subtitle: 'Code Tantra + Deployed Portfolio Projects',
    description: 'Completed Full Stack training (June-August 2025) and delivered projects including MoviesMagicChatbot, Inkdrop, and GrabDesk.',
    status: 'current',
    featured: true,
    icon: Briefcase,
    color: '#452215',
    location: 'Remote',
    projects: 3,
  },
  {
    date: 'May 2027',
    title: 'Expected B.Tech Graduation',
    subtitle: 'Lovely Professional University',
    description: 'Target graduation milestone for B.Tech in Computer Science and Engineering.',
    status: 'upcoming',
    icon: Target,
    color: '#DF6C4F',
    location: 'Phagwara, Punjab',
  },
];

const FloatingParticle = ({ delay, x, y, size, color }) => (
  <motion.div
    className="absolute rounded-full opacity-20 pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: color,
      filter: 'blur(12px)',
    }}
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.3, 0.15],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export default memo(function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(3);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
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
      className="relative min-h-screen w-full overflow-hidden bg-[#FFFFF0] py-20 lg:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingParticle delay={0} x="15%" y="20%" size={100} color="#452215" />
        <FloatingParticle delay={2} x="80%" y="30%" size={120} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="70%" size={140} color="#FF9398" />
        <FloatingParticle delay={1} x="25%" y="80%" size={90} color="#452215" />
        <FloatingParticle delay={3} x="90%" y="15%" size={110} color="#DF6C4F" />
      </div>

      {/* Background Blobs */}
      <motion.div
        className="absolute left-10 top-20 h-64 w-64 rounded-full bg-[#FFF8EE] blur-3xl"
        animate={{ 
          y: [0, 30, 0], 
          scale: [1, 1.1, 1],
          x: [0, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-[#FF9398]/20 blur-3xl"
        animate={{ 
          y: [0, -20, 0], 
          scale: [1, 1.2, 1],
          x: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Grid Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L60 60M60 0L0 60' stroke='%23452215' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Large Date Display */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="font-fliege text-[20vw] tracking-tighter"
          style={{ color: '#45221508' }}
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
        >
          {MILESTONES[activeIndex]?.date}
        </motion.span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="h-px w-8 bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            Journey
            <motion.span 
              className="h-px w-8 bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              viewport={{ once: true }}
            />
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Milestones Along{' '}
            <motion.span 
              className="text-[#DF6C4F] italic inline-block"
              animate={{ 
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              The Climb
            </motion.span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            className="mt-6 h-0.5 w-24 mx-auto bg-linear-to-r from-transparent via-[#DF6C4F] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 lg:block">
            <div className="absolute inset-0 bg-linear-to-b from-[#FFF8EE] via-[#FFF8EE] to-[#FFF8EE]" />
            <motion.div 
              className="absolute left-0 right-0 top-0 bg-linear-to-b from-[#DF6C4F] to-[#FF9398]" 
              style={{ height: lineHeight }} 
            />
            
            {/* Animated Progress Dot */}
            <motion.div
              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] shadow-[2px_2px_0_#8F5E41]"
              style={{ top: lineHeight }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#FF9398]"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Mobile Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#FFF8EE] via-[#FFF8EE] to-[#FFF8EE] lg:hidden">
            <motion.div 
              className="absolute left-0 right-0 top-0 bg-linear-to-b from-[#DF6C4F] to-[#FF9398]" 
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
                  className={`relative flex flex-row items-center gap-8 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Content */}
                  <motion.div
                    className={`flex-1 pl-20 lg:pl-0 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}
                    animate={{ 
                      scale: isActive ? 1.02 : 1, 
                      opacity: isActive ? 1 : 0.8 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.article
                      className={`group relative cursor-pointer rounded-2xl border-2 transition-all duration-500 p-6 lg:p-8 ${
                        isActive 
                          ? 'border-[#DF6C4F] bg-[#FFFFF0] shadow-[6px_6px_0_#8F5E41]' 
                          : 'border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1'
                      }`}
                      whileHover={{ y: -5 }}
                    >
                      {/* Status Badge */}
                      <motion.span
                        className={`font-ui absolute -top-3 ${
                          isLeft ? 'right-6' : 'left-6'
                        } rounded-full border-2 border-[#452215] px-3 py-1 text-xs capitalize shadow-[2px_2px_0_#8F5E41] ${
                          item.status === 'current' 
                            ? 'bg-[#452215] text-[#FFFFF0]' 
                            : item.status === 'completed' 
                            ? 'bg-[#FF9398] text-[#452215]' 
                            : 'bg-[#FFF8EE] text-[#452215]'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {item.status === 'current' && <Sparkles size={10} className="inline mr-1" />}
                        {item.status}
                      </motion.span>

                      {/* Date */}
                      <motion.span 
                        className="font-mono-ui mb-2 block text-sm tracking-wider"
                        style={{ color: '#DF6C4F' }}
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                      >
                        {item.date}
                      </motion.span>

                      {/* Title with Icon */}
                      <div className={`mb-3 flex items-center gap-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                        <motion.div
                          className={`rounded-xl border-2 border-[#452215] p-2.5 shadow-[2px_2px_0_#8F5E41] transition-all duration-300 ${
                            isActive ? 'bg-[#FFF8EE]' : 'bg-[#FFFFF0]'
                          }`}
                          animate={{ 
                            rotate: isActive ? [0, -5, 5, 0] : 0,
                            scale: isActive ? 1.1 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={22} style={{ color: item.color }} />
                        </motion.div>
                        <h3 
                          className={`font-ui text-xl lg:text-2xl ${
                            isActive ? 'text-[#452215]' : 'text-[#DF6C4F]'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Subtitle */}
                      <p className="font-ui mb-2 text-[#DF6C4F] text-sm">{item.subtitle}</p>

                      {/* Description */}
                      <p className="font-bodycopy text-sm leading-relaxed text-[#452215] opacity-80 mb-3">
                        {item.description}
                      </p>

                      {/* Additional Details */}
                      <div className="flex flex-wrap gap-3 mt-3">
                        {item.location && (
                          <span className="font-mono-ui inline-flex items-center gap-1 text-xs bg-[#FFF8EE] px-2 py-1 rounded-full border border-[#452215]">
                            <MapPin size={10} className="text-[#DF6C4F]" />
                            {item.location}
                          </span>
                        )}
                        {item.score && (
                          <span className="font-mono-ui inline-flex items-center gap-1 text-xs bg-[#FFF8EE] px-2 py-1 rounded-full border border-[#452215]">
                            <Award size={10} className="text-[#FF9398]" />
                            {item.score}
                          </span>
                        )}
                        {item.projects && (
                          <span className="font-mono-ui inline-flex items-center gap-1 text-xs bg-[#FFF8EE] px-2 py-1 rounded-full border border-[#452215]">
                            <Briefcase size={10} className="text-[#452215]" />
                            {item.projects} Projects
                          </span>
                        )}
                      </div>

                      {/* Featured Badge */}
                      {item.featured && (
                        <motion.div
                          className="font-ui absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border-2 border-[#452215] bg-[#452215] px-4 py-1.5 text-xs text-[#FFFFF0] shadow-[2px_2px_0_#8F5E41]"
                          initial={{ scale: 0, y: 10 }}
                          animate={{ scale: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 500, delay: 0.3 }}
                        >
                          <Sparkles size={12} />
                          Current Focus
                          <Star size={10} className="ml-1" />
                        </motion.div>
                      )}

                      {/* Hover Overlay */}
                      <motion.div 
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${item.color}10, transparent 70%)`
                        }}
                      />
                    </motion.article>
                  </motion.div>

                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-8 z-20 lg:left-1/2 lg:-translate-x-1/2"
                    animate={{ scale: isActive ? 1.4 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.button
                      className={`relative h-7 w-7 rounded-full border-2 transition-all duration-300 shadow-[2px_2px_0_#8F5E41] ${
                        isActive 
                          ? 'border-[#452215] bg-[#452215]' 
                          : 'border-[#DF6C4F] bg-[#FFFFF0] hover:border-[#452215]'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isActive && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[#FF9398]"
                            animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full bg-[#FF9398]"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Spacer for desktop */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-bodycopy mb-4 text-[#452215] opacity-80">The journey continues...</p>
          <motion.div
            className="font-ui inline-flex items-center gap-3 text-[#452215]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span 
              className="h-px w-12 bg-linear-to-r from-transparent to-[#FF9398]"
              animate={{ width: [12, 24, 12] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Scroll to explore more
            <motion.span 
              className="h-px w-12 bg-linear-to-l from-transparent to-[#FF9398]"
              animate={{ width: [12, 24, 12] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});
