import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Code2, Palette, Lightbulb, Rocket, ArrowUpRight } from 'lucide-react';
import me from '../assets/me.jpg';

// Warm Parchment color palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  sage: '#B7B77A',
  olive: '#6E6B2F',
  parchment: '#E9E2D6',
  cream: '#F5F0E8',
  bgSection: '#E9E2D6',
  textDark: '#4A4A3A',
  textSecondary: '#6E6B2F',
  textMuted: '#8A8570',
};

// Cinematic easing curves
const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
  exit: [0.55, 0.085, 0.68, 0.53],
  elastic: [0.68, -0.55, 0.265, 1.55],
};

const skills = [
  {
    icon: Code2,
    title: 'Development',
    description: 'Building robust, scalable applications with modern technologies.',
    color: THEME.terracotta,
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Creating beautiful, intuitive interfaces that users love.',
    color: THEME.gold,
  },
  {
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Solving complex problems with creative, effective solutions.',
    color: THEME.sage,
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing for speed, accessibility, and user experience.',
    color: THEME.olive,
  },
];

// Enhanced Skill Card
const SkillCard = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: EASING.smooth,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: EASING.smooth }
      }}
      className="group relative p-6 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        backgroundColor: THEME.cream,
        boxShadow: '0 4px 20px rgba(110, 107, 47, 0.06)',
      }}
    >
      {/* Animated border gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${skill.color}20 0%, transparent 50%)`,
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-0.5 overflow-hidden rounded-full">
        <motion.div
          className="h-full w-full origin-left"
          style={{ backgroundColor: skill.color }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: EASING.smooth }}
        />
      </div>

      {/* Icon container */}
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
        style={{ backgroundColor: `${skill.color}12` }}
        whileHover={{
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5 }
        }}
      >
        <skill.icon
          className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
          style={{ color: skill.color }}
        />
      </motion.div>

      <h3
        className="text-lg font-medium mb-2 transition-colors duration-300 group-hover:text-(--hover-color)"
        style={{
          color: THEME.textDark,
          '--hover-color': skill.color
        }}
      >
        {skill.title}
      </h3>

      <p
        className="text-sm leading-relaxed transition-colors duration-300"
        style={{ color: THEME.textMuted }}
      >
        {skill.description}
      </p>

      {/* Arrow reveal */}
      <motion.div
        initial={{ opacity: 0, x: -10, scale: 0.8 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: EASING.smooth }}
        className="absolute bottom-6 right-6"
      >
        <ArrowUpRight
          className="w-5 h-5"
          style={{ color: skill.color }}
        />
      </motion.div>

      {/* Subtle glow on hover */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ backgroundColor: `${skill.color}20` }}
      />
    </motion.div>
  );
};

// Floating decorative element with parallax
const FloatingElement = ({ children, className, delay = 0, direction = 'left', speed = 1, scrollYProgress }) => {
  const baseTravel = direction === 'left' ? -80 : -40;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, baseTravel * speed]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [-2, 2] : [3, -3]
  );

  const scaleVal = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1.05, 1.05, 0.98]
  );

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scaleVal, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.9, ease: EASING.smooth }}
      style={{ y: springY, rotate: springRotate, scale: springScale, willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Text reveal component
const TextReveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay,
          ease: EASING.smooth,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function Aboutme() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring physics for parallax
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], [120, -120]),
    { stiffness: 100, damping: 30 }
  );

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [60, -60]),
    { stiffness: 100, damping: 30 }
  );

  const imageRotate = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]),
    { stiffness: 100, damping: 30 }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: THEME.bgSection }}
    >
      {/* Floating decorative elements */}
      <FloatingElement
        className="absolute top-24 left-8 lg:left-20 w-36 lg:w-52 h-44 lg:h-64 rounded-2xl overflow-hidden shadow-2xl hidden lg:block z-0"
        delay={0.3}
        direction="left"
        speed={0.7}
        scrollYProgress={scrollYProgress}
      >
        <div
          className="w-full h-full relative"
          style={{ backgroundColor: `${THEME.terracotta}15` }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${THEME.terracotta}30 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-40 right-8 lg:right-28 w-44 lg:w-60 h-36 lg:h-48 rounded-2xl overflow-hidden shadow-2xl hidden lg:block z-0"
        delay={0.5}
        direction="right"
        speed={1.1}
        scrollYProgress={scrollYProgress}
      >
        <div
          className="w-full h-full relative"
          style={{ backgroundColor: `${THEME.gold}15` }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${THEME.gold}30 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      </FloatingElement>

      {/* Additional floating accent */}
      <FloatingElement
        className="absolute top-1/2 right-16 w-24 h-24 rounded-full hidden xl:block z-0"
        delay={0.7}
        direction="right"
        scrollYProgress={scrollYProgress}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${THEME.sage}30 0%, transparent 70%)`,
          }}
        />
      </FloatingElement>

      {/* Subtle background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 opacity-[0.03]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${THEME.textDark} 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </motion.div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-32">
          <TextReveal delay={0}>
            <span
              className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
              style={{ color: THEME.olive }}
            >
              Get to know me
            </span>
          </TextReveal>

          <TextReveal delay={0.1}>
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-serif"
              style={{
                color: THEME.textDark,
                fontFamily: "'Playfair Display', Georgia, serif"
              }}
            >
              About <em className="italic" style={{ color: THEME.terracotta }}>Me</em>
            </h2>
          </TextReveal>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Image */}
          <motion.div
            style={{ y: imageY, rotate: imageRotate, scale }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASING.smooth }}
                className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl group"
                style={{
                  border: `2px solid ${THEME.gold}25`,
                }}
              >
                <motion.img
                  src={me}
                  alt="Harshit Singh"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 50%, ${THEME.olive}30 100%)`,
                  }}
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${THEME.gold}50`,
                  }}
                />
              </motion.div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASING.smooth }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 25px 50px ${THEME.terracotta}20`,
                }}
                className="absolute -bottom-8 -right-8 rounded-2xl p-6 shadow-xl"
                style={{
                  backgroundColor: THEME.cream,
                  border: `1px solid ${THEME.terracotta}20`,
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${THEME.terracotta}12` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Rocket
                      className="w-7 h-7"
                      style={{ color: THEME.terracotta }}
                    />
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-3xl font-serif font-bold"
                      style={{ color: THEME.textDark }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      5+
                    </motion.div>
                    <div
                      className="text-sm"
                      style={{ color: THEME.textMuted }}
                    >
                      Years Experience
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative corner elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 hidden lg:block"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                  <motion.path
                    d="M0 96V0H96"
                    stroke={THEME.gold}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8, ease: EASING.smooth }}
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 hidden lg:block"
              >
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                  <motion.path
                    d="M96 0V96H0"
                    stroke={THEME.terracotta}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.8, ease: EASING.smooth }}
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            style={{ y: contentY }}
            className="lg:pl-8"
          >
            {/* Name and title */}
            <div className="mb-8">
              <TextReveal delay={0.2}>
                <span
                  className="text-sm font-mono uppercase tracking-widest mb-2 block"
                  style={{ color: THEME.olive }}
                >
                  Harshit Singh
                </span>
              </TextReveal>

              <TextReveal delay={0.3}>
                <h3
                  className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-4"
                  style={{
                    color: THEME.textDark,
                    fontFamily: "'Playfair Display', Georgia, serif"
                  }}
                >
                  Full Stack <em className="italic" style={{ color: THEME.terracotta }}>Developer</em>
                </h3>
              </TextReveal>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-12">
              <TextReveal delay={0.4}>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: THEME.textSecondary }}
                >
                  With over 3 years of experience, I craft digital products that make a difference.
                  My approach combines technical expertise with a keen eye for design, ensuring every
                  project is both functional and beautiful.
                </p>
              </TextReveal>

              <TextReveal delay={0.5}>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: THEME.textSecondary }}
                >
                  I believe in the power of thoughtful design and clean code to solve real problems.
                  Whether it's a complex web application or a simple landing page, I bring the same
                  level of dedication and attention to detail.
                </p>
              </TextReveal>
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <SkillCard key={skill.title} skill={skill} index={index} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.7, ease: EASING.smooth }}
              className="mt-12"
            >
              <motion.a
                href="#connect"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium relative overflow-hidden group"
                style={{
                  backgroundColor: THEME.olive,
                  color: '#F5F0E8',
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 20px 60px ${THEME.olive}40`,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASING.smooth }}
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.olive} 0%, ${THEME.terracotta} 100%)`,
                  }}
                />

                <span className="relative z-10">Let's work together</span>

                <motion.span
                  className="relative z-10"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}