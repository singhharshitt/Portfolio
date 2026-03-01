import React from 'react';

export default function CircularText({ 
  text = 'DEVELOPER · DESIGNER · CREATOR · ', 
  size = 150, 
  className = '',
  duration = 20,
  reverse = false,
  hoverPause = true,
}) {
  const radius = size / 2 - 15;
  const id = `circular-text-${size}-${text.length}`;

  // Animation direction
  const rotationDirection = reverse ? 'reverse' : 'normal';

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        animation: `spinSlow ${duration}s linear infinite ${rotationDirection}`,
        willChange: 'transform',
        ...(hoverPause && {
          animationPlayState: 'running',
        }),
      }}
      onMouseEnter={hoverPause ? (e) => { e.currentTarget.style.animationPlayState = 'paused'; } : undefined}
      onMouseLeave={hoverPause ? (e) => { e.currentTarget.style.animationPlayState = 'running'; } : undefined}
    >
      {/* Inject keyframes */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spinSlowReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>

      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        width={size} 
        height={size}
        style={{
          overflow: 'visible',
        }}
      >
        <defs>
          <path
            id={id}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>
        
        {/* Glow effect */}
        <text
          fontSize="12"
          fontWeight="600"
          letterSpacing="3"
          fill="currentColor"
          style={{ 
            textTransform: 'uppercase',
            filter: 'blur(8px)',
            opacity: 0.3,
          }}
        >
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
        
        {/* Main text */}
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