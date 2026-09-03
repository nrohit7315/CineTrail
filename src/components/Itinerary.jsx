/**
 * Itinerary.jsx
 * --------------
 * Requirement #8: the AI plans a trip, and it renders as a real,
 * readable day-by-day plan — not a block of chat text. We ask Gemini for
 * strict JSON (see lib/gemini.js) and render that JSON as a schedule,
 * styled like a film shooting schedule: day markers use a monospace
 * "timecode" font, which is a deliberate nod rather than decoration.
 */

import { useState } from "react";
import { generateItinerary } from "../lib/gemini";
import { LoadingBlock, ErrorBlock } from "./StateBlocks";
import "./Itinerary.css";

export default function Itinerary({ destination }) {
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateItinerary(destination, days, interests);
      setPlan(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="itinerary">
      <form className="itinerary__form" onSubmit={handleGenerate}>
        <label>
          Days
          <input
            type="number"
            min={1}
            max={10}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </label>
        <label className="itinerary__interests">
          What are you into? (optional)
          <input
            type="text"
            placeholder="food, hiking, quiet mornings…"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Scouting…" : "Generate shooting schedule"}
        </button>
      </form>

      {loading && <LoadingBlock label="Planning your days…" />}
      {error && <ErrorBlock message={error} onRetry={handleGenerate} />}

      {plan && (
        <div className="itinerary__schedule">
          {plan.days.map((day) => (
            <div className="itinerary__day" key={day.day}>
              <div className="itinerary__day-marker">
                <span className="itinerary__timecode">DAY {String(day.day).padStart(2, "0")}</span>
                <span className="itinerary__theme">{day.theme}</span>
              </div>
              <ol className="itinerary__activities">
                {day.activities.map((act, i) => (
                  <li key={i} className="itinerary__activity">
                    <span className="itinerary__time">{act.time}</span>
                    <div>
                      <p className="itinerary__activity-title">{act.title}</p>
                      <p className="itinerary__activity-desc">{act.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
