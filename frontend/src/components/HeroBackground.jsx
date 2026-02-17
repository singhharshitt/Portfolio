import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroBackground - Animated gradient background with warm tones
 * Features: slow-moving radial gradients, subtle floating abstract lines
 */
const HeroBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Slow-moving warm gradient animation */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(220, 196, 142, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(216, 74, 5, 0.06) 0%, transparent 60%)
          `,
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Subtle floating abstract lines (SVG) */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.03]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#D84A05" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Abstract curved lines */}
                <motion.path
                    d="M0,200 Q400,100 800,200 T1600,200"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                />
                <motion.path
                    d="M0,400 Q500,300 1000,400 T2000,400"
                    stroke="url(#lineGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 4, delay: 0.5, ease: 'easeInOut' }}
                />
            </svg>
        </div>
    );
};

export default HeroBackground;
