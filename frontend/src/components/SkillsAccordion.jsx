import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * SkillsAccordion — Expandable skills list with project preview
 * - Border-bottom separators
 * - Expand on click with height transition (500ms)
 * - Active: left border accent orange-400
 * - Optional project preview image on expand
 */
export default function SkillsAccordion({ skills = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const itemRevealVariants = {
        hidden: { opacity: 0, y: 14 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: 'easeOut', delay: index * 0.06 },
        }),
    };

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full rounded-2xl border border-sand-200/80 bg-sand-100/45 overflow-hidden">
            {skills.map((skill, index) => {
                const isActive = activeIndex === index;

                return (
                    <motion.div
                        key={skill.id || index}
                        custom={index}
                        variants={itemRevealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className={`border-b border-sand-200/90 border-l-4 transition-all duration-300 ${isActive ? 'border-l-orange-400 bg-white/65' : 'border-l-transparent hover:border-l-orange-400/70 hover:bg-white/45'
                            }`}
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between gap-4 py-5 px-3 sm:px-4 text-left focus-ring group cursor-pointer"
                            aria-expanded={isActive}
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                {skill.icon && (
                                    <span className="text-2xl text-bronze-400 group-hover:text-orange-400 transition-colors">
                                        {skill.icon}
                                    </span>
                                )}
                                <div className="min-w-0">
                                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-charcoal group-hover:text-orange-400 transition-colors leading-snug">
                                        {skill.title}
                                    </h3>
                                    {skill.subtitle && (
                                        <p className="text-sm text-bronze-400/95 mt-1 leading-relaxed">{skill.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            <motion.div
                                animate={{ rotate: isActive ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className={`w-6 h-6 transition-colors ${isActive ? 'text-orange-400' : 'text-bronze-400'}`} />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-6 px-3 sm:px-4 flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed mb-4">
                                                {skill.description}
                                            </p>
                                            {skill.technologies && (
                                                <div className="flex flex-wrap gap-2.5">
                                                    {skill.technologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-sand-200/85 border border-sand-300/80 text-charcoal text-xs font-medium rounded-full"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {skill.previewImage && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.4 }}
                                                className="w-full md:w-48 aspect-[4/3] rounded-xl overflow-hidden border border-sand-200/80 shadow-sm"
                                            >
                                                <img
                                                    src={skill.previewImage}
                                                    alt={`${skill.title} preview`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
