import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Award, ExternalLink, ArrowUpRight } from 'lucide-react';
import useReducedMotion from '../hooks/useReducedMotion';
import useScrollReveal from '../hooks/useScrollReveal';
import { EASE_PREMIUM, EASE_SMOOTH, DURATION_REVEAL, STAGGER_CHILDREN } from '../utils/animationConstants';

// Warm Parchment palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  sage: '#B7B77A',
  olive: '#6E6B2F',
  sageBg: '#D4DDD4',
  cream: '#F5F0E8',
  textDark: '#4A4A3A',
  textMuted: '#8A8570',
};

const certificates = [
  {
    id: 1,
    title: "Meta Front-End Developer",
    issuer: "Coursera",
    date: "2024",
    description: "Professional certification covering React, JavaScript, HTML, CSS, and UI/UX principles.",
    link: "#",
    color: THEME.terracotta,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    issuer: "Udemy",
    date: "2023",
    description: "Deep dive into advanced React hooks, performance optimization, and robust component design.",
    link: "#",
    color: THEME.gold,
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    issuer: "Lovely Professional University",
    date: "2023",
    description: "Comprehensive coursework on MERN stack, database management, and server-side logic.",
    link: "#",
    color: THEME.sage,
  },
];

// Individual certificate card with 3D tilt
const CertificateCard = ({ cert, index }) => {
  const reduced = useReducedMotion();

  // 3D Tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60, rotateX: 8, scale: 0.95 },
        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.9, ease: EASE_PREMIUM } }
      }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={reduced ? { scale: 1.02, y: -4 } : { scale: 1.02, z: 20 }}
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        className="relative h-full"
      >
        {/* Animated glow backdrop */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${cert.color}40 0%, transparent 60%)`,
            transform: "translateZ(-20px)"
          }}
        />

        {/* Main card */}
        <div
          className="relative h-full flex flex-col p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden"
          style={{
            backgroundColor: 'rgba(245, 240, 232, 0.6)',
            borderColor: `${THEME.sage}50`,
          }}
        >
          {/* Glare effect */}
          {!reduced && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)`,
              }}
            />
          )}

          {/* Hover border */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ border: `1px solid ${cert.color}60` }}
          />

          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-6 right-6 h-px origin-left"
            style={{
              background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
              transform: 'scaleX(0)',
            }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-5" style={{ transform: "translateZ(30px)" }}>
            <motion.div
              className="p-3 rounded-xl transition-all duration-300"
              style={{ backgroundColor: `${cert.color}15` }}
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              <Award className="w-6 h-6 transition-colors duration-300" style={{ color: cert.color }} />
            </motion.div>

            <span
              className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${THEME.sage}20`, color: THEME.textDark }}
            >
              {cert.date}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-serif text-xl font-bold mb-2 transition-colors duration-300"
            style={{ color: THEME.textDark, transform: "translateZ(20px)" }}
          >
            <span className="group-hover:text-(--hover-color) transition-colors duration-300" style={{ '--hover-color': cert.color }}>
              {cert.title}
            </span>
          </h3>

          {/* Issuer */}
          <p
            className="text-sm font-medium mb-4 flex items-center gap-2"
            style={{ color: cert.color, transform: "translateZ(15px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
            {cert.issuer}
          </p>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6 line-clamp-3 grow"
            style={{ color: THEME.textMuted, transform: "translateZ(10px)" }}
          >
            {cert.description}
          </p>

          {/* CTA Link */}
          <motion.a
            href={cert.link}
            className="mt-auto inline-flex items-center gap-2 text-sm font-medium group/link relative w-fit"
            style={{ color: THEME.textDark, transform: "translateZ(25px)" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative">
              View Credential
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px origin-left"
                style={{ backgroundColor: cert.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: EASE_SMOOTH }}
              />
            </span>

            <motion.span
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4 transition-colors duration-300 group-hover/link:text-(--icon-color)" style={{ '--icon-color': cert.color }} />
            </motion.span>
          </motion.a>

          {/* Decorative corner */}
          <div
            className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
            style={{ backgroundColor: `${cert.color}20`, transform: "translateZ(-10px)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Section header
const SectionHeader = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="text-center mb-16 px-4"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: STAGGER_CHILDREN, delayChildren: 0.1 } }
      }}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SMOOTH } }
        }}
        className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
        style={{ color: THEME.olive }}
      >
        Credentials & Achievements
      </motion.span>

      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { y: "100%" },
            visible: { y: 0, transition: { duration: 0.8, delay: 0.1, ease: EASE_SMOOTH } }
          }}
          className="text-5xl sm:text-6xl font-serif"
          style={{
            color: THEME.textDark,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Certi<em className="italic" style={{ color: THEME.terracotta }}>ficates</em>
        </motion.h2>
      </div>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: EASE_SMOOTH } }
        }}
        className="mt-4 text-lg max-w-2xl mx-auto"
        style={{ color: THEME.textMuted }}
      >
        Professional certifications and educational achievements that validate my expertise.
      </motion.p>
    </motion.div>
  );
};

const Certificates = () => {
  const containerRef = useRef(null);
  const { ref, controls } = useScrollReveal({ amount: 0.1 }); // Earlier trigger for cards

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.sageBg }}
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none flex"
        style={{ backgroundColor: `${THEME.gold}25`, y: bgY }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none flex"
        style={{ backgroundColor: `${THEME.terracotta}20`, y: bgY }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${THEME.textDark} 1px, transparent 1px), linear-gradient(90deg, ${THEME.textDark} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8"
        >
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_SMOOTH }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-medium transition-all duration-300 border"
            style={{ backgroundColor: THEME.olive, borderColor: THEME.olive, color: '#F5F0E8' }}
            whileHover={{ scale: 1.03, boxShadow: `0 20px 50px ${THEME.olive}40` }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Credentials</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;