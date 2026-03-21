const CASE_STUDY_MARKDOWN_BY_SLUG = {
  priosync: '/case-studies/01_PrioSync_Case_Study.md',
  skyx: '/case-studies/02_SkyX_Case_Study.md',
  moviemagic: '/case-studies/03_MovieMate_Case_Study.md',
  inkdrop: '/case-studies/04_InkDrop_Case_Study.md',
  whiskandbloom: '/case-studies/05_WhiskandBloom_Case_Study.md',
  swapverse: '/case-studies/06_SwapVerse_Case_Study.md',
  grabdesk: '/case-studies/07_GrabDesk_Case_Study.md',
};

const CASE_STUDY_STRUCTURED_BY_SLUG = {
  priosync: '/case-studies/01_PrioSync_Case_Study.json',
  skyx: '/case-studies/02_SkyX_Case_Study.json',
  moviemagic: '/case-studies/03_MovieMagic_Case_Study.json',
  inkdrop: '/case-studies/04_InkDrop_Case_Study.json',
  whiskandbloom: '/case-studies/05_WhiskandBloom_Case_Study.json',
  swapverse: '/case-studies/06_SwapVerse_Case_Study.json',
  grabdesk: '/case-studies/07_GrabDesk_Case_Study.json',
};

export function getCaseStudyMarkdownPath(slug = '') {
  const normalizedSlug = String(slug).toLowerCase().trim();
  return CASE_STUDY_MARKDOWN_BY_SLUG[normalizedSlug] || null;
}

export function getCaseStudyStructuredPath(slug = '') {
  const normalizedSlug = String(slug).toLowerCase().trim();
  return CASE_STUDY_STRUCTURED_BY_SLUG[normalizedSlug] || null;
}

export async function fetchLocalCaseStudyMarkdown(slug, options = {}) {
  const { signal } = options;
  const markdownPath = getCaseStudyMarkdownPath(slug);

  if (!markdownPath) {
    return {
      markdown: '',
      path: null,
      error: new Error('No authored case study mapping found for this project.'),
    };
  }

  try {
    const response = await fetch(markdownPath, {
      signal,
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      return {
        markdown: '',
        path: markdownPath,
        error: new Error(`Authored case study could not be loaded (${response.status}).`),
      };
    }

    const markdown = await response.text();

    return {
      markdown,
      path: markdownPath,
      error: null,
    };
  } catch (error) {
    return {
      markdown: '',
      path: markdownPath,
      error,
    };
  }
}

export async function fetchLocalCaseStudyStructured(slug, options = {}) {
  const { signal } = options;
  const jsonPath = getCaseStudyStructuredPath(slug);

  if (!jsonPath) {
    return {
      caseStudy: null,
      path: null,
      error: new Error('No structured case study mapping found for this project.'),
    };
  }

  try {
    const response = await fetch(jsonPath, {
      signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return {
        caseStudy: null,
        path: jsonPath,
        error: new Error(`Structured case study could not be loaded (${response.status}).`),
      };
    }

    const caseStudy = await response.json();

    return {
      caseStudy,
      path: jsonPath,
      error: null,
    };
  } catch (error) {
    return {
      caseStudy: null,
      path: jsonPath,
      error,
    };
  }
}
