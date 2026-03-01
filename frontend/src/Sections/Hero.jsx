import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import CircularText from '../components/CircularText.jsx';
import useReducedMotion from '../hooks/useReducedMotion';
import {
    EASE_PREMIUM,
    EASE_SMOOTH,
    DURATION_ENTRANCE,
    STAGGER_LINES,
    SPRING_BOUNCE,
} from '../utils/animationConstants';

// Animated counter component
function AnimatedCounter({ value, suffix = '', delay = 0 }) {
    const reduced = useReducedMotion();
    const count = useMotionValue(0);
    const numericValue = parseInt(value, 10) || 0;
    const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
    const [display, setDisplay] = useState(`0${suffix}`);

    useEffect(() => {
        const unsub = rounded.on('change', (v) => setDisplay(v));
        return unsub;
    }, [rounded]);

    useEffect(() => {
        if (reduced) {
            count.set(numericValue);
            return;
        }
        const timer = setTimeout(() => {
            animate(count, numericValue, {
                duration: 1.5,
                ease: EASE_SMOOTH,
            });
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [numericValue, delay, reduced, count]);

    return display;
}

// Line-reveal component — accessible, no word splitting
function LineReveal({ children, delay = 0, className = '' }) {
    const reduced = useReducedMotion();

    return (
        <div className="overflow-hidden">
            <motion.div
                className={className}
                initial={reduced ? {} : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                    duration: DURATION_ENTRANCE,
                    delay,
                    ease: EASE_PREMIUM,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

export default function Hero() {
    const heroRef = useRef(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;

            heroRef.current.style.setProperty('--mouse-x', `${x}px`);
            heroRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToProjects = () => {
        const element = document.getElementById('projects-showcase');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                '--mouse-x': '0px',
                '--mouse-y': '0px',
                background: 'linear-gradient(160deg, #F5F0E8 0%, #E9E2D6 30%, #D4C4B0 70%, rgba(194,116,58,0.15) 100%)',
            }}
        >
            {/* Background — fades in first */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={reduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Terracotta overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 80%, rgba(194,116,58,0.12) 0%, transparent 70%)',
                    }}
                />

                {/* Gradient orbs — warm parchment */}
                <div
                    className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        backgroundColor: 'rgba(194, 116, 58, 0.15)',
                        transform: 'translate(var(--mouse-x), var(--mouse-y))',
                    }}
                />
                <div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        backgroundColor: 'rgba(201, 166, 107, 0.1)',
                        transform: 'translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))',
                    }}
                />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #4A4A3A 1px, transparent 1px),
              linear-gradient(to bottom, #4A4A3A 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </motion.div>

            {/* Content — orchestrated stagger */}
            <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">

                {/* Badge — appears first */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                    style={{ backgroundColor: 'rgba(194, 116, 58, 0.12)', border: '1px solid rgba(194, 116, 58, 0.25)' }}
                    initial={reduced ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
                >
                    <Sparkles className="w-4 h-4" style={{ color: '#C9A66B' }} />
                    <span className="text-sm font-medium" style={{ color: '#4A4A3A' }}>
                        Available for freelance work
                    </span>
                </motion.div>

                {/* Main Headline — line-by-line reveal */}
                <h1
                    className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-6"
                    style={{ color: '#4A4A3A' }}
                >
                    <LineReveal delay={0.5}>
                        Crafting digital
                    </LineReveal>
                    <LineReveal delay={0.5 + STAGGER_LINES} className="relative inline-block">
                        <span className="relative inline-block">
                            experiences
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 400 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                            >
                                <motion.path
                                    d="M2 8C100 2 300 2 398 8"
                                    stroke="#C9A66B"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, delay: 1.0, ease: EASE_SMOOTH }}
                                />
                            </svg>
                        </span>
                    </LineReveal>
                </h1>

                {/* Subtitle — fades in after title */}
                <motion.p
                    className="text-lg sm:text-xl max-w-2xl mx-auto mb-12"
                    style={{ color: '#8A8570' }}
                    initial={reduced ? {} : { opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 0.9, ease: EASE_PREMIUM }}
                >
                    I'm a full-stack developer and UI/UX designer passionate about creating
                    beautiful, functional, and user-centered digital experiences.
                </motion.p>

                {/* CTA Buttons — spring bounce */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={reduced ? {} : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 1.1,
                        type: 'spring',
                        ...SPRING_BOUNCE,
                    }}
                >
                    <button
                        onClick={scrollToProjects}
                        className="group relative px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50 overflow-hidden"
                        style={{ backgroundColor: '#C2743A', color: '#F5F0E8' }}
                    >
                        <span className="absolute inset-0 bg-[#D4844A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                        <span className="relative flex items-center gap-2">
                            View My Work
                            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                        </span>
                    </button>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 border-2 rounded-full font-medium transition-all duration-300 hover:border-[#C2743A] hover:text-[#C2743A] hover:bg-[#C2743A]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]/50"
                        style={{ borderColor: '#B7B77A', color: '#4A4A3A' }}
                    >
                        Get in Touch
                    </a>
                </motion.div>

                {/* Stats — animated counters */}
                <motion.div
                    className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                    initial={reduced ? {} : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.3, ease: EASE_PREMIUM }}
                >
                    {[
                        { value: '3', suffix: '+', label: 'Years Experience', delay: 1.5 },
                        { value: '5', suffix: '+', label: 'Projects Completed', delay: 1.65 },
                        { value: '2', suffix: '+', label: 'Happy Clients', delay: 1.8 },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl sm:text-3xl font-serif font-bold mb-1" style={{ color: '#4A4A3A' }}>
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                            </div>
                            <div className="text-xs sm:text-sm" style={{ color: '#8A8570' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Decorative circular text */}
                <div className="hidden lg:block absolute right-0 bottom-8 text-[#4A4A3A]/20">
                    <CircularText text="DEVELOPER · DESIGNER · CREATOR · " size={160} />
                </div>
            </div>

        </section>
    );
}
