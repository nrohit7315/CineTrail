/**
 * Chatbot.jsx
 * ------------
 * Requirement #7: a conversational assistant a visitor can ask questions
 * about a destination. Rendered as a slide-out panel (a "location scout")
 * rather than a modal, so it can stay open while the visitor scrolls the
 * destination page for reference.
 *
 * `messages` is an array we grow by *replacing* it with a new array each
 * time (`setMessages([...messages, newOne])`) rather than mutating it —
 * React needs a new array reference to know it should re-render.
 */

import { useState, useRef, useEffect } from "react";
import { askAboutDestination } from "../lib/gemini";
import "./Chatbot.css";

export default function Chatbot({ destination }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Ask me anything about ${destination.name} — how long to stay, what to see first, or when to go.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll to the newest message whenever the list grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question || sending) return;

    const nextMessages = [...messages, { role: "user", text: question }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const answer = await askAboutDestination(destination, nextMessages, question);
      setMessages([...nextMessages, { role: "assistant", text: answer }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`chatbot ${open ? "chatbot--open" : ""}`}>
      <button
        type="button"
        className="chatbot__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Close scout" : "Ask a location scout"}
      </button>

      {open && (
        <div className="chatbot__panel" role="dialog" aria-label={`Ask about ${destination.name}`}>
          <div className="chatbot__messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__bubble chatbot__bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {sending && <div className="chatbot__bubble chatbot__bubble--assistant chatbot__bubble--typing">…</div>}
            {error && <div className="chatbot__error">{error}</div>}
          </div>

          <form className="chatbot__form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={`Ask about ${destination.name}…`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Your question"
            />
            <button type="submit" disabled={sending || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
