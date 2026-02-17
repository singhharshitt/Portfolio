
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
    const heroRef = useRef(null);

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
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sand-100"
            style={{
                '--mouse-x': '0px',
                '--mouse-y': '0px',
            }}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <div
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        transform: 'translate(var(--mouse-x), var(--mouse-y))',
                    }}
                />
                <div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-bronze-400/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
                    style={{
                        transform: 'translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))',
                    }}
                />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #252627 1px, transparent 1px),
              linear-gradient(to bottom, #252627 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand-200/50 border border-sand-200 mb-8 animate-fade-in-up">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-charcoal/80">
                        Available for freelance work
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Crafting digital
                    <br />
                    <span className="relative inline-block">
                        experiences
                        <svg
                            className="absolute -bottom-2 left-0 w-full"
                            viewBox="0 0 400 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M2 8C100 2 300 2 398 8"
                                stroke="#F42B03"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="animate-[draw_1s_ease-out_0.5s_forwards]"
                                style={{
                                    strokeDasharray: 400,
                                    strokeDashoffset: 400,
                                }}
                            />
                        </svg>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-charcoal/60 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    I'm a full-stack developer and UI/UX designer passionate about creating
                    beautiful, functional, and user-centered digital experiences.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <button
                        onClick={scrollToProjects}
                        className="group px-8 py-4 bg-charcoal text-sand-100 rounded-full font-medium transition-all duration-300 hover:bg-orange-400 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
                    >
                        <span className="flex items-center gap-2">
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
                        className="px-8 py-4 border-2 border-charcoal/20 text-charcoal rounded-full font-medium transition-all duration-300 hover:border-orange-400 hover:text-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50"
                    >
                        Get in Touch
                    </a>
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    {[
                        { value: '3+', label: 'Years Experience' },
                        { value: '5+', label: 'Projects Completed' },
                        { value: '2+', label: 'Happy Clients' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-charcoal/50">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </section>
    );
}
