import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from '../utils/motion';
import { ArrowRight, Download, Sparkles, Award, Code, Heart } from 'lucide-react';
import profileMain from '../assets/me.jpg';

function goToProjects(event) {
  event.preventDefault();
  document.getElementById('projects-showcase')?.scrollIntoView({ behavior: 'smooth' });
}

const FloatingParticle = ({ delay, x, y, size, color }) => (
  <motion.div
    className="absolute rounded-full opacity-20 pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: color,
      filter: 'blur(12px)',
    }}
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      scale: [1, 1.3, 1],
      opacity: [0.15, 0.3, 0.15],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export default function Aboutme() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const x1 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const y1 = useTransform(smoothProgress, [0, 1], [-30, 30]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [-5, 5]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const topGlowOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const bottomGlowOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const tiltRotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const tiltRotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const rafRef = useRef(null);

  useEffect(() => {
    let clientX = 0;
    let clientY = 0;

    const updateTilt = () => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth > 0 && innerHeight > 0) {
        tiltRotateY.set(((clientX - innerWidth / 2) / innerWidth) * 10);
        tiltRotateX.set(-((clientY - innerHeight / 2) / innerHeight) * 10);
      }
      rafRef.current = null;
    };

    const handleMouseMove = (e) => {
      clientX = e.clientX;
      clientY = e.clientY;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateTilt);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [tiltRotateX, tiltRotateY]);

  const images = [
    {
      src: profileMain,
      alt: 'Harshit Singh - Profile',
      style: { x: x1, y: y1, rotate: rotate1 },
      className: 'h-80 w-64 rounded-2xl object-cover shadow-[0_24px_48px_rgba(69,34,21,0.12)] z-10 border-2 border-[#452215]',
      delay: 0,
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FFF8EE] py-20 lg:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingParticle delay={0} x="15%" y="20%" size={100} color="#452215" />
        <FloatingParticle delay={2} x="80%" y="30%" size={120} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="70%" size={140} color="#FF9398" />
        <FloatingParticle delay={1} x="25%" y="80%" size={90} color="#452215" />
        <FloatingParticle delay={3} x="90%" y="15%" size={110} color="#DF6C4F" />
      </div>

      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-20 top-20 h-96 w-96 rounded-full bg-[#FFFFF0] blur-3xl"
          style={{ opacity: topGlowOpacity }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 h-72 w-72 rounded-full bg-[#FF9398]/20 blur-3xl"
          style={{ opacity: bottomGlowOpacity }}
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L60 60M60 0L0 60' stroke='%23452215' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image Section */}
          <motion.div
            className="relative flex h-[500px] items-center justify-center lg:h-[600px]"
            style={{ scale, opacity }}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute left-1/2 -translate-x-1/2"
                  style={img.style}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: img.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="group relative">
                    {/* Decorative Frame */}
                    <motion.div
                      className="absolute -inset-2 rounded-2xl border-2 border-[#452215] shadow-[4px_4px_0_#8F5E41] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        rotate: [0, 1, -1, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Corner Accents */}
                    <motion.div
                      className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-[#DF6C4F] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    <motion.div
                      className="absolute -right-3 -bottom-3 h-6 w-6 border-r-2 border-b-2 border-[#DF6C4F] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />

                    <motion.div
                      style={{ rotateY: tiltRotateY, rotateX: tiltRotateX, transformStyle: 'preserve-3d' }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        width={512}
                        height={640}
                        className={`${img.className} transition-all duration-500 border-2 border-[#452215] shadow-[8px_8px_0_#8F5E41]`}
                      />
                    </motion.div>

                    {/* Floating Badge */}
                    <motion.div
                      className="absolute -right-4 -bottom-4 flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-3 py-1.5 shadow-[3px_3px_0_#8F5E41]"
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      viewport={{ once: true }}
                    >
                      <Heart size={14} className="text-[#FF9398]" fill="#FF9398" />
                      <span className="font-mono-ui text-xs text-[#452215]">Developer</span>
                      <Sparkles size={12} className="text-[#DF6C4F]" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-8 lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="font-ui inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="h-px w-8 bg-[#DF6C4F]"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              />
              About Me
            </motion.span>

            <motion.h2
              className="font-fliege text-4xl leading-tight text-[#452215] sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              I design and build{' '}
              <motion.span 
                className="italic inline-block text-[#DF6C4F]"
                animate={{ 
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                modern web experiences
              </motion.span>
            </motion.h2>

            <motion.p 
              className="font-bodycopy max-w-lg text-lg leading-relaxed text-[#452215] opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              I'm a full-stack developer focused on building fast, scalable,
              and user-centered web applications. I enjoy transforming complex
              ideas into clean, intuitive digital experiences using modern
              technologies like React, Node.js, and thoughtful design systems.
            </motion.p>

            <motion.p 
              className="font-bodycopy max-w-lg text-lg leading-relaxed text-[#452215] opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              I'm passionate about crafting interfaces that feel effortless,
              while ensuring the underlying architecture is reliable,
              maintainable, and built for long-term growth.
            </motion.p>

            {/* Skills */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              {['React', 'Node.js', 'Full-Stack Development', 'UI/UX Systems'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="font-mono-ui rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-4 py-2 text-sm text-[#452215] shadow-[2px_2px_0_#8F5E41] transition-all duration-300 hover:shadow-[4px_4px_0_#8F5E41] hover:-translate-y-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Code size={14} className="inline mr-1 text-[#DF6C4F]" />
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex gap-6 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2">
                <Award size={18} className="text-[#DF6C4F]" />
                <span className="font-mono-ui text-sm text-[#452215]">2+ Years Coding</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#FF9398]" />
                <span className="font-mono-ui text-sm text-[#452215]">7+ Projects</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/cv.pdf"
                download
                className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#DF6C4F] px-6 py-3 text-sm text-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1 hover:bg-[#FF9398]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Download CV
              </motion.a>

              <motion.a
                href="#projects-showcase"
                className="font-ui group inline-flex items-center gap-3 text-[#452215]"
                onClick={goToProjects}
                whileHover={{ x: 5 }}
              >
                <span className="relative">
                  Explore selected work
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-[#DF6C4F] to-[#FF9398]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="h-0.5 w-24 bg-linear-to-r from-[#DF6C4F] to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
