import { useEffect } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { ArrowRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const mainNavItems = [
  { label: 'Work', section: 'projects-showcase', description: 'Selected projects' },
  { label: 'About', section: 'about', description: 'My story' },
  { label: 'Tech Stack', section: 'techstack', description: 'What I use' },
  { label: 'Interests', section: 'interests', description: 'What drives me' },
  { label: 'Journey', section: 'timeline', description: 'My path' },
  { label: 'Connect', section: 'connect', description: 'Get in touch' },
];

const secondaryNavItems = [
  { label: 'Blog', section: 'blog' },
];

const featuredProjects = [
  {
    title: 'E-Commerce Platform',
    category: 'Project',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  },
  {
    title: 'Mobile Banking App',
    category: 'Project',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
  },
  {
    title: 'Design System',
    category: 'Project',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    y: 40,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const slideUpVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function MenuOverlay({ isOpen, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (section) => {
    onNavigate(section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 h-dvh"
          aria-hidden={!isOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              variants={slideUpVariants}
              className="absolute inset-0 bg-[#452215]"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="absolute inset-x-0 bottom-0 top-[40%] bg-[#DF6C4F]"
              style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }}
            />

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute left-0 right-0 top-1/3 h-px bg-[#FF9398]/50 origin-left"
            />
          </div>

          <div className="relative h-full overflow-y-auto overscroll-contain">
            <div className="flex min-h-full flex-col px-6 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
              <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                  <motion.div
                    className="space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <nav className="space-y-1" aria-label="Main navigation">
                      {mainNavItems.map((item, index) => (
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
                              className="absolute inset-0 rounded-lg bg-[#FFFFF0]/10"
                              initial={{ scaleX: 0, opacity: 0 }}
                              whileHover={{ scaleX: 1, opacity: 1 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              style={{ originX: 0 }}
                            />

                            <div className="relative flex items-center justify-between px-4">
                              <div className="flex flex-col">
                                <span className="font-fliege text-4xl text-[#FFFFF0] transition-all duration-500 group-hover:translate-x-3 group-hover:text-[#FF9398] sm:text-5xl lg:text-6xl">
                                  {item.label}
                                </span>
                                <span className="font-caption mt-1 translate-y-2 text-sm tracking-wide text-[#FFF8EE]/70 opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                  {item.description}
                                </span>
                              </div>

                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                                className="text-[#FF9398]"
                              >
                                <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1} />
                              </motion.div>
                            </div>

                            <span className="font-mono-ui absolute left-0 top-1/2 -translate-y-1/2 text-sm text-[#FFFFF0]/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              0{index + 1}
                            </span>
                          </button>
                        </motion.div>
                      ))}
                    </nav>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-4 border-t border-[#FFFFF0]/10 pt-8"
                    >
                      <motion.button
                        onClick={() => handleNavClick('connect')}
                        className="group relative overflow-hidden rounded-full px-8 py-4 text-sm font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-[#FFFFF0]" />
                        <div className="absolute inset-0 scale-x-0 bg-[#FF9398] transition-transform duration-500 group-hover:scale-x-100" style={{ transformOrigin: 'left' }} />
                        <span className="font-ui relative z-10 flex items-center gap-3 text-[#452215]">
                          <Mail className="h-4 w-4" />
                          <span className="group-hover:hidden">Get in Touch</span>
                          <span className="hidden group-hover:inline">hello@harshit.dev</span>
                        </span>
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
                            className="absolute bottom-0 left-0 right-0 h-px bg-[#FF9398]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>

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
                      <span className="h-px w-8 bg-[#FF9398]" />
                      Featured Work
                    </motion.h3>

                    <div className="space-y-4">
                      {featuredProjects.map((project) => (
                        <motion.div
                          key={project.title}
                          variants={itemVariants}
                          className="group relative flex cursor-pointer items-center gap-5 overflow-hidden rounded-2xl p-4 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9398]/50"
                          onClick={() => handleNavClick('projects-showcase')}
                          whileHover={{ x: 8 }}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleNavClick('projects-showcase');
                            }
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#FFFFF0]/10"
                            initial={{ x: '-100%', opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          />

                          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl ring-2 ring-[#FFFFF0]/10 transition-all duration-500 group-hover:ring-[#FF9398]/35 lg:h-28 lg:w-28">
                            <motion.img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              decoding="async"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-[#452215]/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <span className="font-ui text-xs uppercase tracking-wider text-[#FFFFF0]">View</span>
                            </div>
                          </div>

                          <div className="relative min-w-0 flex-1">
                            <span className="font-mono-ui text-xs uppercase tracking-wider text-[#FF9398]">
                              {project.category}
                            </span>
                            <h4 className="font-fliege truncate text-xl text-[#FFFFF0] transition-colors duration-300 group-hover:text-[#FF9398] lg:text-2xl">
                              {project.title}
                            </h4>
                            <div className="mt-2 h-px w-12 bg-[#FFFFF0]/20 transition-all duration-500 group-hover:w-full group-hover:bg-[#FF9398]/50" />
                          </div>

                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FFFFF0]/20 transition-all duration-300 group-hover:border-[#FF9398] group-hover:bg-[#FF9398]">
                            <ArrowRight className="h-4 w-4 text-[#FFFFF0]/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#452215]" strokeWidth={2} />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      variants={itemVariants}
                      onClick={() => handleNavClick('projects-showcase')}
                      className="font-ui group mt-6 flex items-center gap-2 text-sm text-[#FF9398] transition-colors duration-300 hover:text-[#FFFFF0]"
                    >
                      <span>View all projects</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="mt-16 border-t border-[#FFFFF0]/10 pt-8 lg:mt-24"
                >
                  <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center lg:w-auto">
                      <span className="font-caption text-sm text-[#FFFFF0]/70">Stay updated</span>
                      <motion.div
                        className="flex w-full items-center gap-3 rounded-full border border-[#FFFFF0]/20 bg-[#FFFFF0]/5 px-5 py-3 transition-all duration-300 focus-within:border-[#FF9398] focus-within:bg-[#FFFFF0]/10 sm:w-auto"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Mail className="h-4 w-4 text-[#FF9398]" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="font-bodycopy w-full bg-transparent text-sm text-[#FFFFF0] placeholder:text-[#FFFFF0]/30 focus:outline-none sm:w-48"
                          aria-label="Email for updates"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-[#FF9398] transition-colors hover:text-[#FFFFF0]"
                          aria-label="Submit email"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-2">
                      {[
                        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/singhharshitt' },
                        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/singh-harshit-' },
                        { icon: Github, label: 'GitHub', href: 'https://github.com/singhharshitt' },
                      ].map(({ icon: Icon, label, href }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#FFFFF0]/20"
                          whileHover={{ scale: 1.1, borderColor: '#FF9398' }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={label}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#FF9398]"
                            initial={{ y: '100%' }}
                            whileHover={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                          />

                          <Icon className="relative z-10 h-5 w-5 text-[#FFFFF0]/60 transition-colors duration-300 group-hover:text-[#452215]" strokeWidth={1.5} />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-[#FFFFF0]/40 sm:flex-row sm:items-center">
                    <span>© 2026 Harshit. All rights reserved.</span>
                    <span className="font-ui flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF9398]" />
                      Available for freelance work
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
