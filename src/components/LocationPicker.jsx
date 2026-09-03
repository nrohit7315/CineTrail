/**
 * LocationPicker.jsx
 * -------------------
 * Implements requirement #4 from the brief: "ask the visitor for their
 * location and use it; also let them choose a location by searching for
 * it." This component covers BOTH paths so the app works whether or not
 * someone grants location permission.
 *
 * It's a small dropdown panel: one button for "use my location", and a
 * text input below it for typing a city name instead. We debounce the
 * text input (wait for the visitor to pause typing) so we don't fire an
 * API request on every single keystroke.
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "../context/LocationContext";
import { searchLocationByName } from "../lib/weather";
import "./LocationPicker.css";

export default function LocationPicker() {
  const { status, label, requestBrowserLocation, setManualLocation } = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const panelRef = useRef(null);

  // Close the dropdown if the visitor clicks anywhere outside it.
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search: every time `query` changes, wait 400ms of silence
  // before actually calling the API. The cleanup function (the returned
  // arrow function) cancels the previous timer if the visitor keeps typing.
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setSearching(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const found = await searchLocationByName(query.trim());
        setResults(found);
      } catch (err) {
        setSearchError(err.message);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  function handlePick(result) {
    const name = [result.name, result.state, result.country].filter(Boolean).join(", ");
    setManualLocation(result.lat, result.lon, name);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div className="location-picker" ref={panelRef}>
      <button
        type="button"
        className="location-picker__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="location-picker__pin" aria-hidden="true">
          ⌖
        </span>
        {status === "granted" || status === "manual" ? label : "Set your location"}
      </button>

      {open && (
        <div className="location-picker__panel" role="dialog" aria-label="Choose your location">
          <button
            type="button"
            className="location-picker__geo-button"
            onClick={requestBrowserLocation}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Locating…" : "Use my current location"}
          </button>

          {status === "denied" && (
            <p className="location-picker__hint">
              Location wasn't shared — search for a city instead.
            </p>
          )}

          <div className="location-picker__divider">or search</div>

          <input
            type="text"
            className="location-picker__input"
            placeholder="Search a city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for a city"
          />

          {searching && <p className="location-picker__hint">Searching…</p>}
          {searchError && <p className="location-picker__hint location-picker__hint--error">{searchError}</p>}

          {results.length > 0 && (
            <ul className="location-picker__results">
              {results.map((r, i) => (
                <li key={`${r.name}-${r.lat}-${i}`}>
                  <button type="button" onClick={() => handlePick(r)}>
                    {[r.name, r.state, r.country].filter(Boolean).join(", ")}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
