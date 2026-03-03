import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

// Complete tech stack with official links
const TECH_STACK = {
  frontend: [
    { name: 'React', category: 'UI Library', icon: SiReact, color: '#61DAFB', url: 'https://react.dev' },
    { name: 'Next.js', category: 'Framework', icon: SiNextdotjs, color: '#000000', url: 'https://nextjs.org' },
    { name: 'TypeScript', category: 'Language', icon: SiTypescript, color: '#3178C6', url: 'https://typescriptlang.org' },
    { name: 'Tailwind CSS', category: 'Styling', icon: SiTailwindcss, color: '#06B6D4', url: 'https://tailwindcss.com' },
    { name: 'Framer Motion', category: 'Animation', icon: SiFramer, color: '#FF0055', url: 'https://framer.com/motion' },
    { name: 'Vite', category: 'Build Tool', icon: SiVite, color: '#646CFF', url: 'https://vitejs.dev' },
    { name: 'Redux', category: 'State Management', icon: SiRedux, color: '#764ABC', url: 'https://redux.js.org' },
    { name: 'React Query', category: 'Data Fetching', icon: SiReactquery, color: '#FF4154', url: 'https://tanstack.com/query' },
  ],
  backend: [
    { name: 'Node.js', category: 'Runtime', icon: SiNodedotjs, color: '#339933', url: 'https://nodejs.org' },
    { name: 'Express', category: 'Framework', icon: SiExpress, color: '#000000', url: 'https://expressjs.com' },
    { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248', url: 'https://mongodb.com' },
    { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: '#4169E1', url: 'https://postgresql.org' },
    { name: 'GraphQL', category: 'API Query', icon: SiGraphql, color: '#E10098', url: 'https://graphql.org' },
    { name: 'Socket.io', category: 'Real-time', icon: SiSocketdotio, color: '#010101', url: 'https://socket.io' },
    { name: 'Redis', category: 'Cache', icon: SiRedis, color: '#DC382D', url: 'https://redis.io' },
    { name: 'Prisma', category: 'ORM', icon: SiPrisma, color: '#2D3748', url: 'https://prisma.io' },
  ],
  devops: [
    { name: 'Docker', category: 'Container', icon: SiDocker, color: '#2496ED', url: 'https://docker.com' },
    { name: 'Kubernetes', category: 'Orchestration', icon: SiKubernetes, color: '#326CE5', url: 'https://kubernetes.io' },
    { name: 'AWS', category: 'Cloud', icon: SiAmazonwebservices, color: '#FF9900', url: 'https://aws.amazon.com' },
    { name: 'Vercel', category: 'Deployment', icon: SiVercel, color: '#000000', url: 'https://vercel.com' },
    { name: 'GitHub Actions', category: 'CI/CD', icon: SiGithubactions, color: '#2088FF', url: 'https://github.com/features/actions' },
    { name: 'Nginx', category: 'Server', icon: SiNginx, color: '#009639', url: 'https://nginx.org' },
    { name: 'Terraform', category: 'IaC', icon: SiTerraform, color: '#7B42BC', url: 'https://terraform.io' },
    { name: 'Prometheus', category: 'Monitoring', icon: SiPrometheus, color: '#E6522C', url: 'https://prometheus.io' },
  ],
  tools: [
    { name: 'Git', category: 'Version Control', icon: SiGit, color: '#F05032', url: 'https://git-scm.com' },
    { name: 'Figma', category: 'Design', icon: SiFigma, color: '#F24E1E', url: 'https://figma.com' },
    { name: 'VS Code', category: 'Editor', icon: VscVscode, color: '#007ACC', url: 'https://code.visualstudio.com' },
    { name: 'Postman', category: 'API Testing', icon: SiPostman, color: '#FF6C37', url: 'https://postman.com' },
    { name: 'Jest', category: 'Testing', icon: SiJest, color: '#C21325', url: 'https://jestjs.io' },
    { name: 'Storybook', category: 'Documentation', icon: SiStorybook, color: '#FF4785', url: 'https://storybook.js.org' },
    { name: 'Slack', category: 'Communication', icon: SiSlack, color: '#4A154B', url: 'https://slack.com' },
    { name: 'Notion', category: 'Productivity', icon: SiNotion, color: '#000000', url: 'https://notion.so' },
  ],
};

const TAB_LABELS = [
  { id: 'frontend', label: 'Frontend', color: '#61DAFB' },
  { id: 'backend', label: 'Backend', color: '#339933' },
  { id: 'devops', label: 'DevOps', color: '#2496ED' },
  { id: 'tools', label: 'Tools', color: '#F05032' },
];

// Marquee tech items
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
      whileHover={{ scale: 1.1, y: -10 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Orb Container */}
      <div className="relative w-24 h-24 lg:w-28 lg:h-28 mb-4">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: tech.color }}
        />
        
        {/* Main orb */}
        <motion.div
          className="relative w-full h-full rounded-full flex items-center justify-center border-2 transition-all duration-300"
          style={{ 
            backgroundColor: `${tech.color}15`,
            borderColor: `${tech.color}30`,
          }}
          whileHover={{ 
            backgroundColor: `${tech.color}30`,
            borderColor: tech.color,
            boxShadow: `0 0 30px ${tech.color}40`
          }}
        >
          <Icon 
            size={32} 
            className="transition-all duration-300 group-hover:scale-110"
            style={{ color: tech.color }}
          />
          
          {/* Orbiting ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed opacity-20"
            style={{ borderColor: tech.color }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        {/* External link indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#5D0D18] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        >
          <ExternalLink size={12} className="text-[#FFFBEB]" />
        </motion.div>
      </div>
      
      {/* Text info */}
      <motion.h3 
        className="text-sm font-bold text-[#1a1a1a] mb-1 group-hover:text-[#5D0D18] transition-colors"
      >
        {tech.name}
      </motion.h3>
      <span className="text-xs text-[#1a1a1a]/50 group-hover:text-[#9FB2AC] transition-colors">
        {tech.category}
      </span>
    </motion.a>
  );
};

const TabSlider = ({ activeTab, onTabChange }) => {
  return (
    <div className="relative flex items-center gap-2 p-1.5 bg-[#5D0D18]/5 rounded-full w-fit mx-auto mb-12">
      {/* Sliding background */}
      <motion.div
        className="absolute h-[calc(100%-12px)] rounded-full bg-[#5D0D18]"
        layoutId="activeTab"
        initial={false}
        animate={{
          x: TAB_LABELS.findIndex(t => t.id === activeTab) * 100 + '%',
          width: `${100 / TAB_LABELS.length}%`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ left: 6, top: 6 }}
      />
      
      {TAB_LABELS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeTab === tab.id ? 'text-[#FFFBEB]' : 'text-[#5D0D18] hover:text-[#5D0D18]/80'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const MarqueeRow = ({ items, direction = 'left', speed = 30 }) => {
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items, ...items].map((tech, index) => {
          const TechLogo = MARQUEE_TECH_ICONS[tech];
          return (
          <span
            key={`${tech}-${index}`}
            className="inline-flex flex-col items-center gap-2.5 px-4 py-3 bg-[#5D0D18]/5 rounded-xl border border-[#5D0D18]/10 hover:bg-[#5D0D18]/10 transition-colors cursor-default"
          >
            <span className="w-12 h-12 rounded-lg border border-[#5D0D18]/15 bg-white/50 flex items-center justify-center">
              {TechLogo ? <TechLogo size={22} style={{ color: '#5D0D18' }} /> : null}
            </span>
            <span className="text-xs font-semibold leading-none text-[#5D0D18]">{tech}</span>
          </span>
        );
        })}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredTech, setHoveredTech] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const panelItems = useMemo(() => TECH_STACK[activeTab] ?? [], [activeTab]);

  return (
    <section 
      id="techstack" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-40 left-20 w-96 h-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[#5D0D18]/5 blur-3xl"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-[#9FB2AC]" />
            Technology
            <span className="w-8 h-px bg-[#9FB2AC]" />
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Stack I{' '}
            <span className="text-[#5D0D18] italic">Build With</span>
          </motion.h2>
        </motion.div>

        {/* Marquee Section */}
        <motion.div 
          className="mb-16 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <MarqueeRow items={MARQUEE_TECHS} direction="left" speed={40} />
        </motion.div>

        {/* Tab Slider */}
        <TabSlider activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tech Orbs Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 justify-items-center"
            >
              {panelItems.map((tech, index) => (
                <OrbCard key={tech.name} tech={tech} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Summary */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
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
              <div className="text-3xl lg:text-4xl font-bold text-[#5D0D18] font-fliege mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#1a1a1a]/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#1a1a1a]/60 mb-4">Want to see these technologies in action?</p>
          <motion.a
            href="#projects-showcase"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5D0D18] text-[#FFFBEB] rounded-full font-medium hover:bg-[#5D0D18]/90 transition-colors"
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
