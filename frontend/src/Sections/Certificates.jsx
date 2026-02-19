import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const Certificates = () => {
    const certificates = [
        {
            id: 1,
            title: "Meta Front-End Developer",
            issuer: "Coursera",
            date: "2024",
            description: "Professional certification covering React, JavaScript, HTML, CSS, and UI/UX principles.",
            link: "#"
        },
        {
            id: 2,
            title: "Advanced React Patterns",
            issuer: "Udemy",
            date: "2023",
            description: "Deep dive into advanced React hooks, performance optimization, and robust component design.",
            link: "#"
        },
        {
            id: 3,
            title: "Full Stack Web Development",
            issuer: "Lovely Professional University",
            date: "2023",
            description: "Comprehensive coursework on MERN stack, database management, and server-side logic.",
            link: "#"
        }
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/10 p-6 rounded-2xl border border-white/25 hover:border-[var(--app-accent-primary)]/60 transition-all duration-300 group hover:shadow-lg hover:shadow-[var(--app-accent-primary)]/10"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-[var(--app-accent-primary)]/15 rounded-xl">
                                <Award className="w-6 h-6 text-[var(--app-accent-primary)]" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-white/15 rounded-full text-[var(--app-text-light)]/75">
                                {cert.date}
                            </span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[var(--app-text-light)] mb-1 group-hover:text-[var(--app-accent-primary)] transition-colors">
                            {cert.title}
                        </h3>

                        <p className="text-sm font-medium text-[var(--app-accent-primary)] mb-3">
                            {cert.issuer}
                        </p>

                        <p className="text-sm text-[var(--app-text-light)]/80 mb-4 line-clamp-3">
                            {cert.description}
                        </p>

                        <a
                            href={cert.link}
                            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--app-text-light)]/90 hover:text-[var(--app-accent-primary)] transition-colors"
                        >
                            View Credential
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Certificates;
