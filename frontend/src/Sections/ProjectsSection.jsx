import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye, FileText, Github, X } from 'lucide-react';

const PROJECTS = [
  {
    title: 'PrioSync',
    description: 'Priority-focused productivity experience deployed for real-time usage.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://prio-sync.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/PrioSync',
  },
  {
    title: 'SkyX',
    description: 'Production web app shipped with an interactive front-end workflow.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://skyx-v2-0.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/SKYX-V2.0',
  },
  {
    title: 'MovieMagic',
    description: 'Deployed movie experience with live interactions and public codebase.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://moveismagicchatbot.onrender.com',
    githubUrl: 'https://github.com/singhharshitt/MoveisMagicChatbot',
  },
  {
    title: 'InkDrop',
    description: 'Published application with structured UX and production hosting.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://inkdrop-v2-0.onrender.com',
    githubUrl: 'https://github.com/singhharshitt/Inkdrop-V2.0',
  },
  {
    title: 'WhiskandBloom',
    description: 'Recipe-focused deployed interface with responsive content delivery.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://wishk-and-bloom-the-recipie-page.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/Whisk-Bloom',
  },
  {
    title: 'SwapVerse',
    description: 'Live web deployment optimized for direct, public user access.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://swappverse.netlify.app',
    githubUrl: 'https://github.com/singhharshitt/SwapVerse',
  },
  {
    title: 'GrabDesk',
    description: 'Production-ready platform with real-time deployment and repository.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://grabdesk.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/grabdesk',
  },
];

const ActionButton = ({ href, icon: Icon, label, variant = 'primary', onClick }) => {
  const isExternal = href?.startsWith('http');
  const baseClass =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300';
  const variantClass =
    variant === 'primary'
      ? 'border border-[#452215] bg-[#452215] text-[#FFFBEB] hover:bg-[#5D0D18]'
      : variant === 'secondary'
      ? 'border border-[#8F5E41] bg-[#E8D7C8] text-[#452215] hover:bg-[#DDC8B4]'
      : 'border border-[#452215]/35 bg-transparent text-[#452215] hover:border-[#452215] hover:bg-[#452215]/5';

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={`${baseClass} ${variantClass}`}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
      >
        <Icon size={16} className="transition-transform duration-300 group-hover:rotate-6" />
        {label}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${baseClass} ${variantClass}`}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      <Icon size={16} className="transition-transform duration-300 group-hover:rotate-6" />
      {label}
    </motion.a>
  );
};

const ProjectCard = ({ project, index, onOpenPreview, onOpenCaseStudy }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.9]);

  const smoothY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.4 });
  const smoothScale = useSpring(scale, { stiffness: 140, damping: 30, mass: 0.4 });
  const smoothOpacity = useSpring(opacity, { stiffness: 120, damping: 24, mass: 0.4 });

  return (
    <motion.article
      ref={cardRef}
      className="relative"
      style={{ y: smoothY, scale: smoothScale, opacity: smoothOpacity }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="h-full rounded-2xl border-2 border-[#452215] bg-[#FFF8EE] p-6 lg:p-7 shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1">
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold text-[#1a1a1a] font-fliege lg:text-3xl">{project.title}</h3>
              <span className="shrink-0 rounded-full bg-[#452215]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#452215]">
                {project.date}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#1a1a1a]/70">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.title}-${tag}`}
                className="rounded-full border border-[#8F5E41]/40 bg-[#8F5E41]/10 px-3 py-1 text-xs font-medium text-[#452215]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <ActionButton icon={Eye} label="Live Preview" variant="primary" onClick={() => onOpenPreview(project)} />
            <ActionButton href={project.githubUrl} icon={Github} label="GitHub" variant="outline" />
            <ActionButton icon={FileText} label="Case Study" variant="secondary" onClick={() => onOpenCaseStudy(project)} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const LivePreviewOverlay = ({ project, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [frameKey, setFrameKey] = useState(0);

  useEffect(() => {
    if (isLoaded || isBlocked) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setIsBlocked(true);
    }, 7000);

    return () => window.clearTimeout(timeout);
  }, [isLoaded, isBlocked, frameKey]);

  const retryPreview = () => {
    setIsLoaded(false);
    setIsBlocked(false);
    setFrameKey((current) => current + 1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-[#1a1a1a]/55 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} live preview`}
    >
      <motion.div
        className="mx-auto mt-6 flex h-[88vh] w-[96vw] max-w-6xl flex-col overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFF8EE] shadow-[8px_8px_0_#8F5E41]"
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#452215]/20 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8F5E41]">Live Preview</p>
            <h3 className="text-xl font-bold text-[#1a1a1a] sm:text-2xl">{project.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <ActionButton href={project.liveUrl} icon={ArrowUpRight} label="Open Live" variant="secondary" />
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close live preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#452215]/35 text-[#452215] transition-colors hover:bg-[#452215]/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>

        <div className="relative flex-1 bg-white">
          {!isBlocked && (
            <iframe
              key={`${project.title}-${frameKey}`}
              src={project.liveUrl}
              title={`${project.title} site preview`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full border-0"
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setIsLoaded(false);
                setIsBlocked(true);
              }}
            />
          )}

          {!isLoaded && !isBlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a1a1a]/65 text-[#FFFBEB]">
              <span className="inline-flex h-8 w-8 animate-spin rounded-full border-2 border-[#FFFBEB]/35 border-t-[#FFFBEB]" />
              <p className="text-sm font-medium tracking-wide">Booting real-time preview...</p>
            </div>
          )}

          {isBlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#1a1a1a]/78 px-6 text-center text-[#FFFBEB]">
              <p className="max-w-md text-sm font-medium">
                This deployment blocks embedded previews. Open the live site directly or retry.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  type="button"
                  onClick={retryPreview}
                  className="rounded-full border border-[#FFFBEB]/45 px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-[#FFFBEB]/10"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Retry
                </motion.button>
                <ActionButton href={project.liveUrl} icon={ArrowUpRight} label="Open Live Site" variant="secondary" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const buildCaseStudy = (project) => ({
  challenge: `Create a production-ready experience for ${project.title} with clean interaction flow and stable deployment.`,
  approach: `Structured the interface into reusable sections, then paired deployment and source control for transparent delivery.`,
  outcome: `The project is publicly accessible via live URL with code available for review and iteration.`,
});

const CaseStudyOverlay = ({ project, onClose }) => {
  const caseStudy = buildCaseStudy(project);

  return (
    <motion.div
      className="fixed inset-0 z-[95] bg-[#1a1a1a]/45 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.aside
        className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l-2 border-[#452215] bg-[#FFFBEB] p-6 shadow-[-8px_0_0_#8F5E41] sm:p-8"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8F5E41]">Case Study</p>
            <h3 className="mt-1 text-2xl font-bold text-[#1a1a1a] sm:text-3xl">{project.title}</h3>
          </div>
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#452215]/35 text-[#452215] transition-colors hover:bg-[#452215]/10"
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={19} />
          </motion.button>
        </div>

        <div className="space-y-6">
          <section className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#452215]">Project Summary</h4>
            <p className="leading-relaxed text-[#1a1a1a]/75">{project.description}</p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#452215]">Challenge</h4>
            <p className="leading-relaxed text-[#1a1a1a]/75">{caseStudy.challenge}</p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#452215]">Approach</h4>
            <p className="leading-relaxed text-[#1a1a1a]/75">{caseStudy.approach}</p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#452215]">Outcome</h4>
            <p className="leading-relaxed text-[#1a1a1a]/75">{caseStudy.outcome}</p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#452215]">Tech Stack Tags</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={`${project.title}-overlay-${tag}`}
                  className="rounded-full border border-[#8F5E41]/35 bg-[#8F5E41]/10 px-3 py-1 text-xs font-medium text-[#452215]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap gap-3 pt-2">
            <ActionButton href={project.liveUrl} icon={ArrowUpRight} label="Visit Live" variant="primary" />
            <ActionButton href={project.githubUrl} icon={Github} label="View GitHub" variant="outline" />
          </section>
        </div>
      </motion.aside>
    </motion.div>
  );
};

const HorizontalScrollGallery = ({ onOpenPreview, onOpenCaseStudy }) => {
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
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <div className="absolute -top-20 right-0 z-10 hidden gap-2 lg:flex">
        <motion.button
          onClick={() => scroll('left')}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
            canScrollLeft
              ? 'border-[#5D0D18] text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB]'
              : 'cursor-not-allowed border-[#5D0D18]/20 text-[#5D0D18]/20'
          }`}
          whileHover={canScrollLeft ? { scale: 1.1 } : {}}
          whileTap={canScrollLeft ? { scale: 0.9 } : {}}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={() => scroll('right')}
          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
            canScrollRight
              ? 'border-[#5D0D18] text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB]'
              : 'cursor-not-allowed border-[#5D0D18]/20 text-[#5D0D18]/20'
          }`}
          whileHover={canScrollRight ? { scale: 1.1 } : {}}
          whileTap={canScrollRight ? { scale: 0.9 } : {}}
          disabled={!canScrollRight}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 lg:grid lg:grid-cols-2 lg:overflow-visible"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROJECTS.map((project, index) => (
          <div key={project.title} className="w-[85vw] shrink-0 snap-center sm:w-[60vw] lg:w-auto">
            <ProjectCard
              project={project}
              index={index}
              onOpenPreview={onOpenPreview}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const [activePreviewProject, setActivePreviewProject] = useState(null);
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!activePreviewProject && !activeCaseStudyProject) {
      return undefined;
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setActivePreviewProject(null);
        setActiveCaseStudyProject(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  }, [activePreviewProject, activeCaseStudyProject]);

  const openPreview = (project) => {
    setActiveCaseStudyProject(null);
    setActivePreviewProject(project);
  };

  const openCaseStudy = (project) => {
    setActivePreviewProject(null);
    setActiveCaseStudyProject(project);
  };

  return (
    <section id="projects-showcase" className="relative min-h-screen w-full overflow-hidden bg-[#FFFBEB] py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-20 top-40 h-96 w-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div ref={headerRef} className="mb-16 lg:mb-20" style={{ y: headerY, opacity: headerOpacity }}>
          <motion.span
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#9FB2AC]"
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
            className="font-fliege text-4xl font-bold text-[#1a1a1a] sm:text-5xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Projects With <span className="italic text-[#5D0D18]">Impact</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl text-lg text-[#1a1a1a]/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A curated selection of projects that demonstrate technical depth, design excellence, and real-world
            problem solving.
          </motion.p>
        </motion.div>

        <HorizontalScrollGallery onOpenPreview={openPreview} onOpenCaseStudy={openCaseStudy} />

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
            className="inline-flex items-center gap-3 rounded-full bg-[#5D0D18] px-8 py-4 text-lg font-medium text-[#FFFBEB] transition-all hover:shadow-xl hover:shadow-[#5D0D18]/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View All Projects on GitHub
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      <AnimatePresence>
        {activePreviewProject ? (
          <LivePreviewOverlay
            key={`preview-${activePreviewProject.title}`}
            project={activePreviewProject}
            onClose={() => setActivePreviewProject(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeCaseStudyProject ? (
          <CaseStudyOverlay
            key={`case-study-${activeCaseStudyProject.title}`}
            project={activeCaseStudyProject}
            onClose={() => setActiveCaseStudyProject(null)}
          />
        ) : null}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
