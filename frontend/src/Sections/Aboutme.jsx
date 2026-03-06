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
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Horizontal parallax for images - moves left as you scroll down
  const x1 = useTransform(smoothProgress, [0, 1], [100, -100]);

  // Vertical parallax with different speeds
  const y1 = useTransform(smoothProgress, [0, 1], [-30, 30]);

  // Rotation based on scroll
  const rotate1 = useTransform(smoothProgress, [0, 1], [-5, 5]);

  // Scale on scroll
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const topGlowOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const bottomGlowOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const yearsBadgeY = useTransform(smoothProgress, [0, 1], [0, -40]);
  const projectsBadgeY = useTransform(smoothProgress, [0, 1], [0, 40]);
  const tiltRotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const tiltRotateY = useSpring(0, { stiffness: 300, damping: 30 });

  // Mouse tracking drives motion values directly to avoid React re-renders on every move.
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
      alt: "Harshit Singh - Profile",
      style: { x: x1, y: y1, rotate: rotate1 },
      className: "w-64 h-80 object-cover rounded-2xl shadow-2xl z-10",
      delay: 0,
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] overflow-hidden py-20 lg:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          style={{ opacity: topGlowOpacity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#5D0D18]/5 blur-3xl"
          style={{ opacity: bottomGlowOpacity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">

          {/* Left: Horizontal Parallax Image Gallery */}
          <motion.div
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
            style={{ scale, opacity }}
          >
            {/* Decorative frame */}
            <motion.div
              className="absolute inset-0 border border-[#5D0D18]/10 rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Images with parallax */}
            <div className="relative w-full h-full flex items-center justify-center">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${images.length === 1
                      ? 'left-1/2 -translate-x-1/2'
                      : index === 0
                        ? 'left-10 lg:left-20'
                        : 'right-10 lg:right-20'
                    }`}
                  style={img.style}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: img.delay }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 30,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative group">
                    {/* Image container with 3D tilt effect */}
                    <motion.div
                      style={{
                        rotateY: tiltRotateY,
                        rotateX: tiltRotateX,
                        transformStyle: "preserve-3d",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        width={512}
                        height={640}
                        className={`${img.className} transition-all duration-500 group-hover:shadow-2xl`}
                      />

                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#5D0D18]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Decorative border */}
                    <motion.div
                      className="absolute -inset-3 border-2 border-[#9FB2AC]/30 rounded-3xl -z-10"
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: img.delay + 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Connecting line between images */}
              {images.length > 1 && (
                <motion.div
                  className="absolute top-1/2 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-[#9FB2AC]/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              )}
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute top-4 right-4 sm:top-10 sm:right-10 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5D0D18] text-[#FFFBEB] text-xs sm:text-sm font-medium rounded-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ y: yearsBadgeY }}
            >
              3+ Years
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-4 sm:bottom-20 sm:left-10 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#9FB2AC] text-[#5D0D18] text-xs sm:text-sm font-medium rounded-full"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ y: projectsBadgeY }}
            >
              50+ Projects
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="space-y-8 lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase">
                <span className="w-8 h-px bg-[#9FB2AC]" />
                About Me
              </span>
            </motion.div>

            {/* Main Text */}
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight font-fliege"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              I build{' '}
              <motion.span
                className="text-[#5D0D18] italic"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                human-centered
              </motion.span>{' '}
              digital products
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg text-[#1a1a1a]/70 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              By combining clean engineering, visual depth, and practical product thinking,
              I create experiences that resonate with users and drive business results.
            </motion.p>

            {/* Skills tags */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {['React', 'Node.js', 'UI/UX', 'Motion Design'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-[#5D0D18]/5 text-[#5D0D18] text-sm font-medium rounded-full border border-[#5D0D18]/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    backgroundColor: "#5D0D18",
                    color: "#FFFBEB",
                    scale: 1.05
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#projects-showcase"
              className="group inline-flex items-center gap-3 text-[#5D0D18] font-medium mt-4"
              onClick={goToProjects}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              <span className="relative">
                Explore selected work
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-[#5D0D18]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
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
        </div>
      </div>
    </section>
  );
}
