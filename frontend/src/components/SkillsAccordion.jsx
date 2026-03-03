import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function SkillsAccordion({ skills = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {skills.map((skill, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={skill.id || skill.title}
            className="border-b border-[#6B6B6B]/20"
            style={{ backgroundColor: isOpen ? '#E8EDE4' : 'transparent' }}
          >
            <button
              onClick={() => setActiveIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#2D2D2D]">{skill.title}</h3>
                {skill.subtitle && <p className="mt-1 text-sm text-[#6B6B6B]">{skill.subtitle}</p>}
              </div>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
                <ChevronDown className="h-5 w-5 text-[#6B7B3C]" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6">
                    <p className="max-w-3xl text-[16px] leading-7 text-[#5C5C5C]">{skill.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(skill.technologies || []).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full px-3 py-1 text-xs font-medium"
                          style={{ backgroundColor: 'rgba(199, 91, 46, 0.1)', color: '#C75B2E' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
