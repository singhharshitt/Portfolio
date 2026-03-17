import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { motion } from '../utils/motion';
import MenuOverlay from './MenuOverlay';
import { HamburgerButton } from './HamburgerButton';
import useScrollNavbar from '../hooks/useScrollNavbar';

function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollFrameRef = useRef(null);
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
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavigate = useCallback((section) => {
    closeMenu();
    setTimeout(() => onNavigate?.(section), 300);
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
