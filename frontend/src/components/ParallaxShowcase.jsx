import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


export default function ParallaxShowcase({ layers = [] }) {
    const containerRef = useRef(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const multipliers = [0.7, 1.0, 1.3];
    const defaultLayers = layers.length > 0 ? layers : [
        {
            label: 'Backend API',
            code: `app.get('/api/projects', async (req, res) => {\n  const projects = await db.find({});\n  res.json({ success: true, data: projects });\n});`,
        },
        {
            label: 'React Component',
            code: `export default function Card({ title, desc }) {\n  return (\n    <motion.div whileHover={{ scale: 1.05 }}>\n      <h3>{title}</h3>\n      <p>{desc}</p>\n    </motion.div>\n  );\n}`,
        },
        {
            label: 'Tailwind Config',
            code: `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        sand: { 100: '#F7F4F3' },\n        charcoal: '#252627',\n      }\n    }\n  }\n}`,
        },
    ];

    return (
        <div
            ref={containerRef}
            className="relative h-125 md:h-150 flex items-center justify-center overflow-hidden theme-transition-scope"
        >
            {defaultLayers.map((layer, index) => {
                const multiplier = multipliers[index % multipliers.length];
                const isBackground = index < defaultLayers.length - 1;

                return (
                    <ParallaxLayer
                        key={index}
                        layer={layer}
                        index={index}
                        total={defaultLayers.length}
                        scrollYProgress={scrollYProgress}
                        multiplier={reducedMotion ? 0 : multiplier}
                        isBackground={isBackground}
                    />
                );
            })}
        </div>
    );
}

function ParallaxLayer({ layer, index, total, scrollYProgress, multiplier, isBackground }) {
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [-80 * multiplier, 80 * multiplier]
    );

    const offset = (index - total / 2) * 60;
    const zIndex = index + 1;

    // Syntax colors using theme variables
    const syntaxColors = {
        keyword: 'var(--theme-accent-primary)',
        string: 'var(--theme-accent-secondary)',
        function: 'var(--theme-accent-contrast)',
        comment: 'var(--theme-text-current)', // Will apply opacity inline
    };

    const highlightCode = (code) => {
        return code
            .replace(/(const|let|var|function|return|export|default|import|from|async|await|module|extends)/g,
                `<span style="color:${syntaxColors.keyword}">$1</span>`)
            .replace(/('.*?'|".*?")/g, `<span style="color:${syntaxColors.string}">$1</span>`)
            .replace(/(\/\/.*)/g, `<span style="color:${syntaxColors.comment}; opacity: 0.6;">$1</span>`);
    };

    return (
        <motion.div
            style={{ y, left: `${20 + offset}px`, zIndex, boxShadow: 'var(--theme-shadow)' }}
            className={`absolute w-70 md:w-100 rounded-2xl overflow-hidden gpu-accelerated border border-(--theme-border-current)/10 transition-colors duration-700 ${isBackground ? 'blur-[1px]' : ''
                }`}
        >
            {/* Window chrome */}
            <div className="bg-(--theme-surface-elevated) px-4 py-3 flex items-center gap-2 transition-colors duration-700">
                <span className="w-3 h-3 rounded-full bg-(--theme-accent-main)" />
                <span className="w-3 h-3 rounded-full bg-(--theme-accent-secondary)" />
                <span className="w-3 h-3 rounded-full bg-(--theme-border-current)" />
                <span className="ml-auto text-xs text-(--theme-text-current) opacity-60 font-mono transition-colors duration-700">{layer.label}</span>
            </div>

            {/* Code content */}
            <div className="bg-(--theme-surface-current) p-5 transition-colors duration-700">
                <pre className="font-mono text-[13px] leading-relaxed text-(--theme-text-current) overflow-x-auto transition-colors duration-700">
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(layer.code || '') }} />
                </pre>
            </div>
        </motion.div>
    );
}
