import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

// Strict color palette
const THEME = {
  bubblegum: '#F66483',
  marigold: '#C877BF',
  lagoon: '#30B8B2',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  cream: '#F5F0E8',
  charcoal: '#1A1A1A',
  gold: '#F7B05B',
};

// Cinematic easing
const EASE = [0.16, 1, 0.3, 1];

export default function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  magneticStrength = 0.15,
  glowColor = THEME.lagoon,
}) {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics for smooth magnetic effect
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * magneticStrength);
    y.set((e.clientY - centerY) * magneticStrength);
  }, [magneticStrength, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Base styles object
  const baseStyles = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '9999px',
    padding: '1rem 2rem',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    border: '2px solid',
    transition: `color 0.5s cubic-bezier(${EASE.join(',')})`,
  };

  // Variant styles
  const variantStyles = variant === 'primary' ? {
    borderColor: 'var(--theme-text-current, #1A1A1A)',
    color: isHovered ? '#F5F0E8' : 'var(--theme-text-current, #1A1A1A)',
  } : {
    borderColor: 'var(--theme-text-current, #1A1A1A)',
    color: isHovered ? '#F5F0E8' : 'var(--theme-text-current, #1A1A1A)',
  };

  // Merge all button styles
  const buttonStyles = {
    ...baseStyles,
    ...variantStyles,
  };

  const Tag = href ? motion.a : motion.button;

  const linkProps = href ? {
    href,
    target: href.startsWith('http') ? '_blank' : undefined,
    rel: href.startsWith('http') ? 'noopener noreferrer' : undefined
  } : {};

  return (
    <motion.div
      style={{
        x,
        y,
        display: 'inline-block',
      }}
    >
      <Tag
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={buttonStyles}
        className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[${THEME.lagoon}]/50 ${className}`}
        whileTap={{ scale: 0.98 }}
        {...linkProps}
      >
        {/* Glow backdrop */}
        <span
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '9999px',
            opacity: isHovered ? 0.3 : 0,
            background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
            filter: 'blur(8px)',
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Fill sweep background */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--theme-accent-primary, #F7B05B)',
            transformOrigin: 'left',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 0.5s cubic-bezier(${EASE.join(',')})`,
            zIndex: 1,
          }}
        />

        {/* Shine effect */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: isHovered ? '200%' : '-100%',
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transform: 'skewX(-20deg)',
            transition: 'left 0.6s ease',
            zIndex: 2,
          }}
        />

        {/* Content */}
        <span
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === 'svg') {
              return (
                <span
                  style={{
                    display: 'inline-flex',
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'rotate(0deg)' : 'rotate(-45deg)',
                  }}
                >
                  {child}
                </span>
              );
            }
            return child;
          })}
        </span>
      </Tag>
    </motion.div>
  );
}