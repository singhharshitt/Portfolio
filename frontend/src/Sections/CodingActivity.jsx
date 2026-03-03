import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Code2, 
  Terminal, 
  Calendar, 
  Flame, 
  Trophy, 
  GitBranch, 
  Star,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';

// Theme colors based on your palette
const THEME = {
  bg: '#FFFBEB',
  text: '#1a1a1a',
  textMuted: '#1a1a1a60',
  bloodstone: '#5D0D18',
  mistySage: '#9FB2AC',
  olive: '#6B7A3D',
  terracotta: '#C67C4E',
  // GitHub-style contribution colors
  contribution: {
    0: '#ebedf0',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39',
  },
  leetcode: {
    0: '#f0f0f0',
    1: '#ffccbc',
    2: '#ff8a65',
    3: '#f4511e',
    4: '#bf360c',
  },
  gfg: {
    0: '#f0f0f0',
    1: '#c8e6c9',
    2: '#81c784',
    3: '#4caf50',
    4: '#2e7d32',
  }
};

// Generate realistic daily activity data
const generateDailyData = (days = 365, maxActivity = 10) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate realistic patterns (more activity on weekdays)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseActivity = isWeekend ? 0.3 : 0.7;
    
    // Random activity with some streaks
    const randomFactor = Math.random();
    const activity = randomFactor > (1 - baseActivity) 
      ? Math.floor(Math.random() * maxActivity) + 1 
      : 0;
    
    data.push({
      date: date.toISOString().split('T')[0],
      count: activity,
      dayOfWeek,
      month: date.getMonth(),
    });
  }
  return data;
};

// Generate LeetCode daily submissions
const generateLeetCodeData = () => generateDailyData(365, 5);

// Generate GFG daily problems
const generateGFGData = () => generateDailyData(365, 3);

// GitHub data
const GITHUB_DATA = {
  username: 'singhharshitt',
  totalContributions: 1247,
  currentStreak: 15,
  longestStreak: 45,
  totalRepos: 42,
  starsReceived: 128,
  forks: 34,
  dailyActivity: generateDailyData(365, 12),
};

// LeetCode data
const LEETCODE_DATA = {
  username: 'singhharshitt',
  totalSolved: 487,
  easy: 320,
  medium: 140,
  hard: 27,
  ranking: 125847,
  contestRating: 1654,
  dailySubmissions: generateLeetCodeData(),
  recentBadges: ['100 Days Badge 2024', '50 Days Badge 2024'],
};

// GFG data
const GFG_DATA = {
  username: 'singhharshitt',
  totalSolved: 156,
  codingScore: 892,
  monthlyStreak: 8,
  institutionRank: 45,
  dailyProblems: generateGFGData(),
  skillScores: {
    'Arrays': 85,
    'Strings': 78,
    'DP': 65,
    'Trees': 72,
  },
};

const resolveEnvUsername = (envKey, fallback) => {
  const value = import.meta.env?.[envKey];
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const DEFAULT_USERNAMES = Object.freeze({
  github: resolveEnvUsername('VITE_GITHUB_USERNAME', 'singhharshitt'),
  leetcode: resolveEnvUsername('VITE_LEETCODE_USERNAME', 'singhharshitt'),
  gfg: resolveEnvUsername('VITE_GFG_USERNAME', 'singhharshitt'),
});

const REALTIME_REFRESH_MS = 5 * 60 * 1000;

const toDateKey = (value) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

const toCountMap = (entries = []) =>
  entries.reduce((acc, entry) => {
    const date = toDateKey(entry?.date);
    if (!date) return acc;
    const count = Number(entry?.count ?? 0);
    acc[date] = Number.isFinite(count) ? count : 0;
    return acc;
  }, {});

const buildDailyDataFromMap = (countMap = {}, days = 365) => {
  const today = new Date();
  const data = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = toDateKey(date);
    data.push({
      date: dateKey,
      count: Number(countMap[dateKey] ?? 0),
      dayOfWeek: date.getDay(),
      month: date.getMonth(),
    });
  }
  return data;
};

const calculateStreaks = (dailyData = []) => {
  let longestStreak = 0;
  let currentStreak = 0;
  let running = 0;

  for (const day of dailyData) {
    if ((day?.count ?? 0) > 0) {
      running += 1;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
  }

  for (let i = dailyData.length - 1; i >= 0; i -= 1) {
    if ((dailyData[i]?.count ?? 0) > 0) currentStreak += 1;
    else break;
  }

  return { currentStreak, longestStreak };
};

const safeFetchJson = async (url, signal) => {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
};

const parseLeetCodeCalendar = (calendar) => {
  if (!calendar) return {};
  let parsed = calendar;
  if (typeof calendar === 'string') {
    try {
      parsed = JSON.parse(calendar);
    } catch {
      parsed = {};
    }
  }
  if (!parsed || typeof parsed !== 'object') return {};

  return Object.entries(parsed).reduce((acc, [timestamp, count]) => {
    const seconds = Number(timestamp);
    if (!Number.isFinite(seconds)) return acc;
    const dateKey = toDateKey(new Date(seconds * 1000));
    if (!dateKey) return acc;
    acc[dateKey] = Number(count ?? 0);
    return acc;
  }, {});
};

const parseSkillScores = (raw = {}) => {
  const source = raw?.skillScores || raw?.skills || raw?.topicWise || raw?.topicDistribution || null;
  if (!source) return { ...GFG_DATA.skillScores };

  if (Array.isArray(source)) {
    const fromArray = source.reduce((acc, item) => {
      const key = item?.name || item?.skill || item?.topic;
      const value = Number(item?.value ?? item?.score ?? item?.count ?? 0);
      if (key && Number.isFinite(value)) acc[key] = Math.max(0, Math.min(100, value));
      return acc;
    }, {});
    return Object.keys(fromArray).length > 0 ? fromArray : { ...GFG_DATA.skillScores };
  }

  if (typeof source === 'object') {
    const fromObject = Object.entries(source).reduce((acc, [key, value]) => {
      const score = Number(value);
      if (Number.isFinite(score)) acc[key] = Math.max(0, Math.min(100, score));
      return acc;
    }, {});
    return Object.keys(fromObject).length > 0 ? fromObject : { ...GFG_DATA.skillScores };
  }

  return { ...GFG_DATA.skillScores };
};

const fetchGitHubLiveData = async (username, signal) => {
  const [userResult, reposResult, contributionResult] = await Promise.allSettled([
    safeFetchJson(`https://api.github.com/users/${username}`, signal),
    safeFetchJson(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, signal),
    safeFetchJson(`https://github-contributions-api.jogruber.de/v4/${username}`, signal),
  ]);

  const user = userResult.status === 'fulfilled' ? userResult.value : null;
  const repos = reposResult.status === 'fulfilled' && Array.isArray(reposResult.value) ? reposResult.value : [];

  let dailyActivity = [];
  if (contributionResult.status === 'fulfilled' && Array.isArray(contributionResult.value?.contributions)) {
    const map = toCountMap(contributionResult.value.contributions);
    dailyActivity = buildDailyDataFromMap(map, 365);
  } else {
    const events = await safeFetchJson(`https://api.github.com/users/${username}/events/public?per_page=100`, signal)
      .catch(() => []);
    const map = Array.isArray(events)
      ? events.reduce((acc, event) => {
          const date = toDateKey(event?.created_at);
          if (!date) return acc;
          let increment = 0;
          if (event.type === 'PushEvent') increment = Math.max(1, event?.payload?.commits?.length || 1);
          else if (event.type?.endsWith('Event')) increment = 1;
          if (increment > 0) acc[date] = (acc[date] || 0) + increment;
          return acc;
        }, {})
      : {};
    dailyActivity = buildDailyDataFromMap(map, 365);
  }

  if (dailyActivity.length === 0) dailyActivity = generateDailyData(365, 12);

  const starsReceived = repos.reduce((sum, repo) => sum + Number(repo?.stargazers_count || 0), 0);
  const forks = repos.reduce((sum, repo) => sum + Number(repo?.forks_count || 0), 0);
  const totalRepos = Number(user?.public_repos ?? repos.length ?? GITHUB_DATA.totalRepos);
  const totalContributions = dailyActivity.reduce((sum, day) => sum + Number(day.count || 0), 0);
  const { currentStreak, longestStreak } = calculateStreaks(dailyActivity);

  return {
    ...GITHUB_DATA,
    username,
    totalContributions,
    currentStreak,
    longestStreak,
    totalRepos,
    starsReceived,
    forks,
    dailyActivity,
  };
};

const fetchLeetCodeLiveData = async (username, signal) => {
  const raw = await safeFetchJson(`https://leetcode-stats-api.herokuapp.com/${username}`, signal);
  if (!raw || raw.status === 'error') throw new Error(raw?.message || 'LeetCode API unavailable');

  const totalSolved = Number(raw.totalSolved ?? LEETCODE_DATA.totalSolved);
  const easy = Number(raw.easySolved ?? LEETCODE_DATA.easy);
  const medium = Number(raw.mediumSolved ?? LEETCODE_DATA.medium);
  const hard = Number(raw.hardSolved ?? LEETCODE_DATA.hard);
  const ranking = Number(raw.ranking ?? LEETCODE_DATA.ranking);
  const contestRating = Number(raw.contestRating ?? raw.contestRanking ?? LEETCODE_DATA.contestRating);

  const calendarMap = parseLeetCodeCalendar(raw.submissionCalendar);
  const dailySubmissions =
    Object.keys(calendarMap).length > 0 ? buildDailyDataFromMap(calendarMap, 365) : generateLeetCodeData();

  return {
    ...LEETCODE_DATA,
    username,
    totalSolved,
    easy,
    medium,
    hard,
    ranking,
    contestRating,
    dailySubmissions,
  };
};

const fetchGfgLiveData = async (username, signal) => {
  const raw = await safeFetchJson(`https://geeks-for-geeks-api.vercel.app/${username}`, signal);
  if (!raw || raw.status === 'error') throw new Error(raw?.message || 'GFG API unavailable');

  const totalSolved = Number(raw.totalProblemsSolved ?? raw.totalSolved ?? raw.solved ?? GFG_DATA.totalSolved);
  const codingScore = Number(raw.codingScore ?? raw.coding_score ?? raw.score ?? GFG_DATA.codingScore);
  const monthlyStreak = Number(raw.currentStreak ?? raw.monthlyStreak ?? raw.streak ?? GFG_DATA.monthlyStreak);
  const institutionRank = Number(raw.instituteRank ?? raw.institutionRank ?? raw.rank ?? GFG_DATA.institutionRank);
  const skillScores = parseSkillScores(raw);

  let dailyMap = {};
  if (raw.submissionCalendar) dailyMap = parseLeetCodeCalendar(raw.submissionCalendar);
  const dailyProblems =
    Object.keys(dailyMap).length > 0 ? buildDailyDataFromMap(dailyMap, 365) : generateGFGData();

  return {
    ...GFG_DATA,
    username,
    totalSolved,
    codingScore,
    monthlyStreak,
    institutionRank,
    skillScores,
    dailyProblems,
  };
};

const formatMetric = (value) => {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return '0';
  if (number >= 1000) {
    const rounded = number >= 10000 ? Math.round(number / 1000) : (number / 1000).toFixed(1);
    return `${rounded}K+`;
  }
  return `${number}`;
};

const ActivityHeatmap = ({ data, colorScheme, title, icon: Icon, maxValue }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Group data by weeks
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < data.length; i += 7) {
      w.push(data.slice(i, i + 7));
    }
    return w;
  }, [data]);

  const getIntensity = (count) => {
    if (count === 0) return 0;
    const intensity = Math.ceil((count / maxValue) * 4);
    return Math.min(intensity, 4);
  };

  const getColor = (intensity) => colorScheme[intensity];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 border border-[#5D0D18]/10 shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5D0D18]/10 flex items-center justify-center">
            <Icon size={20} className="text-[#5D0D18]" />
          </div>
          <div>
            <h3 className="font-bold text-[#1a1a1a] font-fliege">{title}</h3>
            <p className="text-xs text-[#1a1a1a]/50">Last 365 days</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#9FB2AC]">
          <Calendar size={14} />
          <span>365 days</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[750px]">
          {/* Month labels */}
          <div className="flex gap-1 mb-2 text-xs text-[#1a1a1a]/40">
            <div className="w-8" /> {/* Spacer for day labels */}
            {months.map((month, i) => (
              <div key={month} className="flex-1 text-center">
                {selectedMonth === i ? (
                  <motion.span 
                    className="font-bold text-[#5D0D18]"
                    layoutId="monthHighlight"
                  >
                    {month}
                  </motion.span>
                ) : (
                  <span 
                    className="cursor-pointer hover:text-[#5D0D18] transition-colors"
                    onMouseEnter={() => setSelectedMonth(i)}
                    onMouseLeave={() => setSelectedMonth(null)}
                  >
                    {month}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 w-8 text-xs text-[#1a1a1a]/40">
              <span className="h-3" />
              <span>Mon</span>
              <span className="h-3" />
              <span>Wed</span>
              <span className="h-3" />
              <span>Fri</span>
              <span className="h-3" />
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    const intensity = getIntensity(day.count);
                    const isHovered = hoveredDay?.date === day.date;
                    
                    return (
                      <motion.div
                        key={day.date}
                        className="w-3 h-3 rounded-sm cursor-pointer relative"
                        style={{ backgroundColor: getColor(intensity) }}
                        whileHover={{ scale: 1.5, zIndex: 10 }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: weekIndex * 0.001 }}
                      >
                        {/* Tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#5D0D18] text-[#FFFBEB] text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none"
                            >
                              <div className="font-bold">{day.count} contributions</div>
                              <div className="text-[#FFFBEB]/70">{day.date}</div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#5D0D18]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-[#1a1a1a]/50">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColor(level) }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, icon: Icon, trend, delay }) => (
  <motion.div
    className="bg-white rounded-xl p-4 border border-[#5D0D18]/10 shadow-sm hover:shadow-md transition-shadow"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-start justify-between">
      <div className="p-2 bg-[#5D0D18]/10 rounded-lg">
        <Icon size={18} className="text-[#5D0D18]" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs text-[#6B7A3D] font-medium">
          <TrendingUp size={12} />
          {trend}
        </span>
      )}
    </div>
    <div className="mt-3">
      <div className="text-2xl font-bold text-[#1a1a1a] font-fliege">{value}</div>
      <div className="text-xs text-[#1a1a1a]/50 mt-1">{label}</div>
    </div>
  </motion.div>
);

const PlatformStats = ({ platform, data, color }) => {
  const stats = {
    github: [
      { value: data.totalContributions, label: 'Contributions', icon: Github },
      { value: data.currentStreak, label: 'Day Streak', icon: Flame },
      { value: data.totalRepos, label: 'Repositories', icon: GitBranch },
      { value: data.starsReceived, label: 'Stars Earned', icon: Star },
    ],
    leetcode: [
      { value: data.totalSolved, label: 'Problems Solved', icon: Code2 },
      { value: data.easy, label: 'Easy', icon: Trophy },
      { value: data.medium, label: 'Medium', icon: Trophy },
      { value: data.hard, label: 'Hard', icon: Trophy },
    ],
    gfg: [
      { value: data.totalSolved, label: 'Problems Solved', icon: Terminal },
      { value: data.codingScore, label: 'Coding Score', icon: Award },
      { value: data.monthlyStreak, label: 'Month Streak', icon: Flame },
      { value: data.institutionRank, label: 'Institute Rank', icon: TrendingUp },
    ],
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats[platform].map((stat, index) => (
        <StatCard 
          key={stat.label} 
          {...stat} 
          delay={index * 0.1}
          trend={index === 0 ? '+12%' : null}
        />
      ))}
    </div>
  );
};

const SkillProgress = ({ skills }) => (
  <div className="mt-6 space-y-3">
    <h4 className="text-sm font-bold text-[#1a1a1a] mb-4">Skill Proficiency</h4>
    {Object.entries(skills).map(([skill, score], index) => (
      <motion.div
        key={skill}
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <span className="text-xs text-[#1a1a1a]/60 w-20">{skill}</span>
        <div className="flex-1 h-2 bg-[#5D0D18]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#5D0D18] to-[#9FB2AC]"
            initial={{ width: 0 }}
            whileInView={{ width: `${score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          />
        </div>
        <span className="text-xs font-bold text-[#5D0D18] w-8">{score}%</span>
      </motion.div>
    ))}
  </div>
);

export default function CodingActivity() {
  const [activeTab, setActiveTab] = useState('github');
  const [githubData, setGithubData] = useState(GITHUB_DATA);
  const [leetCodeData, setLeetCodeData] = useState(LEETCODE_DATA);
  const [gfgData, setGfgData] = useState(GFG_DATA);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const hydrateLiveData = async () => {
      const [githubResult, leetCodeResult, gfgResult] = await Promise.allSettled([
        fetchGitHubLiveData(DEFAULT_USERNAMES.github, controller.signal),
        fetchLeetCodeLiveData(DEFAULT_USERNAMES.leetcode, controller.signal),
        fetchGfgLiveData(DEFAULT_USERNAMES.gfg, controller.signal),
      ]);

      if (!isMounted) return;

      if (githubResult.status === 'fulfilled') setGithubData(githubResult.value);
      if (leetCodeResult.status === 'fulfilled') setLeetCodeData(leetCodeResult.value);
      if (gfgResult.status === 'fulfilled') setGfgData(gfgResult.value);
    };

    hydrateLiveData();
    const timer = window.setInterval(hydrateLiveData, REALTIME_REFRESH_MS);

    return () => {
      isMounted = false;
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  const platforms = {
    github: {
      title: 'GitHub Activity',
      icon: Github,
      data: githubData,
      colorScheme: THEME.contribution,
      maxValue: 12,
      url: `https://github.com/${githubData.username}`,
    },
    leetcode: {
      title: 'LeetCode Progress',
      icon: Code2,
      data: leetCodeData,
      colorScheme: THEME.leetcode,
      maxValue: 5,
      url: `https://leetcode.com/${leetCodeData.username}`,
    },
    gfg: {
      title: 'GeeksforGeeks',
      icon: Terminal,
      data: gfgData,
      colorScheme: THEME.gfg,
      maxValue: 3,
      url: `https://auth.geeksforgeeks.org/user/${gfgData.username}`,
    },
  };

  const summaryStats = [
    { value: formatMetric(githubData.totalContributions), label: 'Total Contributions', icon: Github },
    { value: formatMetric((leetCodeData.totalSolved || 0) + (gfgData.totalSolved || 0)), label: 'Problems Solved', icon: Code2 },
    { value: formatMetric(githubData.currentStreak), label: 'Day Streak', icon: Flame },
    { value: formatMetric(githubData.totalRepos), label: 'Repositories', icon: GitBranch },
  ];

  return (
    <section id="activity" className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-8 h-px bg-[#9FB2AC]" />
            Coding Journey
            <span className="w-8 h-px bg-[#9FB2AC]" />
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Daily <span className="text-[#5D0D18] italic">Activity</span>
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Consistent coding habits across platforms. Every square represents a day of building, learning, and growing.
          </motion.p>
        </motion.div>

        {/* Platform Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {Object.entries(platforms).map(([key, platform]) => (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === key 
                  ? 'text-[#FFFBEB]' 
                  : 'text-[#5D0D18] hover:bg-[#5D0D18]/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === key && (
                <motion.div
                  className="absolute inset-0 bg-[#5D0D18] rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <platform.icon size={16} />
                {platform.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Active Platform Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Heatmap */}
            <ActivityHeatmap 
              data={platforms[activeTab].data.dailyActivity || platforms[activeTab].data.dailySubmissions || platforms[activeTab].data.dailyProblems}
              colorScheme={platforms[activeTab].colorScheme}
              title={platforms[activeTab].title}
              icon={platforms[activeTab].icon}
              maxValue={platforms[activeTab].maxValue}
            />

            {/* Stats Grid */}
            <PlatformStats 
              platform={activeTab} 
              data={platforms[activeTab].data}
              color={platforms[activeTab].colorScheme[4]}
            />

            {/* GFG Skills (only for GFG) */}
            {activeTab === 'gfg' && (
              <motion.div 
                className="mt-8 bg-white rounded-2xl p-6 border border-[#5D0D18]/10 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <SkillProgress skills={gfgData.skillScores} />
              </motion.div>
            )}

            {/* Profile Link */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.a
                href={platforms[activeTab].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5D0D18] text-[#FFFBEB] rounded-full font-medium hover:bg-[#5D0D18]/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Profile
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Combined Stats Summary */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {summaryStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl border border-[#5D0D18]/10 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(93, 13, 24, 0.1)" }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#5D0D18]/10 flex items-center justify-center">
                <stat.icon size={24} className="text-[#5D0D18]" />
              </div>
              <div className="text-3xl font-bold text-[#5D0D18] font-fliege mb-1">{stat.value}</div>
              <div className="text-sm text-[#1a1a1a]/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
