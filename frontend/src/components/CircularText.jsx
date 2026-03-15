import React from 'react';

export default function CircularText({
  text = 'DEVELOPER / DESIGNER / CREATOR / ',
  size = 150,
  className = '',
  duration = 20,
  reverse = false,
  hoverPause = true,
}) {
  const radius = size / 2 - 15;
  const id = `circular-text-${size}-${text.length}-${Math.random().toString(36).substr(2, 9)}`;
  const rotationDirection = reverse ? 'reverse' : 'normal';

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        animation: `spinSlow ${duration}s linear infinite ${rotationDirection}`,
        willChange: 'transform',
      }}
      onMouseEnter={hoverPause ? (e) => { e.currentTarget.style.animationPlayState = 'paused'; } : undefined}
      onMouseLeave={hoverPause ? (e) => { e.currentTarget.style.animationPlayState = 'running'; } : undefined}
    >
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: 'visible' }}>
        <defs>
          <path
            id={id}
            d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>
        
        <text
          fontSize="11"
          fontWeight="600"
          letterSpacing="2.5"
          fill="currentColor"
          style={{ textTransform: 'uppercase', filter: 'blur(4px)', opacity: 0.4 }}
        >
          <textPath href={`#${id}`} startOffset="0%">{text}</textPath>
        </text>
        
        <text
          fontSize="11"
          fontWeight="600"
          letterSpacing="2.5"
          fill="currentColor"
          style={{ textTransform: 'uppercase' }}
        >
          <textPath href={`#${id}`} startOffset="0%">{text}</textPath>
        </text>
      </svg>
    </div>
  );
}