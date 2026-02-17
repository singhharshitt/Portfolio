import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * StaggeredText — Splits text into lines and reveals with stagger
 * Each line: opacity 0 → 1, translateY 40px → 0
 * Stagger: 100ms, duration: 600ms, easing: cubic-bezier(0.4, 0, 0.2, 1)
 */
export default function StaggeredText({
    text,
    as: Tag = 'h2',
    className = '',
    stagger = 0.1,
    duration = 0.6,
    once = true,
    splitBy = 'line', // 'line' splits on \n, 'word' splits on space
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.3 });

    const lines = splitBy === 'word' ? text.split(' ') : text.split('\n');

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
            },
        },
    };

    const lineVariants = {
        hidden: {
            opacity: 0,
            y: 40,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {lines.map((line, index) => (
                <motion.span
                    key={index}
                    variants={lineVariants}
                    className="block overflow-hidden"
                >
                    <Tag className="inline-block" style={{ margin: 0 }}>
                        {splitBy === 'word' ? (
                            <>{line}{index < lines.length - 1 ? '\u00A0' : ''}</>
                        ) : (
                            line
                        )}
                    </Tag>
                </motion.span>
            ))}
        </motion.div>
    );
}
