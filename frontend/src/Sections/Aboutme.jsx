import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from '../utils/motion';
import { ArrowRight } from 'lucide-react';
import profileMain from '../assets/me.jpg';

function goToProjects(event) {
  event.preventDefault();
  document.getElementById('projects-showcase')?.scrollIntoView({ behavior: 'smooth' });
}

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      tiltRotateY.set(((clientX - innerWidth / 2) / innerWidth) * 10);
      tiltRotateX.set(-((clientY - innerHeight / 2) / innerHeight) * 10);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [tiltRotateX, tiltRotateY]);

  const images = [
    {
      src: profileMain,
      alt: 'Harshit Singh - Profile',
      style: { x: x1, y: y1, rotate: rotate1 },
      className: 'h-80 w-64 rounded-2xl object-cover shadow-[0_24px_48px_rgba(69,34,21,0.12)] z-10',
      delay: 0,
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FFF8EE] py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-20 top-20 h-96 w-96 rounded-full bg-[#FFFFF0] blur-3xl"
          style={{ opacity: topGlowOpacity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 h-72 w-72 rounded-full bg-[#FF9398]/20 blur-3xl"
          style={{ opacity: bottomGlowOpacity }}
        />
      </div>

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
                        className={`${img.className} transition-all duration-500`}
                      />
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

            <span className="font-ui inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]">
              <span className="h-px w-8 bg-[#DF6C4F]" />
              About Me
            </span>

            <motion.h2
              className="font-fliege text-4xl leading-tight text-[#452215] sm:text-5xl lg:text-6xl"
            >
              I design and build{' '}
              <span className="italic text-[#DF6C4F]">
                modern web experiences
              </span>
            </motion.h2>

            <motion.p className="font-bodycopy max-w-lg text-lg leading-relaxed text-[#452215]">
              I’m a full-stack developer focused on building fast, scalable,
              and user-centered web applications. I enjoy transforming complex
              ideas into clean, intuitive digital experiences using modern
              technologies like React, Node.js, and thoughtful design systems.
            </motion.p>

            <motion.p className="font-bodycopy max-w-lg text-lg leading-relaxed text-[#452215]">
              I’m passionate about crafting interfaces that feel effortless,
              while ensuring the underlying architecture is reliable,
              maintainable, and built for long-term growth.
            </motion.p>

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'Full-Stack Development', 'UI/UX Systems'].map((skill) => (
                <span
                  key={skill}
                  className="font-mono-ui rounded-full border border-[#DF6C4F]/25 bg-[#FFFFF0] px-4 py-2 text-sm text-[#452215]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-6 pt-2">

              <motion.a
                href="/cv.pdf"
                download
                className="font-ui inline-flex items-center gap-2 rounded-full border border-[#DF6C4F] bg-[#DF6C4F] px-6 py-3 text-sm text-[#FFFFF0] transition hover:bg-[#FF9398]"
              >
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
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-[#49C5B6]" />
                </span>
                <ArrowRight size={18} />
              </motion.a>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}