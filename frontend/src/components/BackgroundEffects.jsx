import React, { useMemo } from 'react';

/**
 * BackgroundEffects - Elegant ambient background animations
 * Uses pure CSS animations instead of JS-driven Framer Motion for 60fps perf
 * Reduced particle count, GPU-accelerated with will-change + contain
 */
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

    return (
        <div
            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
            style={{ contain: 'strict' }}
        >
            {/* Animated gradient background — CSS only */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(circle at 20% 20%, rgba(247, 176, 91, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(204, 88, 3, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(155, 61, 18, 0.05) 0%, transparent 70%)
          `,
                    animation: 'bg-gradient-shift 20s ease-in-out infinite',
                }}
            />

            {/* CSS-animated floating particles (no JS animation loop) */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: '#CC5803',
                        opacity: particle.opacity,
                        willChange: 'transform',
                        animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                    }}
                />
            ))}

            {/* Noise texture overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
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
        </div>
    );
});

BackgroundEffects.displayName = 'BackgroundEffects';
export default BackgroundEffects;
