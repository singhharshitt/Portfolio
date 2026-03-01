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

    // Phase 1: Hero (0-20%) — Deep Malachite with Lagoon glow
    // Phase 2: Transition (20-40%) — Warm cream with subtle Bubblegum
    // Phase 3: Body (40%+) — Clean light background
    
    const background = useTransform(
        smoothProgress,
        [0, 0.15, 0.35, 0.5],
        [
            '#15484C',           // Malachite — deep, grounded
            '#1a5a5e',           // Lagoon-tinted Malachite
            '#f8f5f2',           // Warm cream (neutral canvas)
            '#ffffff',           // Pure light for content sections
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

            {/* Gradient overlay for depth (Lagoon → Bubblegum subtle shift) */}
            <motion.div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: -9,
                    opacity: gradientOpacity,
                    background: useTransform(
                        smoothProgress,
                        [0, 0.25],
                        [
                            'radial-gradient(ellipse at 30% 20%, rgba(48, 184, 178, 0.15) 0%, transparent 50%)',
                            'radial-gradient(ellipse at 70% 80%, rgba(246, 100, 131, 0.08) 0%, transparent 50%)',
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
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(21, 72, 76, 0.15) 100%)',
                }}
                aria-hidden="true"
            />
        </>
    );
}