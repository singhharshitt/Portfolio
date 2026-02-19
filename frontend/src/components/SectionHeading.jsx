import { motion } from 'framer-motion';

/**
 * SectionHeading — Reusable animated section title
 * Slides in from left with opacity fade
 * Props:
 *   text — heading text
 *   className — extra classes
 */
export default function SectionHeading({ text, className = '' }) {
    return (
        <motion.h2
            className={`text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8 text-[#3E000D] ${className}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {text}<span className="text-[var(--app-accent-primary)]">.</span>
        </motion.h2>
    );
}
