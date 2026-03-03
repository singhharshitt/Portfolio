import { memo, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MinimalTooltip from './MinimalTooltip';

const TOPIC_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
const CHART_MARGIN = { top: 10, right: 16, left: 0, bottom: 8 };
const emptyStateClass = 'mt-6 rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-6 text-center text-sm text-[#94a3b8]';

function toMonthlySeries(values) {
  if (!Array.isArray(values)) return [];
  return values
    .filter((item) => item && typeof item.month === 'string')
    .map((item) => ({
      month: item.month,
      count: Number.isFinite(item.count) ? Math.max(0, item.count) : 0,
    }));
}

function toTopicSeries(values) {
  if (!Array.isArray(values)) return [];
  return values
    .filter((item) => item && typeof item.name === 'string')
    .map((item) => ({
      name: item.name,
      value: Number.isFinite(item.value) ? Math.max(0, item.value) : 0,
    }));
}

const GfgDashboardCard = memo(function GfgDashboardCard({ stats, cardClassName }) {
  const monthlySeries = useMemo(() => toMonthlySeries(stats?.monthlyActivity), [stats?.monthlyActivity]);
  const topicSeries = useMemo(() => toTopicSeries(stats?.topicDistribution), [stats?.topicDistribution]);

  return (
    <article className={cardClassName}>
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#f8fafc]">GeeksforGeeks</h3>
          <p className="mt-1 text-sm text-[#94a3b8]">Problem volume and monthly consistency profile.</p>
        </div>
        <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94a3b8]">Total</p>
          <p className="text-xl font-semibold text-[#f8fafc]">{stats?.totalProblems ?? 0}</p>
        </div>
      </header>

      <section className="mt-6" role="img" aria-label="GeeksforGeeks monthly activity bar chart">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Monthly Activity</p>
        {monthlySeries.length === 0 ? (
          <div className={emptyStateClass}>No monthly activity available.</div>
        ) : (
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySeries} margin={CHART_MARGIN}>
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<MinimalTooltip />} />
                <Bar dataKey="count" name="Solved" fill="#6366f1" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {topicSeries.length > 0 ? (
        <section className="mt-6" role="img" aria-label="GeeksforGeeks topic distribution pie chart">
          <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Topic Distribution</p>
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicSeries}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={108}
                  animationDuration={800}
                  paddingAngle={2}
                >
                  {topicSeries.map((entry, index) => (
                    <Cell key={`gfg-topic-${entry.name}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<MinimalTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      ) : null}
    </article>
  );
});

export default GfgDashboardCard;
