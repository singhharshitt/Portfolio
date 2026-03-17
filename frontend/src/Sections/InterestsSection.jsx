import React, { memo } from 'react';
import { motion } from '../utils/motion';
import { Code2, Cpu, Globe, Layers, Palette, Sparkles, Terminal, Zap } from 'lucide-react';

const INTERESTS = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Building end-to-end web applications with React, Node.js, and modern cloud infrastructure.',
    color: '#452215',
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description: 'Designing intuitive, accessible, and visually rich interfaces that delight users.',
    color: '#DF6C4F',
  },
  {
    icon: Cpu,
    title: 'Artificial Intelligence',
    description: 'Exploring LLMs, generative AI tools, and integrating AI into real-world applications.',
    color: '#FF9398',
  },
  {
    icon: Globe,
    title: 'Web3 & Blockchain',
    description: 'Learning decentralized technologies, smart contracts, and the future of the open web.',
    color: '#452215',
  },
  {
    icon: Zap,
    title: 'Performance Engineering',
    description: 'Obsessed with fast load times, smooth animations, and optimised rendering pipelines.',
    color: '#DF6C4F',
  },
  {
    icon: Terminal,
    title: 'DevOps & Cloud',
    description: 'Containerisation with Docker, CI/CD pipelines, and deploying on AWS and Vercel.',
    color: '#FF9398',
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description: 'Creating scalable component libraries and token-driven design systems.',
    color: '#452215',
  },
  {
    icon: Sparkles,
    title: 'Open Source',
    description: 'Contributing to the community, learning from codebases, and sharing knowledge.',
    color: '#DF6C4F',
  },
];

const InterestCard = memo(function InterestCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      className="group relative flex flex-col gap-4 rounded-2xl border border-[#FFF8EE] bg-[#FFFFF0] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#DF6C4F]/25"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-60px' }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}14` }}>
        <Icon size={22} style={{ color: item.color }} />
      </div>

      <div>
        <h3 className="font-ui mb-1.5 text-base text-[#452215] transition-colors duration-200 group-hover:text-[#DF6C4F]">
          {item.title}
        </h3>
        <p className="font-bodycopy text-sm leading-relaxed text-[#452215]">
          {item.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-[#FF9398] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
});

export default function InterestsSection() {
  return (
    <section
      id="interests"
      className="relative w-full overflow-hidden bg-[#FFF8EE] py-20 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-10 top-32 h-80 w-80 rounded-full bg-[#FFFFF0] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-10 h-64 w-64 rounded-full bg-[#FF9398]/15 blur-3xl" />

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
            Interests
          </motion.span>

          <motion.h2
            className="font-fliege text-4xl text-[#452215] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What I <span className="text-[#DF6C4F] italic">Geek Out</span> On
          </motion.h2>

          <motion.p
            className="font-bodycopy mt-4 max-w-xl text-base text-[#452215] sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Areas that keep me curious, learning, and building every day.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INTERESTS.map((item, index) => (
            <InterestCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
