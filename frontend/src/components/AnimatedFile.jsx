import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
};

// Color palette
const THEME = {
  lagoon: '#30B8B2',
  bubblegum: '#F66483',
  marigold: '#C877BF',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  sand: {
    100: '#F5E5CA',
    200: '#F0E7D5',
  },
  charcoal: '#1A1A1A',
};

/**
 * AnimatedFile — Animated tech-icon card grid
 * Props:
 *   title  — folder label shown at bottom
 *   type   — category key (affects accent color)
 *   cards  — array of { name, icon, color }
 */
export default function AnimatedFile({ title, type, cards = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Pick accent from type
  const accentMap = {
    frontend: THEME.lagoon,
    backend: THEME.bubblegum,
    devops: THEME.marigold,
    core: THEME.brownSugar,
  };
  const accent = accentMap[type] || THEME.lagoon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: EASE.smooth }}
      className="relative w-full"
    >
      {/* Card container */}
      <div
        className="relative rounded-2xl overflow-hidden border p-5"
        style={{
          backgroundColor: THEME.sand[100],
          borderColor: `${accent}30`,
          boxShadow: `0 8px 32px ${accent}10`,
        }}
      >
        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 origin-left"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40)` }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE.smooth }}
        />

        {/* Icon grid */}
        <div className="flex flex-wrap gap-3">
          {cards.map((card, index) => (
            <TechCard key={card.name} card={card} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Bottom label */}
        <div
          className="mt-4 pt-3 border-t flex items-center gap-2"
          style={{ borderColor: `${accent}20` }}
        >
          <span
            className="text-xs font-mono uppercase tracking-widest font-semibold"
            style={{ color: accent }}
          >
            {title}
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: `${THEME.charcoal}50` }}
          >
            / {cards.length} technologies
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Individual tech icon card
function TechCard({ card, index, isInView }) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
      transition={{
        delay: 0.15 + index * 0.07,
        duration: 0.5,
        ease: EASE.smooth,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-default transition-all duration-300"
      style={{
        backgroundColor: hovered ? `${card.color}18` : 'rgba(255,255,255,0.7)',
        border: `1px solid ${hovered ? card.color + '50' : 'rgba(0,0,0,0.06)'}`,
        minWidth: '64px',
        boxShadow: hovered ? `0 4px 16px ${card.color}20` : 'none',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Icon */}
      <span
        className="text-3xl leading-none transition-transform duration-300"
        style={{
          color: card.color,
          filter: hovered ? `drop-shadow(0 2px 6px ${card.color}60)` : 'none',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <Icon />
      </span>

      {/* Name label */}
      <span
        className="text-[10px] font-medium text-center leading-tight"
        style={{ color: hovered ? card.color : `${THEME.charcoal}80`, maxWidth: '56px' }}
      >
        {card.name}
      </span>
    </motion.div>
  );
}