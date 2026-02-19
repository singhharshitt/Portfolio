import { useRef, useState } from 'react';
import { motion } from 'framer-motion';


export default function MagneticButton({
    children,
    onClick,
    href,
    className = '',
    variant = 'primary', // 'primary' | 'outline'
}) {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const baseClasses = `
        relative overflow-hidden rounded-full px-8 py-4
        font-medium text-base cursor-pointer
        transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        focus-ring active-press
    `;

    const variantClasses = variant === 'primary'
        ? `border-2 border-[var(--theme-text-current)] ${isHovered ? 'text-[var(--app-text-light)]' : 'text-[var(--theme-text-current)]'}`
        : `border-2 border-[var(--theme-text-current)] ${isHovered ? 'text-[var(--app-text-light)]' : 'text-[var(--theme-text-current)]'}`;

    const Tag = href ? 'a' : 'button';
    const linkProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {};

    return (
        <motion.div
            style={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Tag
                ref={buttonRef}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className={`${baseClasses} ${variantClasses} ${className}`}
                {...linkProps}
            >
                {/* Fill sweep background */}
                <span
                    className="absolute inset-0 bg-[var(--theme-accent-primary)] origin-left transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                />

                {/* Content — children arrows rotate 45°→0° on hover */}
                <span className={`relative z-10 flex items-center gap-2 [&>svg]:transition-transform [&>svg]:duration-300 ${isHovered ? '[&>svg]:rotate-0' : '[&>svg]:-rotate-45'}`}>
                    {children}
                </span>
            </Tag>
        </motion.div>
    );
}
