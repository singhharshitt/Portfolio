import { useScroll, useTransform, useSpring } from 'framer-motion';

export default function useParallax(speed = 0.5, direction = 'up') {
    const { scrollY } = useScroll();

    // Raw value
    const rawValue = useTransform(
        scrollY,
        [0, 1000],
        direction === 'up' ? [0, -1000 * speed] : [0, 1000 * speed]
    );

    // CRITICAL: Lower stiffness for smoother tracking
    const smoothValue = useSpring(rawValue, {
        stiffness: 50,    // Lower = smoother (was 100)
        damping: 20,      // Higher = less oscillation
        mass: 0.5,        // Lower = more responsive
        restDelta: 0.001
    });

    return smoothValue;
}
