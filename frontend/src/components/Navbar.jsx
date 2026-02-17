import { useState, useEffect, useCallback } from 'react';
import MenuOverlay from './MenuOverlay';
import { HamburgerButton } from './HamburgerButton';
export default function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    // Small delay to let menu close animation start
    setTimeout(() => {
      onNavigate?.(section);
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }, [closeMenu, onNavigate]);

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled && !isMenuOpen
          ? 'bg-sand-100/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
          }`}
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
                  : 'text-charcoal'
                  }`}
              >
                <h1 className=" font-fliege text-4xl lg:text-[40px] font-extrabold">
                  HARSHIT
                  <span className="font-snpro text-orange-400 text-5xl">.</span>
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
      </header>

      {/* Full-Screen Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onNavigate={handleNavigate}
      />
    </>
  );
}
