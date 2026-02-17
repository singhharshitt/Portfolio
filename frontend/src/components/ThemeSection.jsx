import { useEffect, useRef } from 'react';

/**
 * ThemeSection — Theme-aware section container
 * Uses IntersectionObserver to toggle body data-theme between light/dark
 * Provides smooth 600ms CSS variable-based transitions
 */
export default function ThemeSection({ children, theme = 'light', className = '', id, ...props }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    document.body.setAttribute('data-theme', theme);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            // Reset to light when unmounting
            if (document.body.getAttribute('data-theme') === theme) {
                document.body.setAttribute('data-theme', 'light');
            }
        };
    }, [theme]);

    const bgClass = theme === 'dark' ? 'bg-[#252627] text-[#F7F4F3]' : 'bg-[#F7F4F3] text-[#252627]';

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`theme-section min-h-screen ${bgClass} ${className}`}
            {...props}
        >
            {children}
        </section>
    );
}
