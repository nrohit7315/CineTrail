/**
 * PlaceShowcase.jsx
 * -------------------
 * Requirement #3: "famous places... presented properly, not as a bare
 * list of names." Each place gets its own photo (fetched live), name,
 * and a sentence of context — laid out like a set of location cards
 * rather than a <ul> of text.
 */

import RemoteImage from "./RemoteImage";
import "./PlaceShowcase.css";

export default function PlaceShowcase({ places }) {
  return (
    <div className="place-showcase">
      {places.map((place, index) => (
        <article className="place-card" key={place.name}>
          <div className="place-card__image-wrap">
            <RemoteImage query={place.imageQuery} alt={place.name} className="place-card__image" />
            <span className="place-card__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h4 className="place-card__name">{place.name}</h4>
          <p className="place-card__blurb">{place.blurb}</p>
        </article>
      ))}
    </div>
  );
}
