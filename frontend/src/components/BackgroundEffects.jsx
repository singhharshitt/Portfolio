import React, { useMemo } from 'react';

const THEME = {
  strong: '#452215',
  accent: '#DF6C4F',
  highlight: '#FF9398',
  blush: '#FFF8EE',
  pearl: '#FFFFF0',
};

const BackgroundEffects = React.memo(() => {
  const particles = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.08 + 0.03,
    }));
  }, []);

  const orbs = useMemo(() => [
    { x: 20, y: 20, color: 'rgba(235,226,224,0.9)', size: '50%', duration: '25s', delay: '0s' },
    { x: 80, y: 80, color: 'rgba(219,64,12,0.12)', size: '40%', duration: '30s', delay: '-5s' },
    { x: 50, y: 50, color: 'rgba(250,138,60,0.1)', size: '60%', duration: '35s', delay: '-10s' },
    { x: 30, y: 70, color: 'rgba(244,242,241,0.8)', size: '35%', duration: '28s', delay: '-8s' },
  ], []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ contain: 'strict' }}>
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(90deg); }
          50% { transform: translate(-5px, -25px) rotate(180deg); }
          75% { transform: translate(-15px, -10px) rotate(270deg); }
        }

        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(20px, -30px) scale(1.1); opacity: 0.8; }
        }
      `}</style>

      <div className="absolute inset-0 bg-[#FFFFF0]" />

      {orbs.map((orb, index) => (
        <div
          key={`orb-${index}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            transform: 'translate(-50%, -50%)',
            animation: `orb-float ${orb.duration} ease-in-out ${orb.delay} infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: THEME.accent,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${THEME.highlight}30`,
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[#FFF8EE]/20" />
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';
export default BackgroundEffects;
