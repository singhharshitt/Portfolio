import { useQuery } from '@tanstack/react-query';
import { fetchGitHubContributions } from '../services/githubService';
import { fetchLeetCodeStats } from '../services/leetcodeService';

// Cache durations - LeetCode data persists longer to avoid rate limits
const THIRTY_MINUTES = 30 * 60 * 1000;
const TWELVE_HOURS = 12 * 60 * 60 * 1000;

export function useGitHubActivity() {
  return useQuery({
    queryKey: ['github-contributions'],
    queryFn: fetchGitHubContributions,
    staleTime: THIRTY_MINUTES,
    gcTime: THIRTY_MINUTES * 2,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
    refetchOnWindowFocus: false,
    enabled: true, // Always enabled - React Query handles re-renders
  });
}

export function useLeetCodeStats() {
  return useQuery({
    queryKey: ['leetcode-stats'],
    queryFn: fetchLeetCodeStats,
    // Longer stale time to reduce API calls (helps prevent rate limit 429)
    staleTime: TWELVE_HOURS,
    // Even longer gcTime to ensure cached data persists across navigation
    gcTime: TWELVE_HOURS * 2,
    // Minimal retries - the service handles internal retry with backoff
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
    // Don't refetch on window focus - respect API rate limits
    refetchOnWindowFocus: false,
    // Permanent cache in localStorage via the service
    enabled: true,
  });
}
