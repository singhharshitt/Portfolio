import { useEffect, memo, useState } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { ArrowRight, Mail, Github, Linkedin, Twitter, Sparkles, Star, Heart, Code, ExternalLink, Zap, Award } from 'lucide-react';
import { SiReact, SiExpress, SiMongodb, SiVercel, SiJavascript, SiPython } from 'react-icons/si';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const mainNavItems = [
  { label: 'Work', section: 'projects-showcase', description: 'Selected projects', icon: Zap },
  { label: 'About', section: 'about', description: 'My story', icon: Sparkles },
  { label: 'Tech Stack', section: 'techstack', description: 'What I use', icon: Code },
  { label: 'Interests', section: 'interests', description: 'What drives me', icon: Heart },
  { label: 'Journey', section: 'timeline', description: 'My path', icon: Award },
  { label: 'Connect', section: 'connect', description: 'Get in touch', icon: Mail },
];

const secondaryNavItems = [
  { label: 'Blog', section: 'blog' },
];

const featuredProjects = [
  {
    title: 'PrioSync',
    category: 'Production',
    description: 'Priority-focused productivity experience deployed for real-time usage.',
    tags: ['Live', 'Deployed'],
    accent: '#7DD3FC',
    accentSoft: 'rgba(125, 211, 252, 0.16)',
    techStack: [
      { name: 'React 19', icon: SiReact, color: '#61DAFB' },
      { name: 'Zustand', icon: Zap, color: '#FDBA74' },
      { name: 'Express.js', icon: SiExpress, color: '#A8A29E' },
      { name: 'MongoDB', icon: SiMongodb, color: '#86EFAC' },
      { name: 'Custom DAG', icon: Code, color: '#FDE68A' },
    ],
    liveUrl: 'https://prio-sync.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/PrioSync',
  },
  {
    title: 'SkyX',
    category: 'Production',
    description: 'Production web app shipped with an interactive front-end workflow.',
    tags: ['Live', 'Deployed'],
    accent: '#FDBA74',
    accentSoft: 'rgba(253, 186, 116, 0.14)',
    techStack: [
      { name: 'Vanilla JS', icon: SiJavascript, color: '#FDE047' },
      { name: 'Express.js', icon: SiExpress, color: '#D6D3D1' },
      { name: 'Axios', icon: ArrowRight, color: '#C4B5FD' },
      { name: 'Chart.js', icon: Code, color: '#FCA5A5' },
      { name: 'WebSocket', icon: Zap, color: '#67E8F9' },
    ],
    liveUrl: 'https://skyx-v2-0.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/SKYX-V2.0',
  },
  {
    title: 'MovieMagic',
    category: 'Production',
    description: 'Deployed movie experience with live interactions and public codebase.',
    tags: ['Live', 'Deployed'],
    accent: '#F9A8D4',
    accentSoft: 'rgba(249, 168, 212, 0.14)',
    techStack: [
      { name: 'Python Flask', icon: SiPython, color: '#93C5FD' },
      { name: 'Vanilla JS', icon: SiJavascript, color: '#FDE047' },
      { name: 'TMDB API', icon: Sparkles, color: '#99F6E4' },
      { name: 'Render', icon: SiVercel, color: '#D9F99D' },
    ],
    liveUrl: 'https://moveismagicchatbot.onrender.com',
    githubUrl: 'https://github.com/singhharshitt/MoveisMagicChatbot',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const slideUpVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const FloatingParticle = memo(function FloatingParticle({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        filter: 'blur(16px)',
        zIndex: 0,
        willChange: 'transform, opacity',
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
});

export default memo(function MenuOverlay({ isOpen, onClose, onNavigate }) {
  const [emailHovered, setEmailHovered] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Ensure body state is properly cleaned up when MenuOverlay unmounts
  useEffect(() => {
    return () => {
      // Force cleanup of body overflow state
      const scrollY = parseInt(document.body.style.top || '0') * -1;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    // Add listener immediately when menu opens
    window.addEventListener('keydown', handleKeyDown, true);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, onClose]);

  const handleNavClick = (section) => {
    onNavigate(section);
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking directly on backdrop, not children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 h-dvh"
          aria-hidden={!isOpen}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <FloatingParticle delay={0} x="10%" y="20%" size={150} color="#DF6C4F" />
            <FloatingParticle delay={2} x="85%" y="30%" size={180} color="#FF9398" />
            <FloatingParticle delay={4} x="70%" y="80%" size={200} color="#452215" />
            <FloatingParticle delay={1} x="30%" y="70%" size={160} color="#DF6C4F" />
            <FloatingParticle delay={3} x="90%" y="15%" size={140} color="#FF9398" />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              variants={slideUpVariants}
              className="absolute inset-0 bg-[#452215]"
              style={{ willChange: 'transform' }}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
              className="absolute inset-x-0 bottom-0 top-[40%] bg-linear-to-b from-[#DF6C4F]/90 via-[#DF6C4F]/70 to-[#FF9398]/85"
              style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)', willChange: 'transform' }}
            />

            {/* Decorative Circles */}
            <motion.div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#FFFFF0]/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ willChange: 'transform' }}
            />
            <motion.div
              className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full border border-[#FFFFF0]/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{ willChange: 'transform' }}
            />
          </div>

          <div className="relative h-full overflow-y-auto overscroll-contain">
            <div className="flex min-h-full flex-col px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 xl:px-16">
              <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                  {/* Main Navigation */}
                  <motion.div
                    className="space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <nav className="space-y-1" aria-label="Main navigation">
                      {mainNavItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.section}
                            variants={itemVariants}
                            className="overflow-hidden"
                          >
                            <button
                              onClick={() => handleNavClick(item.section)}
                              className="group relative w-full rounded-lg py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9398]/50"
                            >
                              <motion.div
                                className="absolute inset-0 rounded-lg bg-linear-to-r from-[#FFFFF0]/10 via-transparent to-transparent"
                                initial={{ scaleX: 0, opacity: 0 }}
                                whileHover={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                style={{ originX: 0, willChange: 'transform, opacity' }}
                              />

                              <div className="relative flex items-center justify-between px-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#FFFFF0]/20 bg-[#FFFFF0]/5 transition-all duration-300 group-hover:border-[#FF9398] group-hover:bg-[#FF9398]/10">
                                    <Icon className="h-5 w-5 text-[#FFFFF0]/60 transition-all duration-300 group-hover:text-[#FF9398]" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-fliege text-3xl text-[#FFFFF0] transition-all duration-500 group-hover:translate-x-3 group-hover:text-[#FF9398] sm:text-5xl lg:text-6xl">
                                      {item.label}
                                      {index === 3 && (
                                        <motion.span
                                          className="inline-block ml-2"
                                          animate={{ rotate: [0, 10, -10, 0] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        >
                                          <Sparkles size={24} className="inline text-[#FF9398]" />
                                        </motion.span>
                                      )}
                                    </span>
                                    <span className="font-caption mt-1 translate-y-2 text-sm tracking-wide text-[#FFF8EE]/70 opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                      {item.description}
                                    </span>
                                  </div>
                                </div>

                                <motion.div
                                  initial={{ x: -20, opacity: 0 }}
                                  whileHover={{ x: 0, opacity: 1 }}
                                  className="text-[#FF9398]"
                                >
                                  <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1} />
                                </motion.div>
                              </div>

                              <span className="font-mono-ui absolute left-12 top-1/2 -translate-y-1/2 text-sm text-[#FFFFF0]/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                0{index + 1}
                              </span>
                            </button>
                          </motion.div>
                        );
                      })}
                    </nav>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-4 border-t border-[#FFFFF0]/10 pt-8"
                    >
                      <motion.button
                        onClick={() => handleNavClick('connect')}
                        className="group relative overflow-hidden rounded-full px-8 py-4 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setEmailHovered(true)}
                        onMouseLeave={() => setEmailHovered(false)}
                        style={{ willChange: 'transform' }}
                      >
                        <div className="absolute inset-0 bg-[#FFFFF0]" />
                        <div className="absolute inset-0 scale-x-0 bg-linear-to-r from-[#FF9398] to-[#DF6C4F] transition-transform duration-300 group-hover:scale-x-100" style={{ transformOrigin: 'left', willChange: 'transform' }} />
                        <span className="font-ui relative z-10 flex items-center gap-3 text-[#452215]">
                          <Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                          <span className="group-hover:hidden">Get in Touch</span>
                          <span className="hidden group-hover:inline">hello@harshit.dev</span>
                        </span>
                        
                        {/* Sparkle on hover */}
                        <motion.div
                          className="absolute -right-1 -top-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: emailHovered ? 1 : 0 }}
                        >
                          <Star size={12} className="text-[#FF9398]" fill="#FF9398" />
                        </motion.div>
                      </motion.button>

                      {secondaryNavItems.map((item) => (
                        <motion.button
                          key={item.section}
                          onClick={() => handleNavClick(item.section)}
                          className="font-ui group relative overflow-hidden rounded-lg px-6 py-3 text-sm text-[#FFFFF0]/75 transition-colors duration-300 hover:text-[#FFFFF0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9398]/50"
                          whileHover={{ y: -2 }}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#FF9398] to-transparent"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            style={{ originX: 0 }}
                          />
                        </motion.button>
                      ))}
                    </motion.div>

                    {/* Quick Stats with Icons */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap gap-4 pt-4 sm:gap-6"
                    >
                      <div className="flex items-center gap-2 rounded-lg border border-[#FFFFF0]/10 bg-[#FFFFF0]/5 px-3 py-2 transition-all duration-300 hover:border-[#FF9398]/30 hover:bg-[#FF9398]/10">
                        <div className="h-8 w-8 rounded-full border border-[#FFFFF0]/20 flex items-center justify-center">
                          <Code size={14} className="text-[#FF9398]" />
                        </div>
                        <span className="font-mono-ui text-xs text-[#FFFFF0]/60">20+ Projects</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-[#FFFFF0]/10 bg-[#FFFFF0]/5 px-3 py-2 transition-all duration-300 hover:border-[#FF9398]/30 hover:bg-[#FF9398]/10">
                        <div className="h-8 w-8 rounded-full border border-[#FFFFF0]/20 flex items-center justify-center">
                          <Heart size={14} className="text-[#FF9398]" fill="#FF9398" />
                        </div>
                        <span className="font-mono-ui text-xs text-[#FFFFF0]/60">100% Passion</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-[#FFFFF0]/10 bg-[#FFFFF0]/5 px-3 py-2 transition-all duration-300 hover:border-[#FF9398]/30 hover:bg-[#FF9398]/10">
                        <div className="h-8 w-8 rounded-full border border-[#FFFFF0]/20 flex items-center justify-center">
                          <Zap size={14} className="text-[#FF9398]" />
                        </div>
                        <span className="font-mono-ui text-xs text-[#FFFFF0]/60">Fast Delivery</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Featured Projects */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="font-ui mb-8 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#FF9398]"
                    >
                      <motion.span 
                        className="h-px w-8 bg-linear-to-r from-[#FF9398] to-transparent"
                        animate={{ width: [8, 32, 8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Featured Work
                    </motion.h3>

                    <div className="space-y-4">
                      {featuredProjects.map((project) => (
                        <motion.div
                          key={project.title}
                          variants={itemVariants}
                          className="group relative flex flex-col cursor-pointer gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-500"
                          onClick={() => handleNavClick('projects-showcase')}
                          whileHover={{ y: -4 }}
                          onMouseEnter={() => setHoveredProject(project.title)}
                          onMouseLeave={() => setHoveredProject(null)}
                          style={{
                            borderColor: hoveredProject === project.title ? `${project.accent}CC` : 'rgba(255, 255, 240, 0.24)',
                            background:
                              hoveredProject === project.title
                                ? `linear-gradient(135deg, rgba(255, 255, 240, 0.2), ${project.accentSoft})`
                                : 'linear-gradient(135deg, rgba(255, 255, 240, 0.12), rgba(255, 255, 240, 0.03))',
                            boxShadow:
                              hoveredProject === project.title
                                ? `0 0 0 1px ${project.accent}40, 0 18px 35px -25px ${project.accent}B0`
                                : '0 10px 30px -24px rgba(0, 0, 0, 0.7)',
                          }}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleNavClick('projects-showcase');
                            }
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-[#FFFFF0]/5 via-transparent to-transparent"
                            initial={{ x: '-100%', opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            style={{ willChange: 'transform, opacity' }}
                          />

                          <div className="relative">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-mono-ui text-xs uppercase tracking-wider" style={{ color: `${project.accent}CC` }}>
                                    {project.category}
                                  </span>
                                  {project.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="font-mono-ui rounded-full border px-2 py-0.5 text-[10px]"
                                      style={{
                                        borderColor: `${project.accent}66`,
                                        color: `${project.accent}CC`,
                                      }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <h4 className="font-fliege text-2xl text-[#FFFFF0] transition-colors duration-300 lg:text-3xl" style={{ color: hoveredProject === project.title ? project.accent : '#FFFFF0' }}>
                                  {project.title}
                                </h4>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                <motion.a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFFFF0]/40 bg-[#FFFFF0]/12 text-[#FFFFF0] transition-all duration-300"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    willChange: 'transform',
                                    borderColor: hoveredProject === project.title ? `${project.accent}D9` : undefined,
                                    backgroundColor: hoveredProject === project.title ? `${project.accent}2E` : undefined,
                                  }}
                                >
                                  <ExternalLink className="h-4 w-4 transition-colors duration-300" strokeWidth={2} style={{ color: hoveredProject === project.title ? '#FFFFF0' : '#FFF8EE' }} />
                                </motion.a>
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#FFFFF0]/40 bg-[#FFFFF0]/12 text-[#FFFFF0] transition-all duration-300"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  style={{
                                    willChange: 'transform',
                                    borderColor: hoveredProject === project.title ? `${project.accent}D9` : undefined,
                                    backgroundColor: hoveredProject === project.title ? `${project.accent}2E` : undefined,
                                  }}
                                >
                                  <Github className="h-4 w-4 transition-colors duration-300" strokeWidth={2} style={{ color: hoveredProject === project.title ? '#FFFFF0' : '#FFF8EE' }} />
                                </motion.a>
                              </div>
                            </div>

                            <p className="font-bodycopy text-sm text-[#FFFFF0]/70 transition-colors duration-300 group-hover:text-[#FFFFF0] mt-3">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                              {project.techStack.map((tech) => {
                                const TechIcon = tech.icon;
                                return (
                                  <motion.div
                                    key={tech.name}
                                    className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    title={tech.name}
                                    style={{
                                      borderColor: hoveredProject === project.title ? `${tech.color}BF` : 'rgba(255,255,240,0.22)',
                                      backgroundColor: hoveredProject === project.title ? `${tech.color}33` : 'rgba(255,255,240,0.1)',
                                    }}
                                  >
                                    <TechIcon className="h-3 w-3" style={{ color: hoveredProject === project.title ? '#FFFFF0' : tech.color }} />
                                    <span className="font-mono-ui text-xs text-[#FFFFF0]/90">
                                      {tech.name}
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </div>

                            <motion.div 
                              className="mt-4 h-0.5 rounded-full transition-all duration-500"
                              style={{ 
                                background: `linear-gradient(90deg, ${project.accent}, #DF6C4F, transparent)`,
                                width: hoveredProject === project.title ? '100%' : '20%'
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      variants={itemVariants}
                      onClick={() => handleNavClick('projects-showcase')}
                      className="font-ui group mt-6 flex items-center gap-2 text-sm text-[#FF9398] transition-all duration-300 hover:text-[#FFFFF0] hover:gap-3"
                    >
                      <span>View all projects</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  variants={itemVariants}
                  className="mt-16 border-t border-[#FFFFF0]/10 pt-8 lg:mt-24"
                >
                  <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center lg:w-auto">
                      <span className="font-caption text-sm text-[#FFFFF0]/70 flex items-center gap-2">
                        <Sparkles size={14} className="text-[#FF9398]" />
                        Stay updated
                      </span>
                      <motion.div
                        className="flex w-full items-center gap-3 rounded-full border-2 border-[#FFFFF0]/20 bg-[#FFFFF0]/5 px-5 py-3 shadow-[0_0_20px_rgba(255,147,152,0.1)] transition-all duration-300 focus-within:border-[#FF9398] focus-within:bg-[#FFFFF0]/10 sm:w-auto"
                        whileFocus={{ scale: 1.01 }}
                        style={{ willChange: 'transform' }}
                      >
                        <Mail className="h-4 w-4 text-[#FF9398]" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="font-bodycopy w-full bg-transparent text-sm text-[#FFFFF0] placeholder:text-[#FFFFF0]/30 focus:outline-none sm:w-48"
                          aria-label="Email for updates"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-[#FF9398] transition-colors hover:text-[#FFFFF0]"
                          aria-label="Submit email"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { icon: Twitter, label: 'Twitter', href: SOCIAL_LINKS.x, color: '#FF9398' },
                        { icon: Linkedin, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, color: '#DF6C4F' },
                        { icon: Github, label: 'GitHub', href: SOCIAL_LINKS.github, color: '#452215' },
                      ].map(({ icon: Icon, label, href, color }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#FFFFF0]/20 shadow-[2px_2px_0_#8F5E41] transition-all duration-300 hover:border-[#FF9398] hover:shadow-[4px_4px_0_#8F5E41]"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={label}
                          style={{ willChange: 'transform' }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: color }}
                            initial={{ y: '100%' }}
                            whileHover={{ y: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          />

                          <Icon className="relative z-10 h-5 w-5 text-[#FFFFF0]/60 transition-colors duration-300 group-hover:text-[#452215]" strokeWidth={1.5} />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-[#FFFFF0]/40 sm:flex-row sm:items-center">
                    <motion.span
                      whileHover={{ color: '#FF9398' }}
                      className="transition-colors cursor-default"
                    >
                      © 2026 Harshit. All rights reserved.
                    </motion.span>
                    <motion.span 
                      className="font-ui flex items-center gap-2"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF9398]" />
                      Available for freelance work
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});