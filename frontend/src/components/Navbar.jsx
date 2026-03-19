import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { motion } from '../utils/motion';
import MenuOverlay from './MenuOverlay';
import { HamburgerButton } from './HamburgerButton';
import useScrollNavbar from '../hooks/useScrollNavbar';

function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollFrameRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const showNavbar = useScrollNavbar({ threshold: 10, topAt: 50 });

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrameRef.current = null;
      const nextIsScrolled = window.scrollY > 50;
      setIsScrolled((current) => (current === nextIsScrolled ? current : nextIsScrolled));
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scroll when menu is open
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Wait for exit animation to complete before restoring scroll
      const timeoutId = setTimeout(() => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        // Restore scroll position
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
        }
      }, 310); // Match exit animation duration (300ms) + buffer
      return () => clearTimeout(timeoutId);
    }
    return () => {
      // Cleanup on unmount - ensure body is restored
      if (document.body.style.position === 'fixed') {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
        }
      }
    };
  }, [isMenuOpen]);

  // Clear animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = useCallback(() => {
    // Prevent toggle if animation is in progress
    if (isAnimating) return;

    setIsAnimating(true);
    setIsMenuOpen((prev) => !prev);

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Release animation lock after animation completes (350ms matches animation duration)
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 350);
  }, [isAnimating]);

  const closeMenu = useCallback(() => {
    // Prevent close if animation is in progress
    if (isAnimating || !isMenuOpen) return;

    setIsAnimating(true);
    setIsMenuOpen(false);

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Release animation lock after animation completes (300ms matches animation duration)
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, [isAnimating, isMenuOpen]);

  const handleNavigate = useCallback((section) => {
    // Give the exit animation full time to complete (300ms) before scrolling
    closeMenu();
    setTimeout(() => onNavigate?.(section), 325);
  }, [closeMenu, onNavigate]);

  const headerVisible = isMenuOpen || showNavbar;

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ease-out ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <nav className="flex h-20 items-center justify-between lg:h-24">
            <a href="#hero">
              <div className="relative">
                <h1 className="font-fliege text-3xl tracking-tight lg:text-4xl">
                  <span className={`transition-colors duration-500 ${isMenuOpen ? 'text-[#FFFFF0]' : isScrolled ? 'text-[#452215]' : 'text-[#FFFFF0]'}`}>
                    H
                  </span>
                  <span className="font-ui inline-block text-5xl text-[#FF9398] lg:text-6xl">.</span>
                </h1>

                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#49C5B6]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </a>

            <HamburgerButton
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              isScrolled={isScrolled}
            />
          </nav>
        </div>
      </header>

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default memo(Navbar);
