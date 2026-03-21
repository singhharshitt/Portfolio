function ensureMetaTag(selector, createAttributes) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(createAttributes).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }
  return tag;
}

export function updateCaseStudyMeta({ title, description }) {
  if (typeof document === 'undefined') {
    return;
  }

  document.title = title;

  const descriptionTag = ensureMetaTag('meta[name="description"]', { name: 'description' });
  const ogTitleTag = ensureMetaTag('meta[property="og:title"]', { property: 'og:title' });
  const ogDescriptionTag = ensureMetaTag('meta[property="og:description"]', { property: 'og:description' });
  const twitterTitleTag = ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' });
  const twitterDescriptionTag = ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' });

  descriptionTag.setAttribute('content', description);
  ogTitleTag.setAttribute('content', title);
  ogDescriptionTag.setAttribute('content', description);
  twitterTitleTag.setAttribute('content', title);
  twitterDescriptionTag.setAttribute('content', description);
}
