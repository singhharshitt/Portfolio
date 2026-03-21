import React, { memo } from 'react';
import { motion, useInView } from '../../utils/motion';
import { useRef } from 'react';

/**
 * Shared card wrapper that matches the existing neo-brutalist card style.
 * Provides loading skeleton and error fallback states.
 */
const ActivityCard = memo(function ActivityCard({
  title,
  icon: Icon,
  iconColor = '#DF6C4F',
  isLoading,
  isError,
  error,
  children,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border-2 border-[#452215] bg-[#FFFFF0] p-6 shadow-[4px_4px_0_#8F5E41] transition-shadow duration-300 hover:shadow-[6px_6px_0_#8F5E41] ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${iconColor}14` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Icon size={20} style={{ color: iconColor }} />
          </motion.div>
        )}
        <h4 className="font-ui text-base text-[#452215]">{title}</h4>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 w-3/4 rounded bg-[#452215]/10" />
          <div className="h-4 w-1/2 rounded bg-[#452215]/10" />
          <div className="h-20 w-full rounded bg-[#452215]/05" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-[#DF6C4F]/20 bg-[#DF6C4F]/5 p-4 text-center">
          <p className="font-bodycopy text-sm text-[#452215]/70">
            {error?.message?.includes('not set')
              ? 'API key not configured'
              : error?.message?.includes('cached data')
              ? 'Showing last updated data'
              : 'Unable to load data right now'}
          </p>
          <p className="font-caption mt-1 text-xs text-[#452215]/50">
            {error?.message?.includes('cached data') 
              ? 'Latest data will load when available'
              : 'Data will appear once available'}
          </p>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
});

export default ActivityCard;
