import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MinimalTooltip from './MinimalTooltip';

const DIFFICULTY_COLORS = ['#10b981', '#f59e0b', '#ef4444'];
const CHART_MARGIN = { top: 10, right: 16, left: 0, bottom: 8 };
const emptyStateClass = 'mt-6 rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-6 text-center text-sm text-[#94a3b8]';

function toDifficultySeries(difficulty) {
  if (!difficulty) return [];
  return [
    { name: 'Easy', value: Number.isFinite(difficulty.easy) ? Math.max(0, difficulty.easy) : 0 },
    { name: 'Medium', value: Number.isFinite(difficulty.medium) ? Math.max(0, difficulty.medium) : 0 },
    { name: 'Hard', value: Number.isFinite(difficulty.hard) ? Math.max(0, difficulty.hard) : 0 },
  ];
}

function toMonthlySeries(values) {
  if (!Array.isArray(values)) return [];
  return values
    .filter((item) => item && typeof item.month === 'string')
    .map((item) => ({
      month: item.month,
      solved: Number.isFinite(item.solved) ? Math.max(0, item.solved) : 0,
    }));
}

function toRatingSeries(values) {
  if (!Array.isArray(values)) return [];
  return values
    .filter((item) => item && typeof item.date === 'string')
    .map((item) => ({
      date: item.date,
      rating: Number.isFinite(item.rating) ? Math.max(0, item.rating) : 0,
    }));
}

const AnimatedCounter = memo(function AnimatedCounter({ value, isActive }) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!isActive) return undefined;

    const target = Number.isFinite(value) ? Math.max(0, value) : 0;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const next = Math.round(progress * target);
      setDisplayValue(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, value]);

  return <span>{displayValue}</span>;
});

const LeetCodeDashboardCard = memo(function LeetCodeDashboardCard({ stats, cardClassName }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.25 });

  const difficultySeries = useMemo(() => toDifficultySeries(stats?.difficulty), [stats?.difficulty]);
  const monthlySeries = useMemo(() => toMonthlySeries(stats?.monthly), [stats?.monthly]);
  const ratingSeries = useMemo(() => toRatingSeries(stats?.ratingHistory), [stats?.ratingHistory]);

  return (
    <article ref={cardRef} className={cardClassName}>
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#f8fafc]">LeetCode</h3>
          <p className="mt-1 text-sm text-[#94a3b8]">Difficulty mix, monthly solved, and contest rating trend.</p>
        </div>
        <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94a3b8]">Solved</p>
          <p className="text-xl font-semibold text-[#f8fafc]">
            <AnimatedCounter value={stats?.totalSolved ?? 0} isActive={inView} />
          </p>
        </div>
      </header>

      <section className="mt-6" role="img" aria-label="LeetCode difficulty pie chart">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Difficulty Split</p>
        {difficultySeries.every((item) => item.value === 0) ? (
          <div className={emptyStateClass}>No difficulty distribution available.</div>
        ) : (
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultySeries}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={64}
                  outerRadius={112}
                  animationDuration={800}
                  paddingAngle={2}
                >
                  {difficultySeries.map((entry, index) => (
                    <Cell key={`lc-diff-${entry.name}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<MinimalTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="mt-6" role="img" aria-label="LeetCode monthly solved bar chart">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Monthly Solved</p>
        {monthlySeries.length === 0 ? (
          <div className={emptyStateClass}>No monthly solved history available.</div>
        ) : (
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySeries} margin={CHART_MARGIN}>
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<MinimalTooltip />} />
                <Bar dataKey="solved" name="Solved" fill="#8b5cf6" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="mt-6" role="img" aria-label="LeetCode rating trend line chart">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Rating Trend</p>
        {ratingSeries.length === 0 ? (
          <div className={emptyStateClass}>No rating history available.</div>
        ) : (
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingSeries} margin={CHART_MARGIN}>
                <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<MinimalTooltip />} />
                <Line type="monotone" dataKey="rating" name="Rating" stroke="#ec4899" strokeWidth={2.3} dot={false} animationDuration={800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </article>
  );
});

export default LeetCodeDashboardCard;
