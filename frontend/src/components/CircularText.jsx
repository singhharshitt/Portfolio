import React from 'react';

/**
 * CircularText — Rotating SVG text on a circular path
 * Pure CSS rotation (no JS animation loop). Terracotta stroke, cream fill.
 * Props:
 *   text — the text to display (repeated around the circle)
 *   size — diameter in pixels (default 150)
 *   className — extra classes
 */
export default function CircularText({ text = 'DEVELOPER · DESIGNER · CREATOR · ', size = 150, className = '' }) {
    const radius = size / 2 - 15;
    const id = `circular-text-${size}`;

    return (
        <div
            className={`inline-block ${className}`}
            style={{
                width: size,
                height: size,
                animation: 'spinSlow 20s linear infinite',
            }}
        >
            <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                <defs>
                    <path
                        id={id}
                        d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                        fill="none"
                    />
                </defs>
                <text
                    fontSize="12"
                    fontWeight="600"
                    letterSpacing="3"
                    fill="currentColor"
                    style={{ textTransform: 'uppercase' }}
                >
                    <textPath href={`#${id}`} startOffset="0%">
                        {text}
                    </textPath>
                </text>
            </svg>
        </div>
    );
}
