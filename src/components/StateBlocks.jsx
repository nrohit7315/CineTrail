/**
 * StateBlocks.jsx
 * ----------------
 * The assignment specifically calls out that loading, empty, and error
 * states are things you DESIGN, not accidents. Rather than write custom
 * loading/error markup inside every component that fetches something, we
 * define three small, reusable components once and reuse them everywhere.
 *
 * Each one takes a `label`/`message` prop so the wording can be specific
 * to where it's used ("Loading weather…" vs "Loading photos…").
 */

export function LoadingBlock({ label = "Loading…" }) {
  return (
    <div className="state-block state-block--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorBlock({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="state-block state-block--error" role="alert">
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="retry-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyBlock({ message = "Nothing here yet." }) {
  return (
    <div className="state-block state-block--empty">
      <span>{message}</span>
    </div>
  );
}
