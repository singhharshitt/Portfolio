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
    color: '#FF9398',
  },
  {
    date: 'Mar 2023',
    title: 'Intermediate Completed',
    subtitle: 'Jeevandeep Public School, Varanasi',
    description: 'Completed Intermediate with 76% (April 2022 - March 2023).',
    status: 'completed',
    icon: GraduationCap,
    color: '#FF9398',
  },
  {
    date: 'Aug 2023',
    title: 'B.Tech CSE Started',
    subtitle: 'Lovely Professional University, Phagwara',
    description: 'Started B.Tech in Computer Science and Engineering (CGPA: 7.45, expected completion May 2027).',
    status: 'completed',
    icon: Rocket,
    color: '#DF6C4F',
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
  },
  {
    date: 'May 2027',
    title: 'Expected B.Tech Graduation',
    subtitle: 'Lovely Professional University',
    description: 'Target graduation milestone for B.Tech in Computer Science and Engineering.',
    status: 'upcoming',
    icon: Target,
    color: '#DF6C4F',
  },
];

export default function JourneyTimeline() {
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
      <motion.div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="font-fliege text-[20vw] tracking-tighter text-[#452215]/6"
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
        >
          {MILESTONES[activeIndex]?.date}
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute left-10 top-20 h-64 w-64 rounded-full bg-[#FFF8EE] blur-3xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-[#FF9398]/15 blur-3xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="h-px w-8 bg-[#DF6C4F]" />
            Journey
            <span className="h-px w-8 bg-[#DF6C4F]" />
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Milestones Along <span className="text-[#DF6C4F] italic">The Climb</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 lg:block">
            <div className="absolute inset-0 bg-[#FFF8EE]" />
            <motion.div className="absolute left-0 right-0 top-0 bg-[#DF6C4F]" style={{ height: lineHeight }} />
            <motion.div
              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#452215]"
              style={{ top: lineHeight }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#FF9398]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#FFF8EE] lg:hidden">
            <motion.div className="absolute left-0 right-0 top-0 bg-[#DF6C4F]" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-12 lg:space-y-24">
            {MILESTONES.map((item, index) => {
              const isActive = index === activeIndex;
              const isLeft = index % 2 === 0;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.date}
                  className={`relative flex flex-row items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    className={`flex-1 pl-20 lg:pl-0 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}
                    animate={{ scale: isActive ? 1.02 : 1, opacity: isActive ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.article
                      className={`group relative cursor-pointer rounded-2xl border p-6 transition-all duration-500 lg:p-8 ${isActive ? 'border-[#DF6C4F]/20 bg-[#FFFFF0]' : 'border-[#FFF8EE] bg-[#FFFFF0]/80 hover:bg-[#FFFFF0]'}`}
                      whileHover={{ y: -5 }}
                    >
                      <motion.span
                        className={`font-ui absolute -top-3 ${isLeft ? 'right-6' : 'left-6'} rounded-full px-3 py-1 text-xs capitalize ${item.status === 'current' ? 'bg-[#452215] text-[#FFFFF0]' : item.status === 'completed' ? 'bg-[#FF9398]/20 text-[#452215]' : 'bg-[#FFF8EE] text-[#452215]'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {item.status}
                      </motion.span>

                      <motion.span className="font-mono-ui mb-2 block text-sm tracking-wider text-[#DF6C4F]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {item.date}
                      </motion.span>

                      <div className={`mb-2 flex items-center gap-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                        <motion.div
                          className={`rounded-lg p-2 ${isActive ? 'bg-[#FFF8EE]' : 'bg-[#FFFFF0]'}`}
                          animate={{ rotate: isActive ? [0, -10, 10, 0] : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={20} style={{ color: item.color }} />
                        </motion.div>
                        <h3 className={`font-ui text-xl lg:text-2xl ${isActive ? 'text-[#452215]' : 'text-[#DF6C4F]'}`}>
                          {item.title}
                        </h3>
                      </div>

                      <p className="font-ui mb-3 text-[#DF6C4F]">{item.subtitle}</p>
                      <p className="font-bodycopy text-sm leading-relaxed text-[#452215]">{item.description}</p>

                      {item.featured && (
                        <motion.div
                          className="font-ui absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#452215] px-3 py-1 text-xs text-[#FFFFF0]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, delay: 0.3 }}
                        >
                          <Sparkles size={12} />
                          Current
                        </motion.div>
                      )}

                      <motion.div className="absolute inset-0 rounded-2xl bg-[#FF9398]/6 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.article>
                  </motion.div>

                  <motion.div
                    className="absolute left-8 z-20 lg:left-1/2 lg:-translate-x-1/2"
                    animate={{ scale: isActive ? 1.3 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.button
                      className={`relative h-6 w-6 rounded-full border-4 transition-colors duration-300 ${isActive ? 'border-[#452215] bg-[#452215]' : 'border-[#DF6C4F]/30 bg-[#FFFFF0] hover:border-[#DF6C4F]'}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#FF9398]"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </motion.div>

                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-bodycopy mb-4 text-[#452215]">The journey continues...</p>
          <motion.div
            className="font-ui inline-flex items-center gap-2 text-[#452215]"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="h-px w-12 bg-[#FF9398]" />
            Scroll to explore more
            <span className="h-px w-12 bg-[#FF9398]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
