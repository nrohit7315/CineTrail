import { useParams, Link } from "react-router-dom";
import { getDestinationById } from "../data/destinations";
import RemoteImage from "../components/RemoteImage";
import WeatherPanel from "../components/WeatherPanel";
import PlaceShowcase from "../components/PlaceShowcase";
import Chatbot from "../components/Chatbot";
import Itinerary from "../components/Itinerary";
import { EmptyBlock } from "../components/StateBlocks";
import "./DestinationDetail.css";

export default function DestinationDetail() {
  // useParams reads the ":id" segment out of the current URL, e.g.
  // "/destination/rome" gives us { id: "rome" }.
  const { id } = useParams();
  const destination = getDestinationById(id);

  if (!destination) {
    return (
      <div className="not-found">
        <EmptyBlock message={`We don't have a destination called "${id}".`} />
        <Link to="/" className="back-link">
          ← Back to all destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="destination-detail">
      <div className="destination-detail__banner">
        <RemoteImage
          query={destination.imageQuery}
          alt={`${destination.name}, ${destination.country}`}
          className="destination-detail__banner-image"
        />
        <div className="destination-detail__banner-scrim" aria-hidden="true" />
        <div className="destination-detail__banner-content">
          <Link to="/" className="back-link back-link--on-image">
            ← All destinations
          </Link>
          <p className="destination-detail__country">{destination.country}</p>
          <h1>{destination.name}</h1>
        </div>
      </div>

      <div className="destination-detail__layout">
        <div className="destination-detail__main">
          <section className="destination-detail__section">
            <p className="destination-detail__description">{destination.description}</p>
            <ul className="destination-detail__films">
              {destination.films.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong> — {f.note}
                </li>
              ))}
            </ul>
          </section>

          <section className="destination-detail__section">
            <h2>Notable places</h2>
            <PlaceShowcase places={destination.places} />
          </section>

          <section className="destination-detail__section">
            <h2>Plan your days</h2>
            <Itinerary destination={destination} />
          </section>
        </div>

        <aside className="destination-detail__sidebar">
          <h2>Weather right now</h2>
          <WeatherPanel lat={destination.lat} lon={destination.lon} label={destination.name} />
        </aside>
      </div>

      <Chatbot destination={destination} />
    </div>
  );
}
