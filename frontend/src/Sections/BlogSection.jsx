import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Tag, Calendar, BookOpen, ChevronRight } from 'lucide-react';

const POSTS = [
  {
    id: 'smooth-scroll-experiences',
    title: 'Designing Smooth Scroll Experiences Without Jank',
    excerpt: 'A practical walkthrough of scroll choreography, reveal timing, and section pacing for portfolio storytelling.',
    category: 'UX Engineering',
    readTime: '7 min read',
    date: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    url: '/blog/smooth-scroll-experiences',
    featured: true,
    color: '#5D0D18',
  },
  {
    id: 'token-driven-interfaces',
    title: 'Building Token-Driven Interfaces at Scale',
    excerpt: 'How visual tokens and utility classes reduce UI drift and keep interactions consistent across sections.',
    category: 'Design Systems',
    readTime: '5 min read',
    date: 'Dec 28, 2025',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    url: '/blog/token-driven-interfaces',
    color: '#6B7A3D',
  },
  {
    id: 'idea-to-delivery',
    title: 'From Idea to Delivery in Full-Stack Projects',
    excerpt: 'A repeatable process for shipping reliable products with clear architecture and handoff discipline.',
    category: 'Full Stack',
    readTime: '6 min read',
    date: 'Dec 10, 2025',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    url: '/blog/idea-to-delivery',
    color: '#9FB2AC',
  },
];

const FeaturedCard = ({ post }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
    rotateY.set(x * 15);
    rotateX.set(-y * 15);
  };

  return (
    <motion.article
      ref={cardRef}
      className="relative group lg:col-span-2 perspective-1000"
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <motion.a
        href={post.url}
        className="block relative bg-white rounded-3xl overflow-hidden shadow-lg border border-[#5D0D18]/10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ 
          boxShadow: "0 35px 60px -15px rgba(93, 13, 24, 0.2)",
          y: -10
        }}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#5D0D18]/60 to-transparent"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            />
            
            {/* Featured Badge */}
            <motion.div
              className="absolute top-6 left-6 px-4 py-2 bg-[#FFFBEB] text-[#5D0D18] text-sm font-bold rounded-full flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <BookOpen size={16} />
              Featured Article
            </motion.div>

            {/* Read Indicator */}
            <motion.div
              className="absolute bottom-6 left-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            >
              <span className="text-[#FFFBEB] text-sm font-medium">Read Article</span>
              <motion.div
                className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                <ArrowRight size={18} className="text-[#5D0D18]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <motion.span 
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: `${post.color}20`, color: post.color }}
              >
                {post.category}
              </motion.span>
              <span className="flex items-center gap-1.5 text-sm text-[#9FB2AC]">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-4 font-fliege leading-tight group-hover:text-[#5D0D18] transition-colors"
            >
              {post.title}
            </motion.h3>

            <p className="text-[#1a1a1a]/70 leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-[#5D0D18]/10">
              <span className="flex items-center gap-2 text-sm text-[#9FB2AC]">
                <Calendar size={14} />
                {post.date}
              </span>
              
              <motion.span 
                className="flex items-center gap-2 text-[#5D0D18] font-medium"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                Read More
                <ChevronRight size={18} className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
              </motion.span>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(
              circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%,
              rgba(255,255,255,0.2) 0%,
              transparent 50%
            )`,
            transform: "translateZ(1px)",
          }}
        />
      </motion.a>
    </motion.article>
  );
};

const StandardCard = ({ post, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={post.url}
        className="block bg-white rounded-2xl overflow-hidden shadow-md border border-[#5D0D18]/10 h-full"
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 40px -10px rgba(93, 13, 24, 0.15)"
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
          
          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm"
            style={{ color: post.color }}
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {post.category}
          </motion.div>

          {/* Arrow Icon */}
          <motion.div
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ 
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -45
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowUpRight size={18} className="text-[#5D0D18]" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-xs text-[#9FB2AC]">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 line-clamp-2 group-hover:text-[#5D0D18] transition-colors font-fliege">
            {post.title}
          </h3>

          <p className="text-sm text-[#1a1a1a]/60 line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <motion.div 
            className="flex items-center gap-2 text-sm font-medium text-[#5D0D18]"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            Read Article
            <motion.span
              animate={{ x: isHovered ? [0, 3, 0] : 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.div>
        </div>
      </motion.a>
    </motion.article>
  );
};

export default function BlogSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      id="blog" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          style={{ y: backgroundY }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-8 h-px bg-[#9FB2AC]" />
              Writing
            </motion.span>
            
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Latest{' '}
              <span className="text-[#5D0D18] italic">Articles</span>
            </motion.h2>
            
            <motion.p 
              className="mt-4 text-lg text-[#1a1a1a]/60 max-w-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thoughts on engineering, design systems, and shipping products that matter.
            </motion.p>
          </motion.div>

          {/* View All */}
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#5D0D18] text-[#5D0D18] rounded-full font-medium hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-all self-start lg:self-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            View All Articles
            <ArrowRight size={18} />
          </motion.a>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          <FeaturedCard post={POSTS[0]} />

          {/* Standard Posts */}
          <div className="grid gap-8">
            {POSTS.slice(1).map((post, index) => (
              <StandardCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div 
          className="mt-20 p-8 lg:p-12 bg-gradient-to-br from-[#5D0D18] to-[#3d0910] rounded-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl lg:text-3xl font-bold text-[#FFFBEB] mb-4 font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Stay in the Loop
          </motion.h3>
          <p className="text-[#FFFBEB]/70 mb-8 max-w-md mx-auto">
            Get notified when I publish new articles on engineering, design, and product thinking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 px-6 py-3 rounded-full bg-[#FFFBEB]/10 border border-[#FFFBEB]/20 text-[#FFFBEB] placeholder:text-[#FFFBEB]/50 focus:outline-none focus:border-[#FFFBEB]/40"
            />
            <motion.button
              className="px-8 py-3 bg-[#FFFBEB] text-[#5D0D18] rounded-full font-bold hover:bg-[#9FB2AC] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}