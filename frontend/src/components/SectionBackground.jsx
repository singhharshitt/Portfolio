import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * SectionBackground — Cinematic animated background
 * Floating gradient orbs with parallax depth + subtle grid
 * GPU-accelerated, reduced-motion safe
 */
const SectionBackground = React.memo(({ variant = 'default' }) => {
    const colorMap = {
        default: {
            primary: 'rgba(21, 72, 76, 0.08)',    // Malachite
            secondary: 'rgba(48, 184, 178, 0.06)', // Lagoon
        },
        warm: {
            primary: 'rgba(246, 100, 131, 0.08)',  // Bubblegum
            secondary: 'rgba(200, 119, 191, 0.06)', // Marigold
        },
        deep: {
            primary: 'rgba(166, 72, 10, 0.08)',    // Brown Sugar
            secondary: 'rgba(21, 72, 76, 0.1)',    // Malachite
        },
    };

    const colors = colorMap[variant];

    const orbs = useMemo(() => [
        {
            top: '10%',
            left: '-5%',
            size: 'clamp(280px, 35vw, 480px)',
            color: colors.primary,
            duration: 20,
            delay: 0,
            yOffset: [0, -30, 0],
            xOffset: [0, 20, 0],
        },
        {
            top: '55%',
            right: '-8%',
            size: 'clamp(240px, 30vw, 420px)',
            color: colors.secondary,
            duration: 25,
            delay: 2,
            yOffset: [0, 25, 0],
            xOffset: [0, -15, 0],
        },
        {
            top: '30%',
            left: '60%',
            size: 'clamp(200px, 25vw, 360px)',
            color: colors.primary,
            duration: 22,
            delay: 4,
            yOffset: [0, -20, 0],
            xOffset: [0, -25, 0],
        },
    ], [colors]);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            {/* Animated gradient orbs with Framer Motion */}
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
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: 'blur(60px)',
                        willChange: 'transform',
                    }}
                    animate={{
                        y: orb.yOffset,
                        x: orb.xOffset,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: [0.25, 0.46, 0.45, 0.94], // Smooth elegance
                    }}
                />
            ))}

            {/* Subtle animated grid */}
            <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(21, 72, 76, 0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(21, 72, 76, 0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: 'clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Gradient vignette for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.4) 100%)',
                }}
            />
        </div>
    );
});

SectionBackground.displayName = 'SectionBackground';
export default SectionBackground;