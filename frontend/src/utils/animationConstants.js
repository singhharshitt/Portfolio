/**
 * animationConstants.js — Shared timing, easing, and spring configs
 * Single source of truth for all animation parameters.
 * Import these instead of defining ad-hoc values in components.
 */

// Premium cinematic easing — smooth entrance with slight deceleration
export const EASE_PREMIUM = [0.25, 0.1, 0.25, 1.0];

// Ultra-smooth easing for parallax and continuous transforms
export const EASE_SMOOTH = [0.16, 1, 0.3, 1];

// Dramatic easing for hero entrances
export const EASE_DRAMATIC = [0.87, 0, 0.13, 1];

// ------- Durations -------

export const DURATION_REVEAL = 0.8;       // Scroll-triggered reveals
export const DURATION_ENTRANCE = 1.0;     // Hero/page entrances
export const DURATION_HOVER = 0.35;       // Hover/interaction feedback
export const DURATION_TRANSITION = 0.5;   // Section transitions

// ------- Staggers -------

export const STAGGER_CHILDREN = 0.1;      // Default child stagger
export const STAGGER_FAST = 0.05;         // Dense lists (tech tags, etc.)
export const STAGGER_LINES = 0.15;        // Line-by-line text reveal

// ------- Spring Configs -------

// Bouncy spring for buttons, toggles, interactive feedback
export const SPRING_BOUNCE = { stiffness: 200, damping: 15 };

// Smooth spring for parallax, scroll-driven transforms
export const SPRING_SMOOTH = { stiffness: 100, damping: 30 };

// Gentle spring for large elements (cards, sections)
export const SPRING_GENTLE = { stiffness: 80, damping: 20, mass: 0.5 };

// ------- Breakpoints -------

export const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
};

// ------- Parallax Multipliers -------

export const PARALLAX_MULTIPLIER = {
    mobile: 0.3,   // <768px — very subtle
    tablet: 0.6,   // 768-1024px
    desktop: 1.0,  // >1024px — full effect
};
