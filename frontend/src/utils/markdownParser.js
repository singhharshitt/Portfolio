import { CASE_STUDY_FALLBACKS } from '../constants/caseStudyFallbacks';

const HEADING_REGEX = /^#{1,6}\s+(.+)$/gm;

const SECTION_ALIASES = {
  overview: ['overview', 'about', 'summary', 'introduction'],
  problemStatement: ['problem statement', 'problem', 'challenge', 'context'],
  solution: ['solution', 'approach', 'implementation', 'architecture'],
  techStack: ['tech stack', 'technologies', 'stack', 'built with'],
  keyFeatures: ['key features', 'features', 'highlights'],
  screenshots: ['screenshots', 'media', 'gallery', 'preview'],
  learnings: ['learnings', 'what i learned', 'lessons learned'],
  challenges: ['challenges', 'limitations', 'trade-offs'],
};

const TECH_ALIASES = {
  react: 'React',
  next: 'Next.js',
  nextjs: 'Next.js',
  vue: 'Vue',
  angular: 'Angular',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  tailwind: 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  node: 'Node.js',
  express: 'Express',
  nest: 'NestJS',
  mongodb: 'MongoDB',
  mongoose: 'Mongoose',
  postgresql: 'PostgreSQL',
  postgres: 'PostgreSQL',
  prisma: 'Prisma',
  mysql: 'MySQL',
  redis: 'Redis',
  graphql: 'GraphQL',
  socketio: 'Socket.io',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  aws: 'AWS',
  vercel: 'Vercel',
  netlify: 'Netlify',
  firebase: 'Firebase',
  supabase: 'Supabase',
  openai: 'OpenAI API',
};

function normalize(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function parseRepoFromGitHubUrl(githubUrl = '') {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (!match) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ''),
  };
}

function extractMarkdownHeadings(markdown = '') {
  const headings = [];
  let match = HEADING_REGEX.exec(markdown);

  while (match) {
    headings.push({
      text: match[1].trim(),
      index: match.index,
      endOfLine: match.index + match[0].length,
    });
    match = HEADING_REGEX.exec(markdown);
  }

  return headings;
}

function findSectionSlice(markdown, aliases) {
  if (!markdown) {
    return '';
  }

  const headings = extractMarkdownHeadings(markdown);
  const normalizedAliases = aliases.map(normalize);

  const targetHeadingIndex = headings.findIndex((heading) => {
    const headingText = normalize(heading.text);
    return normalizedAliases.some((alias) => headingText.includes(alias));
  });

  if (targetHeadingIndex < 0) {
    return '';
  }

  const start = headings[targetHeadingIndex].endOfLine;
  const end = headings[targetHeadingIndex + 1]?.index ?? markdown.length;

  return markdown.slice(start, end).trim();
}

function extractTitle(markdown = '', fallbackTitle = '') {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    return titleMatch[1].trim();
  }
  return fallbackTitle;
}

function markdownListToItems(markdown = '') {
  if (!markdown) {
    return [];
  }

  return markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*+]\s+/.test(line))
    .map((line) => line.replace(/^[-*+]\s+/, '').trim())
    .filter(Boolean);
}

function splitCommaList(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function stripMarkdown(value = '') {
  return String(value)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^\)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[~*_]/g, '')
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function toSentence(text = '') {
  const cleaned = String(text).trim().replace(/\s+/g, ' ');
  if (!cleaned) {
    return '';
  }

  const first = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return /[.!?]$/.test(first) ? first : `${first}.`;
}

function firstParagraph(value = '') {
  const normalized = stripMarkdown(value);
  const [paragraph] = normalized.split('\n').filter(Boolean);
  return paragraph || '';
}

function humanizeOverview(project, overviewRaw) {
  const fromReadme = firstParagraph(overviewRaw);
  if (fromReadme) {
    return toSentence(`Developed ${project?.title}, ${fromReadme.replace(/^this project\s+/i, 'a project ')}`);
  }

  const description = project?.description || 'a production-ready digital product';
  return toSentence(
    `Developed ${project?.title || 'this project'}, ${description.toLowerCase()}, with a strong emphasis on reliability, polish, and maintainable engineering`
  );
}

function humanizeProblem(project, problemRaw, fallbackProblem) {
  const fromReadme = firstParagraph(problemRaw);
  if (fromReadme) {
    return toSentence(`The core problem addressed was ${fromReadme.replace(/^the\s+/i, 'the ')}`);
  }

  return toSentence(
    fallbackProblem || `The product needed a clear and dependable workflow for ${project?.title || 'end users'} across devices and real-world usage conditions`
  );
}

function humanizeSolution(solutionRaw, fallbackSolution) {
  const fromReadme = firstParagraph(solutionRaw);
  if (fromReadme) {
    return toSentence(`The solution focused on ${fromReadme.replace(/^it\s+/i, '').replace(/^this\s+/i, '')}`);
  }

  return toSentence(
    fallbackSolution || 'The implementation combined modular UI architecture, practical backend integration, and deployment-ready delivery practices'
  );
}

function toTechToken(value = '') {
  return normalize(value).replace(/\s+/g, '');
}

function inferTechFromText(text = '') {
  if (!text) {
    return [];
  }

  const token = toTechToken(text);
  const found = [];
  Object.entries(TECH_ALIASES).forEach(([alias, name]) => {
    if (token.includes(alias)) {
      found.push(name);
    }
  });
  return found;
}

function inferTechStack(techStackMarkdown, projectTechStack = [], packageDependencies = []) {
  const fromProject = (projectTechStack || []).map((tech) => tech.name).filter(Boolean);
  const fromSection = splitCommaList(stripMarkdown(techStackMarkdown).replace(/\n/g, ','));
  const fromSectionAliases = fromSection.flatMap((item) => inferTechFromText(item));
  const fromPackages = (packageDependencies || []).flatMap((name) => inferTechFromText(name));

  const ordered = [...fromSection, ...fromSectionAliases, ...fromPackages, ...fromProject]
    .map((item) => item.trim())
    .filter(Boolean);

  return Array.from(new Set(ordered)).slice(0, 10);
}

function humanizeList(items = [], fallback = []) {
  const source = items.length ? items : fallback;
  return source
    .map((item) => toSentence(stripMarkdown(item)).replace(/\.$/, ''))
    .filter(Boolean)
    .slice(0, 6);
}

function humanizeLearnings(learningsRaw, fallbackLearnings) {
  const fromReadme = firstParagraph(learningsRaw);
  if (fromReadme) {
    return toSentence(`A key learning from this build was ${fromReadme}`);
  }
  return toSentence(fallbackLearnings);
}

function humanizeChallenges(challengesRaw, fallbackChallenges) {
  const fromReadme = firstParagraph(challengesRaw);
  if (fromReadme) {
    return toSentence(`A major challenge involved ${fromReadme}`);
  }
  return toSentence(fallbackChallenges);
}

export function buildCaseStudyContent(project, markdown = '', packageDependencies = []) {
  const fallback = CASE_STUDY_FALLBACKS[project?.title] ?? CASE_STUDY_FALLBACKS.default;
  const overviewMarkdown = findSectionSlice(markdown, SECTION_ALIASES.overview);
  const problemMarkdown = findSectionSlice(markdown, SECTION_ALIASES.problemStatement);
  const solutionMarkdown = findSectionSlice(markdown, SECTION_ALIASES.solution);
  const techStackMarkdown = findSectionSlice(markdown, SECTION_ALIASES.techStack);
  const featuresMarkdown = findSectionSlice(markdown, SECTION_ALIASES.keyFeatures);
  const screenshotsMarkdown = findSectionSlice(markdown, SECTION_ALIASES.screenshots);
  const learningsMarkdown = findSectionSlice(markdown, SECTION_ALIASES.learnings);
  const challengesMarkdown = findSectionSlice(markdown, SECTION_ALIASES.challenges);

  return {
    title: extractTitle(markdown, project?.title ?? 'Case Study'),
    overview: humanizeOverview(project, overviewMarkdown),
    problemStatement: humanizeProblem(project, problemMarkdown, fallback.problemStatement),
    solution: humanizeSolution(solutionMarkdown, fallback.solution),
    techStack: inferTechStack(techStackMarkdown, project?.techStack || [], packageDependencies),
    keyFeatures: humanizeList(markdownListToItems(featuresMarkdown), fallback.keyFeatures),
    screenshots: screenshotsMarkdown,
    learnings: humanizeLearnings(learningsMarkdown, fallback.learnings),
    challenges: humanizeChallenges(challengesMarkdown, fallback.challenges),
  };
}

export async function fetchReadmeMarkdown(githubUrl, options = {}) {
  const { signal } = options;
  const repo = parseRepoFromGitHubUrl(githubUrl);

  if (!repo) {
    return {
      markdown: '',
      defaultBranch: 'main',
      repoOwner: null,
      repoName: null,
      error: new Error('Invalid GitHub repository URL.'),
    };
  }

  const { owner, repo: repoName } = repo;
  let defaultBranch = 'main';

  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
      signal,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (repoResponse.ok) {
      const repoMeta = await repoResponse.json();
      defaultBranch = repoMeta.default_branch || defaultBranch;
    }
  } catch {
    // Use default branch fallback when metadata is unavailable.
  }

  const branchCandidates = Array.from(new Set([defaultBranch, 'main', 'master']));
  const readmePathCandidates = ['README.md', 'readme.md'];

  for (const branch of branchCandidates) {
    for (const readmePath of readmePathCandidates) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${readmePath}`;

      try {
        const readmeResponse = await fetch(rawUrl, {
          signal,
          headers: {
            Accept: 'text/plain',
          },
        });

        if (!readmeResponse.ok) {
          continue;
        }

        const markdown = await readmeResponse.text();
        if (!markdown.trim()) {
          continue;
        }

        return {
          markdown,
          defaultBranch: branch,
          repoOwner: owner,
          repoName,
          error: null,
        };
      } catch {
        // Try the next candidate URL.
      }
    }
  }

  return {
    markdown: '',
    defaultBranch,
    repoOwner: owner,
    repoName,
    error: new Error('README.md not found for this repository.'),
  };
}

export function resolveMarkdownAssetUrl(src, repoOwner, repoName, branch) {
  if (!src) {
    return src;
  }

  const githubBlobMatch = src.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i);
  if (githubBlobMatch) {
    const [, owner, repo, blobBranch, blobPath] = githubBlobMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${blobBranch}/${encodeURI(blobPath)}`;
  }

  if (/^(https?:|data:)/i.test(src)) {
    return src;
  }

  if (!repoOwner || !repoName || !branch) {
    return src;
  }

  const [pathOnly] = String(src).split('#');
  const cleanPath = pathOnly.replace(/^\.?\//, '');
  return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${encodeURI(cleanPath)}`;
}

export function resolveMarkdownLinkUrl(href, repoOwner, repoName, branch) {
  if (!href) {
    return href;
  }

  if (/^(https?:|mailto:|tel:|#)/i.test(href)) {
    return href;
  }

  if (!repoOwner || !repoName || !branch) {
    return href;
  }

  const cleanPath = href.replace(/^\.?\//, '');
  if (cleanPath.startsWith('#')) {
    return href;
  }

  return `https://github.com/${repoOwner}/${repoName}/blob/${branch}/${encodeURI(cleanPath)}`;
}
