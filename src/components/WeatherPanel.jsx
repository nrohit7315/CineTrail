/**
 * WeatherPanel.jsx
 * -----------------
 * Requirement #5: live weather for a location, via OpenWeather.
 *
 * This component is intentionally "dumb" about WHERE the coordinates come
 * from — it just receives `lat`/`lon` as props and fetches weather for
 * them. That means the same component can show weather for a destination
 * page (fixed coordinates) or for the visitor's own location (coordinates
 * from LocationContext) without any changes.
 */

import { useState, useEffect } from "react";
import { getCurrentWeather, weatherIconUrl } from "../lib/weather";
import { LoadingBlock, ErrorBlock } from "./StateBlocks";
import "./WeatherPanel.css";

export default function WeatherPanel({ lat, lon, label }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // The array [lat, lon] at the end is React's "dependency array": this
  // effect re-runs whenever lat or lon actually changes value, and does
  // nothing on re-renders where they stayed the same.
  useEffect(() => {
    let cancelled = false; // guards against setting state after unmount

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCurrentWeather(lat, lon);
        if (!cancelled) setWeather(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (lat != null && lon != null) load();

    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  if (loading) return <LoadingBlock label="Checking the weather…" />;
  if (error) return <ErrorBlock message={error} />;
  if (!weather) return null;

  return (
    <div className="weather-panel">
      {weather.icon && (
        <img
          className="weather-panel__icon"
          src={weatherIconUrl(weather.icon)}
          alt={weather.description}
        />
      )}
      <div className="weather-panel__body">
        <div className="weather-panel__temp">{weather.tempC}°C</div>
        <div className="weather-panel__desc">
          {weather.description} in {label || weather.cityName}
        </div>
        <div className="weather-panel__meta">
          Feels like {weather.feelsLikeC}°C · {weather.humidity}% humidity · wind{" "}
          {weather.windKph} km/h
        </div>
      </div>
    </div>
  );
}
