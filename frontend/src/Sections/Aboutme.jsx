

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
            className="relative py-24 lg:py-32 bg-sand-100 overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sand-200/30 to-transparent" />

            <div className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Column - Image */}
                    <div
                        className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                            }`}
                    >
                        <div className="relative">
                            {/* Main image */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                                <img
                                    src={me}
                                    alt="Portrait"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                            </div>

                            {/* Floating card */}
                            <div
                                className={`absolute -bottom-6 -right-6 lg:-right-12 bg-white rounded-xl p-6 shadow-xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                        className={`transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                            }`}
                    >
                        {/* Scroll-based Intro */}
                        {/* <div className="mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="font-snpro font-bold text-2xl text-charcoal mb-1">
                                    Hey, I am <span className="text-orange-400">Harshit</span>
                                </h3>
                                <h2 className="lexend-exa-bold text-3xl sm:text-4xl text-charcoal">
                                    FULL STACK DEVELOPER
                                </h2>
                            </motion.div>
                        </div> */}

                        {/* Section label */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  mb-6">
                            {/* <span className="w-2 h-2 bg-orange-400 rounded-full" /> */}
                            {/* <span className="text-sm font-medium text-charcoal/70">About Me</span> */}
                            <motion.h2
                                className="text-2xl sm:text-3xl lg:text-5xl lexend-exa-bold  text-charcoal/70"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                ABOUT ME<span className="text-orange-400">.</span>
                            </motion.h2>
                        </div>

                        {/* Heading */}
                        {/* <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
                            Passionate about creating{' '}
                            <span className="text-orange-400">meaningful</span> digital experiences
                        </h2> */}
                        <motion.div
                        // initial={{ opacity: 0, y: 20 }}
                        // whileInView={{ opacity: 1, y: 0 }}
                        // viewport={{ once: false, amount: 0.5 }}
                        // transition={{ duration: 0.5 }}
                        >
                            <h3 className="font-serif  text-3xl text-charcoal mb-1">
                                Hey, I am <span className="text-orange-400">Harshit</span>
                            </h3>
                            <h2 className="lexend-exa-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
                                FULL STACK DEVELOPER
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <div className="space-y-4 text-charcoal/70 mb-10">
                            <p className="text-lg leading-relaxed">
                                with over 3 years of experience
                                crafting digital products that make a difference. My approach combines
                                technical expertise with a keen eye for design, ensuring every project
                                is both functional and beautiful.
                            </p>
                            <p className="text-lg leading-relaxed">
                                I believe in the power of thoughtful design and clean code to solve
                                real problems. Whether it's a complex web application or a simple
                                landing page, I bring the same level of dedication and attention to detail.
                            </p>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.title}
                                    className={`group p-5 rounded-xl bg-sand-200/30 hover:bg-white hover:shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
