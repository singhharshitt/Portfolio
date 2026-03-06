import React, { memo, useState } from 'react';
import { motion } from '../utils/motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

// ─── Blog Data ──────────────────────────────────────────────────────────────
// Add new blog entries here. Set `link: '#'` for upcoming posts.
const blogs = [
  {
    id: 1,
    title: 'Future Technologies 2026-2032 Skills Roadmap',
    description:
      'A comprehensive roadmap covering the most critical emerging technologies — from AI and Web3 to quantum computing — and the skills developers need to stay ahead through 2032.',
    link: 'https://gleaming-seashore-8de.notion.site/Future-Technologies-2026-2032-Skills-Roadmap-31a162258e948091a575c31f0bd18eb7?source=copy_link',
    date: 'Mar 2026',
    readTime: '8 min read',
    isExternal: true,
  },
  {
    id: 2,
    title: 'Best AI Tools for Content Creation in 2026',
    description:
      'An in-depth look at the top AI-powered tools transforming content creation — from writing assistants to generative media platforms — and how to choose the right stack.',
    link: '#',
    date: 'Coming Soon',
    readTime: '6 min read',
    isExternal: false,
  },
];

// ─── Blog Card ───────────────────────────────────────────────────────────────
const BlogCard = memo(function BlogCard({ blog, index }) {
  const [hovered, setHovered] = useState(false);
  const isPlaceholder = blog.link === '#';

  return (
    <motion.article
      className="group flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          flex flex-col h-full
          rounded-2xl border border-[#5D0D18]/10
          bg-white shadow-sm
          transition-all duration-300
          ${hovered ? '-translate-y-1 shadow-md shadow-[#5D0D18]/10' : ''}
        `}
      >
        {/* Card Body */}
        <div className="flex flex-col flex-1 p-6 sm:p-7">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-4 text-xs text-[#9FB2AC]">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {blog.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {blog.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a] leading-snug mb-3 font-fliege group-hover:text-[#5D0D18] transition-colors duration-200">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed flex-1 mb-6">
            {blog.description}
          </p>

          {/* CTA Button */}
          {isPlaceholder ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#9FB2AC] cursor-not-allowed select-none">
              Coming Soon
              <ArrowRight size={15} />
            </span>
          ) : (
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#5D0D18] group/link"
              aria-label={`Read article: ${blog.title}`}
            >
              <span className="border-b border-[#5D0D18]/0 group-hover/link:border-[#5D0D18] transition-all duration-200">
                Read Article
              </span>
              <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </a>
          )}
        </div>

        {/* Bottom accent line */}
        <div
          className={`h-0.5 rounded-b-2xl bg-gradient-to-r from-[#5D0D18] to-[#9FB2AC] transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </div>
    </motion.article>
  );
});

// ─── Section ─────────────────────────────────────────────────────────────────
export default function BlogSection() {
  return (
    <section
      id="blog"
      className="relative w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Subtle background blob */}
      <div
        aria-hidden="true"
        className="absolute top-40 right-10 w-80 h-80 rounded-full bg-[#9FB2AC]/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-[#9FB2AC]" />
            Writing
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Blogs &amp;{' '}
            <span className="text-[#5D0D18] italic">Insights</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base sm:text-lg text-[#1a1a1a]/60 max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Thoughts on AI, technology, and the future of software.
          </motion.p>
        </motion.div>

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
