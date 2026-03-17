import React, { memo, useState } from 'react';
import { motion } from '../utils/motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex h-full flex-col rounded-2xl border border-[#FFF8EE] bg-[#FFFFF0] transition-all duration-300 ${hovered ? '-translate-y-1 border-[#DF6C4F]/30' : ''}`}>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="font-mono-ui mb-4 flex items-center gap-3 text-xs text-[#DF6C4F]">
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

          <h3 className="font-ui mb-3 text-lg leading-snug text-[#452215] transition-colors duration-200 group-hover:text-[#DF6C4F] sm:text-xl">
            {blog.title}
          </h3>

          <p className="font-bodycopy mb-6 flex-1 text-sm leading-relaxed text-[#452215]">
            {blog.description}
          </p>

          {isPlaceholder ? (
            <span className="font-ui inline-flex cursor-not-allowed select-none items-center gap-2 text-sm text-[#FF9398]">
              Coming Soon
              <ArrowRight size={15} />
            </span>
          ) : (
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui group/link inline-flex items-center gap-2 text-sm text-[#452215]"
              aria-label={`Read article: ${blog.title}`}
            >
              <span className="border-b border-[#DF6C4F]/0 transition-all duration-200 group-hover/link:border-[#DF6C4F]">
                Read Article
              </span>
              <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
                <ArrowRight size={15} />
              </motion.span>
            </a>
          )}
        </div>

        <div className={`h-0.5 rounded-b-2xl bg-[#FF9398] transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </motion.article>
  );
});

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="relative w-full overflow-hidden bg-[#FFFFF0] py-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-40 h-80 w-80 rounded-full bg-[#FFF8EE] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span
            className="font-ui mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#DF6C4F]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="h-px w-8 bg-[#DF6C4F]" />
            Writing
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Blogs &amp; <span className="italic text-[#DF6C4F]">Insights</span>
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
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
