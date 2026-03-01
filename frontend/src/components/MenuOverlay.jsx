import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const mainNavItems = [
    { label: 'Work', section: 'projects-showcase', description: 'Selected projects' },
    { label: 'About', section: 'about', description: 'My story' },
    { label: 'Tech Stack', section: 'techstack', description: 'What I use' },
    { label: 'Journey', section: 'journey', description: 'My path' },
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

export default function MenuOverlay({ isOpen, onClose, onNavigate }) {
    const overlayRef = useRef(null);

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
        <div
            ref={overlayRef}
            className={`fixed inset-0 h-[100dvh] z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
            aria-hidden={!isOpen}
        >
            {/* Background with slide animation */}
            <div
                className={`absolute inset-0 bg-[#252627] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            />

            {/* Content */}
            <div className="relative h-full overflow-y-auto overscroll-contain">
                <div className="min-h-full px-6 sm:px-8 lg:px-12 py-24 lg:py-32 flex flex-col">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Left Column - Navigation */}
                            <div className="space-y-12">
                                {/* Main Navigation */}
                                <nav className="space-y-2" aria-label="Main navigation">
                                    {mainNavItems.map((item, index) => (
                                        <div
                                            key={item.section}
                                            className={`transition-all duration-500 ease-out ${isOpen
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-8'
                                                }`}
                                            style={{
                                                transitionDelay: isOpen ? `${150 + index * 80}ms` : '0ms',
                                            }}
                                        >
                                            <button
                                                onClick={() => handleNavClick(item.section)}
                                                className="group w-full text-left py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 rounded-lg"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#F7F4F3] transition-all duration-300 group-hover:text-orange-400 group-hover:translate-x-2">
                                                        {item.label}
                                                    </span>
                                                    <ArrowRight
                                                        className="w-6 h-6 lg:w-8 lg:h-8 text-[#F7F4F3]/50 transition-all duration-300 group-hover:text-orange-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
                                                        strokeWidth={1.5}
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </nav>

                                {/* Secondary Navigation */}
                                <div
                                    className={`flex flex-wrap gap-4 pt-8 border-t border-[#F7F4F3]/10 transition-all duration-500 ease-out ${isOpen
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                    style={{
                                        transitionDelay: isOpen ? `${150 + mainNavItems.length * 80}ms` : '0ms',
                                    }}
                                >
                                    {/* CTA Button */}
                                    <button
                                        onClick={() => handleNavClick('connect')}
                                        className="group relative px-6 py-3 bg-[#F7F4F3] text-[#252627] rounded-full font-medium text-sm transition-all duration-300 hover:bg-orange-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            <span className="group-hover:hidden">Get in Touch</span>
                                            <span className="hidden group-hover:inline">hello@portfolio.com</span>
                                        </span>
                                    </button>

                                    {secondaryNavItems.map((item, index) => (
                                        <button
                                            key={item.section}
                                            onClick={() => handleNavClick(item.section)}
                                            className="px-4 py-3 text-[#F7F4F3]/70 hover:text-[#F7F4F3] transition-colors duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 rounded-lg"
                                            style={{
                                                transitionDelay: isOpen ? `${200 + mainNavItems.length * 80 + index * 50}ms` : '0ms',
                                            }}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Featured Projects */}
                            <div
                                className={`space-y-6 transition-all duration-500 ease-out ${isOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                    }`}
                                style={{
                                    transitionDelay: isOpen ? '400ms' : '0ms',
                                }}
                            >
                                <h3 className="text-sm font-medium text-[#F7F4F3]/50 uppercase tracking-wider mb-6">
                                    Featured Work
                                </h3>
                                <div className="space-y-4">
                                    {featuredProjects.map((project, index) => (
                                        <div
                                            key={project.title}
                                            className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 ${isOpen
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-8'
                                                }`}
                                            style={{
                                                transitionDelay: isOpen ? `${450 + index * 100}ms` : '0ms',
                                            }}
                                            onClick={() => handleNavClick('projects-showcase')}
                                            tabIndex={0}
                                            role="button"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    handleNavClick('projects-showcase');
                                                }
                                            }}
                                        >
                                            {/* Project Image */}
                                            <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Project Info */}
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs text-[#F7F4F3]/50 uppercase tracking-wider">
                                                    {project.category}
                                                </span>
                                                <h4 className="text-lg lg:text-xl text-[#F7F4F3] font-medium truncate group-hover:text-orange-400 transition-colors duration-300">
                                                    {project.title}
                                                </h4>
                                            </div>

                                            {/* Arrow */}
                                            <ArrowRight
                                                className="w-5 h-5 text-[#F7F4F3]/30 transition-all duration-300 group-hover:text-orange-400 group-hover:translate-x-1 flex-shrink-0"
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            className={`mt-16 lg:mt-24 pt-8 border-t border-[#F7F4F3]/10 transition-all duration-500 ease-out ${isOpen
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                            style={{
                                transitionDelay: isOpen ? '700ms' : '0ms',
                            }}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                {/* Newsletter */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-[#F7F4F3]/70">Stay updated</span>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#F7F4F3]/20 bg-transparent">
                                        <Mail className="w-4 h-4 text-[#F7F4F3]/50" />
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            className="bg-transparent text-sm text-[#F7F4F3] placeholder:text-[#F7F4F3]/40 focus:outline-none w-32 sm:w-40"
                                            aria-label="Email for updates"
                                        />
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-6">
                                    {[
                                        { icon: SiX, label: 'Twitter', href: 'https://twitter.com/singhharshitt' },
                                        { icon: SiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/singh-harshit-' },
                                        { icon: SiGithub, label: 'GitHub', href: 'https://github.com/singhharshitt' },
                                    ].map(({ icon: Icon, label, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className="group flex items-center gap-2 text-[#F7F4F3]/50 hover:text-[#F7F4F3] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 rounded-lg px-2 py-1"
                                            aria-label={label}
                                        >
                                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                                            <span className="text-sm hidden sm:inline">{label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
