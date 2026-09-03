import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// BrowserRouter enables client-side routing (react-router-dom): clicking
// a <Link> changes the URL and swaps components WITHOUT a full page
// reload from the server. This is what makes it a "single-page app".
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
