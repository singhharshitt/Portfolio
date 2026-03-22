import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from '../utils/motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye, FileText, Github, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectSlug } from '../utils/projectSlug';
import { SOCIAL_LINKS } from '../constants/socialLinks';
import SwapVerse from '../assets/swapverse.png';
import PrioSync from '../assets/PrioSync.png';
import SkyX from '../assets/SKYX.png';
import mm from '../assets/mm.png';
import InkDrop from '../assets/inkdrop.png';
import WhiskandBloom from '../assets/whiskandbloom.png';
import GrabDesk from '../assets/Grabdesk.png';

import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiAmazonwebservices,
  SiVercel,
  SiGithubactions,
  SiPrisma,
  SiRedis,
  SiGraphql,
  SiSocketdotio,
  SiKubernetes,
  SiTerraform
} from 'react-icons/si';

// Project images (using placeholder images - replace with actual image URLs)
const PROJECT_IMAGES = {
  PrioSync: PrioSync,
  SkyX: SkyX,
  MovieMagic: mm,
  InkDrop: InkDrop,
  WhiskandBloom: WhiskandBloom,
  SwapVerse: SwapVerse,
  GrabDesk: GrabDesk,
};

// Tech stack for each project
const PROJECT_TECH_STACK = {
  PrioSync: [
    { name: 'React', icon: SiReact, color: '#452215' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#DF6C4F' },
    { name: 'Express', icon: SiExpress, color: '#FF9398' },
    { name: 'MongoDB', icon: SiMongodb, color: '#452215' },
  ],
  SkyX: [
    { name: 'JavaScript', icon: SiJavascript, color: '#DF6C4F' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#FF9398' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#452215' },
    { name: 'Express', icon: SiExpress, color: '#DF6C4F' },
  ],
  MovieMagic: [
    { name: 'HTML5', icon: SiHtml5, color: '#FF9398' },
    { name: 'CSS3', icon: SiCss3, color: '#452215' },
    { name: 'JavaScript', icon: SiJavascript, color: '#DF6C4F' },
    { name: 'Flask/Python', icon: SiPython, color: '#FF9398' },
  ],
  InkDrop: [
    { name: 'React', icon: SiReact, color: '#452215' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#DF6C4F' },
    { name: 'Express', icon: SiExpress, color: '#FF9398' },
    { name: 'MongoDB', icon: SiMongodb, color: '#452215' },
  ],
  WhiskandBloom: [
    { name: 'React', icon: SiReact, color: '#DF6C4F' },
    { name: 'TypeScript', icon: SiTypescript, color: '#FF9398' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#452215' },
    { name: 'Vercel', icon: SiVercel, color: '#DF6C4F' },
  ],
  SwapVerse: [
    { name: 'React', icon: SiReact, color: '#FF9398' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#452215' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#452215' },
    { name: 'Ethers.js', icon: SiNodedotjs, color: '#DF6C4F' },
  ],
  GrabDesk: [
    { name: 'React', icon: SiReact, color: '#452215' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#DF6C4F' },
    { name: 'Express', icon: SiExpress, color: '#FF9398' },
    { name: 'MongoDB', icon: SiMongodb, color: '#452215' },
  ],
};

export const PROJECTS = [
  {
    title: 'PrioSync',
    description: 'Priority-focused productivity experience deployed for real-time usage.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://prio-sync.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/PrioSync',
    image: PROJECT_IMAGES.PrioSync,
    techStack: PROJECT_TECH_STACK.PrioSync,
  },
  {
    title: 'SkyX',
    description: 'Production web app shipped with an interactive front-end workflow.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://skyx-v2-0.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/SKYX-V2.0',
    image: PROJECT_IMAGES.SkyX,
    techStack: PROJECT_TECH_STACK.SkyX,
  },
  {
    title: 'MovieMagic',
    description: 'Deployed movie experience with live interactions and public codebase.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://moveismagicchatbot.onrender.com',
    githubUrl: 'https://github.com/singhharshitt/MoveisMagicChatbot',
    image: PROJECT_IMAGES.MovieMagic,
    techStack: PROJECT_TECH_STACK.MovieMagic,
  },
  {
    title: 'InkDrop',
    description: 'Published application with structured UX and production hosting.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://inkdrop-v2-0.onrender.com',
    githubUrl: 'https://github.com/singhharshitt/Inkdrop-V2.0',
    image: PROJECT_IMAGES.InkDrop,
    techStack: PROJECT_TECH_STACK.InkDrop,
  },
  {
    title: 'WhiskandBloom',
    description: 'Recipe-focused deployed interface with responsive content delivery.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://wishk-and-bloom-the-recipie-page.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/Whisk-Bloom',
    image: PROJECT_IMAGES.WhiskandBloom,
    techStack: PROJECT_TECH_STACK.WhiskandBloom,
  },
  {
    title: 'SwapVerse',
    description: 'Live web deployment optimized for direct, public user access.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://swappverse.netlify.app',
    githubUrl: 'https://github.com/singhharshitt/SwapVerse',
    image: PROJECT_IMAGES.SwapVerse,
    techStack: PROJECT_TECH_STACK.SwapVerse,
  },
  {
    title: 'GrabDesk',
    description: 'Production-ready platform with real-time deployment and repository.',
    tags: ['Live', 'Preview', 'Deployed'],
    date: 'Production',
    liveUrl: 'https://grabdesk.vercel.app/',
    githubUrl: 'https://github.com/singhharshitt/grabdesk',
    image: PROJECT_IMAGES.GrabDesk,
    techStack: PROJECT_TECH_STACK.GrabDesk,
  },
];

const INITIAL_VISIBLE = 4;

const ActionButton = memo(function ActionButton({ href, icon: Icon, label, variant = 'primary', onClick }) {
  const isExternal = href?.startsWith('http');
  const baseClass = 'font-ui group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm tracking-[0.08em] transition-all duration-300';
  const variantClass =
    variant === 'primary'
      ? 'border border-[#DF6C4F] bg-[#DF6C4F] text-[#FFFFF0] hover:border-[#FF9398] hover:bg-[#FF9398] hover:text-[#452215]'
      : variant === 'secondary'
        ? 'border border-[#FFF8EE] bg-[#FFFFF0] text-[#452215] hover:border-[#FF9398] hover:bg-[#FFF8EE] hover:text-[#DF6C4F]'
        : 'border border-[#FFF8EE] bg-transparent text-[#452215] hover:border-[#DF6C4F] hover:bg-[#FFFFF0] hover:text-[#DF6C4F]';

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
});

const ProjectCard = memo(function ProjectCard({ project, index, onOpenPreview, onOpenCaseStudy }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="h-full rounded-2xl border-2 border-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] bg-[#FFFFF0] p-6">
        <div className="flex h-full flex-col gap-6">
          {/* Project Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-[#452215] bg-[#FFF8EE]">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#452215]/20 to-transparent" />
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-ui text-2xl text-[#452215] lg:text-3xl">{project.title}</h3>
              <span className="font-mono-ui shrink-0 rounded-full border border-[#FFF8EE] bg-[#FFF8EE] px-3 py-1 text-xs tracking-wide text-[#452215]">
                {project.date}
              </span>
            </div>
            <p className="font-bodycopy text-sm leading-relaxed text-[#452215]">{project.description}</p>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap items-center gap-3">
            {project.techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="group/tech relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#452215] bg-[#FFFFF0] transition-all duration-300 hover:scale-110"
                  style={{ borderColor: tech.color }}
                >
                  <Icon size={16} style={{ color: tech.color }} />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#452215] px-2 py-1 text-[10px] text-[#FFFFF0] opacity-0 transition-opacity group-hover/tech:opacity-100">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={`${project.title}-${tag}`}
                className="font-mono-ui rounded-full border border-[#DF6C4F]/20 bg-[#FFFFF0] px-3 py-1 text-xs text-[#DF6C4F]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <ActionButton icon={Eye} label="Live Preview" variant="primary" onClick={() => onOpenPreview(project)} />
            <ActionButton href={project.githubUrl} icon={Github} label="GitHub" variant="outline" />
            <ActionButton icon={FileText} label="Read Case Study" variant="secondary" onClick={() => onOpenCaseStudy(project)} />
          </div>
        </div>
      </div>
    </motion.article>
  );
});

const LivePreviewOverlay = memo(function LivePreviewOverlay({ project, onClose }) {
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

  const retryPreview = useCallback(() => {
    setIsLoaded(false);
    setIsBlocked(false);
    setFrameKey((current) => current + 1);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-90 bg-[#452215]/45 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} live preview`}
    >
      <motion.div
        className="mx-auto mt-6 flex h-[88vh] w-[96vw] max-w-6xl flex-col overflow-hidden rounded-2xl border-2 border-[#452215] shadow-[4px_4px_0_#8F5E41] bg-[#FFFFF0]"
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#FFF8EE] px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-[#DF6C4F]">Live Preview</p>
            <h3 className="font-ui text-xl text-[#452215] sm:text-2xl">{project.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <ActionButton href={project.liveUrl} icon={ArrowUpRight} label="Open Live" variant="secondary" />
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close live preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FFF8EE] text-[#452215] transition-colors hover:bg-[#FFF8EE]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>

        <div className="relative flex-1 bg-[#FFFFF0]">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#452215]/72 text-[#FFFFF0]">
              <span className="inline-flex h-8 w-8 animate-spin rounded-full border-2 border-[#FFFFF0]/35 border-t-[#FFFFF0]" />
              <p className="font-ui text-sm tracking-wide">Booting real-time preview...</p>
            </div>
          )}

          {isBlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#452215]/82 px-6 text-center text-[#FFFFF0]">
              <p className="font-bodycopy max-w-md text-sm">
                This deployment blocks embedded previews. Open the live site directly or retry.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.button
                  type="button"
                  onClick={retryPreview}
                  className="font-ui rounded-full border border-[#FFFFF0]/45 px-4 py-2 text-xs uppercase tracking-wide hover:bg-[#FFFFF0]/10"
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
});

/* ─────────────────────────────────────────────
   CASE STUDY OVERLAY
   ───────────────────────────────────────────── */
const buildCaseStudy = (project) => ({
  challenge: `Create a production-ready experience for ${project.title} with clean interaction flow and stable deployment.`,
  approach: 'Structured the interface into reusable sections, then paired deployment and source control for transparent delivery.',
  outcome: 'The project is publicly accessible via live URL with code available for review and iteration.',
});

const CaseStudyOverlay = memo(function CaseStudyOverlay({ project, onClose }) {
  const caseStudy = buildCaseStudy(project);

  return (
    <motion.div
      className="fixed inset-0 z-95 bg-[#452215]/45 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.aside
        className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l-2 border-[#452215] bg-[#FFFFF0] p-6 sm:p-8"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-[#DF6C4F]">Case Study</p>
            <h3 className="font-ui mt-1 text-2xl text-[#452215] sm:text-3xl">{project.title}</h3>
          </div>
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#FFF8EE] text-[#452215] transition-colors hover:bg-[#FFF8EE]"
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={19} />
          </motion.button>
        </div>

        <div className="space-y-6">
          <section className="space-y-2">
            <h4 className="font-ui text-sm uppercase tracking-wide text-[#452215]">Project Summary</h4>
            <p className="font-bodycopy leading-relaxed text-[#452215]">{project.description}</p>
          </section>

          <section className="space-y-3">
            <h4 className="font-ui text-sm uppercase tracking-wide text-[#452215]">Tech Stack</h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 rounded-full border border-[#452215] bg-[#FFFFF0] px-3 py-1.5"
                  >
                    <Icon size={14} style={{ color: tech.color }} />
                    <span className="font-mono-ui text-xs text-[#452215]">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="font-ui text-sm uppercase tracking-wide text-[#452215]">Challenge</h4>
            <p className="font-bodycopy leading-relaxed text-[#452215]">{caseStudy.challenge}</p>
          </section>

          <section className="space-y-3">
            <h4 className="font-ui text-sm uppercase tracking-wide text-[#452215]">Approach</h4>
            <p className="font-bodycopy leading-relaxed text-[#452215]">{caseStudy.approach}</p>
          </section>

          <section className="space-y-3">
            <h4 className="font-ui text-sm uppercase tracking-wide text-[#452215]">Outcome</h4>
            <p className="font-bodycopy leading-relaxed text-[#452215]">{caseStudy.outcome}</p>
          </section>

          <section className="flex flex-wrap gap-3 pt-2">
            <ActionButton href={project.liveUrl} icon={ArrowUpRight} label="Visit Live" variant="primary" />
            <ActionButton href={project.githubUrl} icon={Github} label="View GitHub" variant="outline" />
          </section>
        </div>
      </motion.aside>
    </motion.div>
  );
});

const HorizontalScrollGallery = memo(function HorizontalScrollGallery({ onOpenPreview, onOpenCaseStudy }) {
  const containerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_VISIBLE);
  const hasMore = PROJECTS.length > INITIAL_VISIBLE;

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const nextCanScrollLeft = scrollLeft > 0;
      const nextCanScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
      setCanScrollLeft((current) => (current === nextCanScrollLeft ? current : nextCanScrollLeft));
      setCanScrollRight((current) => (current === nextCanScrollRight ? current : nextCanScrollRight));
    }
  }, []);

  const scheduleCheckScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      checkScroll();
    });
  }, [checkScroll]);

  const scroll = useCallback((direction) => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scheduleCheckScroll();
    window.addEventListener('resize', scheduleCheckScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', scheduleCheckScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [scheduleCheckScroll]);

  useEffect(() => {
    scheduleCheckScroll();
  }, [showAll, scheduleCheckScroll]);

  // Re-check scroll state when visible projects change
  useEffect(() => {
    checkScroll();
  }, [showAll, checkScroll]);

  return (
    <div>
      <div className="relative">
        <div className="absolute -top-20 right-0 z-10 hidden gap-2 lg:flex">
          <motion.button
            onClick={() => scroll('left')}
            aria-label="Scroll projects left"
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${canScrollLeft ? 'border-[#452215] text-[#452215] hover:border-[#DF6C4F] hover:bg-[#DF6C4F] hover:text-[#FFFFF0]' : 'cursor-not-allowed border-[#FFF8EE] text-[#FFF8EE]'}`}
            whileHover={canScrollLeft ? { scale: 1.1 } : {}}
            whileTap={canScrollLeft ? { scale: 0.9 } : {}}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            aria-label="Scroll projects right"
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${canScrollRight ? 'border-[#452215] text-[#452215] hover:border-[#DF6C4F] hover:bg-[#DF6C4F] hover:text-[#FFFFF0]' : 'cursor-not-allowed border-[#FFF8EE] text-[#FFF8EE]'}`}
            whileHover={canScrollRight ? { scale: 1.1 } : {}}
            whileTap={canScrollRight ? { scale: 0.9 } : {}}
            disabled={!canScrollRight}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        <div
          ref={containerRef}
          onScroll={scheduleCheckScroll}
          className="scrollbar-hide relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 lg:grid lg:grid-cols-2 lg:overflow-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {visibleProjects.map((project, index) => (
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

      {hasMore && (
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="font-ui inline-flex items-center gap-2 rounded-full border border-[#452215] px-7 py-3 text-sm text-[#452215] transition-all duration-300 hover:border-[#DF6C4F] hover:bg-[#DF6C4F] hover:text-[#FFFFF0]"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            aria-expanded={showAll}
          >
            {showAll ? 'Show Less' : `View More Projects (${PROJECTS.length - INITIAL_VISIBLE} more)`}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
});

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */
export default memo(function ProjectsSection() {
  const navigate = useNavigate();
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

  const closePreview = useCallback(() => setActivePreviewProject(null), []);
  const closeCaseStudy = useCallback(() => setActiveCaseStudyProject(null), []);
  const openPreview = useCallback((project) => {
    setActiveCaseStudyProject(null);
    setActivePreviewProject(project);
  }, []);
  const openCaseStudy = useCallback((project) => {
    setActivePreviewProject(null);
    setActiveCaseStudyProject(null);
    navigate(`/case-study/${getProjectSlug(project.title)}`);
  }, [navigate]);

  return (
    <section id="projects-showcase" className="relative min-h-screen w-full overflow-hidden bg-[#FFFFF0] py-20 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-20 top-40 h-96 w-96 rounded-full bg-[#FFF8EE] blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div ref={headerRef} className="relative mb-16 lg:mb-20" style={{ y: headerY, opacity: headerOpacity }}>
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="h-px bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            Selected Work
            <motion.span
              className="h-px bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              viewport={{ once: true }}
            />
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Projects With <span className="italic text-[#DF6C4F]">Impact</span>
          </motion.h2>

          <motion.p
            className="font-bodycopy mt-6 max-w-2xl text-lg text-[#452215]"
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
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui inline-flex items-center gap-3 rounded-full bg-[#DF6C4F] px-8 py-4 text-lg text-[#FFFFF0] transition-all hover:bg-[#FF9398] hover:text-[#452215]"
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
            onClose={closePreview}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeCaseStudyProject ? (
          <CaseStudyOverlay
            key={`case-study-${activeCaseStudyProject.title}`}
            project={activeCaseStudyProject}
            onClose={closeCaseStudy}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
});
