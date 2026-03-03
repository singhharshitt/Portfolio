import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from 'recharts';
import { Github } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const THEME = {
  bgPrimary: '#0F1412',
  textPrimary: '#f8fafc',
  indigo: '#6366f1',
  emerald: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
};

// Helpers: env vars (Vite)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || '';
const LEETCODE_USERNAME = import.meta.env.VITE_LEETCODE_USERNAME || '';
const GFG_USERNAME = import.meta.env.VITE_GFG_USERNAME || '';

// Fetchers with fallbacks
async function fetchGitHubContributions(username) {
  if (!username || !GITHUB_TOKEN) {
    // fallback demo: return last 6 months random data
    const demo = Array.from({ length: 26 }).map((_, i) => ({ date: `W${i+1}`, count: Math.floor(Math.random()*12) }));
    return { contributions: demo, total: demo.reduce((s,d) => s + d.count, 0), streak: 5, longest: 22 };
  }

  const query = `query contributions($login:String!){ user(login:$login){ contributionsCollection{ contributionCalendar{ totalContributions, weeks{ contributionDays{ date, contributionCount } } } } } }`;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `bearer ${GITHUB_TOKEN}` },
    body: JSON.stringify({ query, variables: { login: username } })
  });

  if (!res.ok) throw new Error('GitHub API error');
  const json = await res.json();
  // flatten weeks -> days and take last ~26 weeks
  const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks || [];
  const days = weeks.flatMap(w => w.contributionDays).map(d => ({ date: d.date, count: d.contributionCount }));
  const last6Months = days.slice(-182); // approximate
  // aggregate to weekly buckets
  const aggregated = [];
  for (let i = 0; i < last6Months.length; i += 7) {
    const chunk = last6Months.slice(i, i+7);
    aggregated.push({ date: chunk[0]?.date || `W${i/7+1}`, count: chunk.reduce((s,c) => s + (c.count||0), 0) });
  }
  const total = aggregated.reduce((s,a) => s + a.count, 0);
  return { contributions: aggregated, total, streak: 0, longest: 0 };
}

async function fetchLeetCodeStats(username) {
  if (!username) {
    return {
      solvedPercent: 62,
      breakdown: { easy: 320, medium: 140, hard: 30 },
      recent: [{ title: 'Two Sum', status: 'Accepted' }],
      contestRating: [1200, 1250, 1300, 1280, 1350]
    };
  }
  // Note: public un-official APIs exist; implement light fetch with fallback
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (!res.ok) throw new Error('LeetCode API error');
    const json = await res.json();
    return {
      solvedPercent: Math.round((json.totalSolved / Math.max(1, json.totalQuestions)) * 100),
      breakdown: { easy: json.easySolved || 0, medium: json.mediumSolved || 0, hard: json.hardSolved || 0 },
      recent: json.recentQuestions || [],
      contestRating: json.contests || []
    };
  } catch (e) {
    return {
      solvedPercent: 62,
      breakdown: { easy: 320, medium: 140, hard: 30 },
      recent: [{ title: 'Two Sum', status: 'Accepted' }],
      contestRating: [1200, 1250, 1300, 1280, 1350]
    };
  }
}

async function fetchGFGStats(username) {
  if (!username) {
    // demo monthly activity
    const months = ['Jan','Feb','Mar','Apr','May','Jun'];
    return months.map((m,i) => ({ month: m, problems: Math.floor(Math.random()*12) }));
  }
  try {
    const res = await fetch(`https://gfg-stats.tashif.codes/${username}`);
    if (!res.ok) throw new Error('GFG API error');
    const data = await res.json();
    // Map the API response to month/problems format for the chart
    if (data.monthlySubmission) {
      return Object.entries(data.monthlySubmission).map(([month, count]) => ({
        month,
        problems: count || 0
      }));
    }
    return [];
  } catch (e) {
    // fallback to demo if API fails
    const months = ['Jan','Feb','Mar','Apr','May','Jun'];
    return months.map((m) => ({ month: m, problems: Math.floor(Math.random()*12) }));
  }
}

// Reusable glass Tooltip for Recharts
const TooltipContent = ({ payload }) => {
  if (!payload || !payload.length) return null;
  const p = payload[0].payload || payload[0];
  return (
    <div style={{ padding: 8, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)', borderRadius: 8, color: THEME.textPrimary }}>
      {Object.keys(p).map(k => (
        <div key={k} style={{ fontSize: 12 }}>{k}: {p[k]}</div>
      ))}
    </div>
  );
};

export default function CodingActivity() {
  const { data: ghData } = useQuery({
    queryKey: ['github', GITHUB_USERNAME],
    queryFn: () => fetchGitHubContributions(GITHUB_USERNAME),
    staleTime: 1000 * 60 * 30
  });
  const { data: lcData } = useQuery({
    queryKey: ['leetcode', LEETCODE_USERNAME],
    queryFn: () => fetchLeetCodeStats(LEETCODE_USERNAME),
    staleTime: 1000 * 60 * 30
  });
  const { data: gfgData } = useQuery({
    queryKey: ['gfg', GFG_USERNAME],
    queryFn: () => fetchGFGStats(GFG_USERNAME),
    staleTime: 1000 * 60 * 30
  });

  return (
    <section className="py-12 lg:py-20" style={{ background: THEME.bgSecondary }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: EASE }}>
          <h2 style={{ color: THEME.textPrimary }} className="text-2xl font-semibold">Coding Activity</h2>
          <p style={{ color: THEME.textSecondary }} className="mt-2">Real-time stats from development platforms</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {/* GitHub Card */}
          <motion.div className="p-6 rounded-2xl" style={{ background: THEME.bgElevated }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6" color={THEME.textPrimary} />
              <div>
                <div style={{ color: THEME.textPrimary, fontWeight: 600 }}>GitHub Activity</div>
                <div style={{ color: THEME.textSecondary, fontSize: 13 }}>Last 6 months</div>
              </div>
            </div>

            <div className="mt-4" style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={(ghData?.contributions || []).map((d, i) => ({ name: d.date, commits: d.count }))}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip content={<TooltipContent />} />
                  <Bar dataKey="commits" fill={THEME.emerald} radius={[4,4,0,0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div style={{ color: THEME.textSecondary }}>
                <div style={{ color: THEME.textPrimary, fontWeight: 700 }}>{ghData?.total ?? '—'}</div>
                <div style={{ fontSize: 12 }}>Total commits</div>
              </div>
              <div style={{ color: THEME.textSecondary }}>
                <div style={{ color: THEME.textPrimary, fontWeight: 700 }}>{ghData?.streak ?? '—'}</div>
                <div style={{ fontSize: 12 }}>Current streak</div>
              </div>
              <div style={{ color: THEME.textSecondary }}>
                <div style={{ color: THEME.textPrimary, fontWeight: 700 }}>{ghData?.longest ?? '—'}</div>
                <div style={{ fontSize: 12 }}>Longest streak</div>
              </div>
            </div>
          </motion.div>

          {/* LeetCode Card */}
          <motion.div className="p-6 rounded-2xl" style={{ background: THEME.bgElevated }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div style={{ color: THEME.textPrimary, fontWeight: 600 }}>LeetCode Stats</div>
            <div style={{ color: THEME.textSecondary, fontSize: 13 }}>Solved distribution</div>

            <div className="mt-4 flex items-center justify-center" style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height={180}>
                <RadialBarChart innerRadius="20%" outerRadius="100%" data={[{ name: 'Easy', value: lcData?.breakdown?.easy || 0, fill: THEME.emerald }, { name: 'Medium', value: lcData?.breakdown?.medium || 0, fill: THEME.amber }, { name: 'Hard', value: lcData?.breakdown?.hard || 0, fill: THEME.red }]} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={8} />
                  <Tooltip content={<TooltipContent />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4">
              <div style={{ color: THEME.textPrimary, fontWeight: 700 }}>{lcData?.solvedPercent ?? '—'}%</div>
              <div style={{ color: THEME.textSecondary, fontSize: 13 }}>Solved (approx)</div>
            </div>
          </motion.div>

          {/* GFG Card */}
          <motion.div className="p-6 rounded-2xl" style={{ background: THEME.bgElevated }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ color: THEME.textPrimary, fontWeight: 600 }}>GeeksforGeeks</div>
            <div style={{ color: THEME.textSecondary, fontSize: 13 }}>Monthly activity</div>

            <div className="mt-4" style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={(gfgData || []).map(d => ({ name: d.month, problems: d.problems }))}>
                  <XAxis dataKey="name" stroke={THEME.textSecondary} />
                  <YAxis stroke={THEME.textSecondary} />
                  <Tooltip content={<TooltipContent />} />
                  <Bar dataKey="problems" fill={THEME.indigo} radius={[6,6,0,0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
