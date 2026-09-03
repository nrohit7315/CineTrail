import { useState, useMemo } from "react";
import Hero from "../components/Hero";
import SearchFilterBar from "../components/SearchFilterBar";
import DestinationCard from "../components/DestinationCard";
import { EmptyBlock } from "../components/StateBlocks";
import { destinations, getAllMoods } from "../data/destinations";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeMoods, setActiveMoods] = useState([]);
  const allMoods = useMemo(() => getAllMoods(), []);

  function toggleMood(mood) {
    setActiveMoods((current) =>
      current.includes(mood) ? current.filter((m) => m !== mood) : [...current, mood]
    );
  }

  // useMemo re-runs this filtering logic only when query/activeMoods/the
  // destination list change — not on every render of the page (e.g. when
  // typing in the location picker, which lives in a totally different
  // part of the tree, wouldn't re-trigger this).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return destinations.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.films.some((f) => f.title.toLowerCase().includes(q));

      const matchesMoods =
        activeMoods.length === 0 || activeMoods.every((m) => d.moods.includes(m));

      return matchesQuery && matchesMoods;
    });
  }, [query, activeMoods]);

  return (
    <>
      <Hero />
      <section id="explorer" className="explorer">
        <div className="explorer__intro">
          <h2>Pick a place, see the film behind it</h2>
          <p>Eight locations, each tied to the movies that made them recognisable.</p>
        </div>

        <SearchFilterBar
          query={query}
          onQueryChange={setQuery}
          moods={allMoods}
          activeMoods={activeMoods}
          onToggleMood={toggleMood}
        />

        {filtered.length === 0 ? (
          <EmptyBlock message="No destinations match that search. Try a different film, city, or filter." />
        ) : (
          <div className="explorer__grid">
            {filtered.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
