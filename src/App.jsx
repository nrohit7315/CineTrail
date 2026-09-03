import { Routes, Route } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import DestinationDetail from "./pages/DestinationDetail";

export default function App() {
  return (
    // LocationProvider wraps everything so any page/component below can
    // call useLocation() to read or set the visitor's location.
    <LocationProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>
          CineTrail — a Design Esthetics front-end assignment. Weather by OpenWeather, photos by
          Pexels, planning by Google Gemini.
        </p>
      </footer>
    </LocationProvider>
  );
}
