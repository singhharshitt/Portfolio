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

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            {skills.map((skill, index) => {
                const isActive = activeIndex === index;

                return (
                    <div
                        key={skill.id || index}
                        className={`border-b border-[#ECE2D0] transition-all duration-300 ${isActive ? 'border-l-4 border-l-orange-400 pl-4' : 'pl-0'
                            }`}
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between py-6 text-left focus-ring group cursor-pointer"
                            aria-expanded={isActive}
                        >
                            <div className="flex items-center gap-4">
                                {skill.icon && (
                                    <span className="text-2xl text-[#C69C72] group-hover:text-orange-400 transition-colors">
                                        {skill.icon}
                                    </span>
                                )}
                                <div>
                                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#252627] group-hover:text-orange-400 transition-colors">
                                        {skill.title}
                                    </h3>
                                    {skill.subtitle && (
                                        <p className="text-sm text-[#C69C72] mt-1">{skill.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            <motion.div
                                animate={{ rotate: isActive ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-6 h-6 text-[#C69C72]" />
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
                                    <div className="pb-6 flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <p className="text-[#252627]/80 leading-relaxed mb-4">
                                                {skill.description}
                                            </p>
                                            {skill.technologies && (
                                                <div className="flex flex-wrap gap-2">
                                                    {skill.technologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-[#ECE2D0] text-[#252627] text-xs font-medium rounded-full"
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
                                                className="w-full md:w-48 aspect-[4/3] rounded-xl overflow-hidden"
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
                    </div>
                );
            })}
        </div>
    );
}
