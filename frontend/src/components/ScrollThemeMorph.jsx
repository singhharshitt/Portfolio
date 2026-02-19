import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollThemeMorph — Smooth color transition between hero and body
 * Fixed overlay that interpolates from terracotta (#B54A3F) to light background (#F2F7F2)
 * over the first 100vh of scroll. Zero re-renders (pure useTransform).
 */
export default function ScrollThemeMorph() {
    const { scrollYProgress } = useScroll();

    // Morph from hero terracotta to body cream over 0-15% scroll
    const background = useTransform(
        scrollYProgress,
        [0, 0.12],
        ['#B54A3F', '#F2F7F2']
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.15],
        [1, 1, 0]
    );

    return (
        <motion.div
            className="fixed inset-0 -z-5 pointer-events-none"
            style={{ background, opacity }}
            aria-hidden="true"
        />
    );
}
