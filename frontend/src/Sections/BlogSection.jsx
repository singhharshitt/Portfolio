import React, { memo, useState } from 'react';
import { motion } from '../utils/motion';
import { ArrowRight, Clock, Calendar, BookOpen, Sparkles, Star, ExternalLink } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: 'Future Technologies 2026-2032 Skills Roadmap',
    description:
      'A comprehensive roadmap covering the most critical emerging technologies from AI and Web3 to quantum computing and the skills developers need to stay ahead through 2032.',
    link: 'https://gleaming-seashore-8de.notion.site/Future-Technologies-2026-2032-Skills-Roadmap-31a162258e948091a575c31f0bd18eb7?source=copy_link',
    date: 'Mar 2026',
    readTime: '8 min read',
    isExternal: true,
  },
  {
    id: 2,
    title: 'Best AI Tools for Content Creation in 2026',
    description:
      'An in-depth look at the top AI-powered tools transforming content creation and how to choose the right stack.',
    link: '#',
    date: 'Coming Soon',
    readTime: '6 min read',
    isExternal: false,
  },
];

const BlogCard = memo(function BlogCard({ blog, index }) {
  const [hovered, setHovered] = useState(false);
  const isPlaceholder = blog.link === '#';

  return (
    <motion.article
      className="group flex h-full flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className={`relative flex h-full flex-col rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 ${
          hovered ? '-translate-y-2 shadow-[6px_6px_0_#8F5E41] border-[#DF6C4F]' : ''
        }`}
      >
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${isPlaceholder ? '#FF9398' : '#DF6C4F'}08 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Corner Accents */}
        <motion.div
          className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#DF6C4F] opacity-0 transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
          initial={{ scale: 0 }}
          animate={hovered ? { scale: 1 } : {}}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#DF6C4F] opacity-0 transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
          initial={{ scale: 0 }}
          animate={hovered ? { scale: 1 } : {}}
        />

        {/* Floating Sparkle Icons */}
        <motion.div
          className="absolute -right-2 -top-2 opacity-0 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star size={16} className="text-[#DF6C4F]" fill="#DF6C4F" />
        </motion.div>
        
        <motion.div
          className="absolute -left-2 bottom-4 opacity-0 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles size={14} className="text-[#FF9398]" />
        </motion.div>

        <div className="flex flex-1 flex-col p-6 sm:p-7 relative z-10">
          {/* Meta Information */}
          <motion.div 
            className="font-mono-ui mb-4 flex items-center gap-3 text-xs"
            style={{ color: '#DF6C4F' }}
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex items-center gap-1.5 bg-[#FFF8EE] px-2 py-1 rounded-full">
              <Calendar size={12} />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5 bg-[#FFF8EE] px-2 py-1 rounded-full">
              <Clock size={12} />
              {blog.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="font-ui mb-3 text-lg leading-snug transition-colors duration-200 sm:text-xl"
            style={{ color: hovered ? '#DF6C4F' : '#452215' }}
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {blog.title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="font-bodycopy mb-6 flex-1 text-sm leading-relaxed"
            style={{ color: 'rgba(69,34,21,0.8)' }}
            animate={{ opacity: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {blog.description}
          </motion.p>

          {/* Call to Action */}
          {isPlaceholder ? (
            <motion.span 
              className="font-ui inline-flex cursor-not-allowed select-none items-center gap-2 text-sm"
              style={{ color: '#FF9398' }}
              animate={{ x: hovered ? 3 : 0 }}
            >
              Coming Soon
              <motion.span animate={{ x: hovered ? [0, 3, 0] : 0 }} transition={{ duration: 1, repeat: Infinity }}>
                <ArrowRight size={15} />
              </motion.span>
            </motion.span>
          ) : (
            <motion.a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui group/link inline-flex items-center gap-3 text-sm"
              style={{ color: '#452215' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Read article: ${blog.title}`}
            >
              <span className="relative">
                <span className="border-b-2 border-[#DF6C4F] pb-0.5 transition-all duration-200">
                  Read Article
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#DF6C4F]"
                  initial={{ width: 0 }}
                  animate={{ width: hovered ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.div
                className="flex items-center gap-1"
                animate={{ x: hovered ? 5 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowRight size={15} />
                {blog.isExternal && <ExternalLink size={12} className="opacity-60" />}
              </motion.div>
            </motion.a>
          )}
        </div>

        {/* Bottom Accent Bar */}
        <motion.div 
          className="h-1 rounded-b-2xl bg-linear-to-r from-[#FF9398] to-[#DF6C4F] transition-all duration-300"
          initial={{ width: '0%', opacity: 0 }}
          animate={{ 
            width: hovered ? '100%' : '0%',
            opacity: hovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.article>
  );
});

export default function BlogSection() {
  const [hoveredHeader, setHoveredHeader] = useState(false);

  return (
    <section
      id="blog"
      className="relative w-full overflow-hidden bg-[#FFFFF0] py-20 lg:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Main Background Blob */}
        <motion.div
          className="absolute right-10 top-40 h-80 w-80 rounded-full bg-[#FFF8EE] blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary Blob */}
        <motion.div
          className="absolute left-10 bottom-20 h-60 w-60 rounded-full bg-[#FF9398]/15 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Floating Particles */}
        <motion.div
          className="absolute left-[20%] top-[30%] h-2 w-2 rounded-full bg-[#DF6C4F] opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-[25%] bottom-[40%] h-3 w-3 rounded-full bg-[#452215] opacity-20"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
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

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: '-80px' }}
          onMouseEnter={() => setHoveredHeader(true)}
          onMouseLeave={() => setHoveredHeader(false)}
        >
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
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
            Writing
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Blogs &amp;{' '}
            <motion.span 
              className="italic inline-block"
              style={{ color: '#DF6C4F' }}
              animate={{ 
                rotate: hoveredHeader ? [0, 2, -2, 0] : 0,
                scale: hoveredHeader ? 1.05 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              Insights
            </motion.span>
          </motion.h2>

          <motion.p
            className="font-bodycopy mt-4 max-w-xl text-base text-[#452215] sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Thoughts on AI, technology, and the future of software.
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            className="mt-6 h-0.5 w-24 bg-linear-to-r from-[#DF6C4F] to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="font-ui inline-flex items-center gap-2 rounded-full border-2 border-[#452215] bg-[#FFFFF0] px-6 py-3 text-sm text-[#452215] shadow-[4px_4px_0_#8F5E41] transition-all duration-300 hover:shadow-[6px_6px_0_#8F5E41] hover:-translate-y-1 hover:border-[#DF6C4F] hover:text-[#DF6C4F]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={18} />
            Follow for More Insights
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
