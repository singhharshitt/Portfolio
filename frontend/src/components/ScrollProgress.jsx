import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollProgress — Cinematic reading progress indicator
 * Features: Spring-smoothed motion, gradient accent, glow effect
 * Position: Fixed top, z-index above all content
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Spring physics for liquid-smooth progress (no jitter on fast scroll)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 25,
        restDelta: 0.0005,
    });

    const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

    // Gradient shift from Lagoon → Bubblegum as you read
    const gradientPosition = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        ['0%', '50%', '100%']
    );

    return (
        <>
            {/* Base progress bar — Lagoon with depth */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 origin-left z-100"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, #30B8B2 0%, #15484C 100%)',
                }}
                aria-hidden="true"
            />

            {/* Glow accent — subtle Bubblegum highlight at leading edge */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 origin-left z-101 opacity-60"
                style={{
                    scaleX,
                    background: useTransform(
                        gradientPosition,
                        (pos) => `linear-gradient(90deg, transparent ${pos}, #F66483 calc(${pos} + 20%), transparent calc(${pos} + 40%))`
                    ),
                    filter: 'blur(2px)',
                }}
                aria-hidden="true"
            />

            {/* Top edge shadow for depth (fades as you scroll) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-4 pointer-events-none z-99"
                style={{
                    background: 'linear-gradient(to bottom, rgba(21, 72, 76, 0.03), transparent)',
                    opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
                }}
                aria-hidden="true"
            />
        </>
    );
}