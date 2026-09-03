import { Link } from "react-router-dom";
import LocationPicker from "./LocationPicker";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand">
        <span className="site-header__brand-mark" aria-hidden="true">
          ▶
        </span>
        CineTrail
      </Link>
      <LocationPicker />
    </header>
  );
}
