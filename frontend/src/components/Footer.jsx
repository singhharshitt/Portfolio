import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { ArrowUp, Heart, Mail, ExternalLink } from 'lucide-react';

// Warm Parchment palette
const THEME = {
    bg: '#6E6B2F',
    terracotta: '#C2743A',
    gold: '#C9A66B',
    sage: '#B7B77A',
    text: '#F5F0E8',
    textMuted: 'rgba(245, 240, 232, 0.6)',
    border: 'rgba(183, 183, 122, 0.3)',
};

const EASE = [0.16, 1, 0.3, 1];

const navLinks = [
    { label: 'Home', section: 'hero' },
    { label: 'About', section: 'about' },
    { label: 'Projects', section: 'projects-showcase' },
    { label: 'Tech Stack', section: 'techstack' },
    { label: 'Blog', section: 'blog' },
    { label: 'Connect', section: 'connect' },
];

const socialLinks = [
    { icon: SiGithub, href: 'https://github.com/singhharshitt', label: 'GitHub' },
    { icon: SiLinkedin, href: 'https://linkedin.com/in/singh-harshit-', label: 'LinkedIn' },
    { icon: SiX, href: 'https://twitter.com/singhharshitt', label: 'Twitter' },
];

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer
            ref={ref}
            className="relative pt-16 pb-8 overflow-hidden"
            style={{ backgroundColor: THEME.bg }}
        >
            {/* Top border accent */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 origin-left"
                style={{
                    background: `linear-gradient(90deg, ${THEME.terracotta}, ${THEME.gold}, ${THEME.sage})`,
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
            />

            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,240,232,0.3) 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <h3 className="text-2xl font-serif font-bold mb-4" style={{ color: THEME.text }}>
                            Harshit <span style={{ color: THEME.terracotta }}>Singh</span>
                        </h3>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: THEME.textMuted }}>
                            Full-stack developer crafting beautiful digital experiences with modern technologies.
                        </p>

                        {/* Social links */}
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
                                    style={{
                                        backgroundColor: `${THEME.gold}20`,
                                        color: THEME.gold,
                                    }}
                                    whileHover={{
                                        backgroundColor: THEME.terracotta,
                                        color: '#F5F0E8',
                                        y: -3,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                    >
                        <h4 className="text-sm font-mono uppercase tracking-[0.2em] mb-6" style={{ color: THEME.terracotta }}>
                            Navigation
                        </h4>
                        <nav className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.section}
                                    onClick={() => scrollToSection(link.section)}
                                    className="text-left text-sm py-1.5 transition-colors duration-300 hover:translate-x-1 transform"
                                    style={{ color: THEME.textMuted }}
                                    whileHover={{ color: THEME.text, x: 4 }}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                    >
                        <h4 className="text-sm font-mono uppercase tracking-[0.2em] mb-6" style={{ color: THEME.terracotta }}>
                            Get In Touch
                        </h4>
                        <a
                            href="mailto:singhharshit2410@gmail.com"
                            className="flex items-center gap-2 text-sm transition-colors duration-300 mb-4 group"
                            style={{ color: THEME.textMuted }}
                        >
                            <Mail className="w-4 h-4" style={{ color: THEME.gold }} />
                            <span className="group-hover:text-[#F5F0E8] transition-colors duration-300">singhharshit2410@gmail.com</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                        <p className="text-xs" style={{ color: THEME.textMuted }}>
                            Available for freelance, full-time, and collaboration opportunities.
                        </p>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="h-px mb-8 origin-left"
                    style={{ backgroundColor: THEME.border }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: EASE }}
                />

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="text-xs flex items-center gap-1"
                        style={{ color: THEME.textMuted }}
                    >
                        © {new Date().getFullYear()} Harshit Singh. Made with
                        <Heart className="w-3 h-3 inline" style={{ color: THEME.terracotta }} />
                    </motion.p>

                    {/* Back to top */}
                    <motion.button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border transition-all duration-300"
                        style={{
                            borderColor: THEME.border,
                            color: THEME.text,
                        }}
                        whileHover={{
                            backgroundColor: THEME.terracotta,
                            borderColor: THEME.terracotta,
                            y: -2,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowUp className="w-3 h-3" />
                        Back to top
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
