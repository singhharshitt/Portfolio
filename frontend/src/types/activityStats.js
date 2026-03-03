/**
 * @typedef {Object} LanguageShare
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef {Object} GitHubStats
 * @property {number[]} contributions
 * @property {number[]} commits
 * @property {number} currentStreak
 * @property {number} longestStreak
 * @property {LanguageShare[]} languages
 */

/**
 * @typedef {Object} LeetCodeDifficulty
 * @property {number} easy
 * @property {number} medium
 * @property {number} hard
 */

/**
 * @typedef {Object} LeetCodeMonthlyPoint
 * @property {string} month
 * @property {number} solved
 */

/**
 * @typedef {Object} LeetCodeRatingPoint
 * @property {string} date
 * @property {number} rating
 */

/**
 * @typedef {Object} LeetCodeStats
 * @property {number} totalSolved
 * @property {LeetCodeDifficulty} difficulty
 * @property {LeetCodeMonthlyPoint[]} monthly
 * @property {LeetCodeRatingPoint[]} ratingHistory
 */

/**
 * @typedef {Object} GfgMonthlyPoint
 * @property {string} month
 * @property {number} count
 */

/**
 * @typedef {Object} GfgTopicPoint
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef {Object} GFGStats
 * @property {number} totalProblems
 * @property {GfgMonthlyPoint[]} monthlyActivity
 * @property {GfgTopicPoint[]=} topicDistribution
 */

/** @type {Readonly<GitHubStats>} */
export const EMPTY_GITHUB_STATS = Object.freeze({
  contributions: [],
  commits: [],
  currentStreak: 0,
  longestStreak: 0,
  languages: [],
});

/** @type {Readonly<LeetCodeStats>} */
export const EMPTY_LEETCODE_STATS = Object.freeze({
  totalSolved: 0,
  difficulty: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  monthly: [],
  ratingHistory: [],
});

/** @type {Readonly<GFGStats>} */
export const EMPTY_GFG_STATS = Object.freeze({
  totalProblems: 0,
  monthlyActivity: [],
  topicDistribution: [],
});
