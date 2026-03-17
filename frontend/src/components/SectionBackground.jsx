import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const SectionBackground = React.memo(({ variant = 'default' }) => {
  const colorMap = {
    default: { primary: 'rgba(219,64,12,0.08)', secondary: 'rgba(250,138,60,0.08)' },
    warm: { primary: 'rgba(250,138,60,0.12)', secondary: 'rgba(235,226,224,0.8)' },
    deep: { primary: 'rgba(153,0,0,0.1)', secondary: 'rgba(219,64,12,0.08)' },
  };

  const colors = colorMap[variant];

  const orbs = useMemo(() => [
    { top: '10%', left: '-5%', size: 'clamp(280px, 35vw, 480px)', color: colors.primary, duration: 20, delay: 0, yOffset: [0, -30, 0], xOffset: [0, 20, 0] },
    { top: '55%', right: '-8%', size: 'clamp(240px, 30vw, 420px)', color: colors.secondary, duration: 25, delay: 2, yOffset: [0, 25, 0], xOffset: [0, -15, 0] },
    { top: '30%', left: '60%', size: 'clamp(200px, 25vw, 360px)', color: colors.primary, duration: 22, delay: 4, yOffset: [0, -20, 0], xOffset: [0, -25, 0] },
  ], [colors]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
          animate={{ y: orb.yOffset, x: orb.xOffset, scale: [1, 1.05, 1] }}
          transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, repeatType: 'reverse', ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ))}

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'none',
          backgroundColor: 'rgba(235,226,224,0.35)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-[#FFFFF0]/30" />
    </div>
  );
});

SectionBackground.displayName = 'SectionBackground';
export default SectionBackground;
