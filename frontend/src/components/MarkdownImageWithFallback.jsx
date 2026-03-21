import React, { useMemo, useState } from 'react';

export default function MarkdownImageWithFallback({ src, alt = 'README media', className = '', fallbackAlt = 'Image unavailable' }) {
  const [hasError, setHasError] = useState(false);

  const accessibleAlt = useMemo(() => {
    if (alt && String(alt).trim()) {
      return alt;
    }
    return fallbackAlt;
  }, [alt, fallbackAlt]);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={accessibleAlt}
        className="my-4 flex min-h-28 w-full items-center justify-center rounded-xl border border-[#452215] bg-[#FFF8EE] px-4 py-6 text-center"
      >
        <p className="font-bodycopy text-sm text-[#452215]">Image unavailable</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={accessibleAlt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
