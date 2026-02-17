import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * PaperPlane - Main scroll-following paper plane animation
 * Flies smoothly from section to section with curved path and physics-based motion
 */
const PaperPlane = ({ sections = [] }) => {
    const [sectionPositions, setSectionPositions] = useState([]);
    const [currentSection, setCurrentSection] = useState(0);
    const planeRef = useRef(null);

    const { scrollYProgress } = useScroll();

    // Calculate section positions on mount and resize
    useEffect(() => {
        const calculatePositions = () => {
            const positions = sections.map((sectionId) => {
                const element = document.getElementById(sectionId);
                if (!element) return null;

                const rect = element.getBoundingClientRect();
                const scrollY = window.scrollY || window.pageYOffset;

                // Target the heading within the section
                const heading = element.querySelector('h2, h1');
                const headingRect = heading ? heading.getBoundingClientRect() : rect;

                return {
                    id: sectionId,
                    top: rect.top + scrollY,
                    headingX: headingRect.left + headingRect.width / 2,
                    headingY: headingRect.top + scrollY + headingRect.height / 2,
                };
            }).filter(Boolean);

            setSectionPositions(positions);
        };

        calculatePositions();
        window.addEventListener('resize', calculatePositions);
        // Recalculate after images load
        setTimeout(calculatePositions, 1000);

        return () => window.removeEventListener('resize', calculatePositions);
    }, [sections]);

    // Determine current section based on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (progress) => {
            const scrollY = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

            let newSection = 0;
            for (let i = 0; i < sectionPositions.length; i++) {
                if (scrollY >= sectionPositions[i].top - window.innerHeight / 2) {
                    newSection = i;
                }
            }
            setCurrentSection(newSection);
        });

        return () => unsubscribe();
    }, [scrollYProgress, sectionPositions]);

    // Calculate plane position with curved path
    const progress = useTransform(scrollYProgress, [0, 1], [0, sectionPositions.length - 1]);
    const smoothProgress = useSpring(progress, {
        stiffness: 50,
        damping: 20,
        mass: 0.5,
    });

    // Calculate position along curved Bezier path
    const getPosition = (t) => {
        if (sectionPositions.length === 0) return { x: 0, y: 0 };

        const index = Math.min(Math.floor(t), sectionPositions.length - 2);
        const localT = t - index;

        const start = sectionPositions[index] || sectionPositions[0];
        const end = sectionPositions[index + 1] || start;

        // Bezier curve control points for smooth curved path
        const controlX = (start.headingX + end.headingX) / 2 + 100;
        const controlY = (start.headingY + end.headingY) / 2;

        // Quadratic Bezier formula
        const x =
            Math.pow(1 - localT, 2) * start.headingX +
            2 * (1 - localT) * localT * controlX +
            Math.pow(localT, 2) * end.headingX;

        const y =
            Math.pow(1 - localT, 2) * start.headingY +
            2 * (1 - localT) * localT * controlY +
            Math.pow(localT, 2) * end.headingY;

        return { x, y };
    };

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const prevPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (value) => {
            const newPos = getPosition(value);
            setPosition(newPos);

            // Calculate rotation based on direction
            const dx = newPos.x - prevPosition.current.x;
            const dy = newPos.y - prevPosition.current.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            setRotation(angle);

            prevPosition.current = newPos;
        });

        return () => unsubscribe();
    }, [smoothProgress, sectionPositions]);

    // Hide on very top or if no sections
    const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

    if (sectionPositions.length === 0) return null;

    return (
        <motion.div
            ref={planeRef}
            className="fixed pointer-events-none z-50"
            style={{
                left: position.x,
                top: position.y,
                opacity,
                x: '-50%',
                y: '-50%',
            }}
        >
            <motion.div
                style={{
                    rotate: rotation,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                }}
            >
                {/* Paper Plane SVG */}
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                    }}
                >
                    <defs>
                        <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FE621D" />
                            <stop offset="100%" stopColor="#FD5200" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                        fill="url(#planeGradient)"
                    />
                    <path
                        d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                        fill="#FFF"
                        opacity="0.3"
                        style={{
                            filter: 'blur(2px)',
                        }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};

export default PaperPlane;
