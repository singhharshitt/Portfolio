import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function ThemeWipe({ sectionIds = [] }) {
    const [isWiping, setIsWiping] = useState(false);
    const [wipeColor, setWipeColor] = useState('var(--app-bg-main)');
    const prevSection = useRef(null);

    useEffect(() => {
        if (sectionIds.length === 0) return;

        const observers = [];

        sectionIds.forEach((sectionId) => {
            const el = document.getElementById(sectionId.id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && prevSection.current !== sectionId.id) {
                        // Only wipe when transitioning between different themed sections
                        if (prevSection.current) {
                            const prevTheme = sectionIds.find(s => s.id === prevSection.current)?.theme;
                            if (prevTheme !== sectionId.theme) {
                                setWipeColor(sectionId.theme === 'dark' ? 'var(--app-bg-main, #B54A3F)' : 'var(--app-bg-light, #F2F7F2)');
                                setIsWiping(true);
                                setTimeout(() => setIsWiping(false), 600);
                            }
                        }
                        prevSection.current = sectionId.id;
                    }
                },
                { threshold: 0.5 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, [sectionIds]);

    return (
        <AnimatePresence>
            {isWiping && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    style={{ backgroundColor: wipeColor, transformOrigin: 'center' }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
            )}
        </AnimatePresence>
    );
}
