import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

// Strict color palette
const THEME = {
  bubblegum: '#F66483',
  marigold: '#C877BF',
  lagoon: '#30B8B2',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  sand: {
    100: '#FDF6F0',
    200: '#F5EDE6',
    300: '#E8DDD0',
  },
  charcoal: '#1A1A1A',
};

// Cinematic easing
const EASE = [0.16, 1, 0.3, 1];

/**
 * SkillsAccordion — Expandable skills list with project preview
 */
export default function SkillsAccordion({ skills = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  const toggle = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  // Staggered reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full rounded-2xl overflow-hidden relative"
      style={{
        backgroundColor: 'rgba(253, 246, 240, 0.45)',
        border: `1px solid ${THEME.sand[300]}80`,
        boxShadow: `0 20px 60px ${THEME.malachite}08`,
      }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 origin-left z-10"
        style={{
          background: `linear-gradient(90deg, ${THEME.lagoon}, ${THEME.bubblegum}, ${THEME.marigold})`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
      />

      {skills.map((skill, index) => (
        <AccordionItem
          key={skill.id || index}
          skill={skill}
          index={index}
          isActive={activeIndex === index}
          onToggle={() => toggle(index)}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
}

// Individual accordion item
function AccordionItem({ skill, index, isActive, onToggle, variants }) {
  const itemRef = useRef(null);
  
  // Spring physics for smooth height animation
  const heightSpring = useSpring(0, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={itemRef}
      variants={variants}
      className="relative"
      style={{
        borderBottom: `1px solid ${THEME.sand[300]}90`,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        borderLeftColor: isActive ? THEME.brownSugar : 'transparent',
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.65)' : 'transparent',
        transition: 'background-color 0.3s ease, border-left-color 0.3s ease',
      }}
      whileHover={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.25)',
        borderLeftColor: isActive ? THEME.brownSugar : `${THEME.brownSugar}70`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 px-4 sm:px-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30B8B2]/50 cursor-pointer group"
        aria-expanded={isActive}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Icon with animation */}
          {skill.icon && (
            <motion.span
              className="text-2xl shrink-0"
              style={{ color: isActive ? THEME.brownSugar : `${THEME.charcoal}60` }}
              animate={{
                color: isActive ? THEME.brownSugar : `${THEME.charcoal}60`,
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {skill.icon}
            </motion.span>
          )}
          
          <div className="min-w-0">
            <h3
              className="font-serif text-xl md:text-2xl font-bold leading-snug transition-colors duration-300"
              style={{
                color: isActive ? THEME.brownSugar : THEME.charcoal,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {skill.title}
            </h3>
            
            {skill.subtitle && (
              <motion.p
                className="text-sm mt-1 leading-relaxed"
                style={{ color: `${THEME.charcoal}80` }}
                animate={{ opacity: isActive ? 1 : 0.7 }}
              >
                {skill.subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* Chevron with rotation */}
        <motion.div
          animate={{ 
            rotate: isActive ? 180 : 0,
            color: isActive ? THEME.brownSugar : `${THEME.charcoal}60`,
          }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4 sm:px-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-sm sm:text-base leading-relaxed mb-4"
                  style={{ color: `${THEME.charcoal}CC` }}
                >
                  {skill.description}
                </motion.p>
                
                {skill.technologies && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-wrap gap-2"
                  >
                    {skill.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                        className="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 hover:scale-105 cursor-default"
                        style={{
                          backgroundColor: `${THEME.lagoon}15`,
                          color: THEME.lagoon,
                          border: `1px solid ${THEME.lagoon}30`,
                        }}
                        whileHover={{
                          backgroundColor: `${THEME.lagoon}25`,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Preview image */}
              {skill.previewImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                  className="w-full md:w-52 aspect-4/3 rounded-xl overflow-hidden shadow-lg relative group/image"
                  style={{
                    border: `1px solid ${THEME.sand[300]}`,
                  }}
                >
                  <motion.img
                    src={skill.previewImage}
                    alt={`${skill.title} preview`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      backgroundColor: `${THEME.malachite}60`,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active indicator glow */}
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `linear-gradient(90deg, ${THEME.brownSugar}08 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
}