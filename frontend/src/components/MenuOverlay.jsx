import { useEffect } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { ArrowRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const mainNavItems = [
    { label: 'Work', section: 'projects-showcase', description: 'Selected projects' },
    { label: 'About', section: 'about', description: 'My story' },
    { label: 'Tech Stack', section: 'techstack', description: 'What I use' },
    { label: 'Interests', section: 'interests', description: 'What drives me' },
    { label: 'Journey', section: 'timeline', description: 'My path' },
    { label: 'Connect', section: 'connect', description: 'Get in touch' },
];

const secondaryNavItems = [
    { label: 'Blog', section: 'blog' },
];

const featuredProjects = [
    {
        title: 'E-Commerce Platform',
        category: 'Project',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    },
    {
        title: 'Mobile Banking App',
        category: 'Project',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    },
    {
        title: 'Design System',
        category: 'Project',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        y: 40,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const slideUpVariants = {
    hidden: { y: '100%' },
    visible: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        y: '-100%',
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function MenuOverlay({ isOpen, onClose, onNavigate }) {
    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleNavClick = (section) => {
        onNavigate(section);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 h-dvh z-40"
                    aria-hidden={!isOpen}
                >
                    {/* Background Layers - Bloodstone (#5D0D18) with depth */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Primary background slide */}
                        <motion.div
                            variants={slideUpVariants}
                            className="absolute inset-0 bg-[#5D0D18]"
                        />
                        
                        {/* Secondary decorative layer */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                            className="absolute inset-0 bg-[#3d0910]"
                            style={{ clipPath: 'polygon(0 60%, 100% 40%, 100% 100%, 0 100%)' }}
                        />
                        
                        {/* Misty Sage accent line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="absolute top-1/3 left-0 right-0 h-px bg-[#9FB2AC]/30 origin-left"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative h-full overflow-y-auto overscroll-contain">
                        <div className="min-h-full px-6 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32 flex flex-col">
                            <div className="max-w-7xl mx-auto w-full">
                                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                                    {/* Left Column - Navigation */}
                                    <motion.div 
                                        className="space-y-12"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {/* Main Navigation */}
                                        <nav className="space-y-1" aria-label="Main navigation">
                                            {mainNavItems.map((item, index) => (
                                                <motion.div
                                                    key={item.section}
                                                    variants={itemVariants}
                                                    className="overflow-hidden"
                                                >
                                                    <button
                                                        onClick={() => handleNavClick(item.section)}
                                                        className="group w-full text-left py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9FB2AC]/50 rounded-lg relative"
                                                    >
                                                        {/* Hover background */}
                                                        <motion.div
                                                            className="absolute inset-0 bg-[#9FB2AC]/10 rounded-lg"
                                                            initial={{ scaleX: 0, opacity: 0 }}
                                                            whileHover={{ scaleX: 1, opacity: 1 }}
                                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                            style={{ originX: 0 }}
                                                        />
                                                        
                                                        <div className="relative flex items-center justify-between px-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#FFFBEB] transition-all duration-500 group-hover:text-[#9FB2AC] group-hover:translate-x-3 font-fliege">
                                                                    {item.label}
                                                                </span>
                                                                <span className="text-sm text-[#FFFBEB]/40 mt-1 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                                    {item.description}
                                                                </span>
                                                            </div>
                                                            
                                                            {/* Animated arrow */}
                                                            <motion.div
                                                                initial={{ x: -20, opacity: 0 }}
                                                                whileHover={{ x: 0, opacity: 1 }}
                                                                className="text-[#9FB2AC]"
                                                            >
                                                                <ArrowRight
                                                                    className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-2"
                                                                    strokeWidth={1}
                                                                />
                                                            </motion.div>
                                                        </div>
                                                        
                                                        {/* Number indicator */}
                                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#FFFBEB]/20 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            0{index + 1}
                                                        </span>
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </nav>

                                        {/* Secondary Navigation */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="flex flex-wrap items-center gap-4 pt-8 border-t border-[#FFFBEB]/10"
                                        >
                                            {/* CTA Button - Bloodstone to Misty Sage */}
                                            <motion.button
                                                onClick={() => handleNavClick('connect')}
                                                className="group relative px-8 py-4 rounded-full font-medium text-sm overflow-hidden"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {/* Background layers */}
                                                <div className="absolute inset-0 bg-[#FFFBEB] transition-transform duration-500 group-hover:scale-x-0" style={{ transformOrigin: 'right' }} />
                                                <div className="absolute inset-0 bg-[#9FB2AC] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ transformOrigin: 'left' }} />
                                                
                                                <span className="relative z-10 flex items-center gap-3 text-[#5D0D18] group-hover:text-[#5D0D18] transition-colors duration-300">
                                                    <Mail className="w-4 h-4" />
                                                    <span className="group-hover:hidden">Get in Touch</span>
                                                    <span className="hidden group-hover:inline font-medium">hello@harshit.dev</span>
                                                </span>
                                            </motion.button>

                                            {secondaryNavItems.map((item) => (
                                                <motion.button
                                                    key={item.section}
                                                    onClick={() => handleNavClick(item.section)}
                                                    className="px-6 py-3 text-[#FFFBEB]/60 hover:text-[#FFFBEB] transition-colors duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9FB2AC]/50 rounded-lg relative group overflow-hidden"
                                                    whileHover={{ y: -2 }}
                                                >
                                                    <span className="relative z-10">{item.label}</span>
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0 h-px bg-[#9FB2AC]"
                                                        initial={{ scaleX: 0 }}
                                                        whileHover={{ scaleX: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    </motion.div>

                                    {/* Right Column - Featured Projects */}
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="space-y-6"
                                    >
                                        <motion.h3 
                                            variants={itemVariants}
                                            className="text-sm font-medium text-[#9FB2AC] uppercase tracking-[0.2em] mb-8 flex items-center gap-3"
                                        >
                                            <span className="w-8 h-px bg-[#9FB2AC]" />
                                            Featured Work
                                        </motion.h3>
                                        
                                        <div className="space-y-4">
                                            {featuredProjects.map((project, index) => (
                                                <motion.div
                                                    key={project.title}
                                                    variants={itemVariants}
                                                    className="group relative flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9FB2AC]/50 overflow-hidden"
                                                    onClick={() => handleNavClick('projects-showcase')}
                                                    whileHover={{ x: 8 }}
                                                    tabIndex={0}
                                                    role="button"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            handleNavClick('projects-showcase');
                                                        }
                                                    }}
                                                >
                                                    {/* Hover background */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-linear-to-r from-[#9FB2AC]/10 to-transparent"
                                                        initial={{ x: '-100%', opacity: 0 }}
                                                        whileHover={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.4 }}
                                                    />
                                                    
                                                    {/* Project Image with frame */}
                                                    <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#FFFBEB]/10 group-hover:ring-[#9FB2AC]/30 transition-all duration-500">
                                                        <motion.img
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                            decoding="async"
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ duration: 0.6 }}
                                                        />
                                                        {/* Overlay gradient */}
                                                        <div className="absolute inset-0 bg-linear-to-t from-[#5D0D18]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        
                                                        {/* View indicator */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <span className="text-[#FFFBEB] text-xs font-medium tracking-wider uppercase">View</span>
                                                        </div>
                                                    </div>

                                                    {/* Project Info */}
                                                    <div className="flex-1 min-w-0 relative">
                                                        <span className="text-xs text-[#9FB2AC] uppercase tracking-wider font-medium">
                                                            {project.category}
                                                        </span>
                                                        <h4 className="text-xl lg:text-2xl text-[#FFFBEB] font-medium truncate group-hover:text-[#9FB2AC] transition-colors duration-300 font-fliege">
                                                            {project.title}
                                                        </h4>
                                                        
                                                        {/* Progress line */}
                                                        <div className="mt-2 h-px w-12 bg-[#FFFBEB]/20 group-hover:w-full group-hover:bg-[#9FB2AC]/50 transition-all duration-500" />
                                                    </div>

                                                    {/* Arrow with circle */}
                                                    <div className="relative w-10 h-10 rounded-full border border-[#FFFBEB]/20 flex items-center justify-center group-hover:border-[#9FB2AC] group-hover:bg-[#9FB2AC] transition-all duration-300 shrink-0">
                                                        <ArrowRight
                                                            className="w-4 h-4 text-[#FFFBEB]/50 group-hover:text-[#5D0D18] transition-all duration-300 group-hover:translate-x-0.5"
                                                            strokeWidth={2}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        
                                        {/* View all link */}
                                        <motion.button
                                            variants={itemVariants}
                                            onClick={() => handleNavClick('projects-showcase')}
                                            className="group flex items-center gap-2 text-[#9FB2AC] hover:text-[#FFFBEB] transition-colors duration-300 mt-6 text-sm font-medium"
                                        >
                                            <span>View all projects</span>
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </motion.button>
                                    </motion.div>
                                </div>

                                {/* Footer */}
                                <motion.div
                                    variants={itemVariants}
                                    className="mt-16 lg:mt-24 pt-8 border-t border-[#FFFBEB]/10"
                                >
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                                        {/* Newsletter */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                                            <span className="text-sm text-[#FFFBEB]/60 font-light">Stay updated</span>
                                            <motion.div 
                                                className="flex items-center gap-3 px-5 py-3 rounded-full border border-[#FFFBEB]/20 bg-[#FFFBEB]/5 focus-within:border-[#9FB2AC] focus-within:bg-[#9FB2AC]/10 transition-all duration-300 w-full sm:w-auto"
                                                whileFocus={{ scale: 1.02 }}
                                            >
                                                <Mail className="w-4 h-4 text-[#9FB2AC]" />
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="bg-transparent text-sm text-[#FFFBEB] placeholder:text-[#FFFBEB]/30 focus:outline-none w-full sm:w-48"
                                                    aria-label="Email for updates"
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-[#9FB2AC] hover:text-[#FFFBEB] transition-colors"
                                                    aria-label="Submit email"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.button>
                                            </motion.div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-2">
                                            {[
                                                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/singhharshitt' },
                                                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/singh-harshit-' },
                                                { icon: Github, label: 'GitHub', href: 'https://github.com/singhharshitt' },
                                            ].map(({ icon: Icon, label, href }, index) => (
                                                <motion.a
                                                    key={label}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative w-12 h-12 rounded-full border border-[#FFFBEB]/20 flex items-center justify-center overflow-hidden"
                                                    whileHover={{ scale: 1.1, borderColor: '#9FB2AC' }}
                                                    whileTap={{ scale: 0.95 }}
                                                    aria-label={label}
                                                >
                                                    {/* Hover fill */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-[#9FB2AC]"
                                                        initial={{ y: '100%' }}
                                                        whileHover={{ y: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    
                                                    <Icon 
                                                        className="w-5 h-5 text-[#FFFBEB]/60 group-hover:text-[#5D0D18] transition-colors duration-300 relative z-10" 
                                                        strokeWidth={1.5} 
                                                    />
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Bottom text */}
                                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FFFBEB]/30">
                                        <span>© 2026 Harshit. All rights reserved.</span>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#9FB2AC] animate-pulse" />
                                            Available for freelance work
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
