import React, { memo, useState } from 'react';
import { motion } from '../utils/motion';
import { Mail, Send, Sparkles, Heart, ArrowUpRight } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const SOCIALS = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/singhharshitt', 
    icon: SiGithub,
    color: '#452215',
    hoverColor: '#FFFFF0'
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/harshit-singhh/', 
    icon: SiLinkedin,
    color: '#DF6C4F',
    hoverColor: '#452215'
  },
  { 
    label: 'X / Twitter', 
    href: 'https://x.com/_HarshitDev_', 
    icon: SiX,
    color: '#FF9398',
    hoverColor: '#452215'
  },
];

const EMAIL = 'iamharshit242004@gmail.com';

const FloatingParticle = memo(function FloatingParticle({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        filter: 'blur(16px)',
        zIndex: 0,
      }}
      animate={{
        y: [0, -50, 0],
        x: [0, 25, 0],
        scale: [1, 1.4, 1],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
});

const SocialLink = memo(function SocialLink({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center gap-3 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-7 py-4 text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover Background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: item.color }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon */}
      <motion.div
        className="relative z-10"
        animate={{ 
          rotate: hovered ? 5 : 0,
          scale: hovered ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={20} style={{ color: hovered ? item.hoverColor : item.color }} />
      </motion.div>
      
      {/* Label */}
      <motion.span 
        className="relative z-10 font-ui text-sm"
        animate={{ 
          x: hovered ? 3 : 0,
          color: hovered ? item.hoverColor : '#452215'
        }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
      </motion.span>

      {/* Sparkle on Hover */}
      <motion.div
        className="absolute -right-1 -top-1 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0
        }}
        transition={{ delay: 0.1 }}
      >
        <Sparkles size={14} className="text-[#FF9398]" />
      </motion.div>
    </motion.a>
  );
});

export default function ConnectSection() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [svgHovered, setSvgHovered] = useState(false);

  return (
    <section
      id="connect"
      className="relative min-h-[60vh] overflow-hidden bg-[#FFF8EE] py-40 text-center"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FloatingParticle delay={0} x="10%" y="20%" size={120} color="#452215" />
        <FloatingParticle delay={2} x="85%" y="30%" size={150} color="#DF6C4F" />
        <FloatingParticle delay={4} x="70%" y="80%" size={180} color="#FF9398" />
        <FloatingParticle delay={1} x="30%" y="70%" size={140} color="#452215" />
        <FloatingParticle delay={3} x="90%" y="15%" size={100} color="#DF6C4F" />
        
        <motion.div
          className="absolute top-20 left-10 h-96 w-96 rounded-full blur-3xl bg-[#FFFFF0] opacity-40"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full blur-3xl bg-[#FF9398] opacity-20"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
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

      <div className="relative z-10 mx-auto w-[min(1400px,calc(100%-80px))]">
        {/* Animated SVG */}
        <motion.div 
          className="reveal-item mx-auto mb-12 max-w-125 opacity-90"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onMouseEnter={() => setSvgHovered(true)}
          onMouseLeave={() => setSvgHovered(false)}
        >
          <svg viewBox="0 0 600 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M20 70C115 15 190 125 300 70C410 15 495 125 580 70"
              stroke="#DF6C4F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
              animate={svgHovered ? { 
                stroke: '#FF9398',
                strokeDasharray: '12 10',
              } : {}}
            />
            {/* Animated dots on the path */}
            <motion.circle
              cx="20"
              cy="70"
              r="4"
              fill="#DF6C4F"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.circle
              cx="300"
              cy="70"
              r="4"
              fill="#DF6C4F"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.circle
              cx="580"
              cy="70"
              r="4"
              fill="#DF6C4F"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              viewport={{ once: true }}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="font-fliege reveal-item m-0 mb-4 text-[clamp(2.5rem,6vw,4.5rem)] text-[#452215]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let&apos;s{' '}
          <motion.span 
            className="inline-block italic text-[#DF6C4F]"
            animate={{ 
              rotate: [0, 2, -2, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Build
          </motion.span>{' '}
          Together
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="font-bodycopy reveal-item mx-auto mb-12 mt-0 max-w-125 text-xl text-[#452215]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Open to freelance, full-time, and collaboration opportunities.
        </motion.p>

        {/* Social Links */}
        <motion.div 
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {SOCIALS.map((item, index) => (
            <SocialLink key={item.label} item={item} index={index} />
          ))}
        </motion.div>

        {/* Email Button */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
        >
          <motion.a
            href={`mailto:${EMAIL}`}
            className="relative inline-flex items-center gap-4 rounded-full border-2 border-[#452215] bg-[#452215] px-10 py-5 text-[1.05rem] text-[#FFFFF0] shadow-[6px_6px_0_#8F5E41] transition-all duration-300 hover:shadow-[8px_8px_0_#8F5E41] hover:-translate-y-1 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: 'transform' }}
          >
            {/* Hover Effect Background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#FF9398]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: emailHovered ? 1 : 0,
                opacity: emailHovered ? 1 : 0
              }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{ willChange: 'transform, opacity' }}
            />
            
            {/* Content */}
            <motion.div
              className="relative z-10 flex items-center gap-4"
              animate={{ x: emailHovered ? 5 : 0 }}
            >
              <Mail size={20} />
              <span className="font-ui">{EMAIL}</span>
              <motion.div
                animate={{ 
                  rotate: emailHovered ? [0, 15, 0] : 0,
                  scale: emailHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.5, repeat: emailHovered ? Infinity : 0 }}
              >
                <Send size={18} />
              </motion.div>
            </motion.div>

            {/* Send Indicator */}
            <motion.div
              className="absolute -top-2 -right-2 z-20"
              initial={{ scale: 0 }}
              animate={{ scale: emailHovered ? 1 : 0 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF9398] text-[10px] font-bold text-[#452215] border-2 border-[#452215]">
                ✉️
              </span>
            </motion.div>
          </motion.a>

          {/* Floating Hearts on Hover */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: emailHovered ? 1 : 0,
              y: emailHovered ? [0, -20, 0] : 0
            }}
            transition={{ duration: 1, repeat: emailHovered ? Infinity : 0 }}
          >
            <Heart size={16} fill="#FF9398" className="text-[#FF9398]" />
          </motion.div>
        </motion.div>

        {/* Decorative Bottom Line */}
        <motion.div
          className="mt-16 h-0.5 w-24 mx-auto bg-linear-to-r from-transparent via-[#DF6C4F] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 96, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}
