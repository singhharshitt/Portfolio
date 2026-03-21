import React, { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from '../../utils/motion';
import { Calendar, Zap } from 'lucide-react';
import ActivityCard from './ActivityCard';
import useReducedMotion from '../../hooks/useReducedMotion';

/* ── Theme-matched colours for LeetCode heatmap ── */
const LC_FILLS = [
  'rgba(69, 34, 21, 0.05)',   // 0
  'rgba(76, 175, 80, 0.3)',   // 1 – green tint
  'rgba(223, 108, 79, 0.45)', // 2
  'rgba(223, 108, 79, 0.7)',  // 3
  'rgba(69, 34, 21, 0.85)',   // 4 – max
];

const CELL = 10;
const GAP = 2;
const STRIDE = CELL + GAP;
const RX = 2;
const ROWS = 7;
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ────────────────────────────────────
   Snake animation: traverses active cells
   in chronological order creating a trail
   ──────────────────────────────────── */
function useSnakeAnimation(activeCells, isInView, speed) {
  const [snakeHead, setSnakeHead] = useState(-1);
  const [snakeTrail, setSnakeTrail] = useState(new Set());
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const hasPlayedRef = useRef(false);
  const [replayToken, setReplayToken] = useState(0);
  const reducedMotion = useReducedMotion();
  const TAIL_LENGTH = 8;
  const DURATION = speed * 1000;

  const replay = useCallback(() => {
    hasPlayedRef.current = false;
    setReplayToken((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!isInView || activeCells.length === 0 || reducedMotion) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setSnakeHead(-1);
      setSnakeTrail(new Set());
      return;
    }

    if (hasPlayedRef.current) return;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      if (progress < 1) {
        const idx = Math.min(Math.floor(progress * activeCells.length), activeCells.length - 1);
        setSnakeHead(idx);

        // Build trail
        const trail = new Set();
        for (let t = Math.max(0, idx - TAIL_LENGTH); t <= idx; t++) {
          if (t < activeCells.length) trail.add(activeCells[t].date);
        }
        setSnakeTrail(trail);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const last = activeCells.length - 1;
        setSnakeHead(last);
        setSnakeTrail(new Set(activeCells.slice(Math.max(0, last - TAIL_LENGTH), last + 1).map((c) => c.date)));
        hasPlayedRef.current = true;
        rafRef.current = null;
      }
    };

    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isInView, activeCells, DURATION, reducedMotion, replayToken]);

  return { snakeHead, snakeTrail, replay };
}

function HeatmapBody({ data, compact = false }) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, margin: '-30px' });
  const [tooltip, setTooltip] = useState(null);

  /* Build grid from submissionDays */
  const { grid, monthPositions, gridWidth, gridHeight, activeCells } = useMemo(() => {
    if (!data?.submissionDays?.length) return { grid: [], monthPositions: [], gridWidth: 0, gridHeight: 0, activeCells: [] };

    const days = data.submissionDays;
    const weeks = [];
    let currentWeek = [];

    for (let i = 0; i < days.length; i++) {
      currentWeek.push(days[i]);
      if (currentWeek.length === 7 || i === days.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    const cells = [];
    const active = [];
    weeks.forEach((week, wIdx) => {
      week.forEach((day, dIdx) => {
        const cell = { ...day, x: wIdx * STRIDE, y: dIdx * STRIDE, weekIdx: wIdx, dayIdx: dIdx };
        cells.push(cell);
        if (day.count > 0) active.push(cell);
      });
    });

    const w = weeks.length * STRIDE;
    const h = ROWS * STRIDE;

    const monthPos = [];
    const seen = new Set();
    for (const c of cells) {
      const m = new Date(c.date).getMonth();
      if (!seen.has(m)) { seen.add(m); monthPos.push({ month: m, x: c.x }); }
    }

    return { grid: cells, monthPositions: monthPos, gridWidth: w, gridHeight: h, activeCells: active };
  }, [data]);

  /* Snake animation across active cells */
  const { snakeHead, snakeTrail, replay } = useSnakeAnimation(activeCells, inView, compact ? 4 : 5);

  /* Compute total submissions */
  const totalSubs = useMemo(() => {
    if (!data?.submissionDays) return 0;
    return data.submissionDays.reduce((sum, d) => sum + d.count, 0);
  }, [data]);

  const activeDays = activeCells.length;

  const onCellEnter = useCallback((cell, e) => {
    setTooltip({ date: cell.date, count: cell.count, level: cell.level, x: e.clientX, y: e.clientY });
  }, []);
  const onCellLeave = useCallback(() => setTooltip(null), []);

  if (!data?.submissionDays?.length) return null;

  return (
    <>
      {!compact && (
        <div className="mb-3 flex flex-wrap gap-3">
          <StatPill icon={Zap} label="Active Days" value={activeDays} inView={inView} />
          <StatPill icon={Calendar} label="Submissions" value={totalSubs} inView={inView} delay={0.1} />
        </div>
      )}

      <div ref={containerRef} className="relative overflow-x-auto scrollbar-hide" onMouseEnter={replay}>
        <svg width={gridWidth + 4} height={gridHeight + 24} className="block" role="img" aria-label="LeetCode submission heatmap">
          <defs>
            <filter id="snakeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Month labels */}
          {monthPositions.map(({ month, x }, i) => (
            <text key={i} x={x} y={10} fill="rgba(69,34,21,0.4)" style={{ fontSize: '8px', fontFamily: "'SNPro-Regular', sans-serif" }}>
              {MONTH_LABELS[month]}
            </text>
          ))}

          <g transform="translate(0, 16)">
            {grid.map((cell, i) => {
              const isSnakeCell = snakeTrail.has(cell.date);
              return (
                <g key={cell.date}>
                  {/* Snake glow trail */}
                  {isSnakeCell && (
                    <rect
                      x={cell.x - 1} y={cell.y - 1}
                      width={CELL + 2} height={CELL + 2}
                      rx={RX + 1} ry={RX + 1}
                      fill="rgba(76,175,80,0.5)"
                      filter="url(#snakeGlow)"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  <motion.rect
                    x={cell.x} y={cell.y}
                    width={CELL} height={CELL}
                    rx={RX} ry={RX}
                    fill={isSnakeCell ? 'rgba(76,175,80,0.7)' : LC_FILLS[cell.level]}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: Math.min(i * 0.0006, 0.35), duration: 0.2 }}
                    onMouseEnter={(e) => onCellEnter(cell, e)}
                    onMouseLeave={onCellLeave}
                    style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                    whileHover={{ scale: 1.5 }}
                  />
                </g>
              );
            })}

            {/* Snake head indicator */}
            {snakeHead >= 0 && snakeHead < activeCells.length && (
              <circle
                cx={activeCells[snakeHead].x + CELL / 2}
                cy={activeCells[snakeHead].y + CELL / 2}
                r={CELL / 2 + 1}
                fill="rgba(76,175,80,0.9)"
                stroke="#FFFFF0"
                strokeWidth={1.5}
                filter="url(#snakeGlow)"
              />
            )}
          </g>
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-[#452215]/20 bg-[#FFFFF0] px-3 py-2 shadow-lg"
          style={{ left: tooltip.x + 14, top: tooltip.y - 48 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: LC_FILLS[tooltip.level] }} />
            <p className="font-ui text-xs text-[#452215]">
              <span className="font-mono-ui">{tooltip.count}</span> submission{tooltip.count !== 1 && 's'}
            </p>
          </div>
          <p className="font-caption mt-0.5 text-[10px] text-[#452215]/55">
            {new Date(tooltip.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end gap-1">
        <span className="font-caption mr-1 text-[9px] text-[#452215]/40">Less</span>
        {LC_FILLS.map((fill, i) => (
          <div key={i} className="h-2.25 w-2.25 rounded-sm" style={{ backgroundColor: fill }} />
        ))}
        <span className="font-caption ml-1 text-[9px] text-[#452215]/40">More</span>
      </div>
    </>
  );
}

function LeetCodeHeatmap({ data, embedded = false, compact = false }) {
  if (!data?.submissionDays?.length) return null;

  if (embedded) {
    return <HeatmapBody data={data} compact={compact} />;
  }

  return (
    <ActivityCard title="LeetCode Activity" icon={Calendar} iconColor="#4CAF50" isLoading={false} isError={false}>
      <HeatmapBody data={data} compact={compact} />
    </ActivityCard>
  );
}

const StatPill = memo(function StatPill({ icon: Icon, label, value, inView, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 rounded-md border border-[#452215]/10 bg-[#FFF8EE] px-2.5 py-1"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay, type: 'spring' }}
    >
      <Icon size={11} className="text-[#4CAF50]" />
      <div>
        <p className="font-ui text-[10px] text-[#452215]">{value}</p>
        <p className="font-caption text-[8px] text-[#452215]/40">{label}</p>
      </div>
    </motion.div>
  );
});

export default memo(LeetCodeHeatmap);
