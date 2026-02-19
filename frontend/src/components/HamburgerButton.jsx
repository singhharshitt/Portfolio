export function HamburgerButton({ isOpen, onClick, isScrolled }) {
    return (
        <button
            onClick={onClick}
            className="relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 rounded-lg transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
        >
            <div className="relative w-8 h-6 flex flex-col justify-between">
                {/* Top line */}
                <span
                    className={`block h-[3px] w-full rounded-full transition-all duration-300 ease-out origin-left ${isOpen
                        ? 'bg-[var(--app-text-light)] rotate-45 translate-x-px -translate-y-px'
                        : 'bg-charcoal'
                        }`}
                />
                {/* Middle line */}
                <span
                    className={`block h-[3px] rounded-full transition-all duration-300 ease-out ${isOpen
                        ? 'bg-[var(--app-text-light)] w-0 opacity-0'
                        : 'bg-charcoal w-full'
                        }`}
                />
                {/* Bottom line */}
                <span
                    className={`block h-[3px] w-full rounded-full transition-all duration-300 ease-out origin-left ${isOpen
                        ? 'bg-[var(--app-text-light)] -rotate-45 translate-x-px translate-y-px'
                        : 'bg-charcoal'
                        }`}
                />
            </div>
        </button>
    );
}
