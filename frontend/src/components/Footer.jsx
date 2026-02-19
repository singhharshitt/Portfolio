import React from 'react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const socialLinks = [
        {
            name: 'GitHub',
            icon: SiGithub,
            url: 'https://github.com/singhharshitt',
            label: 'GitHub'
        },
        {
            name: 'LinkedIn',
            icon: SiLinkedin,
            url: 'https://linkedin.com/in/singh-harshit-',
            label: 'LinkedIn'
        },
        {
            name: 'Twitter',
            icon: SiX,
            url: 'https://twitter.com/singhharshitt',
            label: 'Twitter'
        }
    ];

    const quickLinks = [
        { name: 'Home', action: scrollToTop },
        { name: 'About', action: () => scrollToSection('about') },
        { name: 'Tech Stack', action: () => scrollToSection('techstack') },
        { name: 'Journey', action: () => scrollToSection('journey') },
        { name: 'Projects', action: () => scrollToSection('projects') },
        { name: 'Blog', action: () => scrollToSection('blog') },
        { name: 'Connect', action: () => scrollToSection('connect') }
    ];

    return (
        <footer className="bg-[var(--app-bg-main)] text-[var(--app-text-light)] border-t-4 border-[var(--app-accent-primary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-fliege text-3xl font-extrabold mb-2">
                            HARSHIT<span className="text-[var(--app-accent-primary)]">.</span>
                        </h3>
                        <p className="font-snpro text-white/80 text-sm text-center md:text-left">
                            Full Stack Developer crafting digital experiences with code
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center">
                        <h4 className="plus-jakarta-sans-bold text-lg mb-4 text-[var(--app-accent-primary)]">
                            Quick Links
                        </h4>
                        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {quickLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={link.action}
                                    className="text-white/85 hover:text-[var(--app-accent-primary)] transition-colors duration-200 text-sm plus-jakarta-sans-medium"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col items-center md:items-end">
                        <h4 className="plus-jakarta-sans-bold text-lg mb-4 text-[var(--app-accent-primary)]">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 flex items-center justify-center bg-[var(--app-accent-secondary)] rounded-lg hover:bg-[var(--app-accent-primary)] transition-all duration-300 group"
                                    >
                                        <Icon className="w-5 h-5 text-white/85 group-hover:text-white transition-colors duration-300" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/25 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-white/80 plus-jakarta-sans-normal text-center sm:text-left">
                            © {currentYear} Harshit Singh. All rights reserved.
                        </p>

                        {/* Back to Top */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-sm text-white/80 hover:text-[var(--app-accent-primary)] transition-colors duration-200 plus-jakarta-sans-medium group"
                            aria-label="Back to top"
                        >
                            Back to Top
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Additional Info */}
                    <p className="text-xs text-white/65 text-center mt-4 plus-jakarta-sans-normal">
                        Built with React, Tailwind CSS, and love - Deployed with Vite
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
