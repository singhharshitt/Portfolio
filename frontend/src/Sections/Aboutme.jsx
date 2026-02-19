

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb, Rocket } from 'lucide-react';
import me from '../assets/me.jpg';
const skills = [
    {
        icon: Code2,
        title: 'Development',
        description: 'Building robust, scalable applications with modern technologies.',
    },
    {
        icon: Palette,
        title: 'Design',
        description: 'Creating beautiful, intuitive interfaces that users love.',
    },
    {
        icon: Lightbulb,
        title: 'Strategy',
        description: 'Solving complex problems with creative, effective solutions.',
    },
    {
        icon: Rocket,
        title: 'Performance',
        description: 'Optimizing for speed, accessibility, and user experience.',
    },
];

export default function Aboutme() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const revealTransitionClass = 'transition-all duration-700 ease-out';
    const descriptionTextClass = 'text-base sm:text-lg leading-relaxed';
    const skillCardClass = 'group p-5 rounded-xl border border-sand-200/70 bg-sand-200/35 hover:bg-white/90 hover:border-orange-400/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-24 lg:py-32 bg-sand-100 overflow-x-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sand-200/30 to-transparent" />
                <div className="absolute -top-16 -left-24 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl" />
                <div className="absolute -bottom-16 right-0 w-80 h-80 rounded-full bg-[var(--app-accent-secondary)]/10 blur-3xl" />
            </div>

            <div className="relative z-10 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    {/* Left Column - Image */}
                    <div
                        className={`relative min-w-0 ${revealTransitionClass} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="relative">
                            {/* Main image */}
                            <div
                                className="relative aspect-square w-full max-w-[420px] mx-auto lg:mx-0 rounded-2xl overflow-hidden group/img border border-[var(--app-accent-secondary)]/25 bg-sand-200/45 shadow-[0_20px_45px_rgba(47,16,0,0.22)] transition-transform duration-500 hover:scale-[1.02]"
                            >
                                <motion.img
                                    src={me}
                                    alt="Portrait"
                                    className="w-full h-full object-contain object-center transition-transform duration-500"
                                    loading="lazy"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                                <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-[var(--app-accent-primary)]/12" />
                            </div>

                            {/* Floating card */}
                            <div
                                className={`absolute z-20 bottom-3 right-3 sm:-bottom-5 sm:right-0 lg:-right-8 bg-sand-100/95 backdrop-blur-sm border border-sand-200 rounded-xl p-4 sm:p-6 shadow-xl max-w-[180px] sm:max-w-none transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-400/10 rounded-full flex items-center justify-center">
                                        <Rocket className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-serif font-bold text-charcoal">5+</div>
                                        <div className="text-sm text-charcoal/60">Years Experience</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-orange-400/20 rounded-xl -z-10" />
                            <div className="absolute -bottom-4 left-1/4 w-16 h-16 bg-sand-300/30 rounded-full blur-xl" />
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div
                        className={`min-w-0 ${revealTransitionClass} delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                            }`}
                    >

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-[0.18em] plus-jakarta-sans-semibold text-charcoal/70 bg-sand-200/60 border border-sand-300/70">
                                ABOUT ME
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mt-6 mb-2">
                                Hey, I am <span className="text-orange-400">Harshit</span>
                            </h3>
                            <h2 className="lexend-exa-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
                                FULL STACK DEVELOPER
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            className="space-y-4 text-charcoal/70 mb-10 max-w-xl"
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                        >
                            <p className={descriptionTextClass}>
                                With over 3 years of experience, I craft digital products that make a difference. My approach combines
                                technical expertise with a keen eye for design, ensuring every project
                                is both functional and beautiful.
                            </p>
                            <p className={descriptionTextClass}>
                                I believe in the power of thoughtful design and clean code to solve
                                real problems. Whether it's a complex web application or a simple
                                landing page, I bring the same level of dedication and attention to detail.
                            </p>
                        </motion.div>

                        {/* Skills Grid */}
                        <motion.div
                            className="grid sm:grid-cols-2 gap-6"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
                        >
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.title}
                                    className={`${skillCardClass} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                                >
                                    <div className="w-10 h-10 bg-orange-400/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-400 group-hover:scale-110 transition-all duration-300">
                                        <skill.icon className="w-5 h-5 text-orange-400 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-medium text-charcoal mb-1">{skill.title}</h3>
                                    <p className="text-sm text-charcoal/60">{skill.description}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
