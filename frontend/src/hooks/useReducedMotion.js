import { useState, useEffect } from 'react';

/**
 * useReducedMotion — Detects user's motion preference
 * Returns true if user prefers reduced motion.
 * 
 * Usage:
 *   const reduced = useReducedMotion();
 *   const variants = reduced
 *     ? { hidden: {}, visible: {} }
 *     : { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } };
 */
export default function useReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mql.matches);

        const handler = (e) => setPrefersReduced(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
}
