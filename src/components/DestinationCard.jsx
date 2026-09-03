/**
 * DestinationCard.jsx
 * ---------------------
 * One "poster" in the destination grid. Deliberately shaped like a film
 * lobby card (tall, poster-ish aspect ratio) rather than a generic
 * horizontal SaaS card — see the design notes in README.md.
 *
 * <Link> comes from react-router-dom: it renders an <a> tag but navigates
 * without a full page reload, which is what gives single-page apps their
 * instant feel.
 */

import { Link } from "react-router-dom";
import RemoteImage from "./RemoteImage";
import "./DestinationCard.css";

export default function DestinationCard({ destination }) {
  return (
    <Link to={`/destination/${destination.id}`} className="destination-card">
      <div className="destination-card__image-wrap">
        <RemoteImage
          query={destination.imageQuery}
          alt={`${destination.name}, ${destination.country}`}
          className="destination-card__image"
        />
        <span className="destination-card__country">{destination.country}</span>
      </div>
      <div className="destination-card__body">
        <h3 className="destination-card__name">{destination.name}</h3>
        <p className="destination-card__tagline">{destination.tagline}</p>
        <p className="destination-card__films">
          Featured in <strong>{destination.films[0].title}</strong>
          {destination.films.length > 1 ? ` +${destination.films.length - 1} more` : ""}
        </p>
      </div>
    </Link>
  );
}
