import { useRef, useState, useEffect } from 'react';

/**
 * useInViewport — Simple boolean visibility hook (no animation controls)
 * 
 * Lighter than useScrollReveal — for pausing RAF loops, lazy loading, 
 * triggering progress lines, etc.
 * 
 * Usage:
 *   const { ref, isInViewport } = useInViewport();
 *   
 *   useEffect(() => {
 *     if (!isInViewport) cancelAnimationFrame(rafId);
 *   }, [isInViewport]);
 * 
 * Options:
 *   threshold: number (default 0) — how much must be visible
 *   rootMargin: string (default "0px")
 *   once: boolean (default false) — if true, stays true after first trigger
 */
export default function useInViewport({
    threshold = 0,
    rootMargin = '0px',
    once = false,
} = {}) {
    const ref = useRef(null);
    const [isInViewport, setIsInViewport] = useState(false);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If already triggered and once=true, skip
        if (once && triggered.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const visible = entry.isIntersecting;
                setIsInViewport(visible);
                if (visible && once) {
                    triggered.current = true;
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isInViewport };
}
