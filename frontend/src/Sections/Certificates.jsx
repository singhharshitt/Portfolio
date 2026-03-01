import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Award, ExternalLink, ArrowUpRight } from 'lucide-react';

// Your strict color palette
const THEME = {
  bubblegum: '#F66483',
  marigold: '#C877BF',
  lagoon: '#30B8B2',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  cream: '#FDF6F0',
  textLight: '#FFFFFF',
};

// Cinematic easing curves
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
};

const certificates = [
  {
    id: 1,
    title: "Meta Front-End Developer",
    issuer: "Coursera",
    date: "2024",
    description: "Professional certification covering React, JavaScript, HTML, CSS, and UI/UX principles.",
    link: "#",
    color: THEME.lagoon,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    issuer: "Udemy",
    date: "2023",
    description: "Deep dive into advanced React hooks, performance optimization, and robust component design.",
    link: "#",
    color: THEME.bubblegum,
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    issuer: "Lovely Professional University",
    date: "2023",
    description: "Comprehensive coursework on MERN stack, database management, and server-side logic.",
    link: "#",
    color: THEME.marigold,
  },
];

// Individual certificate card with MAI-style depth
const CertificateCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Staggered entrance with subtle 3D rotation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: 8,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: index * 0.15,
        ease: EASE.smooth,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.4, ease: EASE.smooth },
      }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      {/* Animated glow backdrop */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${cert.color}40 0%, transparent 60%)`,
        }}
      />

      {/* Main card */}
      <div
        className="relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Hover border illumination */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            border: `1px solid ${cert.color}60`,
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-6 right-6 h-px origin-left"
          style={{
            background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
            transform: 'scaleX(0)',
          }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: EASE.smooth }}
        />

        {/* Header with icon and date */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className="p-3 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: `${cert.color}15`,
            }}
            whileHover={{
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.5 },
            }}
          >
            <Award
              className="w-6 h-6 transition-colors duration-300"
              style={{ color: cert.color }}
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {cert.date}
          </motion.span>
        </div>

        {/* Title with character stagger effect */}
        <h3
          className="font-serif text-xl font-bold mb-2 transition-colors duration-300"
          style={{
            color: THEME.textLight,
          }}
        >
          <span className="group-hover:text-(--hover-color) transition-colors duration-300" style={{ '--hover-color': cert.color }}>
            {cert.title}
          </span>
        </h3>

        {/* Issuer with color accent */}
        <motion.p
          className="text-sm font-medium mb-4 flex items-center gap-2"
          style={{ color: cert.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
          {cert.issuer}
        </motion.p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6 line-clamp-3"
          style={{ color: 'rgba(255, 255, 255, 0.75)' }}
        >
          {cert.description}
        </p>

        {/* CTA Link with arrow animation */}
        <motion.a
          href={cert.link}
          className="inline-flex items-center gap-2 text-sm font-medium group/link relative"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
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
              transition={{ duration: 0.4, ease: EASE.smooth }}
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

        {/* Decorative corner element */}
        <div
          className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
          style={{ backgroundColor: `${cert.color}20` }}
        />
      </div>
    </motion.div>
  );
};

// Section header with elegant typography reveal
const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE.smooth }}
      >
        <span
          className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
          style={{ color: THEME.lagoon }}
        >
          Credentials & Achievements
        </span>
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
          className="text-5xl sm:text-6xl font-serif"
          style={{
            color: THEME.textLight,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Certi<em className="italic" style={{ color: THEME.bubblegum }}>ficates</em>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE.smooth }}
        className="mt-4 text-lg max-w-2xl mx-auto"
        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
      >
        Professional certifications and educational achievements that validate my expertise.
      </motion.p>
    </div>
  );
};

const Certificates = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for background
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -80]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.malachite }}
    >
      {/* Background decorative elements */}
      <motion.div

        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${THEME.lagoon}30`,
          y: bgY
        }}
      />
      <motion.div

        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${THEME.bubblegum}30`,
          y: bgY
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${THEME.textLight} 1px, transparent 1px), linear-gradient(90deg, ${THEME.textLight} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE.smooth }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-medium transition-all duration-300 border"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: THEME.textLight,
            }}
            whileHover={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: THEME.lagoon,
              scale: 1.03,
            }}
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