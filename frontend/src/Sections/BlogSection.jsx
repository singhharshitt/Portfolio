import React from 'react';
import { motion } from 'framer-motion';

const BlogSection = () => {
    const cardBaseClass = 'plus-jakarta-sans-medium bg-sand-100 shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative';
    const hoverBorderClass = 'absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0';
    const badgeClass = 'inline-block px-3 py-1 text-xs font-bold text-orange-400 border border-orange-400 rounded-full';

    const blogPosts = [
        {
            id: 1,
            title: "Building Scalable MERN Applications",
            excerpt: "Best practices for architecting production-ready full-stack applications with MongoDB, Express, React, and Node.js.",
            date: "2025-01-15",
            readTime: "8 min read",
            tags: ["MERN", "Architecture", "Backend"],
            category: "Development"
        },
        {
            id: 2,
            title: "Mastering React Performance",
            excerpt: "Deep dive into React optimization techniques including memo, useMemo, useCallback, and virtual DOM optimization strategies.",
            date: "2025-01-08",
            readTime: "6 min read",
            tags: ["React", "Performance", "Frontend"],
            category: "Development"
        },
        {
            id: 3,
            title: "Modern CSS: From Flexbox to Grid",
            excerpt: "A comprehensive guide to modern CSS layout systems and how to use them effectively in real-world projects.",
            date: "2024-12-20",
            readTime: "10 min read",
            tags: ["CSS", "UI/UX", "Design"],
            category: "Design"
        },
        {
            id: 4,
            title: "API Design Best Practices",
            excerpt: "Creating RESTful APIs that scale: versioning, error handling, authentication, and documentation strategies.",
            date: "2024-12-10",
            readTime: "7 min read",
            tags: ["API", "Backend", "Node.js"],
            category: "Development"
        },
        {
            id: 5,
            title: "Docker for Developers",
            excerpt: "Understanding containerization and how to use Docker to create consistent development and production environments.",
            date: "2024-11-28",
            readTime: "9 min read",
            tags: ["Docker", "DevOps", "Deployment"],
            category: "DevOps"
        },
        {
            id: 6,
            title: "TypeScript: Beyond the Basics",
            excerpt: "Advanced TypeScript patterns including generics, conditional types, and utility types for bulletproof code.",
            date: "2024-11-15",
            readTime: "12 min read",
            tags: ["TypeScript", "JavaScript", "Frontend"],
            category: "Development"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 pb-12">
            {blogPosts.map((post, index) => (
                <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                    className={cardBaseClass}
                >
                    {/* Hover border effect */}
                    <div className={hoverBorderClass}></div>

                    <div className="relative z-10 p-6 flex flex-col h-full">
                        {/* Category badge */}
                        <div className="mb-3">
                            <span className={badgeClass}>
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-charcoal mb-3 line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-charcoal/70 text-sm mb-4 flex-grow line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-charcoal/60 pt-3 border-t border-sand-200">
                            <time dateTime={post.date} className="font-medium">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                            <span className="font-medium">{post.readTime}</span>
                        </div>

                        {/* Read more link */}
                        <button
                            className="mt-4 w-full py-2 text-sm font-bold text-orange-400 hover:text-orange-500 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:underline"
                            aria-label={`Read more about ${post.title}`}
                        >
                            Read More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </div>
                </motion.article>
            ))}
        </div>
    );
};

export default BlogSection;
