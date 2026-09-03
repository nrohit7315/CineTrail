/**
 * images.js
 * ---------
 * Wraps the Pexels image search API. The assignment requires that
 * destination/place images come from a live image API rather than being
 * hardcoded files in the project — this is that API call.
 *
 * We keep a simple in-memory cache (a plain JS object/Map) so that if two
 * components ask for the same query in the same browser session (e.g. the
 * destination card and the detail page both want a photo of "Rome"), we
 * only hit the network once. This is NOT persisted anywhere — it just
 * lives as long as the tab is open.
 */

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = "https://api.pexels.com/v1/search";

const cache = new Map();

/**
 * Returns a single photo URL (or null) for a search query.
 * `size` picks which Pexels-provided resolution to use ("large", "medium", etc).
 */
export async function getPhotoForQuery(query, size = "large") {
  if (cache.has(query)) {
    return cache.get(query);
  }

  if (!API_KEY) {
    throw new Error("Missing Pexels API key. Add VITE_PEXELS_API_KEY to your .env file.");
  }

  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

  const response = await fetch(url, {
    headers: { Authorization: API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Image search failed (status ${response.status}).`);
  }

  const data = await response.json();
  const photo = data.photos?.[0];

  const result = photo
    ? {
        url: photo.src[size],
        alt: photo.alt || query,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
      }
    : null;

  cache.set(query, result);
  return result;
}
