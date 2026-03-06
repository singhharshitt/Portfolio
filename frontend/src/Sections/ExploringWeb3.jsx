import React, { memo, useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from '../utils/motion';

/* =========================================================
   COLOR THEME CONSTANTS
   Vanilla Custard #FFFBEB | Bloodstone #5D0D18
   Misty Sage #9FB2AC     | Olive #6B7A3D
   Terracotta #C67C4E
   ========================================================= */
const C = {
    bg: '#FFFBEB',
    blood: '#5D0D18',
    sage: '#9FB2AC',
    olive: '#6B7A3D',
    terra: '#C67C4E',
};

/* =========================================================
   BLOCKCHAIN DATA — static, never re-created
   ========================================================= */
const CHAINS = Object.freeze([
    {
        id: 'ethereum',
        label: 'Ethereum',
        angle: 270, // top-center
        color: '#627EEA',
        logo: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Ethereum">
                <path d="M16 2L6 17l10 6 10-6L16 2Z" fill="#627EEA" fillOpacity="0.8" />
                <path d="M16 2v15l10-6L16 2Z" fill="#627EEA" />
                <path d="M6 17l10 13 10-13-10 6-10-6Z" fill="#627EEA" fillOpacity="0.6" />
                <path d="M16 30V23l10-6-10 13Z" fill="#627EEA" />
            </svg>
        ),
    },
    {
        id: 'solana',
        label: 'Solana',
        angle: 330, // upper-right
        color: '#9945FF',
        logo: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Solana">
                <path d="M5 22h17.5l4.5-4H9.5L5 22Z" fill="#14F195" />
                <path d="M5 10h17.5l4.5 4H9.5L5 10Z" fill="#9945FF" />
                <path d="M9.5 14h17.5L22.5 18H5l4.5-4Z" fill="url(#solGrad)" />
                <defs>
                    <linearGradient id="solGrad" x1="5" y1="16" x2="27" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9945FF" />
                        <stop offset="1" stopColor="#14F195" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        id: 'arbitrum',
        label: 'Arbitrum',
        angle: 30, // right
        color: '#28A0F0',
        logo: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Arbitrum">
                <circle cx="16" cy="16" r="14" fill="#213147" />
                <path d="M13 20l3-8 3 8-3-1.5L13 20Z" fill="#28A0F0" />
                <path d="M10 24l6-16 6 16-6-4-6 4Z" fill="#28A0F0" fillOpacity="0.6" />
            </svg>
        ),
    },
    {
        id: 'base',
        label: 'Base',
        angle: 90, // right-lower (but we'll use layout)
        color: '#0052FF',
        logo: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Base">
                <circle cx="16" cy="16" r="14" fill="#0052FF" />
                <path d="M16 6A10 10 0 0 0 6 16h10V6Z" fill="white" />
                <path d="M16 26a10 10 0 0 0 10-10H16v10Z" fill="white" fillOpacity="0.4" />
            </svg>
        ),
    },
    {
        id: 'polygon',
        label: 'Polygon',
        angle: 150, // lower-left
        color: '#8247E5',
        logo: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Polygon">
                <path d="M21 10l-5-3-5 3v6l5 3 5-3V10Z" fill="#8247E5" />
                <path d="M11 10L6 13v6l5 3v-6l5-3-5-3Z" fill="#8247E5" fillOpacity="0.6" />
                <path d="M21 10l5 3v6l-5 3v-6l-5-3 5-3Z" fill="#8247E5" fillOpacity="0.8" />
            </svg>
        ),
    },
    {
        id: 'optimism',
        label: 'Optimism',
        angle: 210, // bottom-center
        color: '#FF0420',
        logo: (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Optimism">
                <circle cx="16" cy="16" r="14" fill="#FF0420" />
                <text x="16" y="21" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12" fontFamily="sans-serif">OP</text>
            </svg>
        ),
    },
]);

const ORBIT_RADIUS = 130; // px radius of the orbital ring

function polarToXY(angleDeg, radius) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
    };
}

/* =========================================================
   CONNECTION EDGES between chains
   ========================================================= */
const EDGES = Object.freeze([
    ['ethereum', 'arbitrum'],
    ['ethereum', 'base'],
    ['ethereum', 'optimism'],
    ['ethereum', 'polygon'],
    ['arbitrum', 'base'],
    ['optimism', 'polygon'],
    ['solana', 'ethereum'],
]);

/* =========================================================
   CONSTELLATION SVG — data packet + connection lines
   ========================================================= */
const ConstellationSVG = memo(function ConstellationSVG({ size, chainPositions }) {
    const [packetPhase, setPacketPhase] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        let start = null;
        const duration = 8000;
        const tick = (ts) => {
            if (!start) start = ts;
            setPacketPhase(((ts - start) % duration) / duration);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const edges = useMemo(() => {
        return EDGES.map(([fromId, toId]) => {
            const from = chainPositions.find(c => c.id === fromId);
            const to = chainPositions.find(c => c.id === toId);
            if (!from || !to) return null;
            const fromChain = CHAINS.find(c => c.id === fromId);
            const toChain = CHAINS.find(c => c.id === toId);
            const gradId = `grad-${fromId}-${toId}`;
            const pathId = `path-${fromId}-${toId}`;
            return { from, to, fromChain, toChain, gradId, pathId };
        }).filter(Boolean);
    }, [chainPositions]);

    const cx = size / 2;
    const cy = size / 2;
    const PACKET_OFFSETS = [0, 0.33, 0.66];

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            <defs>
                {edges.map(e => (
                    <linearGradient key={e.gradId} id={e.gradId} x1={e.from.x + cx} y1={e.from.y + cy} x2={e.to.x + cx} y2={e.to.y + cy} gradientUnits="userSpaceOnUse">
                        <stop stopColor={e.fromChain.color} stopOpacity="0.8" />
                        <stop offset="1" stopColor={e.toChain.color} stopOpacity="0.8" />
                    </linearGradient>
                ))}
                <filter id="glow-packet" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* Connection lines */}
            {edges.map((e, i) => (
                <motion.line
                    key={e.gradId}
                    x1={e.from.x + cx} y1={e.from.y + cy}
                    x2={e.to.x + cx} y2={e.to.y + cy}
                    stroke={`url(#${e.gradId})`}
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    filter="url(#glow-line)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
                />
            ))}

            {/* Data packets — 3 per edge with offsets */}
            {edges.map((e) =>
                PACKET_OFFSETS.map((offset, pi) => {
                    const t = (packetPhase + offset) % 1;
                    const px = e.from.x + cx + (e.to.x - e.from.x) * t;
                    const py = e.from.y + cy + (e.to.y - e.from.y) * t;
                    return (
                        <circle
                            key={`${e.gradId}-pkt-${pi}`}
                            cx={px} cy={py}
                            r="3.5"
                            fill={e.fromChain.color}
                            filter="url(#glow-packet)"
                            opacity={0.85}
                        />
                    );
                })
            )}
        </svg>
    );
});

/* =========================================================
   CHAIN NODE
   ========================================================= */
const ChainNode = memo(function ChainNode({ chain, position, index }) {
    return (
        <motion.div
            className="absolute flex flex-col items-center gap-1.5 cursor-default"
            style={{
                left: `calc(50% + ${position.x}px - 36px)`,
                top: `calc(50% + ${position.y}px - 36px)`,
                willChange: 'transform',
            }}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 + index * 0.08 }}
            whileHover={{ scale: 1.18, y: -4 }}
        >
            <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                style={{ background: `${chain.color}18`, border: `1.5px solid ${chain.color}44` }}
                whileHover={{
                    boxShadow: `0 0 20px 6px ${chain.color}44`,
                    background: `${chain.color}28`,
                }}
                transition={{ duration: 0.25 }}
            >
                {chain.logo}
                {/* Pulse ring */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `2px solid ${chain.color}` }}
                    animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                />
            </motion.div>
            <span
                className="text-[10px] font-medium tracking-wide"
                style={{ color: chain.color, textShadow: `0 0 8px ${chain.color}66` }}
            >
                {chain.label}
            </span>
        </motion.div>
    );
});

/* =========================================================
   CONCEPT CARD ANIMATIONS
   ========================================================= */
// 1. Fingerprint Pulse
const FingerprintIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <motion.path
            d="M20 8C13.37 8 8 13.37 8 20"
            stroke={C.blood} strokeWidth="2" strokeLinecap="round" fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
            d="M20 12C15.58 12 12 15.58 12 20c0 2.4.97 4.57 2.54 6.15"
            stroke={C.terra} strokeWidth="2" strokeLinecap="round" fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        <motion.path
            d="M20 16c-2.21 0-4 1.79-4 4 0 1.5.82 2.81 2.04 3.52"
            stroke={C.olive} strokeWidth="2" strokeLinecap="round" fill="none"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.circle
            cx="20" cy="20" r="2" fill={C.blood}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
    </svg>
);

// 2. Typing code effect
const CodeTypingIcon = () => {
    const lines = ['fn execute()', '  verify()', '  emit()'];
    return (
        <div className="font-mono text-[9px] leading-4 space-y-0.5" aria-hidden="true">
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                    <span style={{ color: C.olive }}>{'>'}</span>
                    <motion.span
                        style={{ color: C.terra }}
                        animate={{ width: ['0%', '100%'] }}
                        transition={{ duration: 0.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                        {line}
                    </motion.span>
                </motion.div>
            ))}
        </div>
    );
};

// 3. Rotating blockchain blocks
const ConsensusIcon = () => (
    <motion.div
        className="relative w-10 h-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
    >
        {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-sm"
                style={{
                    background: [C.blood, C.terra, C.olive, C.sage][i],
                    top: angle === 0 ? 0 : angle === 180 ? 24 : 12,
                    left: angle === 90 ? 24 : angle === 270 ? 0 : 12,
                    opacity: 0.8,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
        ))}
    </motion.div>
);

// 4. Shield verification
const ShieldIcon = () => (
    <div className="relative w-10 h-10" aria-hidden="true">
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                    d="M20 4L8 9v11c0 7.18 5.14 13.9 12 15.5C26.86 33.9 32 27.18 32 20V9L20 4Z"
                    fill={`${C.olive}22`}
                    stroke={C.olive}
                    strokeWidth="1.5"
                />
                <motion.path
                    d="M14 20l4 4 8-8"
                    stroke={C.olive}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />
            </svg>
        </motion.div>
    </div>
);

const CONCEPT_CARDS = Object.freeze([
    {
        id: 'identity',
        title: 'Decentralized Identity',
        desc: 'Self-sovereign identity built on cryptographic proofs — no central authority controls who you are on-chain.',
        icon: <FingerprintIcon />,
        tag: 'Core Protocol',
        tagColor: C.blood,
    },
    {
        id: 'contracts',
        title: 'Smart Contracts',
        desc: 'Self-executing code deployed on-chain that enforces agreement terms without intermediaries.',
        icon: <CodeTypingIcon />,
        tag: 'EVM Layer',
        tagColor: C.terra,
    },
    {
        id: 'consensus',
        title: 'Consensus Mechanisms',
        desc: 'Proof-of-Stake and BFT consensus ensure trustless agreement across thousands of distributed validators.',
        icon: <ConsensusIcon />,
        tag: 'Architecture',
        tagColor: C.sage,
    },
    {
        id: 'zkp',
        title: 'Zero-Knowledge Proofs',
        desc: 'Prove knowledge of a secret without revealing it — the mathematical backbone of private, trustless computation.',
        icon: <ShieldIcon />,
        tag: 'Cryptography',
        tagColor: C.olive,
    },
]);

/* =========================================================
   ANIMATED PIE CHART
   ========================================================= */
const PieChart = memo(function PieChart({ label, segments, inView }) {
    const SIZE = 80;
    const R = 28;
    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const CIRC = 2 * Math.PI * R;

    // Build stroked arcs
    let cumulative = 0;
    const arcs = segments.map((seg) => {
        const dash = (seg.value / 100) * CIRC;
        const gap = CIRC - dash;
        const offset = CIRC - cumulative * CIRC / 100;
        cumulative += seg.value;
        return { ...seg, dash, gap, offset };
    });

    return (
        <div className="flex flex-col items-center gap-2">
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-label={label}>
                <circle cx={CX} cy={CY} r={R} fill="none" stroke={`${C.sage}33`} strokeWidth="7" />
                {arcs.map((arc, i) => (
                    <motion.circle
                        key={i}
                        cx={CX}
                        cy={CY}
                        r={R}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={`${arc.dash} ${arc.gap}`}
                        strokeDashoffset={arc.offset}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        initial={{ opacity: 0, strokeDasharray: `0 ${CIRC}` }}
                        animate={inView ? { opacity: 1, strokeDasharray: `${arc.dash} ${arc.gap}` } : {}}
                        transition={{ duration: 1, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                ))}
            </svg>
            <span className="text-[11px] text-center font-medium" style={{ color: `${C.blood}cc` }}>{label}</span>
        </div>
    );
});

const PIE_DATA = Object.freeze([
    {
        label: 'Smart Contracts',
        segments: [
            { value: 60, color: C.blood },
            { value: 25, color: C.terra },
            { value: 15, color: `${C.sage}88` },
        ],
    },
    {
        label: 'DeFi Concepts',
        segments: [
            { value: 45, color: C.terra },
            { value: 35, color: C.olive },
            { value: 20, color: `${C.sage}88` },
        ],
    },
    {
        label: 'Blockchain Architecture',
        segments: [
            { value: 55, color: C.olive },
            { value: 30, color: C.blood },
            { value: 15, color: `${C.sage}55` },
        ],
    },
    {
        label: 'Layer 2 Ecosystems',
        segments: [
            { value: 50, color: '#627EEA88' },
            { value: 30, color: C.terra },
            { value: 20, color: `${C.sage}88` },
        ],
    },
]);

/* =========================================================
   WALLET BADGE
   ========================================================= */
const MetaMaskLogo = () => (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-label="MetaMask">
        <path d="M32.96 1L20.16 10.25l2.36-5.57L32.96 1Z" fill="#E17726" />
        <path d="M3.04 1l12.67 9.34-2.24-5.66L3.04 1Z" fill="#E27625" />
        <path d="M28.23 24.19l-3.4 5.21 7.27 2 2.09-7.11-5.96-.1Z" fill="#E27625" />
        <path d="M1.83 24.29l2.08 7.11 7.25-2-3.38-5.21-5.95.1Z" fill="#E27625" />
        <path d="M10.73 15.89l-2.05 3.09 7.3.33-.24-7.86-5.01 4.44Z" fill="#E27625" />
        <path d="M25.27 15.89l-5.1-4.54-.17 7.96 7.29-.33-2.02-3.09Z" fill="#E27625" />
        <path d="M11.16 29.4l4.38-2.13-3.78-2.95-.6 5.08Z" fill="#E27625" />
        <path d="M20.46 27.27l4.37 2.13-.59-5.08-3.78 2.95Z" fill="#E27625" />
    </svg>
);

const PhantomLogo = () => (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-label="Phantom">
        <rect width="36" height="36" rx="18" fill="#AB9FF2" />
        <path d="M18 8c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S23.52 8 18 8Zm-2 14a4 4 0 0 1 0-8 4 4 0 0 1 0 8Zm6-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" fill="white" />
    </svg>
);

const WALLETS = Object.freeze([
    { id: 'metamask', name: 'MetaMask', logo: <MetaMaskLogo />, chain: 'Ethereum / EVM', color: '#E17726' },
    { id: 'phantom', name: 'Phantom', logo: <PhantomLogo />, chain: 'Solana', color: '#AB9FF2' },
]);

const WalletBadge = memo(function WalletBadge({ wallet, index }) {
    return (
        <motion.div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl border"
            style={{
                background: `${wallet.color}10`,
                borderColor: `${wallet.color}30`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            whileHover={{ scale: 1.03, borderColor: `${wallet.color}70` }}
        >
            <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${wallet.color}20` }}
            >
                {wallet.logo}
            </div>
            <div>
                <p className="font-semibold text-sm" style={{ color: C.blood }}>{wallet.name}</p>
                <p className="text-xs mt-0.5" style={{ color: C.sage }}>{wallet.chain}</p>
                <p className="text-[10px] mt-0.5 font-medium tracking-wide uppercase" style={{ color: C.terra }}>
                    Connected Ecosystem
                </p>
            </div>
        </motion.div>
    );
});

/* =========================================================
   CONCEPT CARD
   ========================================================= */
const ConceptCard = memo(function ConceptCard({ card, index }) {
    return (
        <motion.div
            className="relative rounded-2xl p-5 border overflow-hidden cursor-default"
            style={{
                background: '#FFFFFF',
                borderColor: `${C.sage}40`,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -4, boxShadow: `0 16px 40px ${C.blood}12`, borderColor: `${C.sage}80` }}
        >
            {/* Tag */}
            <span
                className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${card.tagColor}18`, color: card.tagColor }}
            >
                {card.tag}
            </span>

            {/* Icon */}
            <div className="mb-3 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${C.bg}` }}>
                {card.icon}
            </div>

            <h3 className="font-bold text-[15px] mb-1.5 font-fliege" style={{ color: C.blood }}>
                {card.title}
            </h3>
            <p className="text-[13px] leading-relaxed" style={{ color: `${C.blood}99` }}>
                {card.desc}
            </p>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${card.tagColor}, transparent)` }}
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            />
        </motion.div>
    );
});

/* =========================================================
   MAIN SECTION
   ========================================================= */
export default function ExploringWeb3() {
    const sectionRef = useRef(null);
    const pieRef = useRef(null);
    const pieInView = useInView(pieRef, { once: true, margin: '-60px' });

    // Compute orbital positions — memoized forever (static data)
    const CONSTELLATION_SIZE = 340;
    const chainPositions = useMemo(
        () => CHAINS.map(chain => ({
            ...chain,
            ...polarToXY(chain.angle, ORBIT_RADIUS),
        })),
        []
    );

    return (
        <section
            id="web3-section"
            ref={sectionRef}
            className="relative w-full overflow-hidden py-24 lg:py-36"
            style={{ background: C.bg }}
        >
            {/* Soft background blobs */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                    style={{ background: `radial-gradient(circle, ${C.blood} 0%, transparent 70%)` }}
                />
                <div
                    className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                    style={{ background: `radial-gradient(circle, ${C.terra} 0%, transparent 70%)` }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
                    style={{ background: `radial-gradient(circle, ${C.sage} 0%, transparent 70%)` }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* ── HEADER ── */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.span
                        className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4"
                        style={{ color: C.sage }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="w-8 h-px" style={{ background: C.sage }} />
                        Blockchain Curiosity
                    </motion.span>

                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 font-fliege"
                        style={{ color: '#1a1a1a' }}
                    >
                        Exploring{' '}
                        <span className="italic" style={{ color: C.blood }}>Web3</span>
                    </h2>

                    <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: `${C.blood}80` }}>
                        An ongoing journey into decentralized systems, consensus protocols, and the foundations
                        of trustless computation — driven by curiosity, not speculation.
                    </p>
                </motion.div>

                {/* ── CONSTELLATION ── */}
                <motion.div
                    className="flex justify-center mb-20"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div
                        className="relative flex items-center justify-center"
                        style={{ width: CONSTELLATION_SIZE, height: CONSTELLATION_SIZE }}
                    >
                        {/* Orbital ring */}
                        <motion.div
                            className="absolute rounded-full border"
                            style={{
                                width: ORBIT_RADIUS * 2 + 90,
                                height: ORBIT_RADIUS * 2 + 90,
                                borderColor: `${C.sage}25`,
                                borderStyle: 'dashed',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* SVG connection lines + packets */}
                        <ConstellationSVG size={CONSTELLATION_SIZE} chainPositions={chainPositions} />

                        {/* Center hub */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 select-none"
                            style={{
                                background: `linear-gradient(135deg, ${C.blood}dd, ${C.terra}cc)`,
                                borderColor: `${C.blood}40`,
                            }}
                            animate={{ rotate: [0, 3, 0, -3, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.08 }}
                        >
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                                <path d="M14 3L3 10v8l11 7 11-7V10L14 3Z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.5" />
                                <circle cx="14" cy="14" r="4" fill="white" fillOpacity="0.9" />
                            </svg>
                            <span className="text-[8px] font-bold tracking-widest text-white uppercase mt-0.5">Chain</span>
                        </motion.div>

                        {/* Chain nodes */}
                        {chainPositions.map((chain, i) => (
                            <ChainNode
                                key={chain.id}
                                chain={chain}
                                position={{ x: chain.x, y: chain.y }}
                                index={i}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* ── TWO-COLUMN: CONCEPTS + PIE CHARTS ── */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">

                    {/* Left: Concept Cards */}
                    <div>
                        <motion.h3
                            className="text-2xl font-bold mb-6 font-fliege"
                            style={{ color: C.blood }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Core Web3 Concepts
                        </motion.h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {CONCEPT_CARDS.map((card, i) => (
                                <ConceptCard key={card.id} card={card} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Right: Learning Journey Pie Charts */}
                    <div ref={pieRef}>
                        <motion.h3
                            className="text-2xl font-bold mb-2 font-fliege"
                            style={{ color: C.blood }}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Learning Journey
                        </motion.h3>
                        <motion.p
                            className="text-sm mb-6"
                            style={{ color: `${C.blood}70` }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Visual representation of my intermediate-level exploration across Web3 domains.
                        </motion.p>

                        <div
                            className="rounded-2xl p-6 border grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                            style={{ background: '#FFFFFF', borderColor: `${C.sage}30` }}
                        >
                            {PIE_DATA.map((pie, i) => (
                                <motion.div
                                    key={pie.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={pieInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: i * 0.12, duration: 0.5 }}
                                >
                                    <PieChart label={pie.label} segments={pie.segments} inView={pieInView} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            {[
                                { label: 'Confident', color: C.blood },
                                { label: 'Exploring', color: C.terra },
                                { label: 'Learning', color: C.sage },
                            ].map(l => (
                                <span key={l.label} className="flex items-center gap-1.5 text-[11px]" style={{ color: `${C.blood}88` }}>
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                                    {l.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── WALLET BADGES ── */}
                <motion.div
                    className="mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3
                        className="text-lg font-semibold mb-4 font-fliege text-center"
                        style={{ color: C.blood }}
                    >
                        Wallet Ecosystems Explored
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {WALLETS.map((wallet, i) => (
                            <WalletBadge key={wallet.id} wallet={wallet} index={i} />
                        ))}
                    </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.a
                        href="#connect"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide border-2 transition-colors"
                        style={{
                            borderColor: C.blood,
                            color: C.blood,
                        }}
                        whileHover={{
                            backgroundColor: C.blood,
                            color: C.bg,
                            scale: 1.04,
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Let's Connect
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>

            </div>
        </section>
    );
}
