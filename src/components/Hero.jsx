/**
 * Hero.jsx
 * ---------
 * Requirement #1: a hero with a looping background video.
 *
 * IMPORTANT — read this before you deploy:
 * This sandbox can't download a video file from Mixkit/Coverr for you
 * (its network access is limited to package registries, not general
 * websites), so `/public/hero.mp4` is NOT included in this project.
 * Grab a short (10-20s), silent, landscape clip from
 * https://mixkit.co/free-stock-video/ or https://coverr.co (search
 * "clouds", "airplane window", "mountains", "film reel" — anything that
 * fits the cinema-travel theme) and save it as `public/hero.mp4`.
 *
 * Until that file exists, the <video> tag's onError handler below swaps
 * in a plain gradient background — so the page never looks broken, it
 * just loses the motion. That's a deliberate empty/error state, not an
 * accident (see the brief's "what happens when things go wrong" point).
 */

import { useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className={`hero ${videoFailed ? "hero--no-video" : ""}`}>
      {!videoFailed && (
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoFailed(true)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__eyebrow">Frame 001</p>
        <h1 className="hero__title">
          See the world the way <span>the movies</span> did.
        </h1>
        <p className="hero__subtitle">
          Every destination here was shot for a film first. Explore the real places
          behind the scenes, check the weather before you go, and let an AI location
          scout plan your days.
        </p>
        <a href="#explorer" className="hero__cta">
          Start exploring ↓
        </a>
      </div>
    </section>
  );
}
