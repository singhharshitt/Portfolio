import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import MenuOverlay from './MenuOverlay';
import { HamburgerButton } from './HamburgerButton';
import useScrollDirection from '../hooks/useScrollDirection';
import { EASE_PREMIUM, BREAKPOINTS } from '../utils/animationConstants';

export default function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { direction, isAtTop } = useScrollDirection({ threshold: 10, topThreshold: 50 });

  // Detect mobile — navbar never hides on mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleNavigate = useCallback((section) => {
    closeMenu();
    setTimeout(() => {
      onNavigate?.(section);
    }, 300);
  }, [closeMenu, onNavigate]);

  // Determine navbar visibility state
  // Mobile: always visible. Menu open: always visible.
  const shouldHide = !isMobile && !isMenuOpen && direction === 'down' && !isAtTop;
  const isScrolled = !isAtTop && !isMenuOpen;

  const navbarStyle = isScrolled
    ? { backgroundColor: 'var(--theme-navbar-bg)', boxShadow: 'var(--theme-shadow)' }
    : undefined;

  return (
    <>
      {/* Main Navbar — scroll-direction aware */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 ${isScrolled && !isMenuOpen
          ? 'backdrop-blur-md'
          : 'bg-transparent'
          }`}
        style={navbarStyle}
        initial={{ y: 0 }}
        animate={{
          y: shouldHide ? '-100%' : '0%',
        }}
        transition={{
          duration: 0.4,
          ease: EASE_PREMIUM,
        }}
      >
        <div className="w-full px-6 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('hero');
              }}
              className="relative z-50 group"
            >
              <span
                className={`text-xl lg:text-2xl font-bold tracking-wider transition-colors duration-300 ${isMenuOpen
                  ? 'text-sand-100'
                  : 'text-[var(--theme-text-current)]'
                  }`}
              >
                <h1 className=" font-fliege text-4xl lg:text-[40px] font-extrabold">
                  HARSHIT
                  <span className="font-snpro text-[var(--theme-accent-primary)] text-5xl">.</span>
                </h1>
              </span>
            </a>

            {/* Hamburger Button */}
            <HamburgerButton
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              isScrolled={isScrolled}
            />
          </nav>
        </div>
      </motion.header>

      {/* Full-Screen Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onNavigate={handleNavigate}
      />
    </>
  );
}
