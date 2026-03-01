import { useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import useReducedMotion from './useReducedMotion';

/**
 * useScrollReveal — Scroll-triggered animation reveal
 * 
 * Returns { ref, controls, isInView } — components define their OWN variants.
 * This hook only manages the trigger lifecycle.
 * 
 * Usage:
 *   const { ref, controls, isInView } = useScrollReveal();
 *   
 *   <motion.div
 *     ref={ref}
 *     initial="hidden"
 *     animate={controls}
 *     variants={myVariants}  // define in component
 *   />
 * 
 * Options:
 *   once: boolean (default true) — animate only first time
 *   amount: number (default 0.2) — intersection threshold
 *   rootMargin: string (default "0px 0px -100px 0px") — trigger earlier
 */
export default function useScrollReveal({
    once = true,
    amount = 0.2,
    rootMargin = '0px 0px -100px 0px',
} = {}) {
    const ref = useRef(null);
    const controls = useAnimation();
    const reduced = useReducedMotion();

    const isInView = useInView(ref, {
        once,
        amount,
        margin: rootMargin,
    });

    // Trigger animation when in view
    if (isInView) {
        if (reduced) {
            controls.set('visible'); // Instant — no animation
        } else {
            controls.start('visible');
        }
    } else if (!once) {
        controls.start('hidden');
    }

    return { ref, controls, isInView };
}
