import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isConfigured = false;

export function configureGsap() {
  if (isConfigured) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    start: 'top 80%',
  });

  isConfigured = true;
}

export { gsap, ScrollTrigger };
