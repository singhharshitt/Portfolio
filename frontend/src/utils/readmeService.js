import { fetchReadmeMarkdown } from './markdownParser';

const memoryCache = new Map();
const CACHE_PREFIX = 'portfolio-readme-cache-v1:';
const CACHE_TTL_MS = 1000 * 60 * 60;
const PACKAGE_JSON_PATHS = ['package.json', 'frontend/package.json', 'client/package.json', 'app/package.json'];

function getStorageKey(githubUrl) {
  return `${CACHE_PREFIX}${githubUrl}`;
}

function readFromSessionStorage(githubUrl) {
  if (typeof window === 'undefined' || !githubUrl) {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(getStorageKey(githubUrl));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.savedAt || !parsed.payload) {
      return null;
    }

    const isExpired = Date.now() - parsed.savedAt > CACHE_TTL_MS;
    if (isExpired) {
      window.sessionStorage.removeItem(getStorageKey(githubUrl));
      return null;
    }

    return parsed.payload;
  } catch {
    return null;
  }
}

function writeToSessionStorage(githubUrl, payload) {
  if (typeof window === 'undefined' || !githubUrl || !payload) {
    return;
  }

  try {
    const value = JSON.stringify({
      savedAt: Date.now(),
      payload,
    });
    window.sessionStorage.setItem(getStorageKey(githubUrl), value);
  } catch {
    // Ignore storage quota and serialization failures.
  }
}

async function fetchRepoPackageDependencies({ repoOwner, repoName, defaultBranch, signal }) {
  if (!repoOwner || !repoName || !defaultBranch) {
    return [];
  }

  for (const path of PACKAGE_JSON_PATHS) {
    const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${defaultBranch}/${path}`;

    try {
      const response = await fetch(rawUrl, {
        signal,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        continue;
      }

      const parsed = await response.json();
      const dependencies = Object.keys(parsed?.dependencies || {});
      const devDependencies = Object.keys(parsed?.devDependencies || {});
      const merged = Array.from(new Set([...dependencies, ...devDependencies]));

      if (merged.length > 0) {
        return merged;
      }
    } catch {
      // Try the next possible package.json location.
    }
  }

  return [];
}

export async function fetchReadmeWithCache(githubUrl, options = {}) {
  const { signal } = options;

  if (!githubUrl) {
    return {
      markdown: '',
      defaultBranch: 'main',
      repoOwner: null,
      repoName: null,
      packageDependencies: [],
      error: new Error('Missing GitHub repository URL.'),
    };
  }

  if (memoryCache.has(githubUrl)) {
    return memoryCache.get(githubUrl);
  }

  const sessionPayload = readFromSessionStorage(githubUrl);
  if (sessionPayload) {
    memoryCache.set(githubUrl, sessionPayload);
    return sessionPayload;
  }

  const payload = await fetchReadmeMarkdown(githubUrl, options);
  const packageDependencies = await fetchRepoPackageDependencies({
    repoOwner: payload?.repoOwner,
    repoName: payload?.repoName,
    defaultBranch: payload?.defaultBranch,
    signal,
  });

  const result = {
    ...payload,
    packageDependencies,
  };

  memoryCache.set(githubUrl, result);

  if (payload?.markdown) {
    writeToSessionStorage(githubUrl, result);
  }

  return result;
}
