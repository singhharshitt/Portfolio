import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export default function useSectionTheme(sectionRef, themeColors) {
    const isInView = useInView(sectionRef, { amount: 0.5 });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!sectionRef.current) return;

        const handleScroll = () => {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;

            // Calculate progress through section (0 to 1)
            const scrollProgress = Math.max(0, Math.min(1,
                (windowHeight - rect.top) / (windowHeight + sectionHeight)
            ));

            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial calculation
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionRef]);

    return { isInView, progress };
}
