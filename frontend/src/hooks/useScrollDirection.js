import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useScrollDirection — Pure scroll direction detection
 * 
 * Returns:
 *   direction: 'up' | 'down' | null
 *   isAtTop: boolean (within topThreshold of page top)
 *   scrollY: number (current scroll position)
 * 
 * Config:
 *   threshold: minimum px delta to register direction change (default: 10)
 *   topThreshold: px from top to consider "at top" (default: 50)
 */
export default function useScrollDirection({
    threshold = 10,
    topThreshold = 50,
} = {}) {
    const [direction, setDirection] = useState(null);
    const [isAtTop, setIsAtTop] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const timeoutRef = useRef(null);

    const update = useCallback(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        setScrollY(currentY);
        setIsAtTop(currentY <= topThreshold);

        // Only change direction if delta exceeds threshold
        if (Math.abs(delta) >= threshold) {
            // Debounce direction change by 100ms
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setDirection(delta > 0 ? 'down' : 'up');
            }, 100);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
    }, [threshold, topThreshold]);

    useEffect(() => {
        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(update);
            }
        };

        // Set initial state
        lastScrollY.current = window.scrollY;
        setScrollY(window.scrollY);
        setIsAtTop(window.scrollY <= topThreshold);

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [update, topThreshold]);

    return { direction, isAtTop, scrollY };
}
