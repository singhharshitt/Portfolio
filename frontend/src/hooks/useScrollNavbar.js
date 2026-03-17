import { useState, useEffect, useRef, useCallback } from 'react';

export default function useScrollNavbar({ threshold = 10, topAt = 50 } = {}) {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const tickingRef = useRef(false);

  const update = useCallback(() => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY.current;

    if (currentY <= topAt) {
      setShowNavbar(true);
    } else if (Math.abs(delta) >= threshold) {
      setShowNavbar((curr) => {
        if (delta > 0 && curr) return false;
        if (delta < 0 && !curr) return true;
        return curr;
      });
    }

    lastScrollY.current = currentY;
    tickingRef.current = false;
  }, [threshold, topAt]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setShowNavbar(window.scrollY <= topAt);

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [update, topAt]);

  return showNavbar;
}
