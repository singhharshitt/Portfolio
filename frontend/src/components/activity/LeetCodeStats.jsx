import React, { memo, useMemo, useRef } from 'react';
import { motion, useInView } from '../../utils/motion';
import { Code2, Target, TrendingUp, Award } from 'lucide-react';
import ActivityCard from './ActivityCard';
import LeetCodeHeatmap from './LeetCodeHeatmap';

const DIFFICULTY_CONFIG = [
  { key: 'easy',   label: 'Easy',   color: '#4CAF50', bgColor: 'rgba(76, 175, 80, 0.12)' },
  { key: 'medium', label: 'Medium', color: '#DF6C4F', bgColor: 'rgba(223, 108, 79, 0.12)' },
  { key: 'hard',   label: 'Hard',   color: '#452215', bgColor: 'rgba(69, 34, 21, 0.12)' },
];

/* ── SVG Donut / Pie chart ── */
const PieChart = memo(function PieChart({ data, inView }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  const SIZE = 80;
  const CENTER = SIZE / 2;
  const RADIUS = 30;
  const STROKE = 10;

  let accAngle = -90; // start from top

  const arcs = data.map((d, i) => {
    const pct = d.value / total;
    const angle = pct * 360;
    const startAngle = accAngle;
    const endAngle = accAngle + angle;
    accAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const largeArc = angle > 180 ? 1 : 0;

    const x1 = CENTER + RADIUS * Math.cos(startRad);
    const y1 = CENTER + RADIUS * Math.sin(startRad);
    const x2 = CENTER + RADIUS * Math.cos(endRad);
    const y2 = CENTER + RADIUS * Math.sin(endRad);

    const path = `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;

    return (
      <motion.path
        key={d.key}
        d={path}
        fill="none"
        stroke={d.color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
      />
    );
  });

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="shrink-0">
      {/* Background ring */}
      <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(69,34,21,0.06)" strokeWidth={STROKE} />
      {arcs}
      {/* Center text */}
      <text x={CENTER} y={CENTER - 4} textAnchor="middle" fill="#452215" style={{ fontSize: '14px', fontFamily: "'GTSuperDisplay-Light', serif" }}>
        {total}
      </text>
      <text x={CENTER} y={CENTER + 8} textAnchor="middle" fill="rgba(69,34,21,0.45)" style={{ fontSize: '7px', fontFamily: "'SNPro-Regular', sans-serif" }}>
        solved
      </text>
    </svg>
  );
});

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SubmissionsTrend = memo(function SubmissionsTrend({ points, inView }) {
  if (!points.length) return null;

  const width = 240;
  const height = 56;
  const barGap = 3;
  const barWidth = Math.max(4, Math.floor((width - barGap * (points.length - 1)) / points.length));
  const maxValue = Math.max(...points.map((p) => p.count), 1);

  return (
    <div className="rounded-lg border border-[#452215]/10 bg-[#FFF8EE] p-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="font-caption text-[9px] text-[#452215]/45">Submissions (recent weeks)</p>
        <p className="font-mono-ui text-[9px] text-[#452215]/55">{points.length}w</p>
      </div>
      <svg width={width} height={height} role="img" aria-label="LeetCode recent weekly submissions trend">
        {points.map((point, i) => {
          const h = Math.max(2, Math.round((point.count / maxValue) * (height - 14)));
          const x = i * (barWidth + barGap);
          const y = height - h;

          return (
            <motion.rect
              key={point.key}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={1.5}
              fill={point.count > 0 ? '#DF6C4F' : 'rgba(69,34,21,0.08)'}
              initial={{ height: 0, y: height }}
              animate={inView ? { height: h, y } : { height: 0, y: height }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.02 }}
            />
          );
        })}
      </svg>
    </div>
  );
});

const WeekdayDistribution = memo(function WeekdayDistribution({ bars, inView }) {
  if (!bars.length) return null;

  const max = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div className="rounded-lg border border-[#452215]/10 bg-[#FFF8EE] p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-caption text-[9px] text-[#452215]/45">Weekday activity</p>
        <p className="font-caption text-[9px] text-[#452215]/45">last 12m</p>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {bars.map((bar, idx) => {
          const h = Math.max(3, Math.round((bar.value / max) * 24));
          return (
            <div key={bar.label} className="flex flex-col items-center gap-1">
              <div className="flex h-7 w-4 items-end rounded-sm bg-[#452215]/7 p-0.5">
                <motion.div
                  className="w-full rounded-sm bg-[#452215]/75"
                  initial={{ height: 0 }}
                  animate={inView ? { height: h } : { height: 0 }}
                  transition={{ delay: 0.12 + idx * 0.03, duration: 0.3 }}
                />
              </div>
              <span className="font-caption text-[8px] text-[#452215]/45">{bar.label[0]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* ── Main ── */
function LeetCodeStats({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  const weeklyTrend = useMemo(() => {
    const days = data?.submissionDays ?? [];
    if (!days.length) return [];

    const normalized = days.slice(-84); // ~12 weeks
    const result = [];
    for (let i = 0; i < normalized.length; i += 7) {
      const chunk = normalized.slice(i, i + 7);
      result.push({
        key: `w-${i}`,
        count: chunk.reduce((sum, d) => sum + (Number(d.count) || 0), 0),
      });
    }
    return result.slice(-12);
  }, [data?.submissionDays]);

  const activityInsights = useMemo(() => {
    const days = data?.submissionDays ?? [];
    if (!days.length) {
      return {
        activeDays: 0,
        maxDaily: 0,
        longestStreak: 0,
        weekdayBars: [],
      };
    }

    const weekdayTotals = new Array(7).fill(0);
    let activeDays = 0;
    let maxDaily = 0;
    let longestStreak = 0;
    let runningStreak = 0;

    for (const day of days) {
      const count = Number(day.count) || 0;
      weekdayTotals[new Date(day.date).getDay()] += count;
      maxDaily = Math.max(maxDaily, count);

      if (count > 0) {
        activeDays += 1;
        runningStreak += 1;
        longestStreak = Math.max(longestStreak, runningStreak);
      } else {
        runningStreak = 0;
      }
    }

    const ordered = [1, 2, 3, 4, 5, 6, 0];
    return {
      activeDays,
      maxDaily,
      longestStreak,
      weekdayBars: ordered.map((idx) => ({ label: DAY_LABELS[idx], value: weekdayTotals[idx] })),
    };
  }, [data?.submissionDays]);

  if (!data) return null;

  const difficultyData = [
    { ...DIFFICULTY_CONFIG[0], solved: data.easySolved,   total: data.totalEasy,   value: data.easySolved },
    { ...DIFFICULTY_CONFIG[1], solved: data.mediumSolved, total: data.totalMedium,  value: data.mediumSolved },
    { ...DIFFICULTY_CONFIG[2], solved: data.hardSolved,   total: data.totalHard,    value: data.hardSolved },
  ];

  return (
    <ActivityCard title="LeetCode Progress" icon={Code2} iconColor="#DF6C4F" isLoading={false} isError={false}>
      <div ref={ref} className="space-y-4">
        <LeetCodeHeatmap data={data} embedded compact />

        {/* Pie chart + stats row */}
        <div className="flex items-center gap-4">
          <PieChart data={difficultyData} inView={inView} />

          <div className="flex flex-wrap gap-2">
            <StatPill icon={Target} label="Acceptance" value={`${data.acceptanceRate}%`} inView={inView} delay={0.1} />
            {data.ranking > 0 && (
              <StatPill icon={Award} label="Ranking" value={`#${data.ranking.toLocaleString()}`} inView={inView} delay={0.2} />
            )}
            {data.totalSubmissions > 0 && (
              <StatPill icon={TrendingUp} label="Submissions" value={data.totalSubmissions.toLocaleString()} inView={inView} delay={0.3} />
            )}
          </div>
        </div>

        <SubmissionsTrend points={weeklyTrend} inView={inView} />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <WeekdayDistribution bars={activityInsights.weekdayBars} inView={inView} />
          <div className="rounded-lg border border-[#452215]/10 bg-[#FFF8EE] p-2.5">
            <p className="font-caption mb-2 text-[9px] text-[#452215]/45">Additional insights</p>
            <div className="grid grid-cols-3 gap-1.5">
              <MiniMetric label="Active Days" value={activityInsights.activeDays} />
              <MiniMetric label="Max Daily" value={activityInsights.maxDaily} />
              <MiniMetric label="Best Streak" value={`${activityInsights.longestStreak}d`} />
            </div>
          </div>
        </div>
      </div>
    </ActivityCard>
  );
}

const MiniMetric = memo(function MiniMetric({ label, value }) {
  return (
    <div className="rounded-md border border-[#452215]/8 bg-[#FFFFF0] px-2 py-1.5 text-center">
      <p className="font-mono-ui text-[10px] text-[#452215]">{value}</p>
      <p className="font-caption text-[8px] text-[#452215]/45">{label}</p>
    </div>
  );
});

/* ── Stat pill ── */
const StatPill = memo(function StatPill({ icon: Icon, label, value, inView, delay }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 rounded-lg border border-[#452215]/10 bg-[#FFFFF0] px-2 py-1"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay, type: 'spring' }}
    >
      <Icon size={11} className="text-[#DF6C4F]" />
      <div>
        <p className="font-ui text-[10px] text-[#452215]">{value}</p>
        <p className="font-caption text-[8px] text-[#452215]/40">{label}</p>
      </div>
    </motion.div>
  );
});

export default memo(LeetCodeStats);
