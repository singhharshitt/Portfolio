import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

// Color theme from your spec
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

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable MERN Applications",
    excerpt: "Best practices for architecting production-ready full-stack applications with MongoDB, Express, React, and Node.js.",
    date: "2025-01-15",
    readTime: "8 min read",
    tags: ["MERN", "Architecture", "Backend"],
    category: "Development",
    color: THEME.lagoon,
  },
  {
    id: 2,
    title: "Mastering React Performance",
    excerpt: "Deep dive into React optimization techniques including memo, useMemo, useCallback, and virtual DOM optimization strategies.",
    date: "2025-01-08",
    readTime: "6 min read",
    tags: ["React", "Performance", "Frontend"],
    category: "Development",
    color: THEME.bubblegum,
  },
  {
    id: 3,
    title: "Modern CSS: From Flexbox to Grid",
    excerpt: "A comprehensive guide to modern CSS layout systems and how to use them effectively in real-world projects.",
    date: "2024-12-20",
    readTime: "10 min read",
    tags: ["CSS", "UI/UX", "Design"],
    category: "Design",
    color: THEME.marigold,
  },
  {
    id: 4,
    title: "API Design Best Practices",
    excerpt: "Creating RESTful APIs that scale: versioning, error handling, authentication, and documentation strategies.",
    date: "2024-12-10",
    readTime: "7 min read",
    tags: ["API", "Backend", "Node.js"],
    category: "Development",
    color: THEME.brownSugar,
  },
  {
    id: 5,
    title: "Docker for Developers",
    excerpt: "Understanding containerization and how to use Docker to create consistent development and production environments.",
    date: "2024-11-28",
    readTime: "9 min read",
    tags: ["Docker", "DevOps", "Deployment"],
    category: "DevOps",
    color: THEME.malachite,
  },
  {
    id: 6,
    title: "TypeScript: Beyond the Basics",
    excerpt: "Advanced TypeScript patterns including generics, conditional types, and utility types for bulletproof code.",
    date: "2024-11-15",
    readTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Frontend"],
    category: "Development",
    color: THEME.lagoon,
  },
];

// Individual blog card with MAI-style interactions
const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  // Staggered reveal with subtle rotation
  const variants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: 5,
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
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: EASE.smooth }
      }}
      className="group relative bg-[#FDF6F0] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 transition-all duration-500"
      style={{
        borderColor: post.color,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${post.color}08 0%, transparent 60%)`,
        }}
      />

      {/* MAI-style floating border frame */}
      <motion.div
        className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          borderColor: post.color,
          margin: '12px',
          borderRadius: '8px',
        }}
        initial={false}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Category badge with color accent */}
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

        {/* Title with hover color shift */}
        <h3
          className="text-xl font-bold text-[#1A1A1A] mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-(--title-color)"
          style={{ '--title-color': post.color }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#1A1A1A]/70 text-sm mb-4 grow line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags with staggered hover effect */}
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
        <div className="flex items-center justify-between text-xs text-[#1A1A1A]/60 pt-3 border-t border-[#F5EDE6]">
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

        {/* Read more link with arrow animation */}
        <motion.button
          className="mt-4 w-full py-2.5 text-sm font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn"
          style={{
            color: post.color,
            backgroundColor: `${post.color}10`,
          }}
          whileHover={{
            backgroundColor: post.color,
            color: 'white',
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

// Section header with text reveal
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
          style={{ color: THEME.brownSugar }}
        >
          Insights & Thoughts
        </span>
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.smooth }}
          className="text-5xl sm:text-6xl font-serif text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Latest <em className="italic" style={{ color: THEME.lagoon }}>Writings</em>
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE.smooth }}
        className="mt-4 max-w-2xl mx-auto"
      >
        <p className="text-[#4A3728] text-lg">
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

  // Subtle parallax for background elements
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -50]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: THEME.sand[200] }}
    >
      {/* Background decorative elements */}
      <motion.div

        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${THEME.lagoon}20`,
          y: bgY,
        }}
      />
      <motion.div

        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${THEME.bubblegum}20`,
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
              backgroundColor: THEME.malachite,
              color: 'white',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: `0 20px 50px ${THEME.malachite}40`,
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