/**
 * GitHub Pages project sites are published beneath `/<repository-name>`.
 * Keeping internal URLs here lets the same build work locally, on a custom
 * domain, and on the standard GitHub Pages URL.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function siteHref(path = '/') {
  return `${basePath}${path}`;
}
