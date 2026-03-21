/**
 * GitHub Contributions — uses the official GraphQL API.
 * Requires VITE_GITHUB_TOKEN (a classic PAT with `read:user` scope).
 * Includes client-side caching with localStorage fallback for API failures.
 */

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';
const CACHE_KEY = 'github_contributions_data';
const CACHE_TIMESTAMP_KEY = 'github_contributions_data_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get cached data from localStorage
 */
function getCachedGitHubData() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cached || !timestamp) return null;
    
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      return null;
    }
    
    return JSON.parse(cached);
  } catch (err) {
    console.warn('GitHub: Failed to read cache:', err);
    return null;
  }
}

/**
 * Save data to localStorage cache
 */
function setCachedGitHubData(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (err) {
    console.warn('GitHub: Failed to cache data:', err);
  }
}

const QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

/**
 * Map GitHub's contributionLevel enum to a 0-4 integer for colour mapping.
 */
const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * Compute current streak and longest streak from calendar days.
 */
function computeStreaks(weeks) {
  const days = weeks.flatMap((w) => w.contributionDays).sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Walk backwards from today to compute current streak
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) {
      currentStreak++;
    } else {
      // Allow today to be 0 (day isn't over yet)
      if (i === days.length - 1) continue;
      break;
    }
  }

  // Walk forwards for longest streak
  for (const day of days) {
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

export async function fetchGitHubContributions() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (!token) throw new Error('VITE_GITHUB_TOKEN is not set');

  try {
    // Extract username from token-associated account
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!userRes.ok) throw new Error(`GitHub user fetch failed: ${userRes.status}`);
    const userData = await userRes.json();
    const login = userData.login;

    const res = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors.map((e) => e.message).join(', '));
    }

    const collection = json.data.user.contributionsCollection;
    const calendar = collection.contributionCalendar;
    const { currentStreak, longestStreak } = computeStreaks(calendar.weeks);

    // Flatten weeks into a simple array of { date, count, level }
    const days = calendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
    );

    const data = {
      totalContributions: calendar.totalContributions,
      currentStreak,
      longestStreak,
      days,
      weeks: calendar.weeks.length,
    };

    // Cache successful response
    setCachedGitHubData(data);
    return data;
  } catch (error) {
    console.warn('GitHub: API fetch failed, attempting to use cached data:', error.message);
    
    // Fallback to cached data if available
    const cachedData = getCachedGitHubData();
    if (cachedData) {
      console.log('GitHub: Using cached data');
      return cachedData;
    }
    
    // If no cache available, throw error
    throw new Error(`GitHub API failed: ${error.message}. Please try again later.`);
  }
}
