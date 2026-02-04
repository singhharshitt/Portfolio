import React from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiPython, SiDocker } from 'react-icons/si';

const ProjectsSection = () => {
    const projects = [
        {
            id: 1,
            title: "GRABDESK - E-Commerce Platform",
            description: "A full-stack MERN e-commerce platform with real-time features, admin dashboard, analytics, and payment integration. Features include product management, order tracking, and user authentication.",
            tech: [
                { name: "React", icon: SiReact },
                { name: "Node.js", icon: SiNodedotjs },
                { name: "MongoDB", icon: SiMongodb },
                { name: "Express", icon: SiExpress }
            ],
            github: "https://github.com/singhharshitt/grabdesk",
            liveDemo: null,
            category: "Full Stack"
        },
        {
            id: 2,
            title: "SKY-X Currency Converter",
            description: "Smart currency exchange application supporting both fiat and cryptocurrency conversions with real-time rates, historical charts, and exchange recommendations.",
            tech: [
                { name: "React", icon: SiReact },
                { name: "Tailwind", icon: SiTailwindcss },
                { name: "API Integration", icon: SiNodedotjs }
            ],
            github: "https://github.com/singhharshitt/sky-x",
            liveDemo: "https://sky-x-demo.vercel.app",
            category: "Frontend"
        },
        {
            id: 3,
            title: "Portfolio Website",
            description: "Modern, responsive portfolio website showcasing projects and skills with smooth animations, dark mode support, and optimized performance.",
            tech: [
                { name: "React", icon: SiReact },
                { name: "Tailwind", icon: SiTailwindcss },
                { name: "Framer Motion", icon: SiReact }
            ],
            github: "https://github.com/singhharshitt/portfolio",
            liveDemo: "https://harshitsingh.dev",
            category: "Frontend"
        },
        {
            id: 4,
            title: "Task Management System",
            description: "Collaborative task management tool with real-time updates, team collaboration features, project tracking, and deadline management.",
            tech: [
                { name: "Next.js", icon: SiNextdotjs },
                { name: "TypeScript", icon: SiTypescript },
                { name: "MongoDB", icon: SiMongodb }
            ],
            github: "https://github.com/singhharshitt/task-manager",
            liveDemo: null,
            category: "Full Stack"
        },
        {
            id: 5,
            title: "AI Chat Application",
            description: "Intelligent chatbot application powered by AI with context-aware responses, conversation history, and multi-language support.",
            tech: [
                { name: "Python", icon: SiPython },
                { name: "React", icon: SiReact },
                { name: "Node.js", icon: SiNodedotjs }
            ],
            github: "https://github.com/singhharshitt/ai-chat",
            liveDemo: null,
            category: "AI/ML"
        },
        {
            id: 6,
            title: "DevOps Pipeline Automation",
            description: "Automated CI/CD pipeline setup with Docker containerization, automated testing, deployment workflows, and monitoring integration.",
            tech: [
                { name: "Docker", icon: SiDocker },
                { name: "Node.js", icon: SiNodedotjs },
                { name: "GitHub Actions", icon: SiGithub }
            ],
            github: "https://github.com/singhharshitt/devops-pipeline",
            liveDemo: null,
            category: "DevOps"
        }
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative flex flex-col h-full"
                    >
                        {/* Hover border effect */}
                        <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

                        <div className="relative z-10 p-6 flex flex-col h-full">
                            {/* Category badge */}
                            <div className="mb-3">
                                <span className="inline-block px-3 py-1 text-xs font-bold text-orange-400 border border-orange-400 rounded-full">
                                    {project.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-[#111827] mb-3 line-clamp-2">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-3 mb-4">
                                {project.tech.map((tech, techIndex) => {
                                    const Icon = tech.icon;
                                    return (
                                        <div
                                            key={techIndex}
                                            className="flex items-center gap-1 text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded"
                                            title={tech.name}
                                        >
                                            <Icon className="w-3 h-3" />
                                            <span>{tech.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Links */}
                            <div className="flex gap-3 pt-3 border-t border-gray-200 mt-auto">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-orange-400 border-2 border-orange-400 rounded-lg hover:bg-orange-400 hover:text-white transition-all duration-300"
                                    aria-label={`View ${project.title} on GitHub`}
                                >
                                    <SiGithub className="w-4 h-4" />
                                    GitHub
                                </a>
                                {project.liveDemo && (
                                    <a
                                        href={project.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-orange-400 border-2 border-orange-400 rounded-lg hover:bg-orange-500 transition-all duration-300"
                                        aria-label={`View ${project.title} live demo`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>

                        <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-[#f8f8f6] px-2">
                            Project
                        </span>
                    </motion.article>
                ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
