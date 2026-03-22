/**
 * Converts a project title to a URL-safe slug.
 * e.g. "WhiskandBloom" -> "whiskandbloom"
 *      "Movie Magic" -> "movie-magic"
 */
export function getProjectSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // spaces to hyphens
    .replace(/[^a-z0-9-]/g, '') // strip non-alphanumeric (except hyphens)
    .replace(/-+/g, '-');        // collapse multiple hyphens
}
