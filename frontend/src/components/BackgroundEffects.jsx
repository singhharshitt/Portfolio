import React, { useMemo } from 'react';

// Warm Parchment palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  sage: '#B7B77A',
  olive: '#6E6B2F',
  cream: '#F5F0E8',
  textDark: '#4A4A3A',
};

const BackgroundEffects = React.memo(() => {
  // Generate random particle positions (pure CSS animated, no JS loops)
  const particles = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.12 + 0.04,
    }));
  }, []);

  // Gradient orbs configuration
  const orbs = useMemo(() => [
    { x: 20, y: 20, color: `${THEME.gold}20`, size: '50%', duration: '25s', delay: '0s' },
    { x: 80, y: 80, color: `${THEME.terracotta}15`, size: '40%', duration: '30s', delay: '-5s' },
    { x: 50, y: 50, color: `${THEME.sage}10`, size: '60%', duration: '35s', delay: '-10s' },
    { x: 30, y: 70, color: `${THEME.olive}12`, size: '35%', duration: '28s', delay: '-8s' },
  ], []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ contain: 'strict' }}
    >
      {/* CSS Keyframes injection */}
      <style>{`
        @keyframes bg-gradient-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(2%, -2%) scale(1.05); }
          66% { transform: translate(-1%, 1%) scale(0.98); }
        }
        
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
        
        @keyframes subtle-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, 5px); }
        }
      `}</style>

      {/* Animated gradient background layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${THEME.gold}18 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${THEME.terracotta}12 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${THEME.sage}08 0%, transparent 70%),
            radial-gradient(circle at 30% 70%, ${THEME.olive}08 0%, transparent 40%)
          `,
          animation: 'bg-gradient-shift 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Floating gradient orbs */}
      {orbs.map((orb, index) => (
        <div
          key={`orb-${index}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            animation: `orb-float ${orb.duration} ease-in-out ${orb.delay} infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* CSS-animated floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: THEME.terracotta,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${THEME.gold}40`,
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(${THEME.textDark} 1px, transparent 1px),
            linear-gradient(90deg, ${THEME.textDark} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'subtle-drift 60s ease-in-out infinite',
        }}
      />

      {/* Noise texture overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay"
        preserveAspectRatio="none"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>


      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 40%, ${THEME.olive}15 100%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';
export default BackgroundEffects;