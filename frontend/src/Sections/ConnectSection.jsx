import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';

// Strict color palette
const THEME = {
  bubblegum: '#F66483',
  marigold: '#C877BF',
  lagoon: '#30B8B2',
  brownSugar: '#A6480A',
  malachite: '#15484C',
  sand: {
    100: '#FDF6F0',
    200: '#F5EDE6',
  },
  charcoal: '#1A1A1A',
};

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
};

const socialLinks = [
  {
    name: 'GitHub',
    icon: SiGithub,
    url: 'https://github.com/singhharshitt',
    label: 'Visit my GitHub profile',
    color: THEME.malachite,
    handle: '@singhharshitt',
  },
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    url: 'https://linkedin.com/in/singh-harshit-',
    label: 'Connect with me on LinkedIn',
    color: THEME.lagoon,
    handle: '@singh-harshit-',
  },
  {
    name: 'Twitter',
    icon: SiX,
    url: 'https://twitter.com/singhharshitt',
    label: 'Follow me on Twitter',
    color: THEME.bubblegum,
    handle: '@singhharshitt',
  },
];

// Animated wave button with enhanced interactions
const WaveButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden border-2 px-8 py-4 rounded-xl font-bold flex items-center justify-center cursor-pointer group"
      style={{ borderColor: THEME.brownSugar }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE.smooth }}
    >
      {/* Background fill animation */}
      <motion.div
        className="absolute inset-0 origin-bottom"
        style={{ backgroundColor: THEME.brownSugar }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: EASE.smooth }}
      />

      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
        <Mail className="w-5 h-5" />
        Drop me an Email
      </span>

      {/* Wave effects preserved from your design */}
      <span 
        className="absolute w-full h-[15%] top-0 rotate-180 bg-[#A6480A] z-0 transition-all duration-500 ease-in-out group-hover:h-[85%]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 10% 60%, 20% 50%, 30% 60%, 40% 50%, 50% 60%, 60% 50%, 70% 60%, 80% 50%, 90% 60%, 100% 50%)' }}
      />
      <span 
        className="absolute w-full h-[15%] bottom-0 bg-[#A6480A] z-0 transition-all duration-500 ease-in-out group-hover:h-[85%]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 10% 60%, 20% 50%, 30% 60%, 40% 50%, 50% 60%, 60% 50%, 70% 60%, 80% 50%, 90% 60%, 100% 50%)' }}
      />
    </motion.button>
  );
};

// Social link item with MAI-style hover
const SocialLink = ({ social, index }) => {
  const Icon = social.icon;
  
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: EASE.smooth }}
      whileHover={{ x: 8 }}
      className="flex items-center gap-4 p-4 rounded-xl border-2 border-transparent transition-all duration-300 group relative overflow-hidden"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: `${social.color}08` }}
      />

      {/* Left border accent on hover */}
      <motion.div
        className="absolute left-0 top-2 bottom-2 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ backgroundColor: social.color }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
      />

      {/* Icon container */}
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 relative z-10"
        style={{ backgroundColor: `${social.color}15` }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon 
          className="w-6 h-6 transition-colors duration-300"
          style={{ color: social.color }}
        />
      </motion.div>

      {/* Text content */}
      <div className="flex-1 relative z-10">
        <p className="font-bold text-[#1A1A1A] group-hover:text-(--link-color) transition-colors duration-300" style={{ '--link-color': social.color }}>
          {social.name}
        </p>
        <p className="text-sm text-[#1A1A1A]/60 font-mono">{social.handle}</p>
      </div>

      {/* Arrow */}
      <motion.div
        className="relative z-10"
        initial={{ x: 0, opacity: 0.5 }}
        whileHover={{ x: 4, opacity: 1 }}
      >
        <ArrowUpRight 
          className="w-5 h-5 transition-colors duration-300"
          style={{ color: social.color }}
        />
      </motion.div>
    </motion.a>
  );
};

// Main card component with retro styling
const ConnectCard = ({ children, label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 5 }}
      transition={{ delay, duration: 0.9, ease: EASE.smooth }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.4, ease: EASE.smooth }
      }}
      className="group flex-1 relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{ backgroundColor: `${THEME.brownSugar}20` }}
      />

      {/* Main card */}
      <div
        className="relative h-full bg-[#FDF6F0] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 p-8 transition-all duration-500"
        style={{ borderColor: THEME.brownSugar }}
      >
        {/* Hover border frame */}
        <motion.div
          className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
          style={{ 
            borderColor: THEME.brownSugar,
            margin: '16px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>

        {/* Bottom label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0, y: 0 } : { opacity: 0, y: 10 }}
          whileHover={{ opacity: 1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-3 text-[9px] uppercase tracking-[0.5em] px-2 py-1 rounded-full transition-all duration-500 pointer-events-none"
          style={{ 
            color: THEME.brownSugar,
            backgroundColor: '#FDF6F0',
          }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
};

const ConnectSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 100, damping: 30 }
  );

  const handleEmailClick = () => {
    window.location.href = 'mailto:singhharshit2410@gmail.com';
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.sand[200] }}
    >
      {/* Background elements */}
      <motion.div
       
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.lagoon}25`, y: bgY }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: `${THEME.bubblegum}25`, y: useTransform(scrollYProgress, [0, 1], [0, -100])}}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE.smooth }}
          >
            <span
              className="text-xs font-mono uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2"
              style={{ color: THEME.brownSugar }}
            >
              <Sparkles className="w-4 h-4" />
              Let's Collaborate
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
              className="text-5xl sm:text-6xl font-serif"
              style={{
                color: THEME.charcoal,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Get In <em className="italic" style={{ color: THEME.bubblegum }}>Touch</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE.smooth }}
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: `${THEME.charcoal}99` }}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </motion.p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-12">
          {/* Left Card - Message */}
          <ConnectCard label="Contact" delay={0}>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ color: THEME.charcoal }}
            >
              Let's Build Something{' '}
              <span style={{ color: THEME.brownSugar }}>Amazing</span> Together
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[#1A1A1A]/75 text-base sm:text-lg leading-relaxed mb-8 grow"
            >
              I'm always excited to collaborate on innovative projects, discuss
              new technologies, or explore opportunities. Whether you have a
              project in mind, need a developer, or just want to connect —{' '}
              <span className="font-bold" style={{ color: THEME.brownSugar }}>
                I'd love to hear from you!
              </span>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-auto">
              <WaveButton onClick={handleEmailClick} />
              
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm text-[#1A1A1A]/60"
              >
                or connect via social media →
              </motion.span>
            </div>
          </ConnectCard>

          {/* Right Card - Social Links */}
          <ConnectCard label="Socials" delay={0.15}>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ color: THEME.charcoal }}
            >
              Find Me <span style={{ color: THEME.brownSugar }}>Online</span>
            </motion.h3>

            <div className="space-y-2">
              {socialLinks.map((social, index) => (
                <SocialLink key={social.name} social={social} index={index} />
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 pt-6 border-t"
              style={{ borderColor: `${THEME.charcoal}15` }}
            >
              <p className="text-sm text-center" style={{ color: `${THEME.charcoal}99` }}>
                <span className="font-bold" style={{ color: THEME.brownSugar }}>Available for:</span>{' '}
                <span className="inline-flex gap-2 flex-wrap justify-center">
                  {['Freelance', 'Full-time', 'Collaborations'].map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${THEME.lagoon}15`,
                        color: THEME.lagoon,
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </span>
              </p>
            </motion.div>
          </ConnectCard>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;