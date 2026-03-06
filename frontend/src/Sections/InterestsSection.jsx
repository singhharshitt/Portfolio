import React, { memo } from 'react';
import { motion } from '../utils/motion';
import { Code2, Cpu, Globe, Layers, Palette, Sparkles, Terminal, Zap } from 'lucide-react';

const INTERESTS = [
    {
        icon: Code2,
        title: 'Full-Stack Development',
        description: 'Building end-to-end web applications with React, Node.js, and modern cloud infrastructure.',
        color: '#5D0D18',
    },
    {
        icon: Palette,
        title: 'UI / UX Design',
        description: 'Designing intuitive, accessible, and visually rich interfaces that delight users.',
        color: '#6B7A3D',
    },
    {
        icon: Cpu,
        title: 'Artificial Intelligence',
        description: 'Exploring LLMs, generative AI tools, and integrating AI into real-world applications.',
        color: '#9FB2AC',
    },
    {
        icon: Globe,
        title: 'Web3 & Blockchain',
        description: 'Learning decentralized technologies, smart contracts, and the future of the open web.',
        color: '#5D0D18',
    },
    {
        icon: Zap,
        title: 'Performance Engineering',
        description: 'Obsessed with fast load times, smooth animations, and optimised rendering pipelines.',
        color: '#6B7A3D',
    },
    {
        icon: Terminal,
        title: 'DevOps & Cloud',
        description: 'Containerisation with Docker, CI/CD pipelines, and deploying on AWS and Vercel.',
        color: '#9FB2AC',
    },
    {
        icon: Layers,
        title: 'Design Systems',
        description: 'Creating scalable component libraries and token-driven design systems.',
        color: '#5D0D18',
    },
    {
        icon: Sparkles,
        title: 'Open Source',
        description: 'Contributing to the community, learning from codebases, and sharing knowledge.',
        color: '#6B7A3D',
    },
];

const InterestCard = memo(function InterestCard({ item, index }) {
    const Icon = item.icon;
    return (
        <motion.div
            className="group relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-[#5D0D18]/10 shadow-sm hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            viewport={{ once: true, margin: '-60px' }}
        >
            {/* Icon bubble */}
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
            >
                <Icon size={22} style={{ color: item.color }} />
            </div>

            <div>
                <h3 className="text-base font-bold text-[#1a1a1a] mb-1.5 font-fliege group-hover:text-[#5D0D18] transition-colors duration-200">
                    {item.title}
                </h3>
                <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                    {item.description}
                </p>
            </div>

            {/* Bottom accent */}
            <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: item.color }}
            />
        </motion.div>
    );
});

export default function InterestsSection() {
    return (
        <section
            id="interests"
            className="relative w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
        >
            {/* Subtle background blob */}
            <div
                aria-hidden="true"
                className="absolute top-32 left-10 w-80 h-80 rounded-full bg-[#9FB2AC]/10 blur-3xl pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-16 right-10 w-64 h-64 rounded-full bg-[#5D0D18]/5 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                {/* Header */}
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
                        Interests
                    </motion.span>

                    <motion.h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        What I{' '}
                        <span className="text-[#5D0D18] italic">Geek Out</span> On
                    </motion.h2>

                    <motion.p
                        className="mt-4 text-base sm:text-lg text-[#1a1a1a]/60 max-w-xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Areas that keep me curious, learning, and building every day.
                    </motion.p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {INTERESTS.map((item, index) => (
                        <InterestCard key={item.title} item={item} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
