import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * HorizontalGallery — Scroll-driven horizontal project showcase
 * Vertical scroll → horizontal translation with velocity damping
 * Cards: aspect-[4/5], rounded-2xl, bg-[#ECE2D0] surface
 * Stacks vertically on mobile
 */
export default function HorizontalGallery({ items = [] }) {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [trackWidth, setTrackWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (trackRef.current && containerRef.current) {
            const trackW = trackRef.current.scrollWidth;
            const containerW = containerRef.current.offsetWidth;
            setTrackWidth(trackW - containerW);
        }
    }, [items, isMobile]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const rawX = useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);
    // Velocity damping factor 0.5
    const x = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.5 });

    if (isMobile) {
        return (
            <div className="px-4 grid grid-cols-1 gap-6">
                {items.map((item, index) => (
                    <GalleryCard key={item.id || index} item={item} index={index} />
                ))}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${Math.max(150, items.length * 40)}vh` }}
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex gap-6 px-12"
                >
                    {items.map((item, index) => (
                        <GalleryCard key={item.id || index} item={item} index={index} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

function GalleryCard({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group flex-shrink-0 w-[320px] md:w-[380px] aspect-[4/5] rounded-2xl bg-sand-200 overflow-hidden relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-xl"
        >
            {/* Image or gradient placeholder */}
            {item.image ? (
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-sand-300 to-sand-200" />
            )}

            {/* Overlay content */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {item.category && (
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                        {item.category}
                    </span>
                )}
                <h3 className="font-playfair text-2xl text-sand-100 font-bold mb-2">
                    {item.title}
                </h3>
                {item.description && (
                    <p className="text-sm text-sand-100/80 line-clamp-2">
                        {item.description}
                    </p>
                )}
            </div>

            {/* Index number */}
            <span className="absolute top-4 left-4 font-playfair text-5xl font-bold text-charcoal/10 group-hover:text-orange-400/30 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
            </span>
        </motion.div>
    );
}
