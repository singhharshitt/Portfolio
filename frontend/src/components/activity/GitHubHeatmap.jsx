import React, { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from '../../utils/motion';
import { GitBranch, Flame, Trophy } from 'lucide-react';
import ActivityCard from './ActivityCard';
import useReducedMotion from '../../hooks/useReducedMotion';

/* ── Theme-matched heatmap colours ── */
const LEVEL_FILLS = [
  'rgba(69, 34, 21, 0.06)',   // 0 – empty
  'rgba(223, 108, 79, 0.28)', // 1
  'rgba(223, 108, 79, 0.52)', // 2
  'rgba(223, 108, 79, 0.78)', // 3
  'rgba(69, 34, 21, 0.88)',   // 4 – max
];

const GLOW_COLORS = [
  'none',
  'rgba(223,108,79,0.3)',
  'rgba(223,108,79,0.45)',
  'rgba(223,108,79,0.6)',
  'rgba(69,34,21,0.5)',
];

const CELL = 11;
const GAP = 3;
const STRIDE = CELL + GAP;
const RX = 2;
const ROWS = 7;
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const percentile = (sorted, p) => {
  if (!sorted.length) return 0;
  const idx = Math.floor((sorted.length - 1) * p);
  return sorted[idx] ?? sorted[sorted.length - 1];
};

/* ────────────────────────────────────
   Pac-Man follows active contribution path.
   Auto-plays in view and pauses outside.
   ──────────────────────────────────── */
function usePacManPath(pathPoints, speed, isInView, reducedMotion) {
  const [state, setState] = useState({ x: -20, y: 0, headIndex: -1 });
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const duration = speed * 1000;
  const pathLength = pathPoints.length;

  useEffect(() => {
    if (!isInView || reducedMotion || pathLength < 2) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setState((prev) => ({
        ...prev,
        x: pathLength ? pathPoints[0].x : -20,
        y: pathLength ? pathPoints[0].y : 0,
        headIndex: -1,
      }));
      return;
    }

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = ((elapsed % (duration + 4500)) / duration);

      if (progress <= 1) {
        const eased = progress * progress * (3 - 2 * progress);
        const scaled = eased * (pathLength - 1);
        const idx = clamp(Math.floor(scaled), 0, pathLength - 2);
        const localT = clamp(scaled - idx, 0, 1);
        const current = pathPoints[idx];
        const next = pathPoints[idx + 1] ?? current;

        const nextX = current.x + (next.x - current.x) * localT;
        const nextY = current.y + (next.y - current.y) * localT;
        const nextHead = scaled;

        setState((prev) => {
          if (
            Math.abs(prev.x - nextX) < 0.12
            && Math.abs(prev.y - nextY) < 0.12
            && Math.abs(prev.headIndex - nextHead) < 0.12
          ) {
            return prev;
          }
          return { x: nextX, y: nextY, headIndex: nextHead };
        });
      } else {
        const origin = pathPoints[0];
        setState((prev) => ({ ...prev, x: origin.x, y: origin.y, headIndex: -1 }));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    startRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isInView, pathLength, pathPoints, reducedMotion, duration]);

  return state;
}

/* ── Pac-Man SVG (pure, no framer-motion path) ── */
const PacManSVG = memo(function PacManSVG({ x, y, size }) {
  const [mouthOpen, setMouthOpen] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setMouthOpen((o) => !o), 150);
    return () => clearInterval(id);
  }, []);

  const r = size / 2;
  const mouth = mouthOpen ? 35 : 5;
  const rad1 = (mouth * Math.PI) / 180;
  const rad2 = ((360 - mouth) * Math.PI) / 180;

  const d = [
    `M ${x + r * Math.cos(rad1)} ${y - r * Math.sin(rad1)}`,
    `A ${r} ${r} 0 1 0 ${x + r * Math.cos(rad2)} ${y + r * Math.sin(rad2)}`,
    `L ${x} ${y}`,
    'Z',
  ].join(' ');

  return (
    <g>
      <path d={d} fill="#DF6C4F" />
      <circle cx={x - 1} cy={y - r * 0.45} r={1.5} fill="#FFFFF0" />
      {/* Dots ahead */}
      {[1, 2, 3].map((i) => (
        <circle key={i} cx={x + r + i * STRIDE} cy={y} r={1.8} fill="#452215" opacity={0.25} />
      ))}
    </g>
  );
});

/* ── Main component ── */
function GitHubHeatmap({ data }) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const inView = useInView(containerRef, { once: false, margin: '-30px' });
  const reducedMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState(null);

  /* Build grid */
  const { grid, monthPositions, gridWidth, gridHeight, pathPoints, pathIndexByDate } = useMemo(() => {
    if (!data?.days?.length) {
      return {
        grid: [],
        monthPositions: [],
        gridWidth: 0,
        gridHeight: 0,
        pathPoints: [],
        pathIndexByDate: new Map(),
      };
    }

    const weeks = [];
    let currentWeek = [];
    for (let i = 0; i < data.days.length; i++) {
      currentWeek.push(data.days[i]);
      if (currentWeek.length === 7 || i === data.days.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    const nonZeroCounts = data.days
      .map((d) => Number(d.count) || 0)
      .filter((n) => n > 0)
      .sort((a, b) => a - b);

    const t1 = percentile(nonZeroCounts, 0.25);
    const t2 = percentile(nonZeroCounts, 0.5);
    const t3 = percentile(nonZeroCounts, 0.75);

    const quantizedLevel = (count) => {
      if (count <= 0) return 0;
      if (count <= t1) return 1;
      if (count <= t2) return 2;
      if (count <= t3) return 3;
      return 4;
    };

    const cells = [];
    weeks.forEach((week, wIdx) => {
      week.forEach((day, dIdx) => {
        cells.push({
          ...day,
          x: wIdx * STRIDE,
          y: dIdx * STRIDE,
          weekIdx: wIdx,
          dayIdx: dIdx,
          levelVisual: quantizedLevel(Number(day.count) || 0),
        });
      });
    });

    const w = weeks.length * STRIDE;
    const h = ROWS * STRIDE;

    // Month positions
    const monthPos = [];
    const seen = new Set();
    for (const c of cells) {
      const m = new Date(c.date).getMonth();
      if (!seen.has(m)) { seen.add(m); monthPos.push({ month: m, x: c.x }); }
    }

    const contributionPathCells = cells
      .filter((c) => (Number(c.count) || 0) > 0)
      .sort((a, b) => a.date.localeCompare(b.date));

    const fallbackPath = cells
      .filter((c) => c.dayIdx === 3)
      .sort((a, b) => a.x - b.x);

    const basePath = contributionPathCells.length >= 10 ? contributionPathCells : fallbackPath;
    const points = basePath.map((c) => ({ x: c.x + CELL / 2, y: c.y + CELL / 2, date: c.date }));
    const indexByDate = new Map(basePath.map((c, idx) => [c.date, idx]));

    return {
      grid: cells,
      monthPositions: monthPos,
      gridWidth: w,
      gridHeight: h,
      pathPoints: points,
      pathIndexByDate: indexByDate,
    };
  }, [data]);

  const pacman = usePacManPath(pathPoints, 6.2, inView, reducedMotion);

  const insights = useMemo(() => {
    const days = data?.days ?? [];
    if (!days.length) {
      return {
        activeRate: 0,
        bestDayLabel: '--',
        bestDayCount: 0,
        peakDaily: 0,
        weeklyTrend: [],
      };
    }

    const weekdayTotals = new Array(7).fill(0);
    const orderedWeekdays = [1, 2, 3, 4, 5, 6, 0];

    let activeDays = 0;
    let peakDaily = 0;
    for (const day of days) {
      const count = Number(day.count) || 0;
      if (count > 0) activeDays += 1;
      peakDaily = Math.max(peakDaily, count);
      weekdayTotals[new Date(day.date).getDay()] += count;
    }

    const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let bestDayIdx = 0;
    for (let i = 1; i < 7; i += 1) {
      if (weekdayTotals[i] > weekdayTotals[bestDayIdx]) bestDayIdx = i;
    }

    const recent = days.slice(-56);
    const weeklyTrend = [];
    for (let i = 0; i < recent.length; i += 7) {
      const chunk = recent.slice(i, i + 7);
      weeklyTrend.push(chunk.reduce((sum, item) => sum + (Number(item.count) || 0), 0));
    }

    return {
      activeRate: Math.round((activeDays / days.length) * 100),
      bestDayLabel: weekdayLabels[bestDayIdx],
      bestDayCount: weekdayTotals[bestDayIdx],
      peakDaily,
      weekdayBars: orderedWeekdays.map((dayIndex) => ({
        label: weekdayLabels[dayIndex],
        value: weekdayTotals[dayIndex],
      })),
      weeklyTrend,
    };
  }, [data]);

  const onCellEnter = useCallback((cell, e) => {
    setTooltip({ date: cell.date, count: cell.count, level: cell.levelVisual, x: e.clientX, y: e.clientY });
  }, []);

  const onCellMove = useCallback((e) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.left = `${e.clientX + 14}px`;
    tooltipRef.current.style.top = `${e.clientY - 48}px`;
  }, []);

  const onCellLeave = useCallback(() => setTooltip(null), []);

  if (!data) return null;

  return (
    <ActivityCard title="GitHub Contributions" icon={GitBranch} iconColor="#452215" isLoading={false} isError={false}>
      {/* Stats badges */}
      <div className="mb-4 flex flex-wrap gap-3">
        <StatBadge icon={Trophy} label="Total" value={data.totalContributions.toLocaleString()} color="#452215" inView={inView} />
        <StatBadge icon={Flame} label="Current Streak" value={`${data.currentStreak}d`} color="#DF6C4F" inView={inView} delay={0.1} />
        <StatBadge icon={Flame} label="Longest Streak" value={`${data.longestStreak}d`} color="#FF9398" inView={inView} delay={0.2} />
      </div>

      {/* Heatmap SVG */}
      <div ref={containerRef} className="relative overflow-x-auto scrollbar-hide">
        <svg width={gridWidth + 4} height={gridHeight + 26} className="block" role="img" aria-label="GitHub contribution heatmap">
          {/* SVG filter for cell glow */}
          <defs>
            <filter id="cellGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Month labels */}
          {monthPositions.map(({ month, x }, i) => (
            <text key={i} x={x} y={10} fill="rgba(69,34,21,0.45)" style={{ fontSize: '9px', fontFamily: "'SNPro-Regular', sans-serif" }}>
              {MONTH_LABELS[month]}
            </text>
          ))}

          <g transform="translate(0, 18)">
            {grid.map((cell, i) => {
              const pathIndex = pathIndexByDate.get(cell.date);
              const depth = pathIndex == null || pacman.headIndex < 0 ? -1 : pacman.headIndex - pathIndex;
              const isBehindPacman = depth >= 0;
              const fillOpacity = isBehindPacman ? clamp(1 - depth * 0.11, 0.35, 1) : 1;
              return (
                <g key={cell.date}>
                  {/* Glow layer for active cells */}
                  {cell.levelVisual >= 2 && (
                    <rect
                      x={cell.x - 1} y={cell.y - 1}
                      width={CELL + 2} height={CELL + 2}
                      rx={RX + 1} ry={RX + 1}
                      fill={GLOW_COLORS[cell.levelVisual]}
                      opacity={0.4}
                      filter="url(#cellGlow)"
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  <motion.rect
                    x={cell.x} y={cell.y}
                    width={CELL} height={CELL}
                    rx={RX} ry={RX}
                    fill={LEVEL_FILLS[cell.levelVisual]}
                    opacity={fillOpacity}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: fillOpacity, scale: 1 } : {}}
                    transition={{ delay: Math.min(i * 0.0008, 0.4), duration: 0.25, type: 'spring', stiffness: 250, damping: 22 }}
                    onMouseEnter={(e) => onCellEnter(cell, e)}
                    onMouseMove={onCellMove}
                    onMouseLeave={onCellLeave}
                    style={{ cursor: 'pointer', transition: 'opacity 0.4s ease' }}
                    whileHover={{ scale: 1.22, filter: 'brightness(1.13)' }}
                  />
                </g>
              );
            })}

            {/* Pac-Man */}
            {inView && gridWidth > 0 && pathPoints.length > 1 && (
              <PacManSVG x={pacman.x} y={pacman.y} size={CELL + 2} />
            )}
          </g>
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          ref={tooltipRef}
          className="pointer-events-none fixed z-50 rounded-lg border border-[#452215]/20 bg-[#FFFFF0] px-3 py-2 shadow-lg"
          style={{ left: tooltip.x + 14, top: tooltip.y - 48 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: LEVEL_FILLS[tooltip.level] }} />
            <p className="font-ui text-xs text-[#452215]">
              <span className="font-mono-ui">{tooltip.count}</span> contribution{tooltip.count !== 1 && 's'}
            </p>
          </div>
          <p className="font-caption mt-0.5 text-[10px] text-[#452215]/55">
            {new Date(tooltip.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1">
        <span className="font-caption mr-1.5 text-[10px] text-[#452215]/45">Less</span>
        {LEVEL_FILLS.map((fill, i) => (
          <div key={i} className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: fill }} />
        ))}
        <span className="font-caption ml-1.5 text-[10px] text-[#452215]/45">More</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#452215]/10 bg-[#FFF8EE] p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-caption text-[9px] text-[#452215]/45">Weekly momentum</p>
            <p className="font-mono-ui text-[9px] text-[#452215]/55">8w</p>
          </div>
          <div className="flex h-10 items-end gap-1">
            {insights.weeklyTrend.map((value, idx) => {
              const max = Math.max(...insights.weeklyTrend, 1);
              const height = Math.max(3, Math.round((value / max) * 34));
              return (
                <motion.div
                  key={`wk-${idx}`}
                  className="w-full rounded-sm bg-[#DF6C4F]/75"
                  initial={{ height: 0, opacity: 0.4 }}
                  animate={inView ? { height, opacity: 1 } : { height: 0, opacity: 0.4 }}
                  transition={{ delay: 0.05 + idx * 0.03, duration: 0.3 }}
                />
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-[#452215]/10 bg-[#FFF8EE] p-3">
          <p className="font-caption mb-2 text-[9px] text-[#452215]/45">Contribution insights</p>
          <div className="mb-2 grid grid-cols-3 gap-2">
            <InsightMetric label="Active" value={`${insights.activeRate}%`} />
            <InsightMetric label="Peak" value={`${insights.peakDaily}`} />
            <InsightMetric label={insights.bestDayLabel} value={`${insights.bestDayCount}`} />
          </div>
          <div className="grid grid-cols-7 gap-1">
            {insights.weekdayBars.map((bar) => {
              const max = Math.max(...insights.weekdayBars.map((item) => item.value), 1);
              const h = Math.max(2, Math.round((bar.value / max) * 16));
              return (
                <div key={bar.label} className="flex flex-col items-center gap-1">
                  <div className="h-4 w-2 rounded-sm bg-[#452215]/7 p-px">
                    <motion.div
                      className="w-full rounded-sm bg-[#452215]/75"
                      initial={{ height: 0 }}
                      animate={inView ? { height: h } : { height: 0 }}
                      transition={{ delay: 0.1, duration: 0.35 }}
                    />
                  </div>
                  <span className="font-caption text-[8px] text-[#452215]/45">{bar.label[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityCard>
  );
}

const InsightMetric = memo(function InsightMetric({ label, value }) {
  return (
    <div className="rounded-md border border-[#452215]/8 bg-[#FFFFF0] px-2 py-1 text-center">
      <p className="font-mono-ui text-[10px] text-[#452215]">{value}</p>
      <p className="font-caption text-[8px] text-[#452215]/45">{label}</p>
    </div>
  );
});

/* ── Stat badge ── */
const StatBadge = memo(function StatBadge({ icon: Icon, label, value, color, inView, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-2 rounded-lg border border-[#452215]/10 bg-[#FFF8EE] px-3 py-1.5"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, delay, type: 'spring' }}
    >
      <Icon size={13} style={{ color }} />
      <div>
        <p className="font-ui text-[11px] text-[#452215]">{value}</p>
        <p className="font-caption text-[9px] text-[#452215]/45">{label}</p>
      </div>
    </motion.div>
  );
});

export default memo(GitHubHeatmap);
