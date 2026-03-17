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
  Globe
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

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="h-full w-full -rotate-90 transform">
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#FFF8EE]" />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
});

const SkillConstellation = memo(function SkillConstellation({ skill, index, isHovered, onHover }) {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.08, zIndex: 10 }}
    >
      <motion.div
        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 ${isHovered ? 'bg-[#452215] border-[#452215]' : 'bg-[#FFFFF0] border-[#FFF8EE]'}`}
        animate={{ boxShadow: isHovered ? '0 0 24px rgba(219,64,12,0.18)' : '0 10px 24px rgba(153,0,0,0.04)' }}
      >
        <Icon size={24} className={`transition-colors duration-300 ${isHovered ? 'text-[#FFFFF0]' : 'text-[#452215]'}`} />
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="46%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${(skill.level / 100) * 289} 289`}
            className={`transition-all duration-500 ${isHovered ? 'text-[#FFFFF0]/30' : 'text-[#DF6C4F]/25'}`}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -right-8 top-1/2 h-px w-8 bg-[#FF9398]/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -bottom-24 left-0 z-20 w-44 rounded-xl border border-[#FFF8EE] bg-[#FFFFF0] p-3 sm:left-1/2 sm:w-48 sm:-translate-x-1/2 sm:p-4"
          >
            <h4 className="font-ui mb-1 text-[#452215]">{skill.name}</h4>
            <p className="font-caption mb-2 text-xs text-[#452215]">{skill.description}</p>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#FFF8EE]">
                <motion.div
                  className="h-full rounded-full bg-[#DF6C4F]"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="font-mono-ui text-xs text-[#452215]">{skill.level}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p className={`font-caption mt-3 text-center text-xs transition-colors ${isHovered ? 'text-[#452215]' : 'text-[#452215]'}`}>
        {skill.name}
      </motion.p>
    </motion.div>
  );
});

const SoftSkillPillar = memo(function SoftSkillPillar({ skill, index }) {
  const Icon = skill.icon;
  const height = `${skill.level}%`;

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48 w-20 overflow-hidden rounded-2xl bg-[#FFF8EE]">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-2xl bg-[#DF6C4F]"
          initial={{ height: 0 }}
          whileInView={{ height }}
          transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute right-0 h-px w-8 bg-[#FF9398]"
          style={{ bottom: height }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
          viewport={{ once: true }}
        >
          <span className="font-mono-ui absolute -right-8 -top-2 text-xs text-[#452215]">{skill.level}</span>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="rounded-lg bg-[#FFFFF0] p-2">
          <Icon size={20} className="text-[#452215]" />
        </div>
        <span className="font-ui text-center text-sm text-[#452215]">{skill.name}</span>
      </div>
    </motion.div>
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
      <div className="pointer-events-none absolute inset-0">
        <motion.div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-[#FFFFF0] blur-3xl" style={{ opacity: topGlowOpacity }} />
        <motion.div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-[#FF9398]/15 blur-3xl" style={{ opacity: bottomGlowOpacity }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mb-16 text-center"
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
            Expertise
            <span className="h-px w-8 bg-[#DF6C4F]" />
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Craft With <span className="italic text-[#DF6C4F]">Depth</span>
          </motion.h2>
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
                  <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                    <ProficiencyOrbit level={groupAverages[groupIndex]} color={group.color} size={140} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GroupIcon size={32} className="text-[#452215]" />
                    </div>
                  </motion.div>

                  <div className="text-center lg:text-left">
                    <motion.h3
                      className="font-ui mb-2 text-2xl text-[#452215] lg:text-3xl"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {group.title}
                    </motion.h3>
                    <p className="font-bodycopy max-w-md text-[#452215]">
                      {groupIndex === 0
                        ? 'Building responsive, accessible, and performant user interfaces with modern frameworks.'
                        : 'Designing robust APIs, database schemas, and server-side logic for scalable applications.'}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20">
                    <motion.path
                      d="M 100 50 Q 200 100 300 50 T 500 50"
                      fill="none"
                      stroke="#FF9398"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5 }}
                      viewport={{ once: true }}
                    />
                  </svg>

                  <div className="grid grid-cols-2 justify-items-center gap-8 lg:gap-12 md:grid-cols-4">
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
          className="mt-24 border-t border-[#FFFFF0] pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="font-fliege mb-12 text-center text-2xl text-[#452215]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional <span className="italic text-[#DF6C4F]">Competencies</span>
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {SOFT_SKILLS.map((skill, index) => (
              <SoftSkillPillar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-caption mx-auto max-w-2xl text-sm text-[#452215]">
            Proficiency levels represent confidence in production environments,
            not just theoretical knowledge. Each skill is backed by shipped projects
            and real-world problem solving.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
