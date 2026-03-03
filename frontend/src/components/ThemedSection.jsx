import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ThemedSection({
    children,
    className = '',
    theme = 'light', // 'light' | 'olive' | 'cream'
    id
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Background color morphing based on theme
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        theme === 'olive'
            ? ['rgba(251, 249, 246, 1)', 'rgba(92, 107, 62, 1)', 'rgba(92, 107, 62, 1)']
            : theme === 'cream'
                ? ['rgba(251, 249, 246, 1)', 'rgba(254, 250, 240, 1)', 'rgba(254, 250, 240, 1)']
                : ['rgba(251, 249, 246, 1)', 'rgba(245, 240, 232, 1)', 'rgba(245, 240, 232, 1)']
    );

    return (
        <motion.section
            ref={ref}
            id={id}
            className={`relative min-h-screen ${className}`}
            style={{ backgroundColor: bgColor }}
        >
            {children}
        </motion.section>
    );
}
