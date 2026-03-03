import { Activity, Code2, Flame, Trophy } from 'lucide-react';

const FALLBACK_CONTRIBUTIONS = Array.from({ length: 364 }, (_, index) =>
  Math.max(0, Math.floor(3 + Math.sin(index / 7) * 2 + ((index * 11) % 4)))
);

function toContributionCells(contributions = []) {
  if (Array.isArray(contributions) && contributions.length > 0) {
    if (contributions.length >= 364) return contributions.slice(-364);
    const padded = Array.from({ length: 364 - contributions.length }, () => 0);
    return [...padded, ...contributions];
  }
  return FALLBACK_CONTRIBUTIONS;
}

function toLevel(value, max) {
  if (value <= 0) return 0;
  const ratio = value / max;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
}

/**
 * @param {{
 *  githubStats?: import('../types/activityStats').GitHubStats,
 *  leetCodeStats?: import('../types/activityStats').LeetCodeStats,
 *  gfgStats?: import('../types/activityStats').GFGStats
 * }} props
 */
export default function DeveloperActivityDashboard({ githubStats, leetCodeStats, gfgStats }) {
  const commitTotal =
    githubStats?.commits?.reduce((sum, count) => sum + count, 0) ??
    githubStats?.contributions?.reduce((sum, count) => sum + count, 0) ??
    0;

  const solvedTotal = (leetCodeStats?.totalSolved ?? 0) + (gfgStats?.totalProblems ?? 0);
  const topLanguage = githubStats?.languages?.[0]?.name ?? 'JavaScript';

  const stats = [
    {
      label: 'Commits',
      value: commitTotal,
      change: '+18%',
      trend: 'positive',
      Icon: Activity,
    },
    {
      label: 'Current Streak',
      value: githubStats?.currentStreak ?? 0,
      change: '+4 days',
      trend: 'positive',
      Icon: Flame,
    },
    {
      label: 'Problems Solved',
      value: solvedTotal,
      change: '+11%',
      trend: 'positive',
      Icon: Trophy,
    },
    {
      label: 'Top Language',
      value: topLanguage,
      change: 'Active',
      trend: 'positive',
      Icon: Code2,
    },
  ];

  const cells = toContributionCells(githubStats?.contributions ?? []);
  const maxCount = Math.max(...cells, 1);

  return (
    <section id="coding-activity" className="coding-section">
      <div className="section-container">
        <header className="coding-header reveal-item">
          <p className="projects-label">Coding Activity Dashboard</p>
          <h2 className="projects-title">
            Developer <em>Signals</em>
          </h2>
        </header>

        <div className="coding-grid">
          {stats.map((stat, index) => (
            <article key={stat.label} className="stat-card reveal-item" data-reveal-delay={`${index * 0.06}`}>
              <stat.Icon className="stat-icon" />
              <div className="stat-value animate-in">{stat.value}</div>
              <p className="stat-label">{stat.label}</p>
              <span className={`stat-change ${stat.trend}`}>{stat.change}</span>
            </article>
          ))}

          <article className="contribution-card reveal-item">
            <h3 className="contribution-title">Contribution Rhythm</h3>
            <div className="contribution-graph">
              {cells.map((value, index) => {
                const level = toLevel(value, maxCount);
                return <span key={`day-${index}`} className={`contribution-day level-${level}`} />;
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
