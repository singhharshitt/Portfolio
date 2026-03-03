import { ArrowRight } from 'lucide-react';

const POSTS = [
  {
    title: 'Designing Smooth Scroll Experiences Without Jank',
    excerpt:
      'A practical walkthrough of scroll choreography, reveal timing, and section pacing for portfolio storytelling.',
    category: 'UX Engineering',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Building Token-Driven Interfaces at Scale',
    excerpt:
      'How visual tokens and utility classes reduce UI drift and keep interactions consistent across sections.',
    category: 'Design Systems',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'From Idea to Delivery in Full-Stack Projects',
    excerpt:
      'A repeatable process for shipping reliable products with clear architecture and handoff discipline.',
    category: 'Full Stack',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  },
];

function BlogCard({ post, delay = '0' }) {
  return (
    <article className="blog-card reveal-item" data-reveal-delay={delay}>
      <div className="blog-image-wrap">
        <img src={post.image} alt={post.title} className="blog-image" loading="lazy" />
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-category">{post.category}</span>
          <span className="blog-read-time">{post.readTime}</span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <a href="#blog" className="blog-read-more">
          <span>Read More</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

export default function BlogSection() {
  return (
    <section id="blog" className="blog-section">
      <div className="section-container">
        <header className="blog-header reveal-item">
          <p className="blog-label">Writing</p>
          <h2 className="blog-title">
            Latest <em>Articles</em>
          </h2>
        </header>

        <div className="blog-grid">
          <BlogCard post={POSTS[0]} />
          <div className="blog-secondary">
            <BlogCard post={POSTS[1]} delay="0.06" />
            <BlogCard post={POSTS[2]} delay="0.12" />
          </div>
        </div>
      </div>
    </section>
  );
}
