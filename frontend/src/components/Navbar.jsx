import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MenuOverlay from './MenuOverlay';
import { HamburgerButton } from './HamburgerButton';

export default function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);

  // Smooth scroll progress for micro-animations
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // Logo scale animation on scroll
  const logoScale = useTransform(smoothScrollY, [0, 100], [1, 0.85]);
  const logoOpacity = useTransform(smoothScrollY, [0, 100], [1, 0.9]);
  
  // Navbar background opacity based on scroll
  const navBgOpacity = useTransform(smoothScrollY, [0, 50, 100], [0, 0.5, 0.95]);
  const navBlur = useTransform(smoothScrollY, [0, 50], [0, 12]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40"
      >

        <div
          className="absolute inset-0 pointer-events-none"
         
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          
        />

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

            
            <motion.div
              
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <HamburgerButton
                isOpen={isMenuOpen}
                onClick={toggleMenu}
                isScrolled={isScrolled}
              />
            </motion.div>
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