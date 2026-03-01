import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

// Warm Parchment palette
const THEME = {
  terracotta: '#C2743A',
  gold: '#C9A66B',
  sage: '#B7B77A',
  olive: '#6E6B2F',
  parchment: '#E9E2D6',
  cream: '#F5F0E8',
  textDark: '#4A4A3A',
  textSecondary: '#6E6B2F',
  textMuted: '#8A8570',
};

// Cinematic easing
const EASE = {
  smooth: [0.16, 1, 0.3, 1],
  entrance: [0.25, 0.46, 0.45, 0.94],
};

import useReducedMotion from '../hooks/useReducedMotion';

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable MERN Applications",
    excerpt: "Best practices for architecting production-ready full-stack applications with MongoDB, Express, React, and Node.js.",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["MERN", "Architecture", "Backend"],
    category: "Development",
    color: THEME.terracotta,
  },
  {
    id: 2,
    title: "Mastering React Performance",
    excerpt: "Deep dive into React optimization techniques including memo, useMemo, useCallback, and virtual DOM optimization strategies.",
    date: "2025-01-08",
    readTime: "6 min read",
    tags: ["React", "Performance", "Frontend"],
    category: "Development",
    color: THEME.gold,
  },
  {
    id: 3,
    title: "Modern CSS: From Flexbox to Grid",
    excerpt: "A comprehensive guide to modern CSS layout systems and how to use them effectively in real-world projects.",
    date: "2024-12-20",
    readTime: "10 min read",
    tags: ["CSS", "UI/UX", "Design"],
    category: "Design",
    color: THEME.sage,
  },
  {
    id: 4,
    title: "API Design Best Practices",
    excerpt: "Creating RESTful APIs that scale: versioning, error handling, authentication, and documentation strategies.",
    date: "2024-12-10",
    readTime: "7 min read",
    tags: ["API", "Backend", "Node.js"],
    category: "Development",
    color: THEME.olive,
  },
  {
    id: 5,
    title: "Docker for Developers",
    excerpt: "Understanding containerization and how to use Docker to create consistent development and production environments.",
    date: "2024-11-28",
    readTime: "9 min read",
    tags: ["Docker", "DevOps", "Deployment"],
    category: "DevOps",
    color: THEME.terracotta,
  },
  {
    id: 6,
    title: "TypeScript: Beyond the Basics",
    excerpt: "Advanced TypeScript patterns including generics, conditional types, and utility types for bulletproof code.",
    date: "2024-11-15",
    readTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Frontend"],
    category: "Development",
    color: THEME.gold,
  },
];

// Individual blog card with magnetic effect
const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  // Magnetic and gradient tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth magnetic pull
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  // Subtle magnetic movement limits (px)
  const magneticX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const magneticY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  // CSS readable mouse positions for the gradient border
  const mouseXPos = useMotionValue(0);
  const mouseYPos = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseXPos}px ${mouseYPos}px, ${post.color}25, transparent 40%)`;

  const handleMouseMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();

    // Magnetic pull calculation (-0.5 to 0.5)
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);

    // Absolute pixel position for gradient
    mouseXPos.set(e.clientX - rect.left);
    mouseYPos.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const variants = {
    hidden: {
      opacity: reduced ? 0 : 0,
      y: reduced ? 0 : 60,
      rotateX: reduced ? 0 : 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: EASE.smooth,
      }
    }
  };

  return (
    <motion.article
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderColor: post.color,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        boxShadow: '0 4px 20px rgba(110, 107, 47, 0.08)',
        x: reduced ? 0 : magneticX,
        y: reduced ? 0 : magneticY,
      }}
      className="group relative bg-[#F5F0E8] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 transition-shadow hover:shadow-xl"
    >
      {/* Mouse-following gradient highlight */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{ background }}
        />
      )}

      {/* Static hover overlay gradient for reduced motion or fallback */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 lg:hidden"
        style={{
          background: `linear-gradient(135deg, ${post.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Category badge */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        >
          <span
            className="inline-block px-3 py-1 text-xs font-bold border rounded-full transition-colors duration-300"
            style={{
              color: post.color,
              borderColor: `${post.color}60`,
              backgroundColor: `${post.color}10`,
            }}
          >
            {post.category}
          </span>
        </motion.div>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-(--title-color)"
          style={{ color: THEME.textDark, '--title-color': post.color }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm mb-4 grow line-clamp-3 leading-relaxed" style={{ color: THEME.textMuted }}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="text-xs px-2 py-1 rounded transition-all duration-300"
              style={{
                backgroundColor: `${post.color}15`,
                color: post.color,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: `${post.color}25`,
              }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* Footer with icons */}
        <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ color: THEME.textMuted, borderColor: `${THEME.sage}40` }}>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: post.color }} />
            <time dateTime={post.date} className="font-medium">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" style={{ color: post.color }} />
            <span className="font-medium">{post.readTime}</span>
          </div>
        </div>

        {/* Read more link */}
        <motion.button
          className="mt-4 w-full py-2.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn"
          style={{
            color: post.color,
            backgroundColor: `${post.color}10`,
          }}
          whileHover={{
            backgroundColor: post.color,
            color: '#F5F0E8',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Read Article</span>
          <motion.span
            className="relative z-10"
            initial={{ x: 0, y: 0 }}
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.span>
        </motion.button>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(225deg, ${post.color}20 0%, transparent 70%)`,
        }}
      />
    </motion.article>
  );
};

// Section header
const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: EASE.smooth }}
      >
        <span
          className="text-xs font-mono uppercase tracking-[0.3em] mb-4 block"
          style={{ color: THEME.olive }}
        >
          Insights & Thoughts
        </span>
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
          className="text-5xl sm:text-6xl font-serif"
          style={{ color: THEME.textDark, fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Latest <em className="italic" style={{ color: THEME.terracotta }}>Writings</em>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE.smooth }}
        className="mt-4 max-w-2xl mx-auto"
      >
        <p style={{ color: THEME.textMuted }} className="text-lg">
          Exploring ideas in development, design, and technology.
        </p>
      </motion.div>
    </div>
  );
};

const BlogSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.cream }}
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${THEME.gold}20`,
          y: bgY,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${THEME.terracotta}15`,
          y: bgY
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE.smooth }}
          className="text-center mt-16"
        >
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300"
            style={{
              backgroundColor: THEME.olive,
              color: '#F5F0E8',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: `0 20px 50px ${THEME.olive}40`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;