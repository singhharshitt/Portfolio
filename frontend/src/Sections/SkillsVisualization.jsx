import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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
  Figma,
  Cpu,
  Globe
} from 'lucide-react';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    icon: Layers,
    color: '#5D0D18',
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
    color: '#6B7A3D',
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

const ProficiencyOrbit = ({ level, color, size = 120 }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (level / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background orbit */}
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[#5D0D18]/10"
        />
        {/* Animated progress orbit */}
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
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </svg>
      {/* Center dot with pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundColor: color,
            originX: 0.5,
            originY: 0.5,
            left: '50%',
            top: '50%',
            marginLeft: -4,
            marginTop: -4,
          }}
        >
          <motion.div
            animate={{ x: [0, (i + 1) * 20] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const SkillConstellation = ({ skill, index, isHovered, onHover }) => {
  const Icon = skill.icon;
  const intensity = skill.level > 90 ? 'high' : skill.level > 80 ? 'medium' : 'low';
  
  const glowColors = {
    high: 'shadow-[#5D0D18]/30',
    medium: 'shadow-[#6B7A3D]/30',
    low: 'shadow-[#9FB2AC]/30',
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.1, zIndex: 10 }}
    >
      {/* Star/node */}
      <motion.div
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isHovered 
            ? `bg-[#5D0D18] shadow-lg ${glowColors[intensity]}` 
            : 'bg-white/80 border border-[#5D0D18]/10'
        }`}
        animate={{
          boxShadow: isHovered 
            ? `0 0 30px ${skill.level > 90 ? '#5D0D18' : skill.level > 80 ? '#6B7A3D' : '#9FB2AC'}40`
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Icon 
          size={24} 
          className={`transition-colors duration-300 ${isHovered ? 'text-[#FFFBEB]' : 'text-[#5D0D18]'}`} 
        />
        
        {/* Level indicator ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="46%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${(skill.level / 100) * 289} 289`}
            className={`transition-all duration-500 ${isHovered ? 'text-[#FFFBEB]/30' : 'text-[#5D0D18]/20'}`}
          />
        </svg>
      </motion.div>

      {/* Connection lines to neighbors */}
      <motion.div
        className="absolute top-1/2 -right-8 w-8 h-px bg-linear-to-r from-[#5D0D18]/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 z-20 w-48 p-4 bg-white rounded-xl shadow-xl border border-[#5D0D18]/10"
          >
            <h4 className="font-bold text-[#5D0D18] mb-1">{skill.name}</h4>
            <p className="text-xs text-[#1a1a1a]/60 mb-2">{skill.description}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#5D0D18]/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#5D0D18] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs font-bold text-[#5D0D18]">{skill.level}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label below */}
      <motion.p 
        className={`mt-3 text-xs font-medium text-center transition-colors ${
          isHovered ? 'text-[#5D0D18]' : 'text-[#1a1a1a]/60'
        }`}
      >
        {skill.name}
      </motion.p>
    </motion.div>
  );
};

const SoftSkillPillar = ({ skill, index }) => {
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
      {/* Pillar container */}
      <div className="relative w-20 h-48 bg-[#5D0D18]/5 rounded-2xl overflow-hidden">
        {/* Liquid fill effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#5D0D18] to-[#9FB2AC] rounded-2xl"
          initial={{ height: 0 }}
          whileInView={{ height }}
          transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Bubbles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{ left: `${20 + i * 30}%` }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
        
        {/* Level marker */}
        <motion.div
          className="absolute right-0 w-8 h-px bg-[#5D0D18]"
          style={{ bottom: height }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
          viewport={{ once: true }}
        >
          <span className="absolute -right-8 -top-2 text-xs font-bold text-[#5D0D18]">
            {skill.level}
          </span>
        </motion.div>
      </div>
      
      {/* Icon and label */}
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 bg-[#5D0D18]/10 rounded-lg">
          <Icon size={20} className="text-[#5D0D18]" />
        </div>
        <span className="text-sm font-medium text-[#1a1a1a] text-center">{skill.name}</span>
      </div>
    </motion.div>
  );
};

export default function SkillsVisualization() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#5D0D18]/5 blur-3xl"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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
            Expertise
            <span className="w-8 h-px bg-[#9FB2AC]" />
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Craft With{' '}
            <span className="text-[#5D0D18] italic">Depth</span>
          </motion.h2>
        </motion.div>

        {/* Skill Groups - Constellation Layout */}
        <div className="space-y-20">
          {SKILL_GROUPS.map((group, groupIndex) => {
            const GroupIcon = group.icon;
            const isActive = activeGroup === groupIndex;
            
            return (
              <motion.div
                key={group.title}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveGroup(groupIndex)}
              >
                {/* Group Header with Orbit */}
                <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ProficiencyOrbit 
                      level={Math.round(group.skills.reduce((a, s) => a + s.level, 0) / group.skills.length)}
                      color={group.color}
                      size={140}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GroupIcon size={32} className="text-[#5D0D18]" />
                    </div>
                  </motion.div>
                  
                  <div className="text-center lg:text-left">
                    <motion.h3 
                      className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {group.title}
                    </motion.h3>
                    <p className="text-[#1a1a1a]/60 max-w-md">
                      {groupIndex === 0 
                        ? 'Building responsive, accessible, and performant user interfaces with modern frameworks.'
                        : 'Designing robust APIs, database schemas, and server-side logic for scalable applications.'}
                    </p>
                  </div>
                </div>

                {/* Constellation Grid */}
                <div className="relative">
                  {/* Connection lines SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <motion.path
                      d="M 100 50 Q 200 100 300 50 T 500 50"
                      fill="none"
                      stroke="#5D0D18"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
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

        {/* Soft Skills - Pillar Section */}
        <motion.div 
          className="mt-24 pt-16 border-t border-[#5D0D18]/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold text-[#1a1a1a] text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional <span className="text-[#5D0D18] italic">Competencies</span>
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {SOFT_SKILLS.map((skill, index) => (
              <SoftSkillPillar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Bottom Insight */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#1a1a1a]/60 text-sm max-w-2xl mx-auto">
            Proficiency levels represent confidence in production environments, 
            not just theoretical knowledge. Each skill is backed by shipped projects 
            and real-world problem solving.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
