import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * BackgroundEffects - Elegant ambient background animations
 * Features: floating particles, subtle gradient, noise texture
 * Optimized for performance with GPU acceleration
 */
const BackgroundEffects = () => {
    // Generate random particle positions and animation delays
    const particles = useMemo(() => {
        const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20;
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 2,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 5,
            opacity: Math.random() * 0.15 + 0.05,
        }));
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(circle at 20% 20%, rgba(255, 229, 217, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(254, 98, 29, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(253, 82, 0, 0.05) 0%, transparent 70%)
          `,
                    animation: 'bg-gradient-shift 20s ease-in-out infinite',
                }}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: '#FE621D',
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
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
};

export default BackgroundEffects;
