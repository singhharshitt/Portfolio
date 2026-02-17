import React from 'react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const ConnectSection = () => {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: SiGithub,
            url: 'https://github.com/singhharshitt',
            color: 'hover:text-gray-800',
            label: 'Visit my GitHub profile'
        },
        {
            name: 'LinkedIn',
            icon: SiLinkedin,
            url: 'https://linkedin.com/in/singh-harshit-',
            color: 'hover:text-blue-600',
            label: 'Connect with me on LinkedIn'
        },
        {
            name: 'Twitter',
            icon: SiX,
            url: 'https://twitter.com/singhharshitt',
            color: 'hover:text-blue-400',
            label: 'Follow me on Twitter'
        }
    ];

    const handleEmailClick = () => {
        window.location.href = 'mailto:singhharshit2410@gmail.com';
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-12 pb-12">
            {/* Left side - Message */}
            <div className="flex-1 plus-jakarta-sans-medium bg-sand-100 shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-8 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative">
                <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                        Let's Build Something{' '}
                        <span className="text-orange-400">Amazing</span> Together
                    </h3>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                        I'm always excited to collaborate on innovative projects, discuss
                        new technologies, or explore opportunities. Whether you have a
                        project in mind, need a developer, or just want to connect —{' '}
                        <span className="font-bold text-orange-400">
                            I'd love to hear from you!
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <button
                            onClick={handleEmailClick}
                            className="relative overflow-hidden border-2 border-orange-400 px-6 py-3 rounded-xl plus-jakarta-sans-bold flex items-center justify-center cursor-pointer group/btn"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Drop me an Email
                            </span>

                            {/* Top wave */}
                            <span className="absolute w-full h-[10%] top-0 rotate-180 bg-orange-400 z-0 transition-all duration-300 ease-in-out group-hover/btn:h-[80%] clip-wave group-hover/btn:clip-wave-hover"></span>

                            {/* Bottom wave */}
                            <span className="absolute w-full h-[10%] bottom-0 bg-orange-400 z-0 transition-all duration-300 ease-in-out group-hover/btn:h-[80%] clip-wave group-hover/btn:clip-wave-hover"></span>
                        </button>

                        <span className="text-sm text-gray-500">or connect via social media</span>
                    </div>
                </div>

                <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-sand-100 px-2">
                    Get In Touch
                </span>
            </div>

            {/* Right side - Social Links */}
            <div className="flex-1 plus-jakarta-sans-medium bg-sand-100 shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-8 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative">
                <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mb-6">
                        Find Me <span className="text-orange-400">Online</span>
                    </h3>

                    <div className="space-y-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-transparent hover:border-orange-400 transition-all duration-300 group/link"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg group-hover/link:bg-orange-400 transition-colors duration-300">
                                        <Icon className={`w-6 h-6 text-orange-400 group-hover/link:text-white transition-colors duration-300`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-charcoal">{social.name}</p>
                                        <p className="text-sm text-gray-500">@singhharshitt</p>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400 group-hover/link:text-orange-400 group-hover/link:translate-x-1 transition-all duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </a>
                            );
                        })}
                    </div>

                    {/* Additional Contact Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                            <span className="font-bold text-orange-400">Available for:</span>{' '}
                            Freelance Projects · Full-time Opportunities · Collaborations
                        </p>
                    </div>
                </div>

                <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-sand-100 px-2">
                    Social Links
                </span>
            </div>
        </div>
    );
};

export default ConnectSection;
