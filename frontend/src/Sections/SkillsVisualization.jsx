import React, { memo, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from '../utils/motion';
import {
  Layers,
  Server,
  Users,
  Sparkles,
  Code2,
  Palette,
  Database,
  GitBranch,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    icon: Layers,
    color: '#452215',
    skills: [
      { name: 'React', level: 92, icon: Code2, description: 'Component architecture & hooks' },
      { name: 'JavaScript', level: 90, icon: Terminal, description: 'ES6+ & async patterns' },
      { name: 'Tailwind CSS', level: 86, icon: Palette, description: 'Utility-first styling' },
      { name: 'Accessibility', level: 82, icon: Globe, description: 'WCAG compliance' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#DF6C4F',
    skills: [
      { name: 'Node.js', level: 88, icon: Cpu, description: 'Event-driven runtime' },
      { name: 'Express', level: 85, icon: Server, description: 'RESTful APIs' },
      { name: 'MongoDB', level: 84, icon: Database, description: 'NoSQL document store' },
      { name: 'REST APIs', level: 87, icon: GitBranch, description: 'API design & integration' },
    ],
  },
];

const SOFT_SKILLS = [
  { name: 'Communication', level: 90, icon: Users },
  { name: 'Leadership', level: 84, icon: Sparkles },
  { name: 'Planning', level: 86, icon: Layers },
];

const ProficiencyOrbit = memo(function ProficiencyOrbit({ level, color, size = 120 }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (level / 100) * circumference;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      className="relative" 
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <svg className="h-full w-full -rotate-90 transform">
        <circle 
          cx="50%" 
          cy="50%" 
          r="45%" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="text-[#FFF8EE]" 
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          animate={hovered ? { 
            strokeWidth: 6,
            filter: `drop-shadow(0 0 8px ${color})`
          } : {}}
        />
      </svg>
      
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          boxShadow: `0 0 20px ${color}`,
          opacity: hovered ? 0.3 : 0
        }}
        animate={{ opacity: hovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ 
            scale: [1, 1.3, 1],
            boxShadow: hovered ? `0 0 15px ${color}` : 'none'
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Level indicator */}
        <motion.span
          className="absolute -bottom-6 font-mono-ui text-xs"
          style={{ color: color }}
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {level}%
        </motion.span>
      </div>
    </motion.div>
  );
});

const SkillConstellation = memo(function SkillConstellation({ skill, index, isHovered, onHover }) {
  const Icon = skill.icon;
  const [localHovered, setLocalHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true }}
      onMouseEnter={() => {
        setLocalHovered(true);
        onHover(skill.name);
      }}
      onMouseLeave={() => {
        setLocalHovered(false);
        onHover(null);
      }}
      whileHover={{ scale: 1.12, zIndex: 10 }}
    >
      <motion.div
        className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] ${
          isHovered ? 'bg-[#452215]' : 'bg-[#FFFFF0]'
        }`}
        animate={{ 
          boxShadow: isHovered ? '6px 6px 0 #8F5E41, 0 0 20px rgba(223,108,79,0.3)' : '4px 4px 0 #8F5E41'
        }}
      >
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${skill.level > 85 ? '#DF6C4F' : '#FF9398'}20 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
        
        <Icon 
          size={28} 
          className={`transition-all duration-300 ${isHovered ? 'text-[#FFFFF0] scale-110' : 'text-[#452215]'}`} 
        />
        
        {/* Circular progress indicator */}
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="46%"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${(skill.level / 100) * 289} 289`}
            className={`transition-all duration-500 ${isHovered ? 'text-[#FFFFF0]/40' : 'text-[#DF6C4F]/30'}`}
          />
        </svg>

        {/* Corner sparkle */}
        <motion.div
          className="absolute -right-1 -top-1"
          animate={{ 
            rotate: [0, 15, 0],
            scale: isHovered ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={14} className="text-[#FF9398]" />
        </motion.div>
      </motion.div>

      {/* Connection line */}
      <motion.div
        className="absolute -right-8 top-1/2 h-0.5 bg-linear-to-r from-[#FF9398] to-transparent"
        style={{ width: 32 }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.4 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-28 left-1/2 z-20 w-48 -translate-x-1/2 rounded-xl border-2 border-[#452215] bg-[#FFFFF0] p-4 shadow-[4px_4px_0_#8F5E41]"
          >
            <h4 className="font-ui mb-1 text-[#452215]">{skill.name}</h4>
            <p className="font-caption mb-3 text-xs text-[#452215] opacity-80">{skill.description}</p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#FFF8EE] border border-[#452215]">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-[#DF6C4F] to-[#FF9398]"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="font-mono-ui text-xs font-bold" style={{ color: '#DF6C4F' }}>{skill.level}</span>
            </div>
            
            {/* Level indicator */}
            <motion.div
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#452215] bg-[#FFFFF0] shadow-[2px_2px_0_#8F5E41]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <TrendingUp size={12} className="text-[#DF6C4F]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p 
        className={`font-ui mt-3 text-center text-xs transition-colors ${
          isHovered ? 'text-[#DF6C4F]' : 'text-[#452215]'
        }`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        {skill.name}
      </motion.p>
    </motion.div>
  );
});

const SoftSkillPillar = memo(function SoftSkillPillar({ skill, index }) {
  const Icon = skill.icon;
  const height = `${skill.level}%`;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-48 w-20 overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFF8EE] shadow-[4px_4px_0_#8F5E41]">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#DF6C4F] to-[#FF9398]"
          initial={{ height: 0 }}
          whileInView={{ height }}
          transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          animate={hovered ? { 
            filter: 'brightness(1.1)',
            boxShadow: '0 0 20px rgba(223,108,79,0.5)'
          } : {}}
        />
        
        <motion.div
          className="absolute right-0 h-0.5 bg-[#452215]"
          style={{ bottom: height, width: hovered ? 32 : 24 }}
          animate={{ width: hovered ? 32 : 24 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="font-mono-ui absolute -right-8 -top-3 text-sm font-bold"
            style={{ color: hovered ? '#DF6C4F' : '#452215' }}
            animate={{ scale: hovered ? 1.1 : 1 }}
          >
            {skill.level}
          </motion.span>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.div 
          className="rounded-xl border-2 border-[#452215] bg-[#FFFFF0] p-2.5 shadow-[2px_2px_0_#8F5E41] transition-all duration-300 hover:shadow-[4px_4px_0_#8F5E41] hover:-translate-y-1"
          whileHover={{ scale: 1.1, rotate: 5 }}
          animate={hovered ? { rotate: 5 } : {}}
        >
          <Icon size={20} className="text-[#452215]" />
        </motion.div>
        <span className="font-ui text-center text-sm text-[#452215]">{skill.name}</span>
      </div>

      {/* Level indicator dot */}
      <motion.div
        className="absolute -top-2 right-0 h-2 w-2 rounded-full"
        style={{ backgroundColor: '#DF6C4F' }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
});

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
});

export default function SkillsVisualization() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });
  
  const topGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const bottomGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const groupAverages = useMemo(
    () => SKILL_GROUPS.map((group) => Math.round(group.skills.reduce((total, skill) => total + skill.level, 0) / group.skills.length)),
    []
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FFF8EE] py-20 lg:py-32"
    >
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <FloatingParticle delay={0} x="10%" y="20%" size={100} color="#452215" />
        <FloatingParticle delay={2} x="85%" y="30%" size={120} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="80%" size={140} color="#FF9398" />
        
        <motion.div 
          className="absolute left-20 top-20 h-96 w-96 rounded-full bg-[#FFFFF0] blur-3xl" 
          style={{ opacity: topGlowOpacity }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-[#FF9398]/20 blur-3xl" 
          style={{ opacity: bottomGlowOpacity }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          style={{ scale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="h-px w-8 bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            />
            Expertise
            <motion.span 
              className="h-px w-8 bg-[#DF6C4F]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              viewport={{ once: true }}
            />
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Craft With{' '}
            <motion.span 
              className="italic inline-block"
              style={{ color: '#DF6C4F' }}
              animate={{ 
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Depth
            </motion.span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            className="mt-6 h-0.5 w-24 mx-auto bg-linear-to-r from-transparent via-[#DF6C4F] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="space-y-20">
          {SKILL_GROUPS.map((group, groupIndex) => {
            const GroupIcon = group.icon;

            return (
              <motion.div
                key={group.title}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-12 flex flex-col items-center gap-8 lg:flex-row">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ProficiencyOrbit level={groupAverages[groupIndex]} color={group.color} size={140} />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <GroupIcon size={36} className="text-[#452215]" />
                    </motion.div>
                  </motion.div>

                  <div className="text-center lg:text-left">
                    <motion.h3
                      className="font-ui mb-2 text-2xl text-[#452215] lg:text-3xl"
                      style={{ color: group.color }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {group.title}
                    </motion.h3>
                    <p className="font-bodycopy max-w-md text-[#452215] opacity-80">
                      {groupIndex === 0
                        ? 'Building responsive, accessible, and performant user interfaces with modern frameworks.'
                        : 'Designing robust APIs, database schemas, and server-side logic for scalable applications.'}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  {/* Animated connection path */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20">
                    <motion.path
                      d="M 100 50 Q 200 100 300 50 T 500 50"
                      fill="none"
                      stroke="#FF9398"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.2 }}
                      transition={{ duration: 1.5 }}
                      viewport={{ once: true }}
                    />
                  </svg>

                  <div className="grid grid-cols-2 justify-items-center gap-8 md:grid-cols-4 lg:gap-12">
                    {group.skills.map((skill, index) => (
                      <SkillConstellation
                        key={skill.name}
                        skill={skill}
                        index={index}
                        isHovered={hoveredSkill === skill.name}
                        onHover={setHoveredSkill}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-24 rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-8 shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="font-fliege mb-8 text-center text-2xl text-[#452215]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional{' '}
            <motion.span 
              className="italic"
              style={{ color: '#DF6C4F' }}
              animate={{ 
                rotate: [0, 2, -2, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              Competencies
            </motion.span>
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {SOFT_SKILLS.map((skill, index) => (
              <SoftSkillPillar key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          {/* Decorative bottom accent */}
          <motion.div
            className="mt-8 h-1 w-24 mx-auto rounded-full bg-linear-to-r from-[#DF6C4F] to-[#FF9398]"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="font-caption mx-auto max-w-2xl text-sm text-[#452215] opacity-70">
            Proficiency levels represent confidence in production environments,
            not just theoretical knowledge. Each skill is backed by shipped projects
            and real-world problem solving.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
