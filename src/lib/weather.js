/**
 * weather.js
 * ----------
 * A small wrapper around the OpenWeather "Current Weather" API.
 *
 * Why wrap it in a function instead of calling fetch() straight from a
 * component? Two reasons:
 *  1. If we ever swap weather providers, only this file changes.
 *  2. It keeps the API key and URL-building logic in one place instead
 *     of scattered across components.
 *
 * The API key comes from Vite's environment variables. Vite only exposes
 * variables to the browser if their name starts with VITE_ — that's a
 * safety feature so you don't accidentally leak a secret server key.
 * See the .env.example file for where this is set.
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetch current weather for a latitude/longitude pair.
 * Returns a small, clean object — we deliberately DON'T return OpenWeather's
 * raw response, so the rest of the app doesn't need to know OpenWeather's
 * particular field names (temp, feels_like, weather[0].icon, etc).
 *
 * Throws an Error with a human-readable message on failure, so the calling
 * component can catch it and show an error state.
 */
export async function getCurrentWeather(lat, lon) {
  if (!API_KEY) {
    throw new Error(
      "Missing OpenWeather API key. Add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }

  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    // response.ok is false for any status outside 200-299 (401, 404, 500…)
    throw new Error(`Weather request failed (status ${response.status}).`);
  }

  const data = await response.json();

  return {
    tempC: Math.round(data.main.temp),
    feelsLikeC: Math.round(data.main.feels_like),
    description: data.weather?.[0]?.description ?? "unknown",
    icon: data.weather?.[0]?.icon ?? null, // e.g. "10d" — used to build an icon URL below
    humidity: data.main.humidity,
    windKph: Math.round(data.wind.speed * 3.6), // OpenWeather gives m/s, we convert to km/h
    cityName: data.name,
  };
}

/** Builds the URL for OpenWeather's small icon PNGs, given an icon code like "10d". */
export function weatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

/**
 * OpenWeather's free "Geocoding API" turns a place name the visitor types
 * (e.g. "Lisbon") into a latitude/longitude, which is what we actually need
 * for the weather call above. This powers the manual location search.
 */
export async function searchLocationByName(query) {
  if (!API_KEY) {
    throw new Error(
      "Missing OpenWeather API key. Add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    query
  )}&limit=5&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Location search failed (status ${response.status}).`);
  }

  const results = await response.json();

  return results.map((r) => ({
    name: r.name,
    country: r.country,
    state: r.state,
    lat: r.lat,
    lon: r.lon,
  }));
}
