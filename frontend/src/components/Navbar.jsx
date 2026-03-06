import React, { memo, useState, useEffect, useCallback } from 'react';
import { motion } from '../utils/motion';
import MenuOverlay from './MenuOverlay';
import { HamburgerButton } from './HamburgerButton';

function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavigate = useCallback((section) => {
    closeMenu();
    setTimeout(() => onNavigate?.(section), 300);
  }, [closeMenu, onNavigate]);

  return (
    <>

      <header
        className="fixed top-0 left-0 right-0 z-50"
      >


        <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <nav className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo with Magnetic Effect */}
            <a
              href="#hero">
              <div
                className="relative"

              >
                <h1 className="font-fliege text-3xl lg:text-4xl font-extrabold tracking-tight">
                  <span className={`
                    transition-colors duration-500
                    ${isMenuOpen ? 'text-[#FFFBEB]' : 'text-[#1a1a1a]'}
                  `}>
                    HARSHIT
                  </span>
                  <span
                    className="font-snpro text-5xl lg:text-6xl inline-block"

                  >
                    .
                  </span>
                </h1>


                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#5D0D18]" // Bloodstone
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
