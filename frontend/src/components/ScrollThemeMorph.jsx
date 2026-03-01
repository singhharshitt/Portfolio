import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollThemeMorph — Cinematic color transition system
 * Morphs through palette phases: Malachite deep → Lagoon glow → Warm accent
 * Uses spring physics for organic, luxurious feel
 */
export default function ScrollThemeMorph() {
    const { scrollYProgress } = useScroll();

    // Spring-smoothed progress for organic motion (no jank)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Phase 1: Hero (0-20%) — Deep Olive with Gold glow
    // Phase 2: Transition (20-40%) — Warm parchment with subtle terracotta
    // Phase 3: Body (40%+) — Clean light background

    const background = useTransform(
        smoothProgress,
        [0, 0.15, 0.35, 0.5],
        [
            '#6E6B2F',           // Olive — deep, grounded
            '#7a7838',           // Gold-tinted Olive
            '#E9E2D6',           // Warm parchment (neutral canvas)
            '#F5F0E8',           // Cream for content sections
        ]
    );

    // Gradient overlay intensity — creates depth layers
    const gradientOpacity = useTransform(
        smoothProgress,
        [0, 0.2, 0.4],
        [0.6, 0.3, 0]
    );

    // Subtle vignette that fades as we scroll down
    const vignetteOpacity = useTransform(
        smoothProgress,
        [0, 0.25],
        [0.4, 0]
    );

    return (
        <>
            {/* Base color morph */}
            <motion.div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background,
                    zIndex: -10,
                }}
                aria-hidden="true"
            />

            {/* Gradient overlay for depth (Gold → Terracotta subtle shift) */}
            <motion.div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -9,
                    opacity: gradientOpacity,
                    background: useTransform(
                        smoothProgress,
                        [0, 0.25],
                        [
                            'radial-gradient(ellipse at 30% 20%, rgba(201, 166, 107, 0.15) 0%, transparent 50%)',
                            'radial-gradient(ellipse at 70% 80%, rgba(194, 116, 58, 0.08) 0%, transparent 50%)',
                        ]
                    ),
                }}
                aria-hidden="true"
            />

            {/* Vignette for cinematic focus */}
            <motion.div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -8,
                    opacity: vignetteOpacity,
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(110, 107, 47, 0.15) 100%)',
                }}
                aria-hidden="true"
            />
        </>
    );
}