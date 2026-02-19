import React, { useMemo } from 'react';

/**
 * SectionBackground — Animated decorative background pattern
 * Two floating gradient orbs + subtle grid overlay
 * Pure CSS animation, GPU-accelerated, pointer-events-none
 */
const SectionBackground = React.memo(() => {
    const orbs = useMemo(() => [
        {
            top: '10%',
            left: '-5%',
            size: '380px',
            color: 'rgba(181, 74, 63, 0.08)',
            duration: '25s',
            delay: '0s',
        },
        {
            top: '60%',
            right: '-8%',
            size: '320px',
            color: 'rgba(200, 85, 61, 0.06)',
            duration: '30s',
            delay: '5s',
        },
    ], []);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            {/* Floating gradient orbs */}
            {orbs.map((orb, i) => (
                <div
                    key={i}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        top: orb.top,
                        left: orb.left,
                        right: orb.right,
                        width: orb.size,
                        height: orb.size,
                        backgroundColor: orb.color,
                        animation: `sectionOrbFloat ${orb.duration} ease-in-out ${orb.delay} infinite alternate`,
                        willChange: 'transform',
                    }}
                />
            ))}

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(62, 0, 13, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(62, 0, 13, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />
        </div>
    );
});

SectionBackground.displayName = 'SectionBackground';
export default SectionBackground;
