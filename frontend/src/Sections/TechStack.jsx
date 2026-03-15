import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from '../utils/motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiRedux,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiSocketdotio,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiVercel,
  SiGithubactions,
  SiNginx,
  SiTerraform,
  SiPrometheus,
  SiGit,
  SiFigma,
  SiPostman,
  SiJest,
  SiStorybook,
  SiSlack,
  SiNotion
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const PALETTE = ['#452215', '#DF6C4F', '#FF9398'];

const TECH_STACK = {
  frontend: [
    { name: 'React', category: 'UI Library', icon: SiReact, color: PALETTE[0], url: 'https://react.dev' },
    { name: 'Next.js', category: 'Framework', icon: SiNextdotjs, color: PALETTE[1], url: 'https://nextjs.org' },
    { name: 'TypeScript', category: 'Language', icon: SiTypescript, color: PALETTE[2], url: 'https://typescriptlang.org' },
    { name: 'Tailwind CSS', category: 'Styling', icon: SiTailwindcss, color: PALETTE[0], url: 'https://tailwindcss.com' },
    { name: 'Framer Motion', category: 'Animation', icon: SiFramer, color: PALETTE[1], url: 'https://framer.com/motion' },
    { name: 'Vite', category: 'Build Tool', icon: SiVite, color: PALETTE[2], url: 'https://vitejs.dev' },
    { name: 'Redux', category: 'State Management', icon: SiRedux, color: PALETTE[0], url: 'https://redux.js.org' },
    { name: 'React Query', category: 'Data Fetching', icon: SiReactquery, color: PALETTE[1], url: 'https://tanstack.com/query' },
  ],
  backend: [
    { name: 'Node.js', category: 'Runtime', icon: SiNodedotjs, color: PALETTE[0], url: 'https://nodejs.org' },
    { name: 'Express', category: 'Framework', icon: SiExpress, color: PALETTE[1], url: 'https://expressjs.com' },
    { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: PALETTE[2], url: 'https://mongodb.com' },
    { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: PALETTE[0], url: 'https://postgresql.org' },
    { name: 'GraphQL', category: 'API Query', icon: SiGraphql, color: PALETTE[1], url: 'https://graphql.org' },
    { name: 'Socket.io', category: 'Real-time', icon: SiSocketdotio, color: PALETTE[2], url: 'https://socket.io' },
    { name: 'Redis', category: 'Cache', icon: SiRedis, color: PALETTE[0], url: 'https://redis.io' },
    { name: 'Prisma', category: 'ORM', icon: SiPrisma, color: PALETTE[1], url: 'https://prisma.io' },
  ],
  devops: [
    { name: 'Docker', category: 'Container', icon: SiDocker, color: PALETTE[0], url: 'https://docker.com' },
    { name: 'Kubernetes', category: 'Orchestration', icon: SiKubernetes, color: PALETTE[1], url: 'https://kubernetes.io' },
    { name: 'AWS', category: 'Cloud', icon: SiAmazonwebservices, color: PALETTE[2], url: 'https://aws.amazon.com' },
    { name: 'Vercel', category: 'Deployment', icon: SiVercel, color: PALETTE[0], url: 'https://vercel.com' },
    { name: 'GitHub Actions', category: 'CI/CD', icon: SiGithubactions, color: PALETTE[1], url: 'https://github.com/features/actions' },
    { name: 'Nginx', category: 'Server', icon: SiNginx, color: PALETTE[2], url: 'https://nginx.org' },
    { name: 'Terraform', category: 'IaC', icon: SiTerraform, color: PALETTE[0], url: 'https://terraform.io' },
    { name: 'Prometheus', category: 'Monitoring', icon: SiPrometheus, color: PALETTE[1], url: 'https://prometheus.io' },
  ],
  tools: [
    { name: 'Git', category: 'Version Control', icon: SiGit, color: PALETTE[0], url: 'https://git-scm.com' },
    { name: 'Figma', category: 'Design', icon: SiFigma, color: PALETTE[1], url: 'https://figma.com' },
    { name: 'VS Code', category: 'Editor', icon: VscVscode, color: PALETTE[2], url: 'https://code.visualstudio.com' },
    { name: 'Postman', category: 'API Testing', icon: SiPostman, color: PALETTE[0], url: 'https://postman.com' },
    { name: 'Jest', category: 'Testing', icon: SiJest, color: PALETTE[1], url: 'https://jestjs.io' },
    { name: 'Storybook', category: 'Documentation', icon: SiStorybook, color: PALETTE[2], url: 'https://storybook.js.org' },
    { name: 'Slack', category: 'Communication', icon: SiSlack, color: PALETTE[0], url: 'https://slack.com' },
    { name: 'Notion', category: 'Productivity', icon: SiNotion, color: PALETTE[1], url: 'https://notion.so' },
  ],
};

const TAB_LABELS = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'devops', label: 'DevOps' },
  { id: 'tools', label: 'Tools' },
];

const MARQUEE_TECHS = [
  'React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS',
  'Tailwind', 'GraphQL', 'Redis', 'Kubernetes', 'PostgreSQL', 'Next.js',
  'Framer Motion', 'Prisma', 'GitHub Actions', 'Figma', 'Vercel', 'Express'
];

const MARQUEE_TECH_ICONS = {
  React: SiReact,
  'Node.js': SiNodedotjs,
  TypeScript: SiTypescript,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  Tailwind: SiTailwindcss,
  GraphQL: SiGraphql,
  Redis: SiRedis,
  Kubernetes: SiKubernetes,
  PostgreSQL: SiPostgresql,
  'Next.js': SiNextdotjs,
  'Framer Motion': SiFramer,
  Prisma: SiPrisma,
  'GitHub Actions': SiGithubactions,
  Figma: SiFigma,
  Vercel: SiVercel,
  Express: SiExpress,
};

const OrbCard = ({ tech, index }) => {
  const Icon = tech.icon;

  return (
    <motion.a
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.08, y: -10 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative mb-4 h-24 w-24 lg:h-28 lg:w-28">
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
          style={{ backgroundColor: tech.color }}
        />

        <motion.div
          className="relative flex h-full w-full items-center justify-center rounded-full border transition-all duration-300"
          style={{ backgroundColor: `${tech.color}12`, borderColor: `${tech.color}35` }}
          whileHover={{ backgroundColor: `${tech.color}24`, borderColor: tech.color }}
        >
          <Icon
            size={32}
            className="transition-all duration-300 group-hover:scale-110"
            style={{ color: tech.color }}
          />

          <motion.div
            className="absolute inset-0 rounded-full border border-dashed opacity-20"
            style={{ borderColor: tech.color }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <motion.div
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#DF6C4F] opacity-0 transition-opacity group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        >
          <ExternalLink size={12} className="text-[#FFFFF0]" />
        </motion.div>
      </div>

      <motion.h3 className="font-ui mb-1 text-sm text-[#452215] transition-colors group-hover:text-[#DF6C4F]">
        {tech.name}
      </motion.h3>
      <span className="font-caption text-xs text-[#452215] transition-colors group-hover:text-[#49C5B6]">
        {tech.category}
      </span>
    </motion.a>
  );
};

const TabSlider = ({ activeTab, onTabChange }) => (
  <div className="relative mx-auto mb-12 flex w-fit items-center gap-2 rounded-full border border-[#FFF8EE] bg-[#FFFFF0] p-1.5">
    <motion.div
      className="absolute h-[calc(100%-12px)] rounded-full bg-[#452215]"
      layoutId="activeTab"
      initial={false}
      animate={{
        x: TAB_LABELS.findIndex((t) => t.id === activeTab) * 100 + '%',
        width: `${100 / TAB_LABELS.length}%`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ left: 6, top: 6 }}
    />

    {TAB_LABELS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onTabChange(tab.id)}
        className={`font-ui relative z-10 rounded-full px-3 py-2.5 text-sm tracking-[0.08em] transition-colors duration-300 sm:px-6 ${activeTab === tab.id ? 'text-[#FFFFF0]' : 'text-[#452215] hover:text-[#DF6C4F]'}`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const MarqueeRow = ({ items, direction = 'left', speed = 30 }) => (
  <div className="relative overflow-hidden py-4">
    <motion.div
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
      transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: speed, ease: 'linear' } }}
    >
      {[...items, ...items, ...items].map((tech, index) => {
        const TechLogo = MARQUEE_TECH_ICONS[tech];
        return (
          <span
            key={`${tech}-${index}`}
            className="font-mono-ui inline-flex cursor-default flex-col items-center gap-2.5 rounded-xl border border-[#FFF8EE] bg-[#FFFFF0] px-4 py-3 text-[#452215] transition-colors hover:border-[#49C5B6] hover:bg-[#FFF8EE]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#DF6C4F]/20 bg-[#FFFFF0]">
              {TechLogo ? <TechLogo size={22} style={{ color: '#DF6C4F' }} /> : null}
            </span>
            <span className="text-xs leading-none">{tech}</span>
          </span>
        );
      })}
    </motion.div>
  </div>
);

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('frontend');
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });
  const topGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const bottomGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const panelItems = useMemo(() => TECH_STACK[activeTab] ?? [], [activeTab]);

  return (
    <section
      id="techstack"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FFFFF0] py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-20 top-40 h-96 w-96 rounded-full bg-[#FFF8EE] blur-3xl"
          style={{ opacity: topGlowOpacity }}
        />
        <motion.div
          className="absolute bottom-40 right-20 h-80 w-80 rounded-full bg-[#FF9398]/15 blur-3xl"
          style={{ opacity: bottomGlowOpacity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mb-8 text-center"
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
            Technology
            <span className="h-px w-8 bg-[#DF6C4F]" />
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Stack I <span className="italic text-[#DF6C4F]">Build With</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="mb-16 opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MarqueeRow items={MARQUEE_TECHS} direction="left" speed={40} />
        </motion.div>

        <TabSlider activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 md:gap-8 lg:gap-12"
            >
              {panelItems.map((tech, index) => (
                <OrbCard key={tech.name} tech={tech} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Technologies', value: '32+' },
            { label: 'Years Exp.', value: '3+' },
            { label: 'Projects', value: '50+' },
            { label: 'Commits', value: '2K+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-fliege mb-1 text-3xl text-[#452215] lg:text-4xl">{stat.value}</div>
              <div className="font-caption text-sm text-[#452215]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-bodycopy mb-4 text-[#452215]">Want to see these technologies in action?</p>
          <motion.a
            href="#projects-showcase"
            className="font-ui inline-flex items-center gap-2 rounded-full bg-[#DF6C4F] px-6 py-3 text-[#FFFFF0] transition-colors hover:bg-[#FF9398] hover:text-[#452215]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
