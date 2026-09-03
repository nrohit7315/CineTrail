/**
 * LocationContext.jsx
 * --------------------
 * React Context is how you share a piece of state across many components
 * WITHOUT manually passing it down as props through every level in
 * between ("prop drilling"). We use it here for the visitor's location,
 * because both the Header (which shows "Weather near you") and the
 * destination detail pages need to know it.
 *
 * There are three pieces to a Context:
 *  1. createContext()   — makes the "channel"
 *  2. a Provider component — wraps part of the app and holds the actual
 *     state (useState), and passes it down through the channel
 *  3. a custom hook (useLocation) — a small convenience so components
 *     don't need to import useContext + LocationContext every time
 */

import { createContext, useContext, useState, useCallback } from "react";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  // status: "idle" | "loading" | "granted" | "denied" | "manual"
  const [status, setStatus] = useState("idle");
  const [coords, setCoords] = useState(null); // { lat, lon }
  const [label, setLabel] = useState(""); // human-readable name, e.g. "Mumbai, IN"

  // Ask the browser's Geolocation API for the visitor's position.
  // This must be triggered by a user action (a button click) — browsers
  // block silent, automatic location requests.
  const requestBrowserLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("denied");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLabel("your location");
        setStatus("granted");
      },
      () => {
        // The visitor clicked "Block" in the browser permission prompt,
        // or their device otherwise failed to produce a location.
        setStatus("denied");
      },
      { timeout: 8000 }
    );
  }, []);

  // Used by the manual search box once the visitor picks a result.
  const setManualLocation = useCallback((lat, lon, name) => {
    setCoords({ lat, lon });
    setLabel(name);
    setStatus("manual");
  }, []);

  const value = { status, coords, label, requestBrowserLocation, setManualLocation };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used inside a <LocationProvider>");
  }
  return ctx;
}
