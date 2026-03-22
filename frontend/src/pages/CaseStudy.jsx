import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowUpRight, Github, Sparkles, Calendar, Clock, Zap, Star, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from '../utils/motion';
import { PROJECTS } from '../Sections/ProjectsSection';
import { getProjectSlug } from '../utils/projectSlug';
import CaseStudyMarkdownSkeleton from '../components/CaseStudyMarkdownSkeleton';
import CaseStudyMarkdownRenderer from '../components/CaseStudyMarkdownRenderer';
import CaseStudyStructuredRenderer from '../components/CaseStudyStructuredRenderer';
import {
  buildCaseStudyContent,
} from '../utils/markdownParser';
import { fetchReadmeWithCache } from '../utils/readmeService';
import { fetchLocalCaseStudyMarkdown, fetchLocalCaseStudyStructured } from '../utils/caseStudyMarkdownService';
import { updateCaseStudyMeta } from '../utils/seoMeta';
import { SOCIAL_LINKS } from '../constants/socialLinks';

function getProjectFromSlug(slug) {
  return PROJECTS.find((project) => getProjectSlug(project.title) === slug) ?? null;
}

function firstStructuredParagraph(blocks = [], skip = 0) {
  const paragraphs = blocks.filter((block) => block?.type === 'paragraph' && block?.text).map((block) => block.text.trim());
  return paragraphs[skip] || '';
}

function firstStructuredQuote(blocks = []) {
  const quote = blocks.find((block) => block?.type === 'quote' && block?.text);
  return quote?.text?.trim() || '';
}

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

function SectionCard({ title, icon: Icon, children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1 sm:p-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FF9398]/5 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#DF6C4F]/5 blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="rounded-lg border-2 border-[#452215] bg-[#FFF8EE] p-2 shadow-[2px_2px_0_#8F5E41]">
              <Icon size={20} className="text-[#DF6C4F]" />
            </div>
          )}
          <h2 className="font-ui text-2xl text-[#452215] sm:text-3xl">{title}</h2>
        </div>
        <div className="font-bodycopy space-y-3 leading-relaxed text-[#452215]">{children}</div>
      </div>

      {/* Corner Accent */}
      <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-[#FF9398]/20 rounded-br-2xl" />
    </motion.section>
  );
}

export default function CaseStudy() {
  const navigate = useNavigate();
  const { slug = '' } = useParams();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const project = useMemo(() => getProjectFromSlug(slug), [slug]);

  const { data, isPending } = useQuery({
    queryKey: ['case-study-readme', project?.githubUrl],
    queryFn: ({ signal }) => fetchReadmeWithCache(project.githubUrl, { signal }),
    enabled: Boolean(project?.githubUrl),
    staleTime: 1000 * 60 * 30,
  });

  const { data: localCaseStudyData, isPending: isLocalCaseStudyPending } = useQuery({
    queryKey: ['case-study-local-markdown', slug],
    queryFn: ({ signal }) => fetchLocalCaseStudyMarkdown(slug, { signal }),
    enabled: Boolean(project),
    staleTime: 1000 * 60 * 30,
  });

  const { data: localCaseStudyStructuredData, isPending: isLocalCaseStudyStructuredPending } = useQuery({
    queryKey: ['case-study-local-structured', slug],
    queryFn: ({ signal }) => fetchLocalCaseStudyStructured(slug, { signal }),
    enabled: Boolean(project),
    staleTime: 1000 * 60 * 30,
  });

  const authoredMarkdown = localCaseStudyData?.markdown || '';
  const hasAuthoredCaseStudy = Boolean(authoredMarkdown.trim());
  const structuredCaseStudy = localCaseStudyStructuredData?.caseStudy || null;
  const hasStructuredCaseStudy = Boolean(structuredCaseStudy && Array.isArray(structuredCaseStudy.content));
  const sourceMarkdown = authoredMarkdown || data?.markdown || '';

  const caseStudy = useMemo(() => {
    return buildCaseStudyContent(project, sourceMarkdown, data?.packageDependencies || []);
  }, [project, sourceMarkdown, data?.packageDependencies]);

  const deepDiveContent = useMemo(() => {
    if (!hasStructuredCaseStudy) {
      return caseStudy;
    }

    const blocks = structuredCaseStudy.content || [];
    const overview = structuredCaseStudy.overview || structuredCaseStudy.description || firstStructuredParagraph(blocks, 0) || caseStudy.overview;
    const problemStatement = structuredCaseStudy.problemStatement || firstStructuredParagraph(blocks, 1) || caseStudy.problemStatement;
    const solution = structuredCaseStudy.solution || firstStructuredParagraph(blocks, 2) || caseStudy.solution;
    const learnings = structuredCaseStudy.learnings || firstStructuredQuote(blocks) || caseStudy.learnings;
    const challenges = structuredCaseStudy.challenges || firstStructuredParagraph(blocks, 3) || caseStudy.challenges;

    return {
      ...caseStudy,
      title: structuredCaseStudy.title || caseStudy.title,
      overview,
      problemStatement,
      solution,
      learnings,
      challenges,
      techStack: Array.isArray(structuredCaseStudy.techStack) && structuredCaseStudy.techStack.length
        ? structuredCaseStudy.techStack
        : caseStudy.techStack,
      keyFeatures: Array.isArray(structuredCaseStudy.keyFeatures) && structuredCaseStudy.keyFeatures.length
        ? structuredCaseStudy.keyFeatures
        : caseStudy.keyFeatures,
    };
  }, [caseStudy, hasStructuredCaseStudy, structuredCaseStudy]);

  useEffect(() => {
    if (!project) {
      updateCaseStudyMeta({
        title: 'Case Study Not Found | Harshit Singh',
        description: 'Requested project case study route is invalid or currently unavailable.',
      });
      return;
    }

    updateCaseStudyMeta({
      title: `${project.title} Case Study | Harshit Singh`,
      description: `${project.description} Read architecture, implementation details, and learnings from the case study.`,
    });

    return () => {
      updateCaseStudyMeta({
        title: 'Harshit Singh | Portfolio',
        description: 'Harshit Singh portfolio: full-stack projects, UI engineering, and product-focused development work.',
      });
    };
  }, [project]);

  const onBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/#projects-showcase');
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <motion.button
            type="button"
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-5 py-2.5 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#8F5E41]"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </motion.button>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-8 text-center shadow-[4px_4px_0_#8F5E41]"
          >
            <h1 className="font-fliege text-4xl text-[#452215] sm:text-5xl">Case Study Not Found</h1>
            <p className="font-bodycopy mt-4 text-[#452215]">
              This project route is invalid or the case study has not been published yet.
            </p>
          </motion.section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#FFF8EE] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticle delay={0} x="10%" y="20%" size={120} color="#452215" />
        <FloatingParticle delay={2} x="85%" y="30%" size={150} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="80%" size={180} color="#FF9398" />
        <FloatingParticle delay={1} x="30%" y="70%" size={100} color="#452215" />
        <FloatingParticle delay={3} x="90%" y="15%" size={130} color="#DF6C4F" />
        
        <motion.div
          className="absolute -top-20 right-10 h-96 w-96 rounded-full bg-[#FF9398]/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-0 h-96 w-96 rounded-full bg-[#DF6C4F]/15 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

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

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            type="button"
            onClick={onBack}
            className="font-ui group inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-5 py-2.5 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#8F5E41]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
        >
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden border-b-2 border-[#452215] bg-[#FFF8EE] lg:min-h-full lg:border-b-0 lg:border-r-2">
              <motion.img
                src={project.image}
                alt={`${project.title} hero`}
                className={`h-full w-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FFF8EE]">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#DF6C4F] border-t-transparent" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#452215]/30 to-transparent" />
              
              {/* Decorative badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-3 py-1.5 shadow-[2px_2px_0_#8F5E41]"
              >
                <Star size={12} className="text-[#FF9398]" fill="#FF9398" />
                <span className="font-mono-ui text-xs text-[#452215]">Featured Project</span>
              </motion.div>
            </div>

            <div className="p-7 sm:p-9">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="font-ui text-sm uppercase tracking-[0.28em] text-[#DF6C4F]">Case Study</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#DF6C4F] to-transparent" />
              </motion.div>
              
              <motion.h1
                className="font-fliege mt-2 text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 }}
              >
                {deepDiveContent.title || project.title}
                <motion.span
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={32} className="inline text-[#FF9398]" />
                </motion.span>
              </motion.h1>
              
              <motion.p
                className="font-bodycopy mt-4 text-base leading-relaxed text-[#452215] sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                className="mt-6 flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center gap-2 rounded-full border border-[#452215] bg-[#FFF8EE] px-3 py-1.5">
                  <Calendar size={14} className="text-[#DF6C4F]" />
                  <span className="font-mono-ui text-xs text-[#452215]">2025</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#452215] bg-[#FFF8EE] px-3 py-1.5">
                  <Clock size={14} className="text-[#DF6C4F]" />
                  <span className="font-mono-ui text-xs text-[#452215]">Full Stack</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#452215] bg-[#FFF8EE] px-3 py-1.5">
                  <Zap size={14} className="text-[#FF9398]" />
                  <span className="font-mono-ui text-xs text-[#452215]">Production Ready</span>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.techStack.map((tech, idx) => (
                  <motion.span
                    key={`${project.title}-${tech.name}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + idx * 0.05 }}
                    className="font-mono-ui inline-flex items-center gap-1.5 rounded-full border-2 border-[#452215] bg-[#FFF8EE] px-3 py-1.5 text-xs text-[#452215] shadow-[2px_2px_0_#8F5E41] transition-all hover:-translate-y-0.5"
                  >
                    <tech.icon size={12} style={{ color: tech.color }} />
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="mt-7 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#DF6C4F] px-6 py-3 text-sm text-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Live Preview
                  <ArrowUpRight size={16} />
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-6 py-3 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github size={16} />
                  GitHub Repository
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Alert Banner */}
        <AnimatePresence>
          {!hasAuthoredCaseStudy && data?.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#DF6C4F] bg-[#FFFFF0] px-4 py-2 text-sm text-[#452215] shadow-[2px_2px_0_#8F5E41]"
            >
              <AlertTriangle size={16} className="text-[#DF6C4F]" />
              README.md could not be loaded. Showing structured fallback content.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Card - Overview, Problem Statement, Solution, Tech Stack, Key Features, Learnings & Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
        >
          <div className="border-b-2 border-[#452215] bg-gradient-to-r from-[#FFF8EE] to-[#FFFFF0] p-5 sm:p-6">
            <h2 className="font-ui flex items-center gap-2 text-2xl text-[#452215] sm:text-3xl">
              <Sparkles size={24} className="text-[#DF6C4F]" />
              Project Deep Dive
            </h2>
          </div>
          <div className="p-6 sm:p-8 space-y-8">
            {/* Overview, Problem Statement, Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={18} className="text-[#DF6C4F]" />
                <h3 className="font-ui text-xl text-[#452215]">Overview</h3>
              </div>
              <p className="font-bodycopy leading-relaxed text-[#452215]">{deepDiveContent.overview}</p>
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle size={18} className="text-[#FF9398]" />
                <h3 className="font-ui text-xl text-[#452215]">Problem Statement</h3>
              </div>
              <p className="font-bodycopy leading-relaxed text-[#452215]">{deepDiveContent.problemStatement}</p>
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap size={18} className="text-[#DF6C4F]" />
                <h3 className="font-ui text-xl text-[#452215]">Solution</h3>
              </div>
              <p className="font-bodycopy leading-relaxed text-[#452215]">{deepDiveContent.solution}</p>
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />

            {/* Tech Stack, Key Features, Learnings & Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Github size={18} className="text-[#452215]" />
                <h3 className="font-ui text-xl text-[#452215]">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(deepDiveContent.techStack || []).map((tech) => (
                  <span
                    key={`${project.title}-stack-${tech}`}
                    className="font-mono-ui rounded-full border border-[#452215] bg-[#FFF8EE] px-3 py-1 text-sm text-[#452215]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Star size={18} className="text-[#FF9398]" />
                <h3 className="font-ui text-xl text-[#452215]">Key Features</h3>
              </div>
              <ul className="space-y-2">
                {(deepDiveContent.keyFeatures || []).map((feature, idx) => (
                  <motion.li
                    key={`${project.title}-feature-${feature}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="font-bodycopy flex items-start gap-3 leading-relaxed text-[#452215]"
                  >
                    <span className="text-[#DF6C4F] mr-1">✦</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={18} className="text-[#DF6C4F]" />
                <h3 className="font-ui text-xl text-[#452215]">Learnings & Challenges</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-ui text-sm font-semibold text-[#DF6C4F] mb-2">Key Learnings</h4>
                  <p className="font-bodycopy leading-relaxed text-[#452215]">{deepDiveContent.learnings}</p>
                </div>
                <div>
                  <h4 className="font-ui text-sm font-semibold text-[#FF9398] mb-2">Challenges Overcome</h4>
                  <p className="font-bodycopy leading-relaxed text-[#452215]">{deepDiveContent.challenges}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Product Preview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
        >
          <div className="border-b-2 border-[#452215] bg-[#FFF8EE] p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF9398]" />
              <div className="h-3 w-3 rounded-full bg-[#DF6C4F]" />
              <div className="h-3 w-3 rounded-full bg-[#452215]" />
              <span className="font-mono-ui ml-2 text-xs text-[#452215]">preview.png</span>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="aspect-video w-full rounded-xl border-2 border-[#452215] object-cover shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
            />
            <p className="font-bodycopy mt-4 text-sm text-[#452215] text-center">
              Live preview of {project.title} — fully responsive and production-ready
            </p>
          </div>
        </motion.section>

        {/* Case Study Narrative */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
        >
          <div className="border-b-2 border-[#452215] bg-gradient-to-r from-[#FFF8EE] to-[#FFFFF0] p-5 sm:p-6">
            <h2 className="font-ui flex items-center gap-2 text-2xl text-[#452215] sm:text-3xl">
              <Sparkles size={24} className="text-[#DF6C4F]" />
              Case Study Narrative
            </h2>
          </div>
          <div className="p-6 sm:p-8">
            {isPending || isLocalCaseStudyPending || isLocalCaseStudyStructuredPending ? (
              <CaseStudyMarkdownSkeleton />
            ) : (
              hasStructuredCaseStudy ? (
                <CaseStudyStructuredRenderer caseStudy={structuredCaseStudy} />
              ) : sourceMarkdown ? (
                <CaseStudyMarkdownRenderer
                  markdown={sourceMarkdown}
                  repoOwner={hasAuthoredCaseStudy ? null : data?.repoOwner}
                  repoName={hasAuthoredCaseStudy ? null : data?.repoName}
                  defaultBranch={hasAuthoredCaseStudy ? null : data?.defaultBranch}
                />
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-slate max-w-none">
                    <p className="font-bodycopy text-lg leading-relaxed text-[#452215] first:mt-0">
                      {caseStudy.overview}
                    </p>
                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />
                    <p className="font-bodycopy leading-relaxed text-[#452215]">
                      {caseStudy.solution}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {(caseStudy.keyFeatures || []).map((feature, idx) => (
                      <motion.li
                        key={`${project.title}-narrative-${feature}`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="font-bodycopy flex items-start gap-3 leading-relaxed text-[#452215]"
                      >
                        <ChevronRight size={16} className="mt-1 shrink-0 text-[#DF6C4F]" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </motion.section>

        {/* Connect With Me Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mt-8 overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
        >
          <div className="border-b-2 border-[#452215] bg-gradient-to-r from-[#FFF8EE] to-[#FFFFF0] p-5 sm:p-6">
            <h2 className="font-ui flex items-center gap-2 text-2xl text-[#452215] sm:text-3xl">
              <Sparkles size={24} className="text-[#DF6C4F]" />
              Connect With Me
            </h2>
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-bodycopy mb-6 leading-relaxed text-[#452215]">
              If you find the project interesting, feel free to check it out and give it a ⭐ on GitHub
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#DF6C4F] px-6 py-3 text-sm text-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={16} />
                View on GitHub
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-6 py-3 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span role="img" aria-label="linkedin">💼</span>
                LinkedIn
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-6 py-3 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span role="img" aria-label="twitter">𝕏</span>
                Twitter
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Footer Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[#452215] bg-[#FFFFF0] px-6 py-3 shadow-[2px_2px_0_#8F5E41]">
            <Sparkles size={14} className="text-[#FF9398]" />
            <span className="font-caption text-sm text-[#452215]">Built with modern web technologies</span>
            <Sparkles size={14} className="text-[#DF6C4F]" />
          </div>
        </motion.div>
      </div>
    </main>
  );
}