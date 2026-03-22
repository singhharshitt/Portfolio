import React, { memo, useRef, lazy, Suspense } from 'react';
import { motion, useInView, useScroll, useTransform } from '../utils/motion';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Palette, 
  Sparkles, 
  Terminal, 
  Zap,
  ArrowRight,
  Heart,
  Star,
  Activity
} from 'lucide-react';
import { useGitHubActivity, useLeetCodeStats } from '../hooks/useActivityData';

// Lazy load heavy activity components
const GitHubHeatmap = lazy(() => import('../components/activity/GitHubHeatmap'));
const LeetCodeStats = lazy(() => import('../components/activity/LeetCodeStats'));
const ActivityCard = lazy(() => import('../components/activity/ActivityCard'));

const INTERESTS = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Building end-to-end web applications with React, Node.js, and modern cloud infrastructure.',
    color: '#452215',
    gradient: 'from-[#452215]/10 to-transparent',
    pattern: 'M25 0L50 25L25 50L0 25L25 0',
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description: 'Designing intuitive, accessible, and visually rich interfaces that delight users.',
    color: '#DF6C4F',
    gradient: 'from-[#DF6C4F]/10 to-transparent',
    pattern: 'M0 25L25 0L50 25L25 50L0 25',
  },
  {
    icon: Cpu,
    title: 'Artificial Intelligence',
    description: 'Exploring LLMs, generative AI tools, and integrating AI into real-world applications.',
    color: '#FF9398',
    gradient: 'from-[#FF9398]/10 to-transparent',
    pattern: 'M12.5 0L25 25L12.5 50L0 25L12.5 0',
  },
  {
    icon: Globe,
    title: 'Web3 & Blockchain',
    description: 'Learning decentralized technologies, smart contracts, and the future of the open web.',
    color: '#452215',
    gradient: 'from-[#452215]/10 to-transparent',
    pattern: 'M25 0L50 12.5L37.5 37.5L12.5 37.5L0 12.5L25 0',
  },
  {
    icon: Zap,
    title: 'Performance Engineering',
    description: 'Obsessed with fast load times, smooth animations, and optimised rendering pipelines.',
    color: '#DF6C4F',
    gradient: 'from-[#DF6C4F]/10 to-transparent',
    pattern: 'M0 25L12.5 0L37.5 0L50 25L37.5 50L12.5 50L0 25',
  },
  {
    icon: Terminal,
    title: 'DevOps & Cloud',
    description: 'Containerisation with Docker, CI/CD pipelines, and deploying on AWS and Vercel.',
    color: '#FF9398',
    gradient: 'from-[#FF9398]/10 to-transparent',
    pattern: 'M25 0L50 25L25 50L0 25L25 0',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Creating scalable component libraries and token-driven design systems.',
    color: '#452215',
    gradient: 'from-[#452215]/10 to-transparent',
    pattern: 'M0 25L25 0L50 25L25 50L0 25',
  },
  {
    icon: Sparkles,
    title: 'Open Source',
    description: 'Contributing to the community, learning from codebases, and sharing knowledge.',
    color: '#DF6C4F',
    gradient: 'from-[#DF6C4F]/10 to-transparent',
    pattern: 'M12.5 0L25 25L12.5 50L0 25L12.5 0',
  },
];

const FloatingParticle = memo(function FloatingParticle({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        filter: 'blur(8px)',
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
});

const InterestCard = memo(function InterestCard({ item, index }) {
  const Icon = item.icon;
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col gap-4 rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-2"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -8 }}
    >
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='${item.pattern}' fill='none' stroke='${item.color.replace('#', '%23')}' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: item.color }}
      />

      {/* Corner Accents */}
      <motion.div
        className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#DF6C4F] opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{ borderColor: item.color }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.08 + 0.3 }}
      />


      {/* Icon Container with Enhanced Animation */}
      <motion.div
        className="relative flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden"
        style={{ backgroundColor: `${item.color}14` }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {/* Icon Pulse Background */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: item.color }}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Rotating Border */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-dashed"
          style={{ borderColor: `${item.color}50` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        <Icon 
          size={24} 
          style={{ color: item.color }}
          className="relative z-10 transition-transform duration-300 group-hover:scale-110" 
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h3 
          className="font-ui mb-2 text-lg text-[#452215] transition-colors duration-200 group-hover:text-[#DF6C4F]"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.08 + 0.1 }}
        >
          {item.title}
        </motion.h3>
        
        <motion.p 
          className="font-bodycopy text-sm leading-relaxed text-[#452215]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.2 }}
        >
          {item.description}
        </motion.p>
      </div>

      {/* Interactive Hover Indicator */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
        style={{ backgroundColor: item.color }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Sparkle Icons (appear on hover) */}
      <motion.div
        className="absolute -right-2 -top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Star size={16} style={{ color: item.color }} fill={item.color} />
      </motion.div>
      <motion.div
        className="absolute -left-2 bottom-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <Heart size={14} style={{ color: item.color }} fill={item.color} />
      </motion.div>

      {/* Learn More Link (appears on hover) */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ x: 10 }}
        whileHover={{ x: 0 }}
      >
        <ArrowRight size={18} style={{ color: item.color }} />
      </motion.div>
    </motion.div>
  );
});

/**
 * Coding Activity sub-section: GitHub contributions + LeetCode stats.
 * Lazy-loaded and uses React Query for data caching.
 */
const CodingActivitySection = memo(function CodingActivitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const github = useGitHubActivity();
  const leetcode = useLeetCodeStats();

  return (
    <motion.div
      ref={ref}
      className="mt-14"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Sub-heading */}
      <div className="mb-8 flex items-center gap-3">
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#452215]/10"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Activity size={18} className="text-[#DF6C4F]" />
        </motion.div>
        <div>
          <motion.h3
            className="font-ui text-lg text-[#452215]"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Coding Activity
          </motion.h3>
          <motion.p
            className="font-caption text-xs text-[#452215]/50"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            Real-time stats from GitHub & LeetCode
          </motion.p>
        </div>
      </div>

      {/* Activity cards grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Suspense
          fallback={
            <div className="rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41] animate-pulse">
              <div className="h-4 w-1/3 rounded bg-[#452215]/10 mb-4" />
              <div className="h-32 w-full rounded bg-[#452215]/05" />
            </div>
          }
        >
          {github.isLoading ? (
            <LoadingCard title="GitHub Contributions" />
          ) : github.isError ? (
            <ErrorCard title="GitHub Contributions" error={github.error} />
          ) : github.data ? (
            <GitHubHeatmap data={github.data} />
          ) : null}
        </Suspense>

        <Suspense
          fallback={
            <div className="rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41] animate-pulse">
              <div className="h-4 w-1/3 rounded bg-[#452215]/10 mb-4" />
              <div className="h-32 w-full rounded bg-[#452215]/05" />
            </div>
          }
        >
          {leetcode.isLoading ? (
            <LoadingCard title="LeetCode Progress" />
          ) : leetcode.isError ? (
            <ErrorCard title="LeetCode Progress" error={leetcode.error} />
          ) : leetcode.data ? (
            <LeetCodeStats data={leetcode.data} />
          ) : null}
        </Suspense>
      </div>
    </motion.div>
  );
});

/**
 * Loading skeleton card matching the theme.
 */
const LoadingCard = memo(function LoadingCard({ title }) {
  return (
    <div className="rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41]">
      <h4 className="font-ui mb-4 text-base text-[#452215]">{title}</h4>
      <div className="space-y-3 animate-pulse">
        <div className="h-4 w-3/4 rounded bg-[#452215]/10" />
        <div className="h-4 w-1/2 rounded bg-[#452215]/10" />
        <div className="h-24 w-full rounded bg-[#452215]/05" />
      </div>
    </div>
  );
});

/**
 * Error fallback card matching the theme.
 */
const ErrorCard = memo(function ErrorCard({ title, error }) {
  return (
    <div className="rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41]">
      <h4 className="font-ui mb-4 text-base text-[#452215]">{title}</h4>
      <div className="rounded-lg border border-[#DF6C4F]/20 bg-[#DF6C4F]/5 p-4 text-center">
        <p className="font-bodycopy text-sm text-[#452215]/70">
          {error?.message?.includes('not set')
            ? 'API key not configured'
            : error?.message?.includes('cached data')
            ? 'Showing last updated data'
            : 'Unable to load data right now'}
        </p>
        <p className="font-caption mt-1 text-xs text-[#452215]/50">
          {error?.message?.includes('cached data') 
            ? 'Latest data will load when available'
            : 'Data will appear once available'}
        </p>
      </div>
    </div>
  );
});

export default function InterestsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FFF8EE] py-20 lg:py-32"
    >
      {/* Animated Background Elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main Background Blobs */}
        <motion.div
          className="absolute left-10 top-32 h-80 w-80 rounded-full bg-[#FFFFF0] blur-3xl"
          style={{ scale: bgScale, rotate: bgRotate }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute bottom-16 right-10 h-64 w-64 rounded-full bg-[#FF9398]/20 blur-3xl"
          style={{ scale: bgScale, rotate: -bgRotate }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Floating Particles */}
        <FloatingParticle delay={0} x="15%" y="20%" size={40} color="#452215" />
        <FloatingParticle delay={2} x="80%" y="30%" size={60} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="70%" size={50} color="#FF9398" />
        <FloatingParticle delay={1} x="25%" y="80%" size={35} color="#452215" />
        <FloatingParticle delay={3} x="90%" y="15%" size={45} color="#DF6C4F" />
      </div>

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-[#FFF8EE]/50 to-transparent" />
      
      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          className="mb-14"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="h-px w-8 bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            Interests & Activity
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What I <span className="text-[#DF6C4F] italic">Geek Out</span> On
          </motion.h2>

          <motion.p
            className="font-bodycopy mt-4 max-w-xl text-base text-[#452215] sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Areas that keep me curious, learning, and building every day.
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            className="mt-6 h-0.5 w-24 bg-linear-to-r from-[#DF6C4F] to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTERESTS.map((item, index) => (
            <InterestCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* ── Coding Activity Sub-section ── */}
        <CodingActivitySection />

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="font-ui inline-flex max-w-full items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-4 py-2.5 text-center text-xs text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1 hover:border-[#DF6C4F] hover:text-[#DF6C4F] sm:px-6 sm:py-3 sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Build Something Cool Together
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
