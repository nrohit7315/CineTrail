/**
 * SearchFilterBar.jsx
 * ---------------------
 * A "controlled" search input plus a row of toggleable mood filters.
 * "Controlled" means the input's value lives in React state (in the
 * parent, Home.jsx) and is passed down as a prop — React is the single
 * source of truth for what's in the box, rather than the DOM.
 *
 * This component itself holds no state; it just renders what it's told
 * and calls the callbacks it's given. That makes it easy to test and
 * reason about.
 */

export default function SearchFilterBar({
  query,
  onQueryChange,
  moods,
  activeMoods,
  onToggleMood,
}) {
  return (
    <div className="search-filter-bar">
      <label className="search-filter-bar__search" htmlFor="destination-search">
        <span className="sr-only">Search destinations</span>
        <input
          id="destination-search"
          type="search"
          placeholder="Search by destination, country, or film…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>

      <div className="search-filter-bar__moods" role="group" aria-label="Filter by mood">
        {moods.map((mood) => {
          const active = activeMoods.includes(mood);
          return (
            <button
              key={mood}
              type="button"
              className={`mood-chip ${active ? "mood-chip--active" : ""}`}
              aria-pressed={active}
              onClick={() => onToggleMood(mood)}
            >
              {mood}
            </button>
          );
        })}
      </div>
    </div>
  );
}
