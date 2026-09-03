/**
 * RemoteImage.jsx
 * ----------------
 * Requirement #6: images come from a live image API, not from files
 * bundled in the project. Several places need "a photo for this search
 * term" (destination cards, place cards, the detail page hero) so instead
 * of repeating the fetch logic everywhere, this one component does it and
 * renders an <img>, a loading skeleton, or a graceful fallback.
 */

import { useState, useEffect } from "react";
import { getPhotoForQuery } from "../lib/images";
import "./RemoteImage.css";

export default function RemoteImage({ query, alt, className = "" }) {
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState("loading"); // "loading" | "ready" | "error" | "empty"

  useEffect(() => {
    let cancelled = false;
    setState("loading");

    getPhotoForQuery(query)
      .then((result) => {
        if (cancelled) return;
        if (result) {
          setPhoto(result);
          setState("ready");
        } else {
          setState("empty");
        }
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  if (state === "loading") {
    return <div className={`remote-image remote-image--skeleton ${className}`} aria-hidden="true" />;
  }

  if (state === "error" || state === "empty") {
    // A quiet fallback rather than a broken-image icon or blank space.
    return (
      <div className={`remote-image remote-image--fallback ${className}`}>
        <span>{alt}</span>
      </div>
    );
  }

  return <img className={`remote-image ${className}`} src={photo.url} alt={alt || photo.alt} loading="lazy" />;
}
