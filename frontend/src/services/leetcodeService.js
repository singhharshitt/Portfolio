/**
 * LeetCode stats — uses the free, public alfa-leetcode-api.
 * No authentication required. Uses VITE_LEETCODE_USERNAME.
 *
 * Includes client-side caching with localStorage fallback for API failures.
 * API docs: https://github.com/alfaarghya/alfa-leetcode-api
 */

const BASE_URL = 'https://alfa-leetcode-api.onrender.com';
const CACHE_KEY = 'leetcode_user_data';
const CACHE_TIMESTAMP_KEY = 'leetcode_user_data_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get cached data from localStorage
 */
function getCachedData() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cached || !timestamp) return null;
    
    // Check if cache is still valid (30 minutes)
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION) {
      // Clear expired cache
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      return null;
    }
    
    return JSON.parse(cached);
  } catch (err) {
    console.warn('LeetCode: Failed to read cache:', err);
    return null;
  }
}

/**
 * Save data to localStorage cache
 */
function setCachedData(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (err) {
    console.warn('LeetCode: Failed to cache data:', err);
    // Silently fail - not critical if cache write fails
  }
}

/**
 * Fetch with exponential backoff retry logic
 */
async function fetchWithRetry(url, maxRetries = 2, initialDelayMs = 1000) {
  let lastError;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (res.ok) return res;
      
      // Don't retry on 429 immediately, let cache handle it
      if (res.status === 429 || res.status >= 500) {
        lastError = new Error(`HTTP ${res.status}`);
        if (i < maxRetries) {
          const delayMs = initialDelayMs * Math.pow(2, i);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
      }
      
      lastError = new Error(`HTTP ${res.status}`);
      throw lastError;
    } catch (err) {
      lastError = err;
      
      if (i < maxRetries && err.name !== 'AbortError') {
        const delayMs = initialDelayMs * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        throw lastError;
      }
    }
  }
  
  throw lastError;
}

/**
 * Parse Unix-timestamp-based submission calendar into daily heatmap data.
 * Returns last ~365 days of activity.
 */
function parseSubmissionCalendar(calendarStr) {
  if (!calendarStr) return [];

  let source = calendarStr;
  if (typeof source === 'string') {
    try {
      source = JSON.parse(source);
    } catch {
      return [];
    }
  }

  if (typeof source !== 'object') return [];

  const entries = Object.entries(source)
    .map(([ts, count]) => {
      const dateObj = new Date(Number(ts) * 1000);
      if (Number.isNaN(dateObj.getTime())) return null;
      return {
        date: dateObj.toISOString().split('T')[0],
        count: Number(count) || 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Build a full 365-day grid from today backwards
  const today = new Date();
  const daysMap = new Map(entries.map((e) => [e.date, e.count]));
  const result = [];

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = daysMap.get(dateStr) || 0;
    // Map count to level 0-4
    let level = 0;
    if (count >= 10) level = 4;
    else if (count >= 5) level = 3;
    else if (count >= 2) level = 2;
    else if (count >= 1) level = 1;
    result.push({ date: dateStr, count, level });
  }

  return result;
}

export async function fetchLeetCodeStats() {
  const username = import.meta.env.VITE_LEETCODE_USERNAME;
  if (!username) throw new Error('VITE_LEETCODE_USERNAME is not set');

  try {
    // Try to fetch fresh data with retry logic
    const res = await fetchWithRetry(`${BASE_URL}/userProfile/${username}`, 2, 1000);
    const profile = await res.json();

    // Compute acceptance rate from submission stats
    const acAll = profile.matchedUserStats?.acSubmissionNum?.[0]?.submissions
      ?? profile.totalSubmissions?.[0]?.count ?? 0;
    const totalAll = profile.matchedUserStats?.totalSubmissionNum?.[0]?.submissions
      ?? profile.totalSubmissions?.[0]?.submissions ?? 1;

    const acceptanceRate = totalAll > 0 ? Math.round((acAll / totalAll) * 100) : 0;

    // Parse submission calendar for heatmap
    const submissionDays = parseSubmissionCalendar(profile.submissionCalendar);

    const data = {
      totalSolved: Number(profile.totalSolved) || 0,
      easySolved: Number(profile.easySolved) || 0,
      mediumSolved: Number(profile.mediumSolved) || 0,
      hardSolved: Number(profile.hardSolved) || 0,
      totalEasy: Number(profile.totalEasy) || 0,
      totalMedium: Number(profile.totalMedium) || 0,
      totalHard: Number(profile.totalHard) || 0,
      totalQuestions: Number(profile.totalQuestions) || 0,
      acceptanceRate,
      ranking: Number(profile.ranking) || 0,
      totalSubmissions: Number(
        profile.matchedUserStats?.totalSubmissionNum?.[0]?.submissions
        ?? profile.totalSubmissions?.[0]?.submissions
        ?? 0
      ) || 0,
      submissionDays,
    };

    // Cache successful response
    setCachedData(data);
    return data;
  } catch (error) {
    console.warn('LeetCode: API fetch failed, attempting to use cached data:', error.message);
    
    // Fallback to cached data if available
    const cachedData = getCachedData();
    if (cachedData) {
      console.log('LeetCode: Using cached data');
      return cachedData;
    }
    
    // If no cache available, throw error
    throw new Error(`LeetCode API failed: ${error.message}. Please try again later.`);
  }
}
