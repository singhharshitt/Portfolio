import { memo, useMemo } from 'react';
import { Pie, PieChart, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MinimalTooltip from './MinimalTooltip';

const HEATMAP_ROWS = 7;
const HEATMAP_LIMIT = 84;
const LANGUAGE_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
const CHART_MARGIN = { top: 10, right: 16, left: 0, bottom: 8 };

const emptyStateClass = 'mt-6 rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-6 text-center text-sm text-[#94a3b8]';

function normalizeHeatmap(values) {
  if (!Array.isArray(values)) return [];
  return values.slice(-HEATMAP_LIMIT).map((value) => (Number.isFinite(value) ? Math.max(0, value) : 0));
}

function toCommitSeries(values) {
  if (!Array.isArray(values)) return [];
  return values.map((value, index) => ({
    week: `W${index + 1}`,
    commits: Number.isFinite(value) ? Math.max(0, value) : 0,
  }));
}

function toLanguageSeries(values) {
  if (!Array.isArray(values)) return [];
  return values.filter((item) => item && typeof item.name === 'string' && Number.isFinite(item.value) && item.value >= 0);
}

function heatColor(value, max) {
  if (value <= 0 || max <= 0) return 'rgba(16, 185, 129, 0.09)';
  const intensity = Math.max(0.2, value / max);
  return `rgba(16, 185, 129, ${intensity.toFixed(2)})`;
}

const GitHubDashboardCard = memo(function GitHubDashboardCard({ stats, cardClassName }) {
  const contributions = useMemo(() => normalizeHeatmap(stats?.contributions), [stats?.contributions]);
  const commitSeries = useMemo(() => toCommitSeries(stats?.commits), [stats?.commits]);
  const languageSeries = useMemo(() => toLanguageSeries(stats?.languages), [stats?.languages]);
  const maxContribution = useMemo(() => Math.max(...contributions, 0), [contributions]);
  const columns = useMemo(() => {
    if (contributions.length === 0) return 12;
    return Math.ceil(contributions.length / HEATMAP_ROWS);
  }, [contributions.length]);

  return (
    <article className={cardClassName}>
      <header className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#f8fafc]">GitHub Activity</h3>
          <p className="mt-1 text-sm text-[#94a3b8]">Contributions, commit trend, and language share.</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.16em] text-[#64748b]">Streak</p>
          <p className="text-base font-semibold text-[#f8fafc]">
            {stats?.currentStreak ?? 0} / {stats?.longestStreak ?? 0}
          </p>
        </div>
      </header>

      <section className="mt-6">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Contribution Heatmap</p>
        {contributions.length === 0 ? (
          <div className={emptyStateClass}>No contribution data available.</div>
        ) : (
          <div
            className="mt-3 grid gap-1 rounded-xl border border-slate-700/60 bg-slate-950/40 p-3"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            role="img"
            aria-label="GitHub contribution heatmap"
          >
            {contributions.map((value, index) => (
              <span
                key={`gh-cell-${index}`}
                title={`${value} contributions`}
                className="h-3 w-full rounded-[3px]"
                style={{ backgroundColor: heatColor(value, maxContribution) }}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-6" role="img" aria-label="GitHub commit line chart">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Commit Trend</p>
        {commitSeries.length === 0 ? (
          <div className={emptyStateClass}>No commit history available.</div>
        ) : (
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={commitSeries} margin={CHART_MARGIN}>
                <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<MinimalTooltip />} />
                <Line type="monotone" dataKey="commits" stroke="#10b981" strokeWidth={2.3} dot={false} animationDuration={800} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="mt-6" role="img" aria-label="GitHub languages pie chart">
        <p className="text-xs uppercase tracking-[0.14em] text-[#64748b]">Languages</p>
        {languageSeries.length === 0 ? (
          <div className={emptyStateClass}>No language distribution available.</div>
        ) : (
          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageSeries}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={110}
                  animationDuration={800}
                  paddingAngle={2}
                >
                  {languageSeries.map((entry, index) => (
                    <Cell key={`lang-${entry.name}`} fill={LANGUAGE_COLORS[index % LANGUAGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<MinimalTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </article>
  );
});

export default GitHubDashboardCard;
