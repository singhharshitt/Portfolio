import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    title: 'GrabDesk Marketplace',
    description: 'MERN commerce platform with auth, product workflows, and analytics modules.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['MERN', 'Auth', 'Dashboard'],
    date: '2026',
    highlight: true,
    featured: true,
    liveUrl: 'https://grabdesk.vercel.app',
    githubUrl: 'https://github.com/singhharshitt/grabdesk',
    caseStudyUrl: '#case-study-grabdesk',
  },
  {
    title: 'Portfolio v3',
    description: 'Story-driven portfolio with blur reveals, parallax motion, and structured content.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Motion', 'Design System'],
    date: '2026',
    featured: true,
    liveUrl: 'https://harshit.dev',
    githubUrl: 'https://github.com/singhharshitt/portfolio-v3',
    caseStudyUrl: '#case-study-portfolio',
  },
  {
    title: 'Task Collaboration Suite',
    description: 'Role-based team planner with activity history and productivity insights.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop',
    tags: ['Node', 'MongoDB', 'JWT'],
    date: '2025',
    liveUrl: 'https://taskflow.vercel.app',
    githubUrl: 'https://github.com/singhharshitt/task-suite',
    caseStudyUrl: '#case-study-taskflow',
  },
  {
    title: 'Realtime Insights Board',
    description: 'Metric dashboard for commits, streaks, and challenge progress.',
    image: 'https://images.unsplash.com/photo-1551281044-8a29f0865f0f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Charts', 'API', 'Analytics'],
    date: '2025',
    liveUrl: 'https://insights-board.vercel.app',
    githubUrl: 'https://github.com/singhharshitt/insights',
    caseStudyUrl: '#case-study-insights',
  },
];

const ActionButton = ({ href, icon: Icon, label, variant = 'primary' }) => {
  const isExternal = href.startsWith('http');
  
  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium overflow-hidden transition-all duration-300 ${
        variant === 'primary' 
          ? 'bg-[#5D0D18] text-[#FFFBEB] hover:shadow-lg hover:shadow-[#5D0D18]/20' 
          : variant === 'secondary'
          ? 'bg-[#9FB2AC] text-[#5D0D18] hover:shadow-lg hover:shadow-[#9FB2AC]/20'
          : 'bg-transparent border-2 border-[#5D0D18]/20 text-[#5D0D18] hover:border-[#5D0D18]'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute inset-0 ${
          variant === 'primary' ? 'bg-[#9FB2AC]' : 
          variant === 'secondary' ? 'bg-[#5D0D18]' : 'bg-[#5D0D18]/5'
        }`}
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className={`relative z-10 flex items-center gap-2 ${variant === 'secondary' ? 'group-hover:text-[#FFFBEB]' : variant === 'outline' ? 'group-hover:text-[#5D0D18]' : ''}`}>
        <Icon size={16} className="transition-transform group-hover:rotate-12" />
        {label}
      </span>
    </motion.a>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const smoothY = useSpring(y, { stiffness: 120, damping: 28, mass: 0.35 });
  const smoothScale = useSpring(scale, { stiffness: 140, damping: 30, mass: 0.35 });
  const smoothOpacity = useSpring(opacity, { stiffness: 120, damping: 26, mass: 0.35 });

  return (
    <motion.article
      ref={cardRef}
      className={`relative group ${project.featured ? 'lg:col-span-2' : ''}`}
      style={{ y: smoothY, scale: smoothScale, opacity: smoothOpacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white border border-[#5D0D18]/10 shadow-lg hover:shadow-2xl hover:shadow-[#5D0D18]/10 transition-all duration-500"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Image Container */}
        <div className="relative aspect-16/10 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ y: imageY }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Subtle shine on hover */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            initial={{ x: '-120%', opacity: 0 }}
            animate={{
              x: isHovered ? '240%' : '-120%',
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: isHovered ? 0.8 : 0.4 }}
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 bg-[#5D0D18] text-[#FFFBEB] text-xs font-bold rounded-full"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Featured
            </motion.div>
          )}
          
          {/* Action Buttons Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 backdrop-blur-[1.5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-3 p-4">
              <ActionButton 
                href={project.caseStudyUrl} 
                icon={FileText} 
                label="Case Study" 
                variant="primary"
              />
              <ActionButton 
                href={project.liveUrl} 
                icon={ExternalLink} 
                label="Live Demo" 
                variant="secondary"
              />
              <ActionButton 
                href={project.githubUrl} 
                icon={Github} 
                label="GitHub" 
                variant="outline"
              />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <motion.h3 
                className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] font-fliege mb-2 group-hover:text-[#5D0D18] transition-colors"
              >
                {project.title}
              </motion.h3>
              <p className="text-[#1a1a1a]/60 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
            
            {/* Quick Link */}
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-12 h-12 rounded-full bg-[#5D0D18]/10 flex items-center justify-center text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpRight size={20} />
            </motion.a>
          </div>

          {/* Tags & Date */}
          <div className="flex items-center justify-between pt-4 border-t border-[#5D0D18]/10">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    tagIndex === 0 && project.highlight
                      ? 'bg-[#5D0D18] text-[#FFFBEB]'
                      : 'bg-[#9FB2AC]/20 text-[#5D0D18]'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * tagIndex }}
                  whileHover={{ y: -2, scale: 1.04 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <span className="text-sm text-[#9FB2AC] font-medium">{project.date}</span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

const HorizontalScrollGallery = () => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="hidden lg:flex absolute -top-20 right-0 gap-2 z-10">
        <motion.button
          onClick={() => scroll('left')}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
            canScrollLeft 
              ? 'border-[#5D0D18] text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB]' 
              : 'border-[#5D0D18]/20 text-[#5D0D18]/20 cursor-not-allowed'
          }`}
          whileHover={canScrollLeft ? { scale: 1.1 } : {}}
          whileTap={canScrollLeft ? { scale: 0.9 } : {}}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={() => scroll('right')}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
            canScrollRight 
              ? 'border-[#5D0D18] text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB]' 
              : 'border-[#5D0D18]/20 text-[#5D0D18]/20 cursor-not-allowed'
          }`}
          whileHover={canScrollRight ? { scale: 1.1 } : {}}
          whileTap={canScrollRight ? { scale: 0.9 } : {}}
          disabled={!canScrollRight}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:overflow-visible lg:grid lg:grid-cols-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROJECTS.map((project, index) => (
          <div 
            key={project.title} 
            className={`shrink-0 w-[85vw] sm:w-[60vw] lg:w-auto snap-center ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="projects-showcase" className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="mb-16 lg:mb-20"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="h-px bg-[#9FB2AC]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            Selected Work
            <motion.span
              className="h-px bg-[#9FB2AC]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              viewport={{ once: true }}
            />
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Projects With{' '}
            <span className="text-[#5D0D18] italic">Impact</span>
          </motion.h2>
          
          <motion.p 
            className="mt-6 text-lg text-[#1a1a1a]/60 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A curated selection of projects that demonstrate technical depth, design excellence, and real-world problem solving.
          </motion.p>
        </motion.div>

        {/* Projects Gallery */}
        <HorizontalScrollGallery />

        {/* View All CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/singhharshitt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#5D0D18] text-[#FFFBEB] rounded-full font-medium text-lg hover:shadow-xl hover:shadow-[#5D0D18]/20 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects on GitHub
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Add custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
